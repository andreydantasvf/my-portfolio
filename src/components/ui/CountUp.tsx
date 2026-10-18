'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const format = (n: number) => Math.round(n).toLocaleString('pt-BR');

/** Número que conta de 0 até o valor quando entra na tela. */
export function CountUp({
  value,
  suffix = ''
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (prefersReducedMotion()) return;
    const state = { n: 0 };
    el.textContent = format(0) + suffix;
    const tween = gsap.to(state, {
      n: value,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = format(state.n) + suffix;
      }
    });
    return () => {
      tween.kill();
    };
  }, [value, suffix]);

  return <span ref={ref}>{format(value) + suffix}</span>;
}
