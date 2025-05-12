"use client";
import { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const Progress = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
  }
>(({ className = "", value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-slate-800 ${className}`}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform"
      style={{
        transform: `translateX(-${100 - Math.min(Math.max(value, 0), 100)}%)`,
      }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

export { Progress };
