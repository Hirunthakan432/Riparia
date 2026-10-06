export type WaterKind =
  | "river"
  | "stream"
  | "canal"
  | "drain"
  | "tidal"
  | "lake"
  | "reservoir"
  | "pond"
  | "wetland"
  | "lagoon"
  | "oxbow"
  | "alkaline"
  | "estuary"
  | "delta"
  | "unknown";

export type AtlasKind = "river" | "canal" | "lake" | "reservoir" | "alkaline";

export type AtlasFeature = {
  id: string;
  name: string;
  alt?: string;
  native?: string;
  rank: number;
  kind: AtlasKind;
  lines?: [number, number][][];
  rings?: [number, number][][][];
};

export type AtlasData = {
  rivers: AtlasFeature[];
  lakes: AtlasFeature[];
};

export type OsmHit = {
  id: string;
  osmType: "way" | "relation" | "node";
  osmId: number;
  name: string;
  kind: WaterKind;
  tags: Record<string, string>;
  lat: number;
  lon: number;
  distanceM: number;
  geometry?: {
    type: "LineString" | "Polygon" | "MultiLineString";
    coordinates: number[][] | number[][][] | number[][][][];
  };
};

export type IdentifyResult = {
  hits: OsmHit[];
  region?: { label: string; country?: string };
};

export type SearchHit = {
  id: string;
  source: "atlas" | "nominatim";
  name: string;
  kind: WaterKind;
  lat: number;
  lon: number;
  subtitle?: string;
  atlasId?: string;
};

export type FamousFact = {
  aliases: string[];
  kind: WaterKind;
  summary: string;
  lengthKm?: number;
  dischargeM3s?: number;
  basin?: string;
  source?: string;
  mouth?: string;
  countries?: string;
  note?: string;
};

export type Selection = {
  name: string;
  kind: WaterKind;
  lat: number;
  lon: number;
  source: "osm" | "atlas" | "search";
  atlasId?: string;
  osm?: OsmHit;
  distanceM?: number;
  region?: string;
  geometry?: OsmHit["geometry"];
};

export type BasemapId = "satellite" | "chart" | "terrain";
