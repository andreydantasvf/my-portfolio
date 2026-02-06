'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

export function DigitalRain() {
  const { theme } = useTheme();

  // Create particles
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = Math.random() * 20 - 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, []);

  const speeds = useMemo(() => {
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) spd[i] = 0.05 + Math.random() * 0.1;
    return spd;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame(() => {
    if (!pointsRef.current || theme !== 'poseidon') return;

    const posAttribute = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = posAttribute.getY(i);
      y -= speeds[i];

      if (y < -10) {
        y = 10;
      }

      posAttribute.setY(i, y);
    }

    posAttribute.needsUpdate = true;
  });

  if (theme !== 'poseidon') return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
