'use client';

import { useEffect, useRef } from 'react';
import { scrollToY } from './SmoothScroll';

/**
 * Barra de rolagem do site (a nativa fica escondida em globals.css):
 * uma linha de "energia" na borda direita que se enche de luz conforme a
 * página rola. Clicar ou arrastar na barra rola até aquele ponto.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    let frame = 0;
    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;
    const update = () => {
      frame = 0;
      const max = maxScroll();
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.setProperty('--progress', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // clicar/arrastar: a posição do ponteiro na barra vira a posição da página
    let dragging = false;
    const seek = (e: PointerEvent, immediate: boolean) => {
      const ratio = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      scrollToY(ratio * maxScroll(), immediate);
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = 'true';
      seek(e, false);
    };
    const onMove = (e: PointerEvent) => dragging && seek(e, true);
    const onUp = () => {
      dragging = false;
      delete el.dataset.dragging;
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={bar} aria-hidden className="scroll-energy">
      <div className="scroll-energy__fill" />
      <div className="scroll-energy__head" />
    </div>
  );
}
