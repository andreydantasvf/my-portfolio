'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  MeshTransmissionMaterial,
  Float,
  Stars,
  Cloud,
  Environment,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

import { DigitalRain } from '../effects/DigitalRain';

// Trident Model for Poseidon
function TridentModel() {
  const group = useRef<THREE.Group>(null!);
  return (
    <group ref={group} rotation={[0, 0, Math.PI / 4]}>
      {/* Shaft */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
        <meshStandardMaterial color="#b58900" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center Prong */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.08, 1.5, 16]} />
        <meshStandardMaterial
          color="#2aa198"
          metalness={0.9}
          roughness={0.1}
          emissive="#002b36"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Center Tip */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <meshStandardMaterial color="#b58900" metalness={1} roughness={0.1} />
      </mesh>

      {/* Side Prongs Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#b58900" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Prong */}
      <mesh position={[-0.4, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1, 16]} />
        <meshStandardMaterial color="#2aa198" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.4, 1.1, 0]}>
        <coneGeometry args={[0.06, 0.2, 16]} />
        <meshStandardMaterial color="#b58900" metalness={1} roughness={0.1} />
      </mesh>

      {/* Right Prong */}
      <mesh position={[0.4, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1, 16]} />
        <meshStandardMaterial color="#2aa198" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.4, 1.1, 0]}>
        <coneGeometry args={[0.06, 0.2, 16]} />
        <meshStandardMaterial color="#b58900" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Helm of Darkness V3 (Spartan with Ram Horns)
function HelmModelV3() {
  const group = useRef<THREE.Group>(null!);

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      {/* Helmet Dome */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry
          args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]}
        />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Ridge/Crest (Center line) */}
      <mesh position={[0, 0.6, 0.2]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Horns - Ram Style (Curved) */}
      <group position={[0, 0.4, -0.1]}>
        {/* Left Horn */}
        <group position={[-0.7, 0, 0]} rotation={[0, 0, 0.5]}>
          <mesh rotation={[1.5, 0, 0]}>
            <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI * 1.5]} />
            <meshStandardMaterial
              color="#111"
              metalness={0.5}
              roughness={0.7}
            />
          </mesh>
          <mesh position={[0.3, -0.1, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.07, 0.4, 16]} />
            <meshStandardMaterial
              color="#111"
              metalness={0.5}
              roughness={0.7}
            />
          </mesh>
        </group>

        {/* Right Horn */}
        <group position={[0.7, 0, 0]} rotation={[0, 0, -0.5]}>
          <mesh rotation={[1.5, 0, 0]}>
            <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI * 1.5]} />
            <meshStandardMaterial
              color="#111"
              metalness={0.5}
              roughness={0.7}
            />
          </mesh>
          <mesh position={[-0.3, -0.1, 0]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.07, 0.4, 16]} />
            <meshStandardMaterial
              color="#111"
              metalness={0.5}
              roughness={0.7}
            />
          </mesh>
        </group>
      </group>

      {/* Face Mask (Spartan Style) */}
      <group position={[0, -0.1, 0.6]}>
        {/* Nose Guard */}
        <mesh position={[0, 0.1, 0.05]}>
          <boxGeometry args={[0.12, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Cheek Guards */}
        <mesh position={[-0.4, -0.1, 0]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0.4, -0.1, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.35, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Eye Slits */}
        <mesh position={[0.15, 0.15, -0.1]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#330000" />
        </mesh>
        <mesh position={[-0.15, 0.15, -0.1]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#330000" />
        </mesh>
      </group>

      {/* Neck Spikes */}
      <group position={[0, -0.6, 0]}>
        {[...Array(6)].map((_, i) => (
          <mesh
            key={i}
            rotation={[0, i * (Math.PI / 3), 0.5]}
            position={[
              Math.sin((i * Math.PI) / 3) * 0.6,
              0,
              Math.cos((i * Math.PI) / 3) * 0.6
            ]}
          >
            <coneGeometry args={[0.08, 0.4, 4]} />
            <meshStandardMaterial
              color="#222"
              metalness={0.8}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Helm of Darkness V2 (Spartan + Horns)
function HelmModel() {
  return (
    <group rotation={[0.2, 0, 0]}>
      {/* Main Dome */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry
          args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]}
        />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Horns */}
      <group position={[0, 0.4, 0]}>
        {/* Left Horn */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0.5]}>
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Right Horn */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, 2.6]}>
          {' '}
          // Flipped rotation
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Spartan Face Plate Area */}
      <group position={[0, -0.1, 0.6]}>
        {/* Nose Guard / Central Divider */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>

        {/* Glowing Slits (The "Grill") */}
        <mesh position={[-0.2, 0.2, -0.05]} rotation={[0, 0, 0.1]}>
          <capsuleGeometry args={[0.04, 0.6, 4, 8]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
        </mesh>
        <mesh position={[0.2, 0.2, -0.05]} rotation={[0, 0, -0.1]}>
          <capsuleGeometry args={[0.04, 0.6, 4, 8]} />
          <meshBasicMaterial color="#ff0000" toneMapped={false} />
        </mesh>

        {/* Cheek Guards */}
        <mesh position={[-0.5, -0.1, -0.2]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <mesh position={[0.5, -0.1, -0.2]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function BustModel({
  mouse
}: {
  mouse: React.MutableRefObject<THREE.Vector2>;
}) {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Group>(null!);

  useFrame(state => {
    // Rotation & floating
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} scale={1.5}>
        {theme === 'zeus' && (
          <mesh>
            <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
            <meshStandardMaterial
              color="#fdfbf7"
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
        )}

        {theme === 'poseidon' && <TridentModel />}

        {theme === 'hades' && <HelmModelV3 />}
      </group>
    </Float>
  );
}

function Lights() {
  const { theme } = useTheme();
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useFrame(({ mouse }) => {
    if (lightRef.current) {
      // Move light specific to Zeus mode "Sun"
      lightRef.current.position.x = mouse.x * 10;
      lightRef.current.position.y = mouse.y * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      {theme === 'zeus' && (
        <directionalLight
          ref={lightRef}
          position={[5, 10, 5]}
          intensity={2}
          color="#d4af37"
          castShadow
        />
      )}
      {theme === 'poseidon' && (
        <>
          <pointLight position={[-5, 5, 5]} intensity={5} color="#00ffff" />
          <ambientLight intensity={1} color="#006994" />
        </>
      )}
      {theme === 'hades' && (
        <>
          <pointLight
            position={[0, -5, 2]}
            intensity={5}
            color="#ff0000"
            distance={10}
          />
          <fog attach="fog" args={['#000000', 5, 20]} />
        </>
      )}
    </>
  );
}

function BackgroundEffects() {
  const { theme } = useTheme();
  return (
    <>
      {theme === 'zeus' && (
        <>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Cloud
            opacity={0.5}
            segments={40}
            bounds={[10, 2, 2]}
            volume={10}
            color="#fdfbf7"
          />
        </>
      )}

      {theme === 'poseidon' && (
        <>
          <Stars radius={50} count={1000} factor={4} fade speed={2} />
          <Sparkles
            count={500}
            scale={12}
            size={6}
            speed={0.4}
            opacity={0.7}
            color="#00ffff"
          />
          <Cloud
            position={[0, -5, -5]}
            speed={0.1}
            opacity={0.2}
            color="#001020"
          />
          <DigitalRain />
        </>
      )}

      {theme === 'hades' && (
        <>
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            saturation={1}
            fade
            speed={2}
          />
          <Sparkles
            count={300}
            scale={10}
            size={5}
            speed={2}
            opacity={0.5}
            color="#ff0000"
            noise={1}
          />
          <Cloud
            position={[0, -8, -5]}
            speed={0.5}
            opacity={0.3}
            color="#200000"
          />
        </>
      )}
    </>
  );
}

export function GreekBust() {
  const mouse = useRef(new THREE.Vector2());

  return (
    <div className="absolute top-0 left-0 -z-10 h-screen w-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        onMouseMove={e => {
          mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }}
        dpr={[1, 2]} // optimization
      >
        <Lights />
        <BustModel mouse={mouse} />
        <BackgroundEffects />
        <Environment
          preset={
            'city' // generic fallback
          }
        />
      </Canvas>
    </div>
  );
}
