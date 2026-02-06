'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { projects } from '@/utils/myProjects';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const { theme } = useTheme();
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card: any, i) => {
        let animationVars: gsap.TweenVars = {
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        };

        // Theme specific animations (can be dynamic, but initial load logic is simpler)
        // We'll rely on CSS + GSAP triggers.
        // Actually, let's make it simpler: GSAP handles the trigger, CSS handles the style/theme.

        // Base animation: Slide up + fade
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
            // markers: true, // for debugging
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, componentRef);

    return () => ctx.revert();
  }, [theme]); // Re-run if theme changes to potentially adjust effects? Actually standard scroll is enough.

  return (
    <section
      ref={componentRef}
      className="relative min-h-screen overflow-hidden py-20"
    >
      {/* Background Title / Watermark */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-5">
        <h2 className="font-serif text-[10rem] font-bold tracking-widest text-current uppercase">
          ODISSEIA
        </h2>
      </div>

      <div className="relative z-10 container">
        <div className="mb-20 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-bold md:text-6xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            Os 12 Trabalhos
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-current" />
        </div>

        {/* Timeline Line */}
        <div className="absolute top-40 bottom-20 left-1/2 hidden w-px bg-current opacity-20 md:block" />

        <div className="space-y-20 md:space-y-40">
          {projects.map((project, index) => (
            <div
              key={index}
              className={clsx(
                'project-card relative flex flex-col items-center gap-8 md:flex-row',
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              )}
            >
              {/* Content */}
              <div
                className={clsx(
                  'flex-1 rounded-2xl border border-white/10 p-6 shadow-xl backdrop-blur-md transition-colors duration-500 md:p-10',
                  theme === 'zeus' &&
                    'border-yellow-500/20 bg-white/50 hover:border-yellow-500/50',
                  theme === 'poseidon' &&
                    'border-cyan-500/20 bg-cyan-900/30 hover:border-cyan-500/50',
                  theme === 'hades' &&
                    'border-red-900/20 bg-black/50 hover:border-red-500/50'
                )}
              >
                <h3 className="mb-4 font-serif text-2xl font-bold md:text-3xl">
                  {project.title}
                </h3>
                <p className="mb-6 leading-relaxed opacity-80">
                  {project.details}
                </p>

                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 opacity-70 transition-opacity hover:underline hover:opacity-100"
                    >
                      <Github size={20} /> Code
                    </a>
                  )}
                  {project.webLink && (
                    <a
                      href={project.webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 opacity-70 transition-opacity hover:underline hover:opacity-100"
                    >
                      <ExternalLink size={20} /> Live
                    </a>
                  )}
                </div>
              </div>

              {/* Image / Artifact */}
              <div className="group perspective-1000 w-full max-w-xl flex-1">
                <div
                  className={clsx(
                    'relative aspect-video transform overflow-hidden rounded-xl shadow-2xl transition-all duration-700 group-hover:scale-105',
                    theme === 'zeus' && 'shadow-yellow-500/20',
                    theme === 'poseidon' &&
                      'shadow-cyan-500/20 group-hover:rotate-1',
                    theme === 'hades' &&
                      'shadow-red-500/10 grayscale group-hover:grayscale-0'
                  )}
                >
                  <Image
                    src={project.imgURL}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={clsx(
                      'pointer-events-none absolute inset-0 transition-opacity duration-300',
                      theme === 'zeus' &&
                        'bg-yellow-500/10 opacity-0 mix-blend-overlay group-hover:opacity-100',
                      theme === 'poseidon' &&
                        'bg-cyan-500/20 mix-blend-overlay',
                      theme === 'hades' && 'bg-black/40'
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
