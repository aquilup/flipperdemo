"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { FlipperModel } from "./FlipperModel";
import {
  CyberGrid,
  FloatingParticles,
  LightRays,
  VolumetricFog,
} from "./Effects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeroSceneProps = {
  progress: number;
};

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame(() => {
    const p = progress;
    const radius = THREE.MathUtils.lerp(4.2, 2.4, p);
    const angle = THREE.MathUtils.lerp(0.35, Math.PI * 0.55, p);
    const y = THREE.MathUtils.lerp(1.1, 0.35, p);
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = y;
    camera.lookAt(target);
  });

  return null;
}

function SceneContent({ progress }: { progress: number }) {
  const reduced = useReducedMotion();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const z = THREE.MathUtils.lerp(0, 1.2, progress);
    group.current.position.z = z;
    group.current.rotation.x = THREE.MathUtils.lerp(0.15, -0.05, progress);
  });

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 2]} intensity={1.35} color="#ffffff" />
      <spotLight
        position={[-3, 4, 2]}
        intensity={1.5}
        angle={0.45}
        penumbra={0.8}
        color="#FF8200"
      />
      <CameraRig progress={progress} />
      <CyberGrid scroll={progress} />
      <FloatingParticles count={reduced ? 60 : 160} />
      <LightRays />
      <VolumetricFog />
      <group ref={group}>
        <FlipperModel
          lcdLit={0.25 + progress * 0.9}
          glow={0.3 + progress * 0.9}
          autoRotate={!reduced && progress < 0.08}
          scale={1.15}
        />
      </group>
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.28}
        scale={12}
        blur={2.5}
        far={4}
        color="#0a0a0a"
      />
      <Environment preset="studio" />
    </>
  );
}

export function HeroScene({ progress }: HeroSceneProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    return () => undefined;
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={reduced ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 1.1, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
