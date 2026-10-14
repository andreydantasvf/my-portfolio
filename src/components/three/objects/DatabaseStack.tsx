'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ACCENT } from '@/lib/theme';
import { getDotTexture, shade } from './shared';

/** Três discos empilhados (o do meio aceso) com um anel de partículas orbitando. */
export default function DatabaseStack() {
  const accent = ACCENT;
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);

  const disk = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.42, 48, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(disk, 30), [disk]);
  const orbitPoints = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      pts.push(Math.cos(a) * 1.6, Math.sin(a * 3) * 0.45, Math.sin(a) * 1.6);
    }
    return new Float32Array(pts);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    orbit.current!.rotation.y = t * 0.5;
    group.current!.rotation.y = Math.sin(t * 0.3) * 0.25;
    group.current!.position.y = Math.sin(t) * 0.08;
  });

  return (
    <group ref={group} rotation={[0.45, 0, 0]}>
      {[0, 1, 2].map(i => {
        const lit = i === 1;
        return (
          <group key={i} position={[0, (1 - i) * 0.52, 0]}>
            <mesh geometry={disk}>
              <meshBasicMaterial
                color={shade(accent, lit ? 0.7 : 0.9)}
                transparent
                opacity={0.92}
              />
            </mesh>
            <lineSegments geometry={edges}>
              <lineBasicMaterial
                color={accent}
                transparent
                opacity={lit ? 0.95 : 0.5}
              />
            </lineSegments>
          </group>
        );
      })}
      <group ref={orbit}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[orbitPoints, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            map={getDotTexture()}
            size={0.12}
            color="#ffffff"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
