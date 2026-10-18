'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Canvas de objeto 3D de seção: só anima enquanto está visível. */
export function ObjectCanvas({
  children,
  className,
  cameraZ = 7,
  fov = 35
}: {
  children: ReactNode;
  className?: string;
  cameraZ?: number;
  fov?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {
        rootMargin: '120px'
      }
    );
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} aria-hidden className={cn('relative', className)}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, cameraZ], fov }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible && !reduced ? 'always' : 'demand'}
      >
        {children}
      </Canvas>
    </div>
  );
}
