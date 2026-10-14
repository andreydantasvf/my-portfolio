'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAccentHex } from '@/lib/accent';
import { getDotTexture } from './shared';

const NODES = 34;
const RADIUS = 2.2;
const PACKETS = 14;
const HUBS = [3, 16, 27];

/** Rede distribuída: nós numa esfera, arestas entre vizinhos, hubs com anéis e pacotes viajando. */
export default function NetworkGraph() {
  const accent = useAccentHex();
  const group = useRef<THREE.Group>(null);
  const hubs = useRef<(THREE.Group | null)[]>([]);
  const packetGeo = useRef<THREE.BufferGeometry>(null);

  const { nodes, nodePositions, edgePositions, edges } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODES; i++) {
      const y = 1 - (i / (NODES - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * Math.PI * (3 - Math.sqrt(5));
      nodes.push(
        new THREE.Vector3(
          Math.cos(t) * r * RADIUS,
          y * RADIUS * 0.8,
          Math.sin(t) * r * RADIUS
        )
      );
    }
    const edges: [number, number][] = [];
    for (let i = 0; i < NODES; i++)
      for (let j = i + 1; j < NODES; j++)
        if (nodes[i].distanceTo(nodes[j]) < 1.45) edges.push([i, j]);
    return {
      nodes,
      edges,
      nodePositions: new Float32Array(nodes.flatMap(n => n.toArray())),
      edgePositions: new Float32Array(
        edges.flatMap(([a, b]) => [
          ...nodes[a].toArray(),
          ...nodes[b].toArray()
        ])
      )
    };
  }, []);

  const packets = useMemo(
    () =>
      Array.from({ length: PACKETS }, () => ({
        edge: edges[(Math.random() * edges.length) | 0],
        t: Math.random(),
        speed: 0.4 + Math.random() * 0.6
      })),
    [edges]
  );
  const packetPositions = useMemo(() => new Float32Array(PACKETS * 3), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const g = group.current!;
    g.rotation.y += delta * 0.12;
    g.rotation.x += (-pointer.y * 0.3 - g.rotation.x) * 0.04;

    hubs.current.forEach((h, i) => {
      if (!h) return;
      h.children[1].rotation.z = t * (1 + i * 0.3);
      h.children[2].rotation.y = t * 0.8;
      h.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.06);
    });

    packets.forEach((p, i) => {
      p.t += delta * p.speed * 0.6;
      if (p.t > 1) {
        p.t = 0;
        p.edge = edges[(Math.random() * edges.length) | 0];
      }
      tmp
        .lerpVectors(nodes[p.edge[0]], nodes[p.edge[1]], p.t)
        .toArray(packetPositions, i * 3);
    });
    packetGeo.current!.attributes.position.needsUpdate = true;
  });

  const dot = getDotTexture();

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          size={0.16}
          color={accent}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.3} />
      </lineSegments>
      {HUBS.map((n, i) => (
        <group
          key={n}
          position={nodes[n]}
          ref={el => void (hubs.current[i] = el)}
        >
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          <mesh rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.28, 0.006, 6, 48]} />
            <meshBasicMaterial color={accent} transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 2 + 0.4, 0, 0]}>
            <torusGeometry args={[0.38, 0.006, 6, 48]} />
            <meshBasicMaterial color={accent} transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
      <points>
        <bufferGeometry ref={packetGeo}>
          <bufferAttribute
            attach="attributes-position"
            args={[packetPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          size={0.1}
          color="#ffffff"
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
