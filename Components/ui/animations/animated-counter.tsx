"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({ to }: { to: number }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 1, stiffness: 100, damping: 20 });
  const rounded = useTransform(spring, (val) => Math.floor(val));

  useEffect(() => {
    count.set(to);
  }, [to, count]);

  return <motion.span>{rounded}</motion.span>;
}
