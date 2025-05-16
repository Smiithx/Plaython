"use client";

import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HorizontalScrollProps {
  children: React.ReactNode;
}
gsap.registerPlugin(ScrollTrigger);
const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  ({ children }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const container = containerRef.current;
      const horizontalSection = container?.querySelector(".section-horizontal");
      const panels = gsap.utils.toArray(".panel");

      if (horizontalSection && panels.length > 1) {
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            start: "top top",
            end: () => "+=" + horizontalSection.offsetWidth * panels.length,
            anticipatePin: 1,
          },
        });
      }

      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }, []);
    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          containerRef.current = node;
        }}
        className="overflow-hidden"
      >
        {children}
      </div>
    );
  }
);

HorizontalScroll.displayName = "HorizontalScroll";

export default HorizontalScroll;

gsap.registerPlugin(ScrollTrigger);
