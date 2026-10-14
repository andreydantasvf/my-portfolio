'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAccentHex } from '@/lib/accent';
import { getDotTexture, shade } from './shared';

const SLABS = 4;
const LEDS_PER_SLAB = 6;

/** Rack de servidor: lâminas empilhadas com arestas acesas e LEDs piscando. */
export default function ServerRack() {
  const accent = useAccentHex();
  const group = useRef<THREE.Group>(null);
  const ledGeo = useRef<THREE.BufferGeometry>(null);

  const slab = useMemo(() => new THREE.BoxGeometry(2.4, 0.38, 1.6), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(slab), [slab]);
  const { ledPositions, ledColors } = useMemo(() => {
    const pos: number[] = [];
    for (let s = 0; s < SLABS; s++) {
      for (let k = 0; k < LEDS_PER_SLAB; k++)
        pos.push(-0.95 + k * 0.16, (s - 1.5) * 0.48, 0.81);
    }
    return {
      ledPositions: new Float32Array(pos),
      ledColors: new Float32Array(pos.length)
    };
  }, []);
  const color = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current!.rotation.y = -0.6 + Math.sin(t * 0.5) * 0.35;
    group.current!.position.y = Math.sin(t * 0.8) * 0.06;
    // escreve direto no buffer da GPU (o array do useMemo é só o valor inicial)
    const attr = ledGeo.current!.attributes.color as THREE.BufferAttribute;
    for (let i = 0; i < attr.count; i++) {
      const on = Math.sin(t * (3 + (i % 5)) + i * 1.7) > 0.2 ? 1 : 0.15;
      attr.setXYZ(i, color.r * on, color.g * on, color.b * on);
    }
    attr.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      {Array.from({ length: SLABS }, (_, s) => (
        <group key={s} position={[0, (s - 1.5) * 0.48, 0]}>
          <mesh geometry={slab}>
            <meshBasicMaterial
              color={shade(accent, 0.92)}
              transparent
              opacity={0.9}
            />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color={accent} transparent opacity={0.55} />
          </lineSegments>
        </group>
      ))}
      <points>
        <bufferGeometry ref={ledGeo}>
          <bufferAttribute
            attach="attributes-position"
            args={[ledPositions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[ledColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={getDotTexture()}
          size={0.1}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
