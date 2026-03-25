'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const POINT_COUNT = 2000;
const BASE_RADIUS = 1.8;
const BASE_AMPLITUDE = 0.15;
const MOUSE_AMPLITUDE = 0.35;

function ParticleSphere({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, basePositions } = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      const x = BASE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = BASE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = BASE_RADIUS * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
    }

    return { positions, basePositions };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const time = clock.getElapsedTime();
    const geometry = pointsRef.current.geometry;
    const posArray = geometry.attributes.position.array as Float32Array;

    const mouse = mouseRef.current;
    const mouseInfluence = mouse
      ? Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
      : 0;
    const amplitude = BASE_AMPLITUDE + mouseInfluence * MOUSE_AMPLITUDE;

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const noise1 = Math.sin(bx * 1.5 + time * 0.8) * Math.cos(by * 1.3 + time * 0.6);
      const noise2 = Math.sin(by * 1.7 + time * 0.7) * Math.cos(bz * 1.4 + time * 0.9);
      const noise3 = Math.cos(bz * 1.6 + time * 0.5) * Math.sin(bx * 1.2 + time * 1.1);

      const displacement = (noise1 + noise2 + noise3) / 3;

      const len = Math.sqrt(bx * bx + by * by + bz * bz);
      const nx = bx / len;
      const ny = by / len;
      const nz = bz / len;

      posArray[i3] = bx + nx * displacement * amplitude;
      posArray[i3 + 1] = by + ny * displacement * amplitude;
      posArray[i3 + 2] = bz + nz * displacement * amplitude;
    }

    geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={POINT_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#CCFF00"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </Float>
  );
}

interface AudioVisualizerProps {
  isVisible: boolean;
}

export default function AudioVisualizer({ isVisible }: AudioVisualizerProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      className="w-full h-[400px] md:h-[500px] relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleSphere mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
