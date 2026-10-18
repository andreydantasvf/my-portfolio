'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

const MAX_TECH = 5;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = project.webLink ?? project.githubLink;
  const extra = project.technologies.length - MAX_TECH;

  return (
    <article
      className={cn(
        'energy-border bg-navy-900/85 ease-out-expo flex w-[min(84vw,400px)] shrink-0 snap-start flex-col rounded-3xl p-3 backdrop-blur-md transition-transform duration-700 hover:-translate-y-2 hover:rotate-0',
        index % 2 === 0 ? '-rotate-[1.2deg]' : 'translate-y-4 rotate-[1.2deg]'
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-cursor-label="ver"
        className="group bg-navy-800 relative aspect-[16/10] overflow-hidden rounded-2xl"
      >
        <Image
          src={project.imgURL}
          alt={`Tela do projeto ${project.title}`}
          fill
          sizes="400px"
          className="ease-out-expo object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </a>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <p className="label">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="text-fg-muted mt-3 line-clamp-3 text-sm leading-relaxed">
          {project.details}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, MAX_TECH).map(tech => (
            <li
              key={tech}
              className="border-line text-fg-muted rounded-full border px-2.5 py-1 font-mono text-[11px]"
            >
              {tech}
            </li>
          ))}
          {extra > 0 && (
            <li className="text-fg-subtle rounded-full px-2.5 py-1 font-mono text-[11px]">
              +{extra}
            </li>
          )}
        </ul>

        <div className="mt-auto flex gap-5 pt-6">
          {project.webLink && (
            <a
              href={project.webLink}
              target="_blank"
              rel="noreferrer"
              className="label text-fg hover:text-accent flex items-center gap-1.5"
            >
              Site <ArrowUpRight size={13} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="label hover:text-accent flex items-center gap-1.5"
            >
              Código <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsRail({ projects }: { projects: Project[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const step = () => {
    const first = rail.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 24 : 400;
  };

  useEffect(() => {
    const el = rail.current!;
    const onScroll = () => setCurrent(Math.round(el.scrollLeft / step()));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });
  const total = String(projects.length).padStart(2, '0');

  return (
    <div>
      <div className="container mb-8 flex items-center justify-end gap-3">
        <p className="label mr-2" aria-live="polite">
          <span className="text-fg">
            {String(Math.min(current + 1, projects.length)).padStart(2, '0')}
          </span>{' '}
          / {total}
        </p>
        <button
          onClick={() => go(-1)}
          aria-label="Projeto anterior"
          className="border-line hover:border-accent hover:text-accent grid size-11 place-items-center rounded-full border transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Próximo projeto"
          className="border-line hover:border-accent hover:text-accent grid size-11 place-items-center rounded-full border transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>

      <div
        ref={rail}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pt-4 pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline:
            'max(clamp(20px, 5vw, 48px), calc((100vw - 1240px) / 2 + 48px))',
          scrollPaddingInline:
            'max(clamp(20px, 5vw, 48px), calc((100vw - 1240px) / 2 + 48px))'
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
