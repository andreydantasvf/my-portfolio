'use client';

import React from 'react';
import { GreekBust } from '../3d/GreekBust';
import { LightningCanvas } from '../effects/LightningCanvas';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <GreekBust />
      <LightningCanvas />

      {/* Content Overlay */}
      <div className="relative z-10 skew-y-0 rounded-3xl border border-white/10 bg-black/5 p-8 text-center shadow-2xl backdrop-blur-sm dark:bg-white/5">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-4 text-6xl font-bold tracking-tighter md:text-8xl"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            color: theme === 'zeus' ? '#1a1a1a' : '#fdfbf7',
            textShadow: theme === 'poseidon' ? '0 0 20px #00ffff' : 'none'
          }}
        >
          Andrey Dantas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl font-light tracking-wide uppercase md:text-2xl"
          style={{ color: theme === 'zeus' ? '#4a4a4a' : '#cccccc' }}
        >
          Desenvolvedor Full Stack
        </motion.p>
      </div>
    </section>
  );
}
