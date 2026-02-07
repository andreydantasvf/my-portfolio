'use client';

import { useRef, useLayoutEffect } from 'react';
import { projects } from '@/utils/myProjects';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const { theme } = useTheme();
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card: any, _i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, componentRef);

    return () => ctx.revert();
  }, [theme]);

  // Dynamic Theme Styles
  const cardStyles = cn(
    'flex-1 rounded-2xl border p-6 shadow-xl backdrop-blur-md transition-all duration-500 md:p-10 group-hover:scale-[1.02]',
    theme === 'zeus' &&
      'border-black/5 bg-white/40 hover:bg-white/60 hover:border-yellow-500/30 text-neutral-800',
    theme === 'poseidon' &&
      'border-cyan-500/20 bg-[#002b36]/60 hover:bg-[#002b36]/80 hover:border-cyan-400/40 text-cyan-50',
    theme === 'hades' &&
      'border-red-900/20 bg-black/60 hover:bg-black/80 hover:border-red-600/40 text-neutral-200'
  );

  return (
    <section
      ref={componentRef}
      className="relative min-h-screen overflow-hidden py-20"
    >
      {/* Background Title / Watermark */}
      <div
        className={cn(
          'pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-5 select-none',
          theme === 'zeus' ? 'text-black' : 'text-white'
        )}
      >
        <h2 className="font-serif text-[15vw] leading-none font-bold tracking-widest uppercase">
          ODISSEIA
        </h2>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-bold md:text-6xl"
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              color: theme === 'zeus' ? 'var(--zeus-primary)' : 'var(--primary)'
            }}
          >
            Meus Projetos
          </h2>
          <div
            className="mx-auto h-1 w-20 rounded-full"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </div>

        {/* Timeline Line */}
        <div
          className="absolute top-40 bottom-20 left-1/2 hidden w-px opacity-20 md:block"
          style={{ backgroundColor: 'var(--foreground)' }}
        />

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
              <div className={cn('group w-full md:w-1/2', cardStyles)}>
                <h3
                  className="mb-4 font-serif text-2xl font-bold md:text-3xl"
                  style={{ color: 'var(--primary)' }}
                >
                  {project.title}
                </h3>
                <p className="mb-6 leading-relaxed font-light opacity-90">
                  {project.details}
                </p>

                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-background flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm font-medium opacity-80 transition-all hover:bg-current hover:opacity-100"
                    >
                      <Github size={18} /> Code
                    </a>
                  )}
                  {project.webLink && (
                    <a
                      href={project.webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-background flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:brightness-110"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: theme === 'zeus' ? 'white' : 'black'
                      }}
                    >
                      <ExternalLink size={18} /> Live
                    </a>
                  )}
                </div>
              </div>

              {/* Image / Artifact */}
              <div className="group perspective-1000 w-full max-w-xl flex-1">
                <div
                  className={cn(
                    'relative aspect-video transform overflow-hidden rounded-xl shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1',
                    theme === 'zeus' && 'shadow-yellow-500/20',
                    theme === 'poseidon' && 'shadow-cyan-500/20',
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
                    className={cn(
                      'pointer-events-none absolute inset-0 transition-opacity duration-300',
                      theme === 'zeus' && 'bg-yellow-500/10 mix-blend-overlay',
                      theme === 'poseidon' &&
                        'bg-cyan-500/20 mix-blend-overlay',
                      theme === 'hades' && 'bg-red-900/20'
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
