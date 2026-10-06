import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { KIND_COLOR_VAR, KIND_LABEL, cuesFromTags } from "@/lib/waterways/classify";
import { factForName } from "@/lib/waterways/catalog";
import { GUIDE } from "@/lib/waterways/guide";
import { formatKm, formatCoord } from "@/lib/waterways/geo";
import { useMapStore } from "@/lib/waterways/store";
import { cn } from "@/lib/utils";

export function IdentifyPanel() {
  const selection = useMapStore((s) => s.selection);
  const nearby = useMapStore((s) => s.nearby);
  const identifying = useMapStore((s) => s.identifying);
  const identifyError = useMapStore((s) => s.identifyError);
  const click = useMapStore((s) => s.click);
  const select = useMapStore((s) => s.select);
  const recents = useMapStore((s) => s.recents);
  const requestFlyTo = useMapStore((s) => s.requestFlyTo);

  const fact = factForName(selection?.name);
  const guide = GUIDE.find((g) => g.kind === selection?.kind);
  const cues =
    selection?.osm?.tags
      ? cuesFromTags(selection.kind, selection.osm.tags)
      : guide?.tells.slice(0, 3) ?? [];

  if (!selection && !identifying && !identifyError) {
    return (
      <aside className="chrome-panel hidden w-full rounded-lg p-5 md:block">
        <p className="font-display text-lg text-fg">Identify a waterway</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Click anywhere on the map. Riparia classifies the nearest river, canal,
          lake, reservoir, or wetland from live OpenStreetMap hydrography and the
          world atlas.
        </p>
        {recents.length > 0 ? (
          <div className="mt-4">
            <p className="text-[11px] tracking-[0.14em] text-subtle uppercase">Recent</p>
            <ul className="mt-2 space-y-1">
              {recents.slice(0, 4).map((r) => (
                <li key={`${r.name}-${r.kind}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm hover:bg-elevated"
                    onClick={() => {
                      select(r);
                      requestFlyTo(r.lat, r.lon, 7);
                    }}
                  >
                    <span className="truncate text-fg">{r.name}</span>
                    <span className="ml-2 shrink-0 text-[10px] tracking-wider text-muted uppercase">
                      {KIND_LABEL[r.kind]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    );
  }

  return (
    <aside className="chrome-panel flex max-h-[min(40dvh,22rem)] w-full flex-col rounded-lg xl:max-h-[calc(100dvh-8rem)]">
      <div className="flex items-start justify-between gap-3 p-4 pb-2">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
            {identifying ? "Scanning hydrography" : "Identification"}
          </p>
          <h2 className="font-display mt-1 text-xl leading-tight text-fg">
            {selection?.name ?? "Locating…"}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Clear identification"
          onClick={() => select(null, [])}
        >
          <X />
        </Button>
      </div>
      <ScrollArea className="min-h-0 flex-1 px-4 pb-4">
        {selection ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                style={{
                  color: KIND_COLOR_VAR[selection.kind],
                  background: "color-mix(in oklab, var(--color-elevated) 70%, transparent)",
                  borderColor: "color-mix(in oklab, currentColor 35%, transparent)",
                }}
              >
                {KIND_LABEL[selection.kind]}
              </Badge>
              <span className="text-xs text-muted">
                {selection.source === "osm" ? "Live map" : selection.source === "atlas" ? "World atlas" : "Search"}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {selection.region && !fact?.countries ? (
                <Stat label="Region" value={selection.region} wide />
              ) : null}
              {click ? (
                <Stat label="Fix" value={formatCoord(click.lat, click.lon)} wide />
              ) : null}
              {selection.distanceM != null && selection.distanceM > 0 ? (
                <Stat label="Distance" value={formatKm(selection.distanceM)} />
              ) : null}
              {fact?.lengthKm ? (
                <Stat label="Length" value={`${fact.lengthKm.toLocaleString()} km`} />
              ) : null}
              {fact?.dischargeM3s ? (
                <Stat
                  label="Discharge"
                  value={`${fact.dischargeM3s.toLocaleString()} m³/s`}
                />
              ) : null}
              {fact?.basin ? <Stat label="Basin" value={fact.basin} /> : null}
              {fact?.source ? <Stat label="Source" value={fact.source} /> : null}
              {fact?.mouth ? <Stat label="Mouth" value={fact.mouth} /> : null}
              {fact?.countries ? (
                <Stat label="Countries" value={fact.countries} wide />
              ) : null}
            </dl>

            {fact?.summary ? (
              <p className="text-sm leading-relaxed text-muted">{fact.summary}</p>
            ) : guide ? (
              <p className="text-sm leading-relaxed text-muted">{guide.summary}</p>
            ) : null}

            {fact?.note ? (
              <p className="text-sm leading-relaxed text-fg/90">{fact.note}</p>
            ) : null}

            {cues.length > 0 ? (
              <section>
                <h3 className="text-[11px] tracking-[0.14em] text-subtle uppercase">
                  Why this class
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {cues.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-muted">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {guide ? (
              <section>
                <h3 className="text-[11px] tracking-[0.14em] text-subtle uppercase">
                  Satellite tells
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {guide.satellite.map((c) => (
                    <li key={c} className="text-sm text-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {nearby.filter((h) => h.name !== selection.name).length > 0 ? (
              <section>
                <Separator className="mb-3" />
                <h3 className="text-[11px] tracking-[0.14em] text-subtle uppercase">
                  Nearby water
                </h3>
                <ul className="mt-2 space-y-1">
                  {nearby
                    .filter((h) => h.name !== selection.name)
                    .slice(0, 5)
                    .map((h) => (
                      <li key={h.id}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-sm px-1 py-1.5 text-left hover:bg-elevated"
                          onClick={() =>
                            select({
                              name: h.name,
                              kind: h.kind,
                              lat: h.lat,
                              lon: h.lon,
                              source: "osm",
                              osm: h,
                              distanceM: h.distanceM,
                              geometry: h.geometry,
                              region: selection.region,
                            })
                          }
                        >
                          <span className="truncate text-sm text-fg">{h.name}</span>
                          <span className="ml-2 shrink-0 font-mono text-[10px] text-muted uppercase">
                            {KIND_LABEL[h.kind]}
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted">
            {identifyError ?? "Reading water features around this point."}
          </p>
        )}
        {identifyError && selection ? (
          <p className={cn("mt-3 text-xs text-warn")}>{identifyError}</p>
        ) : null}
      </ScrollArea>
    </aside>
  );
}

function Stat({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="text-[10px] tracking-[0.12em] text-subtle uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm text-fg">{value}</dd>
    </div>
  );
}
