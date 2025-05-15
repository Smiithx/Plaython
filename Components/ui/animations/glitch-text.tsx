"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);

  // Characters for glitch effect
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

  // Trigger glitch effect randomly
  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);

        // Generate glitched text
        let iterations = 0;
        const interval = setInterval(() => {
          setGlitchText(
            children
              .split("")
              .map((char, index) => {
                if (char === " ") return " ";

                // Keep original character if iteration is done for this position
                if (index < iterations) {
                  return children[index];
                }

                // Replace with random character
                return glitchChars[
                  Math.floor(Math.random() * glitchChars.length)
                ];
              })
              .join("")
          );

          // Stop when all characters are back to original
          if (iterations >= children.length) {
            clearInterval(interval);
            setGlitchText(children);
            setIsGlitching(false);
          }

          iterations += 1 / 3;
        }, 30);
      }
    };

    // Initial glitch
    triggerGlitch();

    // Random glitches
    const glitchInterval = setInterval(
      triggerGlitch,
      2000 + Math.random() * 2000
    );

    return () => clearInterval(glitchInterval);
  }, [children]);

  return (
    <div className="relative">
      {/* Base text */}
      <motion.h1
        className={cn(
          "relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300",
          className
        )}
        animate={{
          x: isGlitching ? [0, -2, 3, -1, 0] : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {glitchText}
      </motion.h1>

      {/* Glitch layers */}
      <motion.h1
        className={cn(
          "absolute top-0 left-0 z-0 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500 opacity-70",
          className
        )}
        animate={{
          x: isGlitching ? [0, 2, -1, 3, 0] : 0,
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        {glitchText}
      </motion.h1>

      <motion.h1
        className={cn(
          "absolute top-0 left-0 z-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70",
          className
        )}
        animate={{
          x: isGlitching ? [0, -3, 1, -2, 0] : 0,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {glitchText}
      </motion.h1>
    </div>
  );
}
