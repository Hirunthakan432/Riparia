import type { AtlasData, AtlasFeature } from "./types";
import { distToLineM, pointInRing } from "./geo";
import { normalizeName } from "./classify";

let cache: AtlasData | null = null;
let loading: Promise<AtlasData> | null = null;

export async function loadAtlas(): Promise<AtlasData> {
  if (cache) return cache;
  if (!loading) {
    loading = fetch("/data/atlas.json")
      .then((r) => {
        if (!r.ok) throw new Error("Atlas failed to load");
        return r.json() as Promise<AtlasData>;
      })
      .then((data) => {
        cache = data;
        return data;
      })
      .finally(() => {
        loading = null;
      });
  }
  return loading;
}

export function allFeatures(atlas: AtlasData): AtlasFeature[] {
  return [...atlas.rivers, ...atlas.lakes];
}

export function searchAtlas(atlas: AtlasData, q: string, limit = 8): AtlasFeature[] {
  const n = normalizeName(q);
  if (n.length < 2) return [];
  const scored: { f: AtlasFeature; s: number }[] = [];
  for (const f of allFeatures(atlas)) {
    const names = [f.name, f.alt, f.native].filter(Boolean).join(" ");
    const nn = normalizeName(names);
    if (!nn) continue;
    let s = 0;
    if (nn === n) s = 100;
    else if (nn.startsWith(n)) s = 80;
    else if (nn.includes(n)) s = 60;
    else continue;
    s += Math.max(0, 8 - f.rank);
    scored.push({ f, s });
  }
  scored.sort((a, b) => b.s - a.s);
  return scored.slice(0, limit).map((x) => x.f);
}

export function featureCentroid(f: AtlasFeature): { lat: number; lon: number } {
  const pts: [number, number][] = [];
  if (f.lines) for (const line of f.lines) pts.push(...line);
  if (f.rings) for (const poly of f.rings) for (const ring of poly) pts.push(...ring);
  if (pts.length === 0) return { lat: 0, lon: 0 };
  let lon = 0;
  let lat = 0;
  for (const p of pts) {
    lon += p[0];
    lat += p[1];
  }
  return { lon: lon / pts.length, lat: lat / pts.length };
}

export function featureBounds(
  f: AtlasFeature,
): [[number, number], [number, number]] | null {
  const pts: [number, number][] = [];
  if (f.lines) for (const line of f.lines) pts.push(...line);
  if (f.rings) for (const poly of f.rings) for (const ring of poly) pts.push(...ring);
  if (pts.length === 0) return null;
  let minLon = Infinity,
    minLat = Infinity,
    maxLon = -Infinity,
    maxLat = -Infinity;
  for (const [lon, lat] of pts) {
    if (lon < minLon) minLon = lon;
    if (lat < minLat) minLat = lat;
    if (lon > maxLon) maxLon = lon;
    if (lat > maxLat) maxLat = lat;
  }
  return [
    [minLat, minLon],
    [maxLat, maxLon],
  ];
}

export function nearestAtlas(
  atlas: AtlasData,
  lat: number,
  lon: number,
  maxM: number,
): { feature: AtlasFeature; distanceM: number } | null {
  let best: { feature: AtlasFeature; distanceM: number } | null = null;

  for (const lake of atlas.lakes) {
    if (!lake.rings) continue;
    for (const poly of lake.rings) {
      const outer = poly[0];
      if (!outer) continue;
      if (pointInRing(lon, lat, outer)) {
        return { feature: lake, distanceM: 0 };
      }
    }
  }

  for (const river of atlas.rivers) {
    if (!river.lines) continue;
    for (const line of river.lines) {
      const d = distToLineM(lat, lon, line);
      if (d <= maxM && (!best || d < best.distanceM)) {
        best = { feature: river, distanceM: d };
      }
    }
  }

  for (const lake of atlas.lakes) {
    if (!lake.rings) continue;
    for (const poly of lake.rings) {
      const outer = poly[0];
      if (!outer) continue;
      const d = distToLineM(lat, lon, outer);
      if (d <= maxM && (!best || d < best.distanceM)) {
        best = { feature: lake, distanceM: d };
      }
    }
  }

  return best;
}
