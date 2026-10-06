import { lazy, Suspense } from "react";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { AppChrome } from "@/components/app-chrome";

const WaterMap = lazy(() => import("@/components/map/water-map"));

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="relative h-dvh overflow-hidden bg-bg text-fg">
      <ClientOnly fallback={<MapFallback />}>
        <Suspense fallback={<MapFallback />}>
          <WaterMap />
        </Suspense>
      </ClientOnly>
      <AppChrome />
    </main>
  );
}

function MapFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-bg">
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-x-0 top-1/3 h-px bg-accent/20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-accent/10" />
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
        <p className="font-display text-2xl text-fg italic">Riparia</p>
        <p className="mt-2 text-sm text-muted">Charting waterways…</p>
      </div>
    </div>
  );
}
