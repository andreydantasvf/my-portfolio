'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { clsx } from 'clsx';

export function Cursor() {
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center offset
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(0.8)';
    };

    const handleMouseUp = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  // Trails logic could be complex canvas, using CSS particles for simplicity
  // A simplified single element cursor for now to ensure performance

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return null; // Hide on touch devices
  }

  return (
    <motion.div
      ref={cursorRef}
      className={clsx(
        'pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full mix-blend-difference',
        !isVisible && 'opacity-0',
        theme === 'zeus' && 'bg-yellow-400/80 shadow-[0_0_20px_#fbbf24]',
        theme === 'poseidon' &&
          'bg-cyan-400/80 shadow-[0_0_20px_#22d3ee] backdrop-blur-sm',
        theme === 'hades' &&
          'bg-red-600/80 shadow-[0_0_20px_#dc2626] blur-[2px]'
      )}
      style={{
        x: cursorX,
        y: cursorY
      }}
    >
      {/* Inner detail */}
      <div
        className={clsx(
          'absolute inset-0 animate-ping rounded-full opacity-50',
          theme === 'zeus' && 'bg-yellow-200',
          theme === 'poseidon' && 'bg-white',
          theme === 'hades' && 'bg-purple-900'
        )}
      />
    </motion.div>
  );
}
