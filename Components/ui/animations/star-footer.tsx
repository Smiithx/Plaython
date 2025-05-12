"use client";

import { useEffect, useRef } from "react";

interface StarFieldProps {
  small?: boolean;
}

export default function StarField({ small = false }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = small ? 300 : window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create stars
    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
    }[] = [];
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }[] = [];

    const createStars = () => {
      stars.length = 0;
      const starCount = small ? 100 : 200;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: 0.1 + Math.random() * 0.3,
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3),
          length: 80 + Math.random() * 70,
          speed: 10 + Math.random() * 10,
          opacity: 1,
        });
      }
    };

    createStars();

    // Animation loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Twinkle effect
        star.opacity = Math.abs(Math.sin(Date.now() * star.speed * 0.001));
      });

      // Draw shooting stars
      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Move shooting star
        star.x -= star.speed;
        star.y += star.speed;
        star.opacity -= 0.01;

        // Remove if out of bounds or faded
        if (star.x < 0 || star.y > canvas.height || star.opacity <= 0) {
          shootingStars.splice(index, 1);
        }
      });

      // Randomly create shooting stars
      if (Math.random() < 0.005) {
        createShootingStar();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [small]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${small ? "h-[300px]" : "h-full"}`}
    />
  );
}
