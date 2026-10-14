'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Rola até `y` pelo Lenis; sem ele (movimento reduzido), salta direto. */
export function scrollToY(y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate });
  else window.scrollTo(0, y);
}

/** Scroll suave (Lenis) dirigido pelo ticker do GSAP, para o ScrollTrigger ficar em sincronia. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    instance.on('scroll', ScrollTrigger.update);
    lenis = instance;

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
