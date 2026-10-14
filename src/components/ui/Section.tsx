import type { ReactNode } from 'react';
import type { ParticleShape } from '@/components/three/ParticleField';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

export function Section({
  id,
  particles,
  className,
  children
}: {
  id: string;
  particles: ParticleShape;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-particles={particles}
      className={cn('relative z-10 py-28 md:py-40', className)}
    >
      {children}
    </section>
  );
}

/** "01 / SOBRE" + título grande + parágrafo de apoio. Use <em> no título para a palavra em destaque. */
export function SectionHeader({
  index,
  label,
  title,
  lead,
  className
}: {
  index: number;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className="label flex items-center gap-3">
        <span className="text-accent">{String(index).padStart(2, '0')}</span>
        <span className="bg-line h-px w-8" />
        {label}
      </p>
      <h2 className="font-display [&_em]:text-glow mt-5 text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance [&_em]:not-italic">
        {title}
      </h2>
      {lead && (
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">{lead}</p>
      )}
    </Reveal>
  );
}
