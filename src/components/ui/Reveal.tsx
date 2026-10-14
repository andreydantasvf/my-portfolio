'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Revela os filhos diretos em sequência quando o bloco entra na tela. */
export function Reveal({
  children,
  as = 'div',
  className,
  stagger = 0.08,
  y = 32,
  delay = 0
}: {
  children: ReactNode;
  as?: 'div' | 'dl' | 'ul';
  className?: string;
  stagger?: number;
  y?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // a tag só muda a semântica; o tipo do ref é o mesmo para as três
  const Tag = as as 'div';

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        y,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true }
      });
    }, ref);
    return () => ctx.revert();
  }, [y, stagger, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
