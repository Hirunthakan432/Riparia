import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GUIDE, SPOTTER } from "@/lib/waterways/guide";
import { KIND_COLOR_VAR, KIND_LABEL } from "@/lib/waterways/classify";
import { useMapStore } from "@/lib/waterways/store";
import { cn } from "@/lib/utils";

export function FieldGuide() {
  const open = useMapStore((s) => s.guideOpen);
  const setOpen = useMapStore((s) => s.setGuideOpen);
  const [tab, setTab] = useState<"types" | "spotter">("types");
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  if (!open) return null;

  const q = SPOTTER[qIndex];
  const revealed = picked !== null;

  return (
    <div className="chrome-panel panel-enter flex max-h-[min(52dvh,32rem)] w-full flex-col rounded-lg xl:max-h-[calc(100dvh-8rem)]">
      <div className="flex items-start justify-between gap-3 p-4 pb-2">
        <div>
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
            Field guide
          </p>
          <h2 className="font-display mt-1 text-xl text-fg">How to read water</h2>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)} aria-label="Close guide">
          <X />
        </Button>
      </div>
      <div className="mx-4 flex gap-1 rounded-sm bg-elevated p-1">
        <button
          type="button"
          className={cn(
            "h-8 flex-1 rounded-xs text-xs font-medium",
            tab === "types" ? "bg-surface text-fg" : "text-muted",
          )}
          onClick={() => setTab("types")}
        >
          Types
        </button>
        <button
          type="button"
          className={cn(
            "h-8 flex-1 rounded-xs text-xs font-medium",
            tab === "spotter" ? "bg-surface text-fg" : "text-muted",
          )}
          onClick={() => setTab("spotter")}
        >
          Spotter
        </button>
      </div>
      <ScrollArea className="min-h-0 flex-1 p-4">
        {tab === "types" ? (
          <ul className="space-y-3">
            {GUIDE.map((g) => (
              <li key={g.kind} className="rounded-md border border-border bg-elevated/50 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: KIND_COLOR_VAR[g.kind] }}
                  />
                  <h3 className="text-sm font-medium text-fg">{g.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.summary}</p>
                <p className="mt-2 text-[10px] tracking-[0.12em] text-subtle uppercase">
                  From satellite
                </p>
                <ul className="mt-1 space-y-1">
                  {g.satellite.map((s) => (
                    <li key={s} className="text-xs text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-sm leading-relaxed text-fg">{q.prompt}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(["river", "canal", "reservoir", "oxbow", "alkaline", "delta"] as const).map(
                (k) => {
                  const correct = revealed && k === q.answer;
                  const wrong = revealed && picked === k && k !== q.answer;
                  return (
                    <button
                      key={k}
                      type="button"
                      disabled={revealed}
                      onClick={() => setPicked(k)}
                      className={cn(
                        "rounded-sm border px-3 py-2 text-left text-sm",
                        correct
                          ? "border-accent bg-accent/15 text-fg"
                          : wrong
                            ? "border-danger/50 text-danger"
                            : "border-border text-muted hover:border-border-strong hover:text-fg",
                      )}
                    >
                      {KIND_LABEL[k]}
                    </button>
                  );
                },
              )}
            </div>
            {revealed ? (
              <div className="mt-4">
                <Badge>{picked === q.answer ? "Correct" : "Look again"}</Badge>
                <p className="mt-2 text-sm leading-relaxed text-muted">{q.why}</p>
                <Button
                  className="mt-4"
                  variant="secondary"
                  onClick={() => {
                    setPicked(null);
                    setQIndex((i) => (i + 1) % SPOTTER.length);
                  }}
                >
                  Next tell
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
