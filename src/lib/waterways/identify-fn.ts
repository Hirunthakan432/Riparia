import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { classifyOsm } from "./classify";
import { haversineM, simplifyLine } from "./geo";
import type { IdentifyResult, OsmHit, SearchHit, WaterKind } from "./types";

const UA = "Riparia/1.0 (waterway identification atlas)";

const OVERPASS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

async function fetchJson(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<unknown> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...init,
      signal: ctrl.signal,
      headers: { "user-agent": UA, ...(init.headers ?? {}) },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

type OverpassEl = {
  type: "way" | "relation" | "node";
  id: number;
  tags?: Record<string, string>;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  geometry?: { lat: number; lon: number }[];
};

function nameFromTags(tags: Record<string, string>): string {
  return (
    tags.name ||
    tags["name:en"] ||
    tags.alt_name ||
    tags.loc_name ||
    tags.ref ||
    "Unnamed waterway"
  );
}

function toHit(el: OverpassEl, lat: number, lon: number): OsmHit | null {
  const tags = el.tags ?? {};
  const center =
    el.center ??
    (el.lat != null && el.lon != null
      ? { lat: el.lat, lon: el.lon }
      : el.geometry && el.geometry.length
        ? {
            lat: el.geometry[Math.floor(el.geometry.length / 2)].lat,
            lon: el.geometry[Math.floor(el.geometry.length / 2)].lon,
          }
        : null);
  if (!center) return null;
  const geom =
    el.geometry && el.geometry.length >= 2
      ? {
          type: "LineString" as const,
          coordinates: simplifyLine(
            el.geometry.map((p) => [p.lon, p.lat] as [number, number]),
            100,
          ),
        }
      : undefined;
  return {
    id: `${el.type}/${el.id}`,
    osmType: el.type,
    osmId: el.id,
    name: nameFromTags(tags),
    kind: classifyOsm(tags),
    tags,
    lat: center.lat,
    lon: center.lon,
    distanceM: haversineM(lat, lon, center.lat, center.lon),
    geometry: geom,
  };
}

async function overpassAround(
  lat: number,
  lon: number,
  radiusM: number,
): Promise<OsmHit[]> {
  const query = `[out:json][timeout:12];
(
  way["waterway"](around:${Math.round(radiusM)},${lat},${lon});
  way["natural"="water"](around:${Math.round(radiusM)},${lat},${lon});
  way["landuse"="reservoir"](around:${Math.round(radiusM)},${lat},${lon});
  way["natural"="wetland"](around:${Math.round(radiusM)},${lat},${lon});
  relation["waterway"~"^(river|canal)$"](around:${Math.round(radiusM)},${lat},${lon});
  relation["natural"="water"](around:${Math.round(radiusM)},${lat},${lon});
);
out tags center 30;
`;
  let lastErr: unknown;
  for (const endpoint of OVERPASS) {
    try {
      const json = (await fetchJson(
        endpoint,
        {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ data: query }),
        },
        14000,
      )) as { elements?: OverpassEl[] };
      const hits = (json.elements ?? [])
        .map((el) => toHit(el, lat, lon))
        .filter((h): h is OsmHit => Boolean(h));
      hits.sort((a, b) => {
        const named =
          Number(a.name !== "Unnamed waterway") -
          Number(b.name !== "Unnamed waterway");
        if (named !== 0) return named > 0 ? -1 : 1;
        return a.distanceM - b.distanceM;
      });
      const seen = new Set<string>();
      const unique: OsmHit[] = [];
      for (const h of hits) {
        const key = `${h.kind}:${h.name}`;
        if (seen.has(key) && h.name !== "Unnamed waterway") continue;
        seen.add(key);
        unique.push(h);
        if (unique.length >= 12) break;
      }
      return unique;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Overpass failed");
}

type NominatimRev = {
  display_name?: string;
  address?: {
    country?: string;
    state?: string;
    county?: string;
    city?: string;
    town?: string;
    village?: string;
  };
};

async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<IdentifyResult["region"]> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
    const json = (await fetchJson(url, { method: "GET" }, 8000)) as NominatimRev;
    const a = json.address ?? {};
    const place = a.city || a.town || a.village || a.county || a.state;
    const label = [place, a.country].filter(Boolean).join(", ");
    if (!label) return undefined;
    return { label, country: a.country };
  } catch {
    return undefined;
  }
}

const identifyInput = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  radiusM: z.number().min(50).max(80000),
});

export const identifyAt = createServerFn({ method: "POST" })
  .validator((input: unknown) => identifyInput.parse(input))
  .handler(async ({ data }): Promise<IdentifyResult> => {
    const [hits, region] = await Promise.all([
      overpassAround(data.lat, data.lon, data.radiusM).catch(() => [] as OsmHit[]),
      reverseGeocode(data.lat, data.lon),
    ]);
    return { hits, region };
  });

const searchInput = z.object({
  q: z.string().min(2).max(80),
});

type NominatimSearch = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  name?: string;
};

function kindFromNominatim(cls: string, type: string): WaterKind {
  if (type === "canal") return "canal";
  if (type === "stream" || type === "brook") return "stream";
  if (type === "reservoir") return "reservoir";
  if (type === "wetland" || type === "marsh") return "wetland";
  if (type === "lagoon") return "lagoon";
  if (type === "pond") return "pond";
  if (type === "lake" || type === "sea") return "lake";
  if (cls === "waterway") return "river";
  if (cls === "natural") return "lake";
  return "unknown";
}

export const searchNominatim = createServerFn({ method: "POST" })
  .validator((input: unknown) => searchInput.parse(input))
  .handler(async ({ data }): Promise<SearchHit[]> => {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&addressdetails=0&q=${encodeURIComponent(data.q)}`;
    const json = (await fetchJson(url, { method: "GET" }, 8000)) as NominatimSearch[];
    if (!Array.isArray(json)) return [];
    return json
      .filter(
        (r) =>
          r.class === "waterway" ||
          r.class === "natural" ||
          r.class === "landuse" ||
          /water|river|lake|canal/i.test(r.display_name),
      )
      .slice(0, 6)
      .map((r) => ({
        id: `nom-${r.place_id}`,
        source: "nominatim" as const,
        name: r.name || r.display_name.split(",")[0],
        kind: kindFromNominatim(r.class, r.type),
        lat: Number(r.lat),
        lon: Number(r.lon),
        subtitle: r.display_name,
      }));
  });
