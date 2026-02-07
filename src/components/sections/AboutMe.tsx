'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Code, Heart } from 'lucide-react';
import ElectricBorder from '../ui/ElectricBorder';
import Image from 'next/image';

export function AboutMe() {
  const { theme } = useTheme();

  return (
    <section className="relative overflow-hidden py-20">
      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-bold md:text-5xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            A Lenda
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-current opacity-50" />
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Col: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={clsx(
              'space-y-6 rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm',
              theme === 'zeus' &&
                'bg-white/60 text-gray-800 shadow-yellow-500/10',
              theme === 'poseidon' &&
                'bg-cyan-900/40 text-cyan-50 shadow-cyan-500/10',
              theme === 'hades' && 'bg-black/60 text-gray-300 shadow-red-500/10'
            )}
          >
            <p className="text-lg leading-relaxed">
              Saudações, mortal. Sou Andrey Dantas, um artesão digital forjado
              no calor do código e na lógica dos algoritmos. Minha jornada
              começou não com espadas, mas com sintaxe.
            </p>
            <p className="text-lg leading-relaxed">
              Especializado em <strong>Full Stack Development</strong>,
              transformo ideias etéreas em aplicações sólidas e escaláveis.
              Assim como Hefesto forjava as armas dos deuses, eu construo
              experiências web performáticas e visualmente impactantes.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2 opacity-80">
                <Code size={20} />
                <span>Arquiteto de Software</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Heart size={20} />
                <span>Apaixonado por UX</span>
              </div>
            </div>
          </motion.div>

          {/* Right Col: Visual Representation (Placeholder for Gemini Image or stylized stats) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex h-100 items-center justify-center p-8"
          >
            <div
              className={clsx(
                'absolute inset-0 rounded-full opacity-20 blur-[100px]',
                theme === 'zeus' && 'bg-yellow-500',
                theme === 'poseidon' && 'bg-cyan-500',
                theme === 'hades' && 'bg-red-600'
              )}
            />

            {theme === 'zeus' ? (
              <ElectricBorder
                color="#d4af37"
                speed={1}
                chaos={0.12}
                style={{ borderRadius: 12, width: 288, height: 288 }}
              >
                <div
                  className={clsx(
                    'relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-xl border-4 border-yellow-500/30'
                  )}
                >
                  <Image
                    src="/andrey-zeus.png"
                    alt="Andrey como Zeus"
                    width={288}
                    height={288}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </ElectricBorder>
            ) : theme === 'poseidon' ? (
              <div
                className={clsx(
                  'relative flex h-72 w-72 items-center justify-center overflow-hidden rounded-3xl border-4 border-cyan-500/30'
                )}
              >
                <Image
                  src="/andrey-poseidon.png"
                  alt="Andrey como Poseidon"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            ) : (
              <div
                className={clsx(
                  'relative flex h-72 w-72 rotate-6 items-center justify-center overflow-hidden rounded-none border-4 border-red-900/30'
                )}
              >
                <Image
                  src="/andrey-hades.png"
                  alt="Andrey como Hades"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
