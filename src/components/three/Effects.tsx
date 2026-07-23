"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CyberGrid({ scroll = 0 }: { scroll?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.z =
      ((ref.current.position.z + dt * 0.35 + scroll * 0.01) % 2) - 1;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial color="#FF8200" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

export function FloatingParticles({ count = 180 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!points.current) return;
    points.current.rotation.y += dt * 0.02;
    points.current.rotation.x += dt * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#FF8200"
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function LightRays() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <group ref={group} position={[0, 1.5, -2]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[0, 0, (i / 6) * Math.PI]}
          position={[Math.cos((i / 6) * Math.PI * 2) * 0.2, 0, 0]}
        >
          <planeGeometry args={[0.15, 8]} />
          <meshBasicMaterial
            color="#FF8200"
            transparent
            opacity={0.045}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function VolumetricFog() {
  return (
    <>
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[20, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
      <mesh position={[2, 1, -1]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#FF8200"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-2.5, -0.5, -1.5]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
