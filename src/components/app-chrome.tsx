import { BookOpen, Layers, Minus, Plus, Satellite, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdentifyPanel } from "@/components/identify-panel";
import { FieldGuide } from "@/components/field-guide";
import { SearchBar } from "@/components/search-bar";
import { KIND_COLOR_VAR, KIND_LABEL } from "@/lib/waterways/classify";
import { ALL_FILTERS, useMapStore } from "@/lib/waterways/store";
import { formatCoord } from "@/lib/waterways/geo";
import type { BasemapId, WaterKind } from "@/lib/waterways/types";
import { cn } from "@/lib/utils";

const BASEMAPS: { id: BasemapId; label: string; icon: typeof Satellite }[] = [
  { id: "satellite", label: "Satellite", icon: Satellite },
  { id: "chart", label: "Chart", icon: Layers },
  { id: "terrain", label: "Terrain", icon: Mountain },
];

export function AppChrome() {
  const basemap = useMapStore((s) => s.basemap);
  const setBasemap = useMapStore((s) => s.setBasemap);
  const filters = useMapStore((s) => s.filters);
  const toggleFilter = useMapStore((s) => s.toggleFilter);
  const zoom = useMapStore((s) => s.zoom);
  const center = useMapStore((s) => s.center);
  const identifying = useMapStore((s) => s.identifying);
  const guideOpen = useMapStore((s) => s.guideOpen);
  const setGuideOpen = useMapStore((s) => s.setGuideOpen);
  const requestFlyTo = useMapStore((s) => s.requestFlyTo);
  const selection = useMapStore((s) => s.selection);

  function bumpZoom(delta: number) {
    requestFlyTo(center.lat, center.lon, Math.min(18, Math.max(2, zoom + delta)));
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:p-4">
      <header className="pointer-events-auto flex flex-col gap-3 md:flex-row md:items-start">
        <div className="chrome-panel flex items-center gap-3 rounded-md px-3 py-2 md:px-4">
          <div>
            <p className="font-display text-lg leading-none text-fg italic">Riparia</p>
            <p className="mt-1 text-[10px] tracking-[0.18em] text-subtle uppercase">
              Waterway atlas
            </p>
          </div>
        </div>
        <div className="chrome-panel min-w-0 flex-1 rounded-md md:max-w-md">
          <SearchBar />
        </div>
        <div className="chrome-panel ml-auto flex items-center gap-1 rounded-md p-1">
          {BASEMAPS.map((b) => (
            <Button
              key={b.id}
              variant="ghost"
              size="sm"
              className={cn("h-9 gap-1.5 px-2.5", basemap === b.id && "bg-elevated text-fg")}
              onClick={() => setBasemap(b.id)}
              aria-pressed={basemap === b.id}
            >
              <b.icon className="size-3.5" />
              <span className="hidden sm:inline">{b.label}</span>
            </Button>
          ))}
          <Button
            variant={guideOpen ? "default" : "ghost"}
            size="sm"
            className="h-9 gap-1.5 px-2.5"
            onClick={() => setGuideOpen(!guideOpen)}
          >
            <BookOpen className="size-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </Button>
        </div>
      </header>

      <div className="pointer-events-auto mt-3 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_FILTERS.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => toggleFilter(kind)}
              className={cn(
                "chrome-panel flex h-9 shrink-0 items-center gap-2 rounded-full px-3 text-xs",
                filters.includes(kind) ? "text-fg" : "text-subtle",
              )}
            >
              <span
                className="size-2 rounded-full"
                style={{
                  background: KIND_COLOR_VAR[kind],
                  opacity: filters.includes(kind) ? 1 : 0.3,
                }}
              />
              {KIND_LABEL[kind]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 items-start gap-3">
        <div className="pointer-events-auto hidden w-56 shrink-0 flex-col gap-2 lg:flex">
          <div className="chrome-panel rounded-md p-3">
            <p className="text-[10px] tracking-[0.14em] text-subtle uppercase">Show</p>
            <ul className="mt-2 space-y-1">
              {ALL_FILTERS.map((kind) => (
                <FilterChip
                  key={kind}
                  kind={kind}
                  on={filters.includes(kind)}
                  onToggle={() => toggleFilter(kind)}
                />
              ))}
            </ul>
          </div>
          {identifying ? (
            <p className="rounded-md border border-border bg-surface/90 px-3 py-2 text-xs text-muted">
              Reading live hydrography…
            </p>
          ) : null}
        </div>

        <div className="min-w-0 flex-1" />

        <div className="pointer-events-auto hidden w-[22rem] shrink-0 flex-col gap-3 xl:flex">
          {guideOpen ? <FieldGuide /> : <IdentifyPanel />}
        </div>
      </div>

      <div className="pointer-events-auto mt-3 flex items-end justify-between gap-3 xl:hidden">
        <div className="min-w-0 flex-1">
          {guideOpen ? <FieldGuide /> : selection || identifying ? <IdentifyPanel /> : (
            <p className="chrome-panel rounded-md px-3 py-2 text-xs text-muted">
              Tap the map to identify a river, lake, or canal.
            </p>
          )}
        </div>
      </div>

      <footer className="pointer-events-none mt-auto flex items-end justify-between gap-3 pt-3">
        <div className="pointer-events-auto chrome-panel hidden max-w-sm rounded-md px-3 py-2 text-[11px] text-muted xl:block">
          Click the map to classify a waterway. Atlas overlay from Natural Earth;
          live tags from OpenStreetMap.
        </div>
        <div className="pointer-events-auto ml-auto flex items-center gap-2">
          <div className="chrome-panel hidden rounded-md px-3 py-2 font-mono text-[11px] text-muted tabular md:block">
            {formatCoord(center.lat, center.lon)} · z{Math.round(zoom)}
          </div>
          <div className="chrome-panel flex overflow-hidden rounded-md">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-none"
              onClick={() => bumpZoom(-1)}
              aria-label="Zoom out"
            >
              <Minus />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-none"
              onClick={() => bumpZoom(1)}
              aria-label="Zoom in"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterChip({
  kind,
  on,
  onToggle,
}: {
  kind: WaterKind;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex h-9 w-full items-center gap-2 rounded-sm px-2 text-left text-sm",
        on ? "text-fg" : "text-subtle",
      )}
    >
      <span
        className="size-2 rounded-full"
        style={{
          background: KIND_COLOR_VAR[kind],
          opacity: on ? 1 : 0.3,
        }}
      />
      {KIND_LABEL[kind]}
    </button>
  );
}
