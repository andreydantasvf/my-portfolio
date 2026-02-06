'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Zap, Waves, Ghost } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function DivineToggle() {
  const { theme, setTheme } = useTheme();

  const artifacts = [
    {
      id: 'zeus',
      icon: Zap,
      label: 'Zeus',
      color: 'text-yellow-500', // Hardcoded fallback or use theme vars
      bgActive: 'bg-yellow-500/20'
    },
    {
      id: 'poseidon',
      icon: Waves,
      label: 'Poseidon',
      color: 'text-cyan-500',
      bgActive: 'bg-cyan-500/20'
    },
    {
      id: 'hades',
      icon: Ghost,
      label: 'Hades',
      color: 'text-purple-500',
      bgActive: 'bg-purple-500/20'
    }
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-black/20 px-6 py-3 shadow-2xl backdrop-blur-md"
    >
      {artifacts.map(artifact => {
        const isActive = theme === artifact.id;
        const Icon = artifact.icon;

        return (
          <button
            key={artifact.id}
            onClick={() => {
              if (theme !== artifact.id) {
                setTheme(artifact.id as any);
                setTimeout(() => window.location.reload(), 100);
              }
            }}
            className={twMerge(
              'group relative rounded-full p-3 transition-all duration-300',
              isActive ? artifact.bgActive : 'hover:bg-white/5'
            )}
            aria-label={`Switch to ${artifact.label} theme`}
          >
            <Icon
              className={twMerge(
                'h-6 w-6 transition-all duration-300',
                isActive
                  ? artifact.color
                  : 'text-gray-400 group-hover:text-white',
                isActive && 'scale-110 drop-shadow-[0_0_8px_currentColor]'
              )}
            />
            {isActive && (
              <motion.span
                layoutId="active-glow"
                className="absolute inset-0 rounded-full ring-2 ring-white/20"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}
