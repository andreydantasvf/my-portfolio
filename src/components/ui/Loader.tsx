'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Anchor, Skull } from 'lucide-react';
import { clsx } from 'clsx';

export function Loader() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading time or wait for window load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds introduction

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={clsx(
            'fixed inset-0 z-[10000] flex items-center justify-center transition-colors duration-500',
            theme === 'zeus'
              ? 'bg-[#fdfbf7]'
              : theme === 'poseidon'
                ? 'bg-[#001020]'
                : 'bg-[#0a0a0a]'
          )}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {theme === 'zeus' && (
              <div className="flex flex-col items-center gap-4 text-[#d4af37]">
                <Zap size={64} className="animate-pulse" />
                <span className="font-serif text-2xl tracking-[0.5em] uppercase">
                  Olimpo
                </span>
              </div>
            )}
            {theme === 'poseidon' && (
              <div className="flex flex-col items-center gap-4 text-[#00ffff]">
                <Anchor size={64} className="animate-bounce" />
                <span className="font-serif text-2xl tracking-[0.5em] uppercase">
                  Atlântida
                </span>
              </div>
            )}
            {theme === 'hades' && (
              <div className="flex flex-col items-center gap-4 text-[#8B0000]">
                <Skull size={64} className="animate-pulse" />
                <span className="font-serif text-2xl tracking-[0.5em] uppercase">
                  Submundo
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
