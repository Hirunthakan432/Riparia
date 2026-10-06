import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchAtlas, featureBounds, featureCentroid } from "@/lib/waterways/atlas";
import { atlasKindToWater, KIND_LABEL } from "@/lib/waterways/classify";
import { searchNominatim } from "@/lib/waterways/identify-fn";
import { useMapStore } from "@/lib/waterways/store";
import type { SearchHit } from "@/lib/waterways/types";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const atlas = useMapStore((s) => s.atlas);
  const select = useMapStore((s) => s.select);
  const requestFit = useMapStore((s) => s.requestFit);
  const requestFlyTo = useMapStore((s) => s.requestFlyTo);
  const setClick = useMapStore((s) => s.setClick);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [remote, setRemote] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const local = useMemo(() => {
    if (!atlas || q.trim().length < 2) return [];
    return searchAtlas(atlas, q, 7).map((f) => {
      const c = featureCentroid(f);
      return {
        id: f.id,
        source: "atlas" as const,
        name: f.name,
        kind: atlasKindToWater(f.kind),
        lat: c.lat,
        lon: c.lon,
        subtitle: f.alt || f.native || KIND_LABEL[atlasKindToWater(f.kind)],
        atlasId: f.id,
      } satisfies SearchHit;
    });
  }, [atlas, q]);

  useEffect(() => {
    if (q.trim().length < 3) {
      setRemote([]);
      return;
    }
    const t = setTimeout(() => {
      setLoading(true);
      searchNominatim({ data: { q: q.trim() } })
        .then(setRemote)
        .catch(() => setRemote([]))
        .finally(() => setLoading(false));
    }, 320);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const combined = useMemo(() => {
    const seen = new Set<string>();
    const out: SearchHit[] = [];
    for (const h of [...local, ...remote]) {
      const key = h.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(h);
    }
    return out.slice(0, 8);
  }, [local, remote]);

  function pick(hit: SearchHit) {
    setQ(hit.name);
    setOpen(false);
    setClick(hit.lat, hit.lon);
    const atlasFeat =
      hit.atlasId && atlas
        ? (atlas.rivers.find((r) => r.id === hit.atlasId) ??
          atlas.lakes.find((r) => r.id === hit.atlasId))
        : undefined;
    select({
      name: hit.name,
      kind: hit.kind,
      lat: hit.lat,
      lon: hit.lon,
      source: hit.source === "atlas" ? "atlas" : "search",
      atlasId: hit.atlasId,
      region: hit.subtitle,
    });
    if (atlasFeat) {
      const b = featureBounds(atlasFeat);
      if (b) requestFit(b);
      else requestFlyTo(hit.lat, hit.lon, 6);
    } else {
      requestFlyTo(hit.lat, hit.lon, 10);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
      <Input
        ref={inputRef}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search a waterway"
        className="h-11 rounded-md border-0 bg-transparent pr-10 pl-10 shadow-none focus-visible:ring-0"
        aria-label="Search waterways"
      />
      {q ? (
        <button
          type="button"
          className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center text-subtle hover:text-fg"
          onClick={() => {
            setQ("");
            setRemote([]);
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-xs border border-border px-1.5 font-mono text-[10px] text-subtle md:inline">
          /
        </kbd>
      )}
      {open && (combined.length > 0 || loading) ? (
        <ul className="chrome-panel absolute top-[calc(100%+8px)] right-0 left-0 z-30 overflow-hidden rounded-md py-1">
          {loading && combined.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">Searching hydrography…</li>
          ) : null}
          {combined.map((hit) => (
            <li key={hit.id}>
              <button
                type="button"
                onClick={() => pick(hit)}
                className={cn(
                  "flex w-full items-start gap-3 px-3 py-2.5 text-left hover:bg-elevated",
                )}
              >
                <span className="mt-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
                  {KIND_LABEL[hit.kind]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-fg">{hit.name}</span>
                  {hit.subtitle ? (
                    <span className="block truncate text-xs text-muted">{hit.subtitle}</span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
