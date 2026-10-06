import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Pane,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { loadAtlas, nearestAtlas, featureBounds } from "@/lib/waterways/atlas";
import { atlasKindToWater } from "@/lib/waterways/classify";
import { identifyAt } from "@/lib/waterways/identify-fn";
import { radiusForZoom, rankForZoom } from "@/lib/waterways/geo";
import { useMapStore } from "@/lib/waterways/store";
import type { AtlasFeature, OsmHit, Selection, WaterKind } from "@/lib/waterways/types";

const PULSE_ICON = L.divIcon({
  className: "id-pulse",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const TILES = {
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attr: "Esri",
  },
  chart: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attr: "OSM / CARTO",
  },
  terrain: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attr: "Esri",
  },
} as const;

function featureToGeometry(f: AtlasFeature): Geometry | null {
  if (f.lines?.length) {
    return f.lines.length === 1
      ? { type: "LineString", coordinates: f.lines[0] }
      : { type: "MultiLineString", coordinates: f.lines };
  }
  if (f.rings?.length) {
    return f.rings.length === 1
      ? { type: "Polygon", coordinates: f.rings[0] }
      : { type: "MultiPolygon", coordinates: f.rings };
  }
  return null;
}

function toFc(features: AtlasFeature[]): FeatureCollection {
  const out: Feature[] = [];
  for (const f of features) {
    const geometry = featureToGeometry(f);
    if (!geometry) continue;
    out.push({
      type: "Feature",
      id: f.id,
      properties: {
        id: f.id,
        name: f.name,
        kind: f.kind,
        rank: f.rank,
      },
      geometry,
    });
  }
  return { type: "FeatureCollection", features: out };
}

function lineStyle(kind: string, rank: number, selected: boolean, dim: boolean) {
  const color =
    kind === "canal"
      ? "var(--color-kind-canal)"
      : "var(--color-kind-river)";
  const weight = selected ? 5 : rank <= 2 ? 2.6 : rank <= 4 ? 1.8 : 1.2;
  return {
    color,
    weight,
    opacity: dim ? 0.12 : selected ? 1 : 0.85,
    lineCap: "round" as const,
    lineJoin: "round" as const,
  };
}

function polyStyle(kind: string, selected: boolean, dim: boolean) {
  const color =
    kind === "reservoir"
      ? "var(--color-kind-reservoir)"
      : kind === "alkaline"
        ? "var(--color-kind-alkaline)"
        : "var(--color-kind-lake)";
  return {
    color,
    weight: selected ? 2.4 : 1,
    opacity: dim ? 0.15 : 0.9,
    fillColor: color,
    fillOpacity: dim ? 0.04 : selected ? 0.38 : 0.22,
  };
}

function MapEvents({
  onIdentify,
}: {
  onIdentify: (lat: number, lon: number, atlasId?: string) => void;
}) {
  const setView = useMapStore((s) => s.setView);
  useMapEvents({
    click(e) {
      onIdentify(e.latlng.lat, e.latlng.lng);
    },
    moveend(e) {
      const c = e.target.getCenter();
      setView(c.lat, c.lng, e.target.getZoom());
    },
    zoomend(e) {
      const c = e.target.getCenter();
      setView(c.lat, c.lng, e.target.getZoom());
    },
  });
  return null;
}

function FlyController() {
  const map = useMap();
  const flyTo = useMapStore((s) => s.flyTo);
  const fitBounds = useMapStore((s) => s.fitBounds);
  const clearFly = useMapStore((s) => s.clearFly);

  useEffect(() => {
    if (fitBounds) {
      map.fitBounds(fitBounds, { padding: [48, 48], maxZoom: 9, animate: true });
      clearFly();
      return;
    }
    if (flyTo) {
      map.flyTo([flyTo.lat, flyTo.lon], flyTo.zoom ?? Math.max(map.getZoom(), 7), {
        duration: 0.8,
      });
      clearFly();
    }
  }, [flyTo, fitBounds, map, clearFly]);
  return null;
}

function selectionFromAtlas(
  feature: AtlasFeature,
  lat: number,
  lon: number,
  distanceM: number,
): Selection {
  const kind = atlasKindToWater(feature.kind);
  return {
    name: feature.name,
    kind,
    lat,
    lon,
    source: "atlas",
    atlasId: feature.id,
    distanceM,
  };
}

export default function WaterMap() {
  const atlas = useMapStore((s) => s.atlas);
  const setAtlas = useMapStore((s) => s.setAtlas);
  const setAtlasError = useMapStore((s) => s.setAtlasError);
  const basemap = useMapStore((s) => s.basemap);
  const zoom = useMapStore((s) => s.zoom);
  const click = useMapStore((s) => s.click);
  const selection = useMapStore((s) => s.selection);
  const filters = useMapStore((s) => s.filters);
  const setClick = useMapStore((s) => s.setClick);
  const setIdentifying = useMapStore((s) => s.setIdentifying);
  const setIdentifyError = useMapStore((s) => s.setIdentifyError);
  const select = useMapStore((s) => s.select);
  const identifyingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadAtlas()
      .then((data) => {
        if (!cancelled) setAtlas(data);
      })
      .catch(() => {
        if (!cancelled) setAtlasError("Could not load the world atlas overlay.");
      });
    return () => {
      cancelled = true;
    };
  }, [setAtlas, setAtlasError]);

  const maxRank = rankForZoom(zoom);
  const filterSet = useMemo(() => new Set(filters), [filters]);

  const riversFc = useMemo(() => {
    if (!atlas) return emptyFc();
    return toFc(
      atlas.rivers.filter(
        (r) =>
          r.rank <= maxRank &&
          filterSet.has(atlasKindToWater(r.kind) as WaterKind),
      ),
    );
  }, [atlas, maxRank, filterSet]);

  const lakesFc = useMemo(() => {
    if (!atlas) return emptyFc();
    return toFc(
      atlas.lakes.filter(
        (r) =>
          r.rank <= maxRank &&
          filterSet.has(atlasKindToWater(r.kind) as WaterKind),
      ),
    );
  }, [atlas, maxRank, filterSet]);

  const selectedFeature = useMemo(() => {
    if (!atlas || !selection?.atlasId) return emptyFc();
    const f =
      atlas.rivers.find((r) => r.id === selection.atlasId) ??
      atlas.lakes.find((r) => r.id === selection.atlasId);
    return f ? toFc([f]) : emptyFc();
  }, [atlas, selection?.atlasId]);

  const osmGeom = useMemo(() => {
    const g = selection?.geometry;
    if (!g) return emptyFc();
    return {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: {},
          geometry: g as Geometry,
        },
      ],
    };
  }, [selection?.geometry]);

  const onIdentify = useCallback(
    async (lat: number, lon: number, atlasId?: string) => {
      if (identifyingRef.current) return;
      identifyingRef.current = true;
      setClick(lat, lon);
      setIdentifying(true);
      setIdentifyError(null);

      const currentAtlas = useMapStore.getState().atlas;
      const z = useMapStore.getState().zoom;
      const radius = radiusForZoom(z);

      let atlasSel: Selection | null = null;
      if (currentAtlas) {
        if (atlasId) {
          const f =
            currentAtlas.rivers.find((r) => r.id === atlasId) ??
            currentAtlas.lakes.find((r) => r.id === atlasId);
          if (f) atlasSel = selectionFromAtlas(f, lat, lon, 0);
        }
        if (!atlasSel) {
          const near = nearestAtlas(currentAtlas, lat, lon, radius);
          if (near) atlasSel = selectionFromAtlas(near.feature, lat, lon, near.distanceM);
        }
        if (atlasSel) select(atlasSel, []);
      }

      try {
        const result = await identifyAt({ data: { lat, lon, radiusM: radius } });
        const hits = result.hits;
        const region = result.region?.label;
        const top = hits[0];

        const pick = mergeHits(atlasSel, top, hits, lat, lon, region);
        select(pick.sel, pick.nearby);
        if (!pick.sel) {
          setIdentifyError(
            region
              ? `No mapped waterway here (${region}). Try a river, lake, or coast.`
              : "No mapped waterway at this point. Zoom in on a river, lake, or canal.",
          );
        }
      } catch {
        if (!atlasSel) {
          setIdentifyError("Live hydrography is unavailable. Try an atlas river.");
        } else {
          setIdentifyError("Live map tags unavailable — showing atlas identification.");
        }
      } finally {
        identifyingRef.current = false;
        setIdentifying(false);
      }
    },
    [select, setClick, setIdentifyError, setIdentifying],
  );

  const onEachRiver = useCallback(
    (feature: Feature, layer: L.Layer) => {
      layer.on("click", (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e);
        const id = String(feature.properties?.id ?? "");
        onIdentify(e.latlng.lat, e.latlng.lng, id);
      });
    },
    [onIdentify],
  );

  return (
    <MapContainer
      center={[18, 12]}
      zoom={3}
      minZoom={2}
      maxZoom={18}
      zoomControl={false}
      attributionControl={false}
      worldCopyJump
      className="absolute inset-0 z-0 h-full w-full"
      preferCanvas
    >
      <TileLayer
        key={basemap}
        url={TILES[basemap].url}
        attribution={TILES[basemap].attr}
        maxZoom={18}
      />
      <Pane name="lakes" style={{ zIndex: 410 }}>
        <GeoJSON
          key={`lakes-${maxRank}-${filters.join(",")}`}
          data={lakesFc}
          style={(feat) => {
            const kind = String(feat?.properties?.kind ?? "lake");
            const id = String(feat?.properties?.id ?? "");
            const selected = selection?.atlasId === id;
            return polyStyle(kind, selected, false);
          }}
          onEachFeature={onEachRiver}
        />
      </Pane>
      <Pane name="rivers" style={{ zIndex: 420 }}>
        <GeoJSON
          key={`rivers-${maxRank}-${filters.join(",")}`}
          data={riversFc}
          style={(feat) => {
            const kind = String(feat?.properties?.kind ?? "river");
            const rank = Number(feat?.properties?.rank ?? 6);
            const id = String(feat?.properties?.id ?? "");
            const selected = selection?.atlasId === id;
            return lineStyle(kind, rank, selected, false);
          }}
          onEachFeature={onEachRiver}
        />
      </Pane>
      <Pane name="selected" style={{ zIndex: 450 }}>
        <GeoJSON
          key={selection?.atlasId ?? "none"}
          data={selectedFeature}
          style={(feat) => {
            const kind = String(feat?.properties?.kind ?? "river");
            if (feat?.geometry?.type === "Polygon" || feat?.geometry?.type === "MultiPolygon") {
              return polyStyle(kind, true, false);
            }
            return lineStyle(kind, 1, true, false);
          }}
        />
        {osmGeom.features.length > 0 && !selection?.atlasId ? (
          <GeoJSON
            key={selection?.osm?.id ?? "osm"}
            data={osmGeom}
            style={() =>
              lineStyle(selection?.kind ?? "river", 1, true, false)
            }
          />
        ) : null}
      </Pane>
      {click ? <Marker position={[click.lat, click.lon]} icon={PULSE_ICON} /> : null}
      <MapEvents onIdentify={onIdentify} />
      <FlyController />
    </MapContainer>
  );
}

function emptyFc(): FeatureCollection {
  return { type: "FeatureCollection", features: [] };
}

function mergeHits(
  atlasSel: Selection | null,
  top: OsmHit | undefined,
  hits: OsmHit[],
  lat: number,
  lon: number,
  region?: string,
): { sel: Selection | null; nearby: OsmHit[] } {
  const nearby = hits.slice(0, 8);
  if (atlasSel && atlasSel.distanceM === 0) {
    return { sel: { ...atlasSel, region, lat, lon }, nearby };
  }
  if (top && (!atlasSel || top.distanceM + 400 < (atlasSel.distanceM ?? Infinity))) {
    const unnamed = top.name === "Unnamed waterway";
    if (unnamed && atlasSel) {
      return {
        sel: { ...atlasSel, region, osm: top, lat, lon },
        nearby,
      };
    }
    return {
      sel: {
        name: top.name,
        kind: top.kind,
        lat: top.lat,
        lon: top.lon,
        source: "osm",
        osm: top,
        distanceM: top.distanceM,
        region,
        geometry: top.geometry,
      },
      nearby,
    };
  }
  if (atlasSel) return { sel: { ...atlasSel, region, osm: top, lat, lon }, nearby };
  if (top) {
    return {
      sel: {
        name: top.name,
        kind: top.kind,
        lat: top.lat,
        lon: top.lon,
        source: "osm",
        osm: top,
        distanceM: top.distanceM,
        region,
        geometry: top.geometry,
      },
      nearby,
    };
  }
  return { sel: null, nearby: [] };
}
