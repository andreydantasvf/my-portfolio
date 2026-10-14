'use client';

import { useEffect, useRef } from 'react';

/** Barra de "energia" no topo que se enche conforme a página rola. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.current?.style.setProperty('transform', `scaleX(${progress})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="bg-line/60 fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={bar}
        className="bg-accent h-full origin-left scale-x-0 shadow-[0_0_12px_var(--accent)]"
      />
    </div>
  );
}
