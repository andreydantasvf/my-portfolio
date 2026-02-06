'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function LightningCanvas() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== 'zeus') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let lightning: any[] = [];
    let animationId: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    class Bolt {
      x: number;
      y: number;
      segments: { x: number; y: number }[];
      alpha: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = 0;
        this.segments = [{ x: this.x, y: this.y }];
        this.alpha = 1;

        let currX = this.x;
        let currY = this.y;

        while (currY < h) {
          currX += (Math.random() - 0.5) * 50; // Jitter x
          currY += Math.random() * 20 + 10; // Advance y
          this.segments.push({ x: currX, y: currY });

          // Chance to branch logic omitted for simplicity and performance,
          // keeping it a single jagged line for now.
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
      }

      update() {
        this.alpha -= 0.05; // Fade out speed
      }
    }

    const loop = () => {
      // Clear with slight fade for trail effect or strictly clear?
      // Strictly clear for crisp lightning.
      ctx.clearRect(0, 0, w, h);

      // Random chance to spawn lightning
      if (Math.random() > 0.98) {
        lightning.push(new Bolt());
        // Flash background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = lightning.length - 1; i >= 0; i--) {
        lightning[i].update();
        lightning[i].draw();
        if (lightning[i].alpha <= 0) {
          lightning.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  if (theme !== 'zeus') return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 mix-blend-screen"
    />
  );
}
