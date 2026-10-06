import { create } from "zustand";
import type { AtlasData, BasemapId, OsmHit, Selection, WaterKind } from "./types";

export const ALL_FILTERS: WaterKind[] = [
  "river",
  "canal",
  "lake",
  "reservoir",
  "alkaline",
  "wetland",
];

type State = {
  atlas: AtlasData | null;
  atlasError: string | null;
  basemap: BasemapId;
  zoom: number;
  center: { lat: number; lon: number };
  click: { lat: number; lon: number } | null;
  identifying: boolean;
  identifyError: string | null;
  selection: Selection | null;
  nearby: OsmHit[];
  recents: Selection[];
  filters: WaterKind[];
  guideOpen: boolean;
  flyTo: { lat: number; lon: number; zoom?: number } | null;
  fitBounds: [[number, number], [number, number]] | null;
  setAtlas: (atlas: AtlasData) => void;
  setAtlasError: (msg: string) => void;
  setBasemap: (id: BasemapId) => void;
  setView: (lat: number, lon: number, zoom: number) => void;
  setClick: (lat: number, lon: number) => void;
  setIdentifying: (v: boolean) => void;
  setIdentifyError: (msg: string | null) => void;
  select: (sel: Selection | null, nearby?: OsmHit[]) => void;
  toggleFilter: (kind: WaterKind) => void;
  setGuideOpen: (v: boolean) => void;
  requestFlyTo: (lat: number, lon: number, zoom?: number) => void;
  requestFit: (b: [[number, number], [number, number]] | null) => void;
  clearFly: () => void;
};

export const useMapStore = create<State>()((set, get) => ({
  atlas: null,
  atlasError: null,
  basemap: "satellite",
  zoom: 3,
  center: { lat: 18, lon: 12 },
  click: null,
  identifying: false,
  identifyError: null,
  selection: null,
  nearby: [],
  recents: [],
  filters: [...ALL_FILTERS],
  guideOpen: false,
  flyTo: null,
  fitBounds: null,
  setAtlas: (atlas) => set({ atlas, atlasError: null }),
  setAtlasError: (msg) => set({ atlasError: msg }),
  setBasemap: (basemap) => set({ basemap }),
  setView: (lat, lon, zoom) => set({ center: { lat, lon }, zoom }),
  setClick: (lat, lon) => set({ click: { lat, lon } }),
  setIdentifying: (identifying) => set({ identifying }),
  setIdentifyError: (identifyError) => set({ identifyError }),
  select: (selection, nearby) => {
    if (!selection) {
      set({ selection: null, nearby: nearby ?? [] });
      return;
    }
    const recents = [
      selection,
      ...get().recents.filter(
        (r) => r.name !== selection.name || r.kind !== selection.kind,
      ),
    ].slice(0, 8);
    set({
      selection,
      recents,
      nearby: nearby ?? get().nearby,
      identifyError: null,
    });
  },
  toggleFilter: (kind) => {
    const filters = get().filters;
    const next = filters.includes(kind)
      ? filters.filter((k) => k !== kind)
      : [...filters, kind];
    set({ filters: next.length ? next : [...ALL_FILTERS] });
  },
  setGuideOpen: (guideOpen) => set({ guideOpen }),
  requestFlyTo: (lat, lon, zoom) => set({ flyTo: { lat, lon, zoom } }),
  requestFit: (fitBounds) => set({ fitBounds }),
  clearFly: () => set({ flyTo: null, fitBounds: null }),
}));
