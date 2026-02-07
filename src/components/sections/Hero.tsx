'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

const GreekBust = dynamic(
  () => import('../3d/GreekBust').then(mod => mod.GreekBust),
  { ssr: false }
);
const LightningCanvas = dynamic(
  () => import('../effects/LightningCanvas').then(mod => mod.LightningCanvas),
  { ssr: false }
);
import { motion, Variants } from 'framer-motion';

export function Hero() {
  const { theme } = useTheme();

  // Theme-specific styling
  const getThemeStyles = () => {
    switch (theme) {
      case 'zeus':
        return {
          titleColor: 'var(--zeus-fg)',
          titleShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
          subtitleColor: '#5a5a5a',
          containerBg: 'bg-white/15',
          containerBorder: 'border-yellow-500/20',
          accentGlow: 'drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]'
        };
      case 'poseidon':
        return {
          titleColor: 'var(--poseidon-fg)',
          titleShadow:
            '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
          subtitleColor: '#80deea',
          containerBg: 'bg-cyan-950/20',
          containerBorder: 'border-cyan-500/30',
          accentGlow: 'drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]'
        };
      case 'hades':
        return {
          titleColor: 'var(--hades-fg)',
          titleShadow:
            '0 0 30px rgba(255, 61, 0, 0.4), 0 0 60px rgba(255, 61, 0, 0.15)',
          subtitleColor: '#ef9a9a',
          containerBg: 'bg-black/30',
          containerBorder: 'border-red-900/30',
          accentGlow: 'drop-shadow-[0_0_15px_rgba(255,61,0,0.4)]'
        };
      default:
        return {
          titleColor: 'var(--foreground)',
          titleShadow: 'none',
          subtitleColor: '#cccccc',
          containerBg: 'bg-black/10',
          containerBorder: 'border-white/10',
          accentGlow: ''
        };
    }
  };

  const styles = getThemeStyles();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  } as Variants;

  const titleVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: 'easeOut' }
    }
  } as Variants;

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 }
    }
  } as Variants;

  const decorativeLineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' }
    }
  } as Variants;

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <GreekBust />
      <LightningCanvas />

      {/* Content Overlay */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative z-10 mx-4 flex max-w-4xl flex-col items-center justify-center rounded-3xl border ${styles.containerBorder} ${styles.containerBg} p-8 text-center shadow-2xl backdrop-blur-lg transition-all duration-700 md:p-12`}
      >
        {/* Decorative Top Line */}
        <motion.div
          variants={decorativeLineVariants}
          className="mb-6 h-0.5 w-24 origin-center rounded-full md:w-32"
          style={{
            background: `linear-gradient(90deg, transparent, var(--primary), transparent)`
          }}
        />

        <motion.h1
          variants={titleVariants}
          className={`mb-4 text-4xl font-bold tracking-tight md:text-7xl ${styles.accentGlow}`}
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            color: styles.titleColor,
            textShadow: styles.titleShadow
          }}
        >
          Andrey Dantas
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          className="mb-2 text-base font-light tracking-[0.25em] uppercase md:text-xl"
          style={{ color: styles.subtitleColor }}
        >
          Desenvolvedor Full Stack
        </motion.p>

        {/* Decorative Bottom Line */}
        <motion.div
          variants={decorativeLineVariants}
          className="mt-6 h-0.5 w-24 origin-center rounded-full md:w-32"
          style={{
            background: `linear-gradient(90deg, transparent, var(--primary), transparent)`
          }}
        />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="h-6 w-4 rounded-full border-2 opacity-50"
            style={{ borderColor: 'var(--primary)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut'
              }}
              className="mx-auto mt-1 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
