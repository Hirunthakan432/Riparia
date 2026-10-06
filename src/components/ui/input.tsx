import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-sm border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
