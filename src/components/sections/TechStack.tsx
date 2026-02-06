'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiAutodesk,
  SiAmazon,
  SiPython,
  SiPostgresql,
  SiFigma,
  SiGraphql,
  SiGit
} from 'react-icons/si';
import { clsx } from 'clsx';

const SKILLS = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Three.js', icon: SiAutodesk, color: '#ffffff' }, // Fallback to generic or 3D icon
  { name: 'AWS', icon: SiAmazon, color: '#FF9900' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Git', icon: SiGit, color: '#F05032' }
];

function SkillItem({
  index,
  skill,
  count,
  theme
}: {
  index: number;
  skill: (typeof SKILLS)[0];
  count: number;
  theme: string;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  // Spherical / Helix distribution
  const position = useMemo(() => {
    const phi = Math.acos(-1 + (2 * index) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    const r = 4.5;
    return new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    );
  }, [index, count]);

  const Icon = skill.icon;

  // Dynamic glow/color based on interaction and theme
  const isActive = hovered;
  const itemColor =
    theme === 'zeus' ? '#d4af37' : theme === 'poseidon' ? '#00ffff' : '#ff0000';

  return (
    <group position={position} ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Html transform distanceFactor={10}>
          <div
            className={clsx(
              'flex cursor-pointer flex-col items-center justify-center rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 select-none',
              isActive ? 'z-50 scale-125' : 'scale-100 opacity-80',
              theme === 'zeus' &&
                'border-yellow-500/30 bg-white/10 text-yellow-500',
              theme === 'poseidon' &&
                'border-cyan-500/30 bg-cyan-900/40 text-cyan-400',
              theme === 'hades' && 'border-red-900/30 bg-black/60 text-red-500'
            )}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              boxShadow: isActive ? `0 0 30px ${itemColor}` : 'none'
            }}
          >
            <Icon
              size={40}
              className={clsx(
                'mb-2 transition-transform',
                isActive && 'animate-pulse'
              )}
            />
            <span className="text-sm font-bold tracking-wider whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        </Html>

        {/* Connecting lines or particles could go here, but HTML overlay is clean */}
      </Float>
    </group>
  );
}

function Scene() {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(state => {
    // Orbital rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILLS.map((skill, i) => (
        <SkillItem
          key={i}
          index={i}
          skill={skill}
          count={SKILLS.length}
          theme={theme}
        />
      ))}
    </group>
  );
}

export function TechStack() {
  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute top-20 z-10 text-center">
        <h2
          className="mb-2 font-serif text-4xl font-bold md:text-5xl"
          style={{ fontFamily: 'var(--font-cinzel), serif' }}
        >
          Oferendas
        </h2>
        <p className="opacity-70">Arsenal Tecnológico</p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={1} />
          <Scene />
        </Canvas>
      </div>
    </section>
  );
}
