'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Send } from 'lucide-react';

export function Contact() {
  const { theme } = useTheme();

  return (
    <section className="relative py-20">
      <div className="relative z-10 container mx-auto max-w-4xl px-6">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-bold md:text-5xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            O Oráculo
          </h2>
          <p className="opacity-70">Envie sua mensagem aos deuses</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={clsx(
            'rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-md md:p-12',
            theme === 'zeus' && 'bg-white/40 shadow-yellow-500/5',
            theme === 'poseidon' && 'bg-cyan-900/20 shadow-cyan-500/5',
            theme === 'hades' && 'bg-black/40 shadow-red-900/5'
          )}
        >
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm tracking-wider uppercase opacity-70">
                Nome
              </label>
              <input
                type="text"
                placeholder="Seu nome mortal"
                className="w-full rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none dark:bg-white/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm tracking-wider uppercase opacity-70">
                Email
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none dark:bg-white/5"
              />
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-sm tracking-wider uppercase opacity-70">
              Mensagem
            </label>
            <textarea
              rows={4}
              placeholder="Sua oferenda ou dúvida..."
              className="w-full resize-none rounded-lg border border-current/10 bg-black/5 p-3 ring-current/20 transition-all focus:ring-2 focus:outline-none dark:bg-white/5"
            />
          </div>

          <button
            type="button"
            className={clsx(
              'flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold tracking-widest uppercase transition-all hover:scale-[1.02]',
              theme === 'zeus' &&
                'bg-yellow-500 text-black hover:bg-yellow-400',
              theme === 'poseidon' &&
                'bg-cyan-500 text-black hover:bg-cyan-400',
              theme === 'hades' && 'bg-red-800 text-white hover:bg-red-700'
            )}
          >
            <Send size={20} />
            Enviar Oferenda
          </button>
        </motion.form>
      </div>
    </section>
  );
}
