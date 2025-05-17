// Components/AnimatedText.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
export default function AnimatedText() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Empieza al entrar y termina al salir
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        style={{ opacity, y }}
        className="text-transparent bg-clip-text bg-gradient-to-r from-[#107C10] to-[#52B043]"
      >
        Programadores
      </motion.span>
    </span>
  );
}
