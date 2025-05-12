"use client";

import { Cursor, useTypewriter } from "react-simple-typewriter";

interface TypewriterProps {
  phrases: string[];
  loop?: boolean;
  delaySpeed?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  className?: string;
}

export const CustomTypewriter: React.FC<TypewriterProps> = ({
  phrases,
  loop = true,
  delaySpeed = 2000,
  typeSpeed = 60,
  deleteSpeed = 50,
  className = "",
}) => {
  const [text] = useTypewriter({
    words: phrases,
    loop,
    delaySpeed,
    typeSpeed,
    deleteSpeed,
  });

  return (
    <span className={className}>
      {text}
      <Cursor />
    </span>
  );
};
