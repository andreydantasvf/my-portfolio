'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAccentHex } from '@/lib/accent';
import { useReducedMotion } from '@/lib/motion';

/**
 * Fundo de partículas fixo atrás da página.
 * Cada <section data-particles="forma"> define a forma enquanto está na tela;
 * perto do fim da seção as partículas migram para a forma da próxima.
 */
export type ParticleShape = 'orb' | 'field' | 'wave' | 'ring';

type Shape = {
  pos: Float32Array;
  /** Centro de giro (só o orb gira em torno de si). */
  center?: [number, number, number];
};

const SPREAD = 0.35; // atraso máximo por partícula no morph, deixa a transição orgânica
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function buildShapes(n: number, halfW: number, halfH: number, mobile: boolean) {
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const golden = Math.PI * (3 - Math.sqrt(5));

  // no celular o orb vai para o canto superior direito, longe do texto do hero
  const orbCenter: [number, number, number] = mobile
    ? [halfW * 0.42, halfH * 0.58, -1]
    : [halfW * 0.42, 0.15, 0];
  const orbR = mobile ? 1.3 : 2.4;
  const orb = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    let x: number, y: number, z: number;
    if (i % 7 === 0) {
      // ~15% das partículas preenchem o volume
      const r = orbR * Math.cbrt(Math.random()) * 0.9;
      const t = rand(0, Math.PI * 2);
      const p = Math.acos(rand(-1, 1));
      x = r * Math.sin(p) * Math.cos(t);
      y = r * Math.cos(p);
      z = r * Math.sin(p) * Math.sin(t);
    } else {
      const yy = 1 - (i / (n - 1)) * 2;
      const rr = Math.sqrt(1 - yy * yy);
      x = Math.cos(i * golden) * rr * orbR;
      y = yy * orbR;
      z = Math.sin(i * golden) * rr * orbR;
    }
    orb.set([x + orbCenter[0], y + orbCenter[1], z + orbCenter[2]], i * 3);
  }

  const field = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    field.set(
      [rand(-halfW, halfW) * 1.3, rand(-halfH, halfH) * 1.3, rand(-8, 2)],
      i * 3
    );
  }

  const wave = new Float32Array(n * 3);
  const cols = Math.ceil(Math.sqrt(n * 2.4));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const cx = (i % cols) / (cols - 1);
    const cz = Math.floor(i / cols) / Math.max(rows - 1, 1);
    wave.set([(cx - 0.5) * halfW * 2.8, -halfH * 0.62, -10 + cz * 12], i * 3);
  }

  const ring = new Float32Array(n * 3);
  const ringR = mobile ? 2.4 : 4.4;
  const tilt = new THREE.Euler(1.15, 0.25, 0.35);
  const v = new THREE.Vector3();
  // anel atrás do carrossel de projetos, um pouco abaixo do centro e afastado da câmera
  const ringY = -halfH * 0.22;
  for (let i = 0; i < n; i++) {
    const u = rand(0, Math.PI * 2);
    const w = rand(0, Math.PI * 2);
    const tube = 0.12 + Math.random() * 0.3;
    v.set(
      (ringR + tube * Math.cos(w)) * Math.cos(u),
      (ringR + tube * Math.cos(w)) * Math.sin(u),
      tube * Math.sin(w)
    );
    v.applyEuler(tilt);
    ring.set([v.x, v.y + ringY, v.z - 3], i * 3);
  }

  return {
    orb: { pos: orb, center: orbCenter },
    field: { pos: field },
    wave: { pos: wave },
    ring: { pos: ring }
  } satisfies Record<ParticleShape, Shape>;
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.3, 'rgba(255,255,255,.75)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function Particles({
  count,
  mobile,
  reduced
}: {
  count: number;
  mobile: boolean;
  reduced: boolean;
}) {
  const { viewport } = useThree();
  const accent = useAccentHex();
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const sections = useRef<HTMLElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  const shapes = useMemo(
    () => buildShapes(count, viewport.width / 2, viewport.height / 2, mobile),
    [count, viewport.width, viewport.height, mobile]
  );
  const { positions, delay, phase } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    positions.set(shapes.orb.pos);
    const delay = Float32Array.from(
      { length: count },
      () => Math.random() * SPREAD
    );
    const phase = Float32Array.from(
      { length: count },
      () => Math.random() * Math.PI * 2
    );
    return { positions, delay, phase };
  }, [count]);
  const texture = useMemo(() => dotTexture(), []);

  useEffect(() => {
    material.current?.color.set(accent);
  }, [accent]);

  useEffect(() => {
    const collect = () => {
      sections.current = Array.from(
        document.querySelectorAll<HTMLElement>('[data-particles]')
      );
    };
    collect();
    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', collect);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', collect);
    };
  }, []);

  useFrame(({ clock }) => {
    const geo = points.current?.geometry;
    // escreve direto no buffer da geometria (o array do useMemo é só o valor inicial)
    const out = geo?.attributes.position.array as Float32Array | undefined;
    if (!geo || !out) return;
    const t = clock.elapsedTime;

    // A forma muda enquanto a próxima seção sobe do pé da tela até 20% do topo:
    // k = 0 com a seção atual cobrindo a tela, k = 1 quando a próxima assume.
    const els = sections.current;
    const h = window.innerHeight;
    const handoff = h * 0.2;
    let idx = 0;
    for (let s = 0; s < els.length; s++)
      if (els[s].getBoundingClientRect().top <= handoff) idx = s;
    const cur = els[idx];
    const next = els[idx + 1];
    let k = 0;
    if (cur && next) {
      k = clamp01((h - cur.getBoundingClientRect().bottom) / (h - handoff));
    }
    const fromKey = (cur?.dataset.particles as ParticleShape) || 'orb';
    const toKey = (next?.dataset.particles as ParticleShape) || fromKey;
    const from = shapes[fromKey] ?? shapes.orb;
    const to = shapes[toKey] ?? shapes.orb;

    // Giro do orb em torno do próprio centro
    const spin = reduced ? 0 : t * 0.12;
    const cos = Math.cos(spin);
    const sin = Math.sin(spin);
    const breathe = reduced ? 1 : 1 + Math.sin(t * 1.4) * 0.035;

    const sample = (shape: Shape, i: number, out: number[]) => {
      let x = shape.pos[i];
      let y = shape.pos[i + 1];
      let z = shape.pos[i + 2];
      if (shape.center) {
        const [cx, cy, cz] = shape.center;
        const dx = (x - cx) * breathe;
        const dz = (z - cz) * breathe;
        x = cx + dx * cos + dz * sin;
        z = cz - dx * sin + dz * cos;
        y = cy + (y - cy) * breathe;
      }
      out[0] = x;
      out[1] = y;
      out[2] = z;
    };

    const a = [0, 0, 0];
    const b = [0, 0, 0];
    const waveFrom = fromKey === 'wave';
    const waveTo = toKey === 'wave';
    for (let p = 0, i = 0; p < count; p++, i += 3) {
      const kp = easeInOut(clamp01(k * (1 + SPREAD) - delay[p]));
      sample(from, i, a);
      sample(to, i, b);
      let x = a[0] + (b[0] - a[0]) * kp;
      let y = a[1] + (b[1] - a[1]) * kp;
      const z = a[2] + (b[2] - a[2]) * kp;
      if (!reduced) {
        const waveW = (waveFrom ? 1 - kp : 0) + (waveTo ? kp : 0);
        if (waveW > 0)
          y +=
            Math.sin(x * 0.55 + t * 1.1) *
            Math.cos(z * 0.45 + t * 0.8) *
            0.45 *
            waveW;
        y += Math.sin(t * 0.7 + phase[p]) * 0.035;
        x += Math.cos(t * 0.5 + phase[p]) * 0.02;
      }
      out[i] = x;
      out[i + 1] = y;
      out[i + 2] = z;
    }
    geo.attributes.position.needsUpdate = true;

    // Parallax leve com o mouse
    const pts = points.current!;
    pts.rotation.y += (mouse.current.x * 0.18 - pts.rotation.y) * 0.04;
    pts.rotation.x += (mouse.current.y * 0.12 - pts.rotation.x) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        map={texture}
        color={accent}
        size={mobile ? 0.075 : 0.065}
        sizeAttenuation
        transparent
        opacity={1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = mobile ? 1400 : 3200;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <Particles count={count} mobile={mobile} reduced={reduced} />
      </Canvas>
      {/* Vinheta: escurece as bordas para o texto respirar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--bg)_120%)] md:bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)]" />
    </div>
  );
}
