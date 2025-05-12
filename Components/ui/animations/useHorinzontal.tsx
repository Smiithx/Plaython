"use client";

import type React from "react";
import { forwardRef, useEffect, useRef } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  ({ children }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        if (containerRef.current) {
          event.preventDefault();
          containerRef.current.scrollLeft += event.deltaY;
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }

      return () => {
        if (container) {
          container.removeEventListener("wheel", handleWheel);
        }
      };
    }, []);

    return (
      <div
        ref={(node) => {
          // Assign the ref to both the forwarded ref and the local ref
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          containerRef.current = node;
        }}
        className="flex overflow-x-hidden"
      >
        {children}
      </div>
    );
  }
);

HorizontalScroll.displayName = "HorizontalScroll";

export default HorizontalScroll;
