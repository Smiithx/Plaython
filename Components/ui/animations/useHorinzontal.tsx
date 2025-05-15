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

//   if (introComplete && containerRef.current) {
//     const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");

//     gsap.to(sections, {
//       xPercent: -100 * (sections.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: containerRef.current,
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//         end: () =>
//           "+=" + containerRef.current.offsetWidth * (sections.length - 1),
//       },
//     });
//   }
// useEffect(() => {
//   const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");

//   sections.forEach((section) => {
//     const inner = section.querySelector(".scroll-inner");
//     if (!inner) return;

//     const scrollWidth = inner.scrollWidth;
//     const containerWidth = section.offsetWidth;

//     if (scrollWidth > containerWidth) {
//       gsap.to(inner, {
//         x: () => -(scrollWidth - containerWidth),
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: () => `+=${scrollWidth - containerWidth}`,
//           scrub: true,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     }
//   });

//   return () => ScrollTrigger.getAll().forEach((t) => t.kill());
// }, []);
// useEffect(() => {
//   const handleWheel = (event: WheelEvent) => {
//     if (containerRef.current) {
//       event.preventDefault();
//       containerRef.current.scrollLeft += event.deltaY;
//     }
//   };

//   const container = containerRef.current;
//   if (container) {
//     container.addEventListener("wheel", handleWheel, { passive: false });
//   }

//   return () => {
//     if (container) {
//       container.removeEventListener("wheel", handleWheel);
//     }
//   };
// }, []);

// const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
//   ({ children }, ref) => {
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//       const handleWheel = (event: WheelEvent) => {
//         const el = containerRef.current;
//         if (!el) return;

//         const hasHorizontalOverflow = el.scrollWidth > el.clientWidth;
//         const hasVerticalOverflow = el.scrollHeight > el.clientHeight;

//         // Scroll horizontal si hay overflow horizontal, y no estamos intentando scroll verticalmente
//         if (
//           hasHorizontalOverflow &&
//           Math.abs(event.deltaY) > Math.abs(event.deltaX)
//         ) {
//           event.preventDefault();
//           el.scrollLeft += event.deltaY;
//         }
//       };

//       const el = containerRef.current;
//       if (el) {
//         el.addEventListener("wheel", handleWheel, { passive: false });
//       }

//       return () => {
//         if (el) {
//           el.removeEventListener("wheel", handleWheel);
//         }
//       };
//     }, []);

//     return (
//       <div
//         ref={(node) => {
//           if (typeof ref === "function") {
//             ref(node);
//           } else if (ref) {
//             ref.current = node;
//           }
//           containerRef.current = node;
//         }}
//         className="overflow-auto"
//       >
//         {children}
//       </div>
//     );
//   }
// );
