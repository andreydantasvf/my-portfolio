'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Cloud, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { DigitalRain } from '../effects/DigitalRain';

// --- Zeus: Lightning Bolt (Low Poly) ---

function LightningBoltModel() {
  const group = useRef<THREE.Group>(null!);

  useFrame(state => {
    if (group.current) {
      // Dynamic rotation with energy pulse
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      // Subtle floating
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  // Low poly lightning bolt vertices - zigzag shape
  const lightningShape = useMemo(() => {
    const shape = new THREE.Shape();

    // Create angular lightning bolt shape
    shape.moveTo(0, 2.5); // Top
    shape.lineTo(0.4, 1.5); // Right angle 1
    shape.lineTo(0.15, 1.5); // Inner notch
    shape.lineTo(0.5, 0.5); // Right angle 2
    shape.lineTo(0.2, 0.5); // Inner notch
    shape.lineTo(0.6, -0.8); // Right angle 3
    shape.lineTo(0.25, -0.8); // Inner notch
    shape.lineTo(0, -2.5); // Bottom tip
    shape.lineTo(-0.25, -0.8); // Left side
    shape.lineTo(-0.6, -0.8);
    shape.lineTo(-0.2, 0.5);
    shape.lineTo(-0.5, 0.5);
    shape.lineTo(-0.15, 1.5);
    shape.lineTo(-0.4, 1.5);
    shape.lineTo(0, 2.5);

    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2
    }),
    []
  );

  return (
    <group ref={group} scale={0.8}>
      {/* Main Lightning Bolt */}
      <mesh rotation={[0, 0, 0]}>
        <extrudeGeometry args={[lightningShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Energy Core - brighter */}
      <mesh rotation={[0, 0, 0]} scale={0.85}>
        <extrudeGeometry
          args={[lightningShape, { ...extrudeSettings, depth: 0.35 }]}
        />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Electric particles */}
      <Sparkles
        count={50}
        scale={[2, 4, 2]}
        size={3}
        speed={2}
        opacity={0.9}
        color="#ffd700"
        noise={2}
      />
    </group>
  );
}

// --- Poseidon: Trident (Low Poly Reworked) ---

function TridentModel() {
  const group = useRef<THREE.Group>(null!);

  useFrame(state => {
    if (group.current) {
      // Gentle oceanic sway
      group.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.08 + Math.PI / 6;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 6]} scale={0.8}>
      {/* Main Shaft - Octagonal Low Poly */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 4.5, 8]} />
        <meshStandardMaterial
          color="#1a4a5e"
          metalness={0.9}
          roughness={0.3}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Shaft Detail Rings */}
      {[-0.5, 0.3, 1.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.1, 0.025, 6, 8]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00aacc"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Prong Base (Crown) */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.1, 0.4, 6]} />
        <meshStandardMaterial color="#0d3d4d" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Center Prong */}
      <group position={[0, 1.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.08, 1.5, 6]} />
          <meshStandardMaterial
            color="#00838f"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Prong Tip - Sharp Triangle */}
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.1, 0.5, 4]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00ffff"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Left Prong */}
      <group position={[-0.35, 1.3, 0]} rotation={[0, 0, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 1.2, 6]} />
          <meshStandardMaterial
            color="#00838f"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <coneGeometry args={[0.08, 0.4, 4]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00ffff"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Right Prong */}
      <group position={[0.35, 1.3, 0]} rotation={[0, 0, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 1.2, 6]} />
          <meshStandardMaterial
            color="#00838f"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <coneGeometry args={[0.08, 0.4, 4]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00ffff"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Water Particles */}
      <Sparkles
        count={80}
        scale={[3, 5, 3]}
        size={2}
        speed={0.5}
        opacity={0.6}
        color="#00ffff"
        noise={1}
      />
    </group>
  );
}

// --- Hades: Bident (Low Poly) ---

function BidentModel() {
  const group = useRef<THREE.Group>(null!);

  useFrame(state => {
    if (group.current) {
      // Sinister slow rotation
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05 - Math.PI / 8;
      // Eerie floating
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    }
  });

  return (
    <group ref={group} rotation={[0, 0, -Math.PI / 8]} scale={0.8}>
      {/* Main Shaft - Dark Metal */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.07, 0.05, 4, 6]} />
        <meshStandardMaterial
          color="#1a0a0a"
          metalness={0.95}
          roughness={0.4}
        />
      </mesh>

      {/* Shaft Bone-like Details */}
      {[-0.3, 0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.09, 0.02, 6, 6]} />
          <meshStandardMaterial
            color="#3d0000"
            metalness={0.8}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Skull Ornament at center */}
      <group position={[0, 0.9, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshStandardMaterial
            color="#2a1a1a"
            metalness={0.7}
            roughness={0.6}
          />
        </mesh>
        {/* Eye sockets - glowing */}
        <mesh position={[-0.05, 0.02, 0.12]} scale={0.5}>
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial color="#ff3d00" toneMapped={false} />
        </mesh>
        <mesh position={[0.05, 0.02, 0.12]} scale={0.5}>
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial color="#ff3d00" toneMapped={false} />
        </mesh>
      </group>

      {/* Bident Crown */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.18, 0.08, 0.3, 6]} />
        <meshStandardMaterial color="#0d0505" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Left Prong */}
      <group position={[-0.2, 1.8, 0]} rotation={[0, 0, 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 1.3, 6]} />
          <meshStandardMaterial
            color="#1a0808"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Prong Tip */}
        <mesh position={[0, 0.85, 0]}>
          <coneGeometry args={[0.08, 0.5, 4]} />
          <meshStandardMaterial
            color="#ff3d00"
            emissive="#cc2200"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Flame on tip */}
        <mesh position={[0, 1.2, 0]} scale={[0.6, 1, 0.6]}>
          <coneGeometry args={[0.08, 0.3, 4]} />
          <meshBasicMaterial
            color="#ff6600"
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Right Prong */}
      <group position={[0.2, 1.8, 0]} rotation={[0, 0, -0.1]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 1.3, 6]} />
          <meshStandardMaterial
            color="#1a0808"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Prong Tip */}
        <mesh position={[0, 0.85, 0]}>
          <coneGeometry args={[0.08, 0.5, 4]} />
          <meshStandardMaterial
            color="#ff3d00"
            emissive="#cc2200"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Flame on tip */}
        <mesh position={[0, 1.2, 0]} scale={[0.6, 1, 0.6]}>
          <coneGeometry args={[0.08, 0.3, 4]} />
          <meshBasicMaterial
            color="#ff6600"
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Ember Particles */}
      <Sparkles
        count={60}
        scale={[3, 5, 3]}
        size={2.5}
        speed={1.5}
        opacity={0.8}
        color="#ff3d00"
        noise={3}
      />
    </group>
  );
}

// --- Main Bust Logic with Transitions ---

function BustModel() {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Responsive Scale Logic
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.9 : 1.4;
  const positionY = isMobile ? 1.2 : 0;

  useFrame(_state => {
    if (meshRef.current) {
      // Smooth transitions for Scale
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.05)
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        positionY,
        0.05
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={meshRef}>
        {theme === 'zeus' && <LightningBoltModel />}
        {theme === 'poseidon' && <TridentModel />}
        {theme === 'hades' && <BidentModel />}
      </group>
    </Float>
  );
}

// --- Scene Setup ---

function Lights() {
  const { theme } = useTheme();
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useFrame(({ mouse }) => {
    if (lightRef.current) {
      // Parallax light movement
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mouse.x * 10,
        0.1
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mouse.y * 10,
        0.1
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      {theme === 'zeus' && (
        <>
          <directionalLight
            ref={lightRef}
            position={[5, 10, 5]}
            intensity={2.5}
            color="#ffd700"
            castShadow
          />
          <pointLight
            position={[0, 0, 5]}
            intensity={3}
            color="#ffaa00"
            distance={15}
          />
        </>
      )}
      {theme === 'poseidon' && (
        <>
          <pointLight
            position={[-5, 5, 5]}
            intensity={4}
            color="#00ffff"
            distance={20}
          />
          <ambientLight intensity={0.4} color="#006994" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.5}
            intensity={4}
            color="#00e5ff"
            penumbra={1}
          />
        </>
      )}
      {theme === 'hades' && (
        <>
          <pointLight
            position={[0, -3, 3]}
            intensity={6}
            color="#ff3d00"
            distance={15}
          />
          <ambientLight intensity={0.15} color="#1a0000" />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            intensity={2}
            color="#4a148c"
          />
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
            count={3000}
            factor={4}
            saturation={0.2}
            fade
            speed={1}
          />
          <Cloud
            opacity={0.4}
            segments={40}
            bounds={[12, 3, 3]}
            volume={8}
            color="#fef9ef"
            speed={0.3}
          />
          <Cloud
            position={[5, 3, -5]}
            opacity={0.3}
            segments={30}
            bounds={[8, 2, 2]}
            volume={6}
            color="#ffd700"
            speed={0.2}
          />
        </>
      )}

      {theme === 'poseidon' && (
        <>
          <Stars radius={50} count={1500} factor={3} fade speed={1.5} />
          <Sparkles
            count={400}
            scale={18}
            size={4}
            speed={0.3}
            opacity={0.5}
            color="#00ffff"
          />
          <Cloud
            position={[0, -6, -8]}
            speed={0.15}
            opacity={0.15}
            color="#001525"
          />
          <DigitalRain />
        </>
      )}

      {theme === 'hades' && (
        <>
          <Stars
            radius={80}
            depth={40}
            count={800}
            factor={3}
            saturation={0.8}
            fade
            speed={0.8}
          />
          <Sparkles
            count={200}
            scale={15}
            size={4}
            speed={1.2}
            opacity={0.7}
            color="#ff3d00"
            noise={2}
          />
          <Cloud
            position={[0, -10, -8]}
            speed={0.3}
            opacity={0.25}
            color="#200000"
          />
          <fog attach="fog" args={['#0a0505', 6, 22]} />
        </>
      )}
    </>
  );
}

export function GreekBust() {
  const mouse = useRef(new THREE.Vector2());

  return (
    <div className="absolute top-0 left-0 -z-10 h-screen w-full transition-colors duration-1000 ease-in-out">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        onMouseMove={e => {
          mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }}
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Lights />
        <BustModel />
        <BackgroundEffects />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
