'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor-label]';

/**
 * Cursor "mira": anel que segue o mouse com atraso e ponto exato.
 * Sobre links/botões o anel envolve o elemento com cantoneiras;
 * sobre [data-cursor-label] cresce e mostra o rótulo.
 * Só existe em dispositivos com mouse.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100, w: 32, h: 32 };
    let target: Element | null = null;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      root.current!.dataset.visible = 'true';
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest(INTERACTIVE);
      const text = el?.getAttribute('data-cursor-label');
      target = el && !text ? el : null;
      root.current!.dataset.state = text ? 'label' : el ? 'link' : 'default';
      label.current!.textContent = text ?? '';
    };
    const onLeave = () => (root.current!.dataset.visible = 'false');
    const onDown = () => root.current!.classList.add('is-down');
    const onUp = () => root.current!.classList.remove('is-down');

    const loop = () => {
      let tx = mouse.x;
      let ty = mouse.y;
      let tw = root.current!.dataset.state === 'label' ? 88 : 32;
      let th = tw;
      if (target) {
        const b = target.getBoundingClientRect();
        tx = b.left + b.width / 2;
        ty = b.top + b.height / 2;
        tw = b.width + 14;
        th = b.height + 14;
      }
      pos.x += (tx - pos.x) * 0.2;
      pos.y += (ty - pos.y) * 0.2;
      pos.w += (tw - pos.w) * 0.25;
      pos.h += (th - pos.h) * 0.25;
      ring.current!.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      ring.current!.style.width = `${pos.w}px`;
      ring.current!.style.height = `${pos.h}px`;
      dot.current!.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    frame = requestAnimationFrame(loop);

    return () => {
      html.classList.remove('has-cursor');
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      data-state="default"
      data-visible="false"
      className="cursor pointer-events-none fixed inset-0 z-[70] hidden"
    >
      <span ref={ring} className="cursor__ring">
        <span ref={label} className="cursor__label" />
      </span>
      <span ref={dot} className="cursor__dot" />
    </div>
  );
}
