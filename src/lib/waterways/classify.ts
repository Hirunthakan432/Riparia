import type { WaterKind } from "./types";

export const KIND_LABEL: Record<WaterKind, string> = {
  river: "River",
  stream: "Stream",
  canal: "Canal",
  drain: "Drain",
  tidal: "Tidal channel",
  lake: "Lake",
  reservoir: "Reservoir",
  pond: "Pond",
  wetland: "Wetland",
  lagoon: "Lagoon",
  oxbow: "Oxbow",
  alkaline: "Saline lake",
  estuary: "Estuary",
  delta: "Delta",
  unknown: "Waterway",
};

export const KIND_COLOR_VAR: Record<WaterKind, string> = {
  river: "var(--color-kind-river)",
  stream: "var(--color-kind-stream)",
  canal: "var(--color-kind-canal)",
  drain: "var(--color-kind-drain)",
  tidal: "var(--color-kind-tidal)",
  lake: "var(--color-kind-lake)",
  reservoir: "var(--color-kind-reservoir)",
  pond: "var(--color-kind-pond)",
  wetland: "var(--color-kind-wetland)",
  lagoon: "var(--color-kind-lagoon)",
  oxbow: "var(--color-kind-oxbow)",
  alkaline: "var(--color-kind-alkaline)",
  estuary: "var(--color-kind-estuary)",
  delta: "var(--color-kind-delta)",
  unknown: "var(--color-kind-unknown)",
};

export function atlasKindToWater(
  kind: "river" | "canal" | "lake" | "reservoir" | "alkaline",
): WaterKind {
  if (kind === "alkaline") return "alkaline";
  return kind;
}

export function classifyOsm(tags: Record<string, string>): WaterKind {
  const ww = tags.waterway;
  const water = tags.water;
  const natural = tags.natural;
  const landuse = tags.landuse;

  if (tags.estuary === "yes" || water === "estuary") return "estuary";
  if (water === "oxbow" || tags.oxbow === "yes") return "oxbow";
  if (ww === "canal") return "canal";
  if (ww === "river" || ww === "riverbank") return "river";
  if (ww === "stream" || ww === "brook") return "stream";
  if (ww === "drain" || ww === "ditch") return "drain";
  if (ww === "tidal_channel" || ww === "fairway") return "tidal";
  if (natural === "wetland" || Boolean(tags.wetland)) return "wetland";
  if (water === "reservoir" || landuse === "reservoir") return "reservoir";
  if (water === "pond" || water === "basin" || water === "reflecting_pool")
    return "pond";
  if (water === "lagoon") return "lagoon";
  if (
    water === "salt" ||
    tags.salt === "yes" ||
    tags.salinity === "hypersaline"
  )
    return "alkaline";
  if (water === "lake" || natural === "water") return "lake";
  if (ww) return "river";
  return "unknown";
}

export function cuesFromTags(
  kind: WaterKind,
  tags: Record<string, string>,
): string[] {
  const cues: string[] = [];
  const ww = tags.waterway;
  const water = tags.water;
  const natural = tags.natural;

  if (ww) cues.push(`Mapped as waterway=${ww}`);
  else if (water) cues.push(`Mapped as water=${water}`);
  else if (natural) cues.push(`Mapped as natural=${natural}`);

  if (tags.intermittent === "yes" || tags.seasonal === "yes")
    cues.push("Seasonal or intermittent flow");
  if (tags.tidal === "yes") cues.push("Tidal influence");
  if (tags.lock) cues.push("Has lock structures — typical of canals");
  if (tags.tunnel === "yes") cues.push("Runs through a tunnel");
  if (tags.bridge === "yes") cues.push("Carried on an aqueduct / bridge");
  if (tags.width) cues.push(`Recorded width ${tags.width} m`);
  if (tags.salt === "yes") cues.push("Saline water");
  if (tags.boat === "yes" || tags.motorboat === "yes")
    cues.push("Navigable to boats");
  if (tags.dam || tags.water === "reservoir")
    cues.push("Impounded water behind a dam");
  if (kind === "canal" && !tags.lock)
    cues.push("Straight engineered channel");
  if (kind === "river")
    cues.push("Natural channel with tributary network");
  if (kind === "wetland") cues.push("Diffuse shoreline, vegetated water");

  return cues.slice(0, 5);
}

export function normalizeName(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
