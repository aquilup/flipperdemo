"use client";

import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { FlipperModel } from "./FlipperModel";
import { FloatingParticles } from "./Effects";
import { EXPLODED_PARTS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function lerp3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [
    THREE.MathUtils.lerp(a[0], b[0], t),
    THREE.MathUtils.lerp(a[1], b[1], t),
    THREE.MathUtils.lerp(a[2], b[2], t),
  ];
}

function PartCallout({
  part,
  progress,
}: {
  part: (typeof EXPLODED_PARTS)[number];
  progress: number;
}) {
  const visible = progress > 0.18;
  const t = Math.min(1, Math.max(0, (progress - 0.18) / 0.45));

  // Keep anchors near the exploded layers; pull labels further out as it opens
  const explodeMul = 0.35 + progress * 0.9;
  const anchor: [number, number, number] = [
    part.anchor[0] * explodeMul,
    part.anchor[1] * explodeMul,
    part.anchor[2] * explodeMul,
  ];

  const labelRest: [number, number, number] = [
    part.labelPos[0],
    part.labelPos[1],
    part.labelPos[2],
  ];

  // Start labels near anchor, then slide out along the leader
  const labelPos = lerp3(anchor, labelRest, t);

  // Elbow point for a clean L-shaped leader line
  const elbow: [number, number, number] = [
    part.side === "left"
      ? (anchor[0] + labelPos[0]) * 0.55
      : (anchor[0] + labelPos[0]) * 0.55,
    anchor[1],
    (anchor[2] + labelPos[2]) * 0.5,
  ];

  const points = useMemo(
    () => [anchor, elbow, labelPos],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [anchor[0], anchor[1], anchor[2], elbow[0], elbow[1], elbow[2], labelPos[0], labelPos[1], labelPos[2]],
  );

  if (!visible) return null;

  return (
    <group>
      <Line
        points={points}
        color="#FF8200"
        lineWidth={3}
        transparent
        opacity={0.55 + t * 0.45}
        depthTest={false}
        depthWrite={false}
        renderOrder={20}
      />
      <mesh position={anchor} renderOrder={21}>
        <sphereGeometry args={[0.036, 16, 16]} />
        <meshBasicMaterial
          color="#FF8200"
          transparent
          opacity={0.65 + t * 0.35}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      <mesh position={labelPos} renderOrder={21}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial
          color="#FF8200"
          transparent
          opacity={0.55 + t * 0.45}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      <Html
        position={labelPos}
        center
        zIndexRange={[40, 0]}
        style={{
          opacity: t,
          pointerEvents: "none",
        }}
      >
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {part.side === "left" && (
            <span className="h-px w-3 shrink-0 bg-[#FF8200]/70" aria-hidden />
          )}
          <span className="inline-flex items-center rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-[11px] font-semibold leading-none tracking-[0.08em] text-black uppercase shadow-md">
            {part.label}
          </span>
          {part.side === "right" && (
            <span className="h-px w-3 shrink-0 bg-[#FF8200]/70" aria-hidden />
          )}
        </div>
      </Html>
    </group>
  );
}

export function ExplodedScene({ progress }: { progress: number }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-[70vh] w-full overflow-visible rounded-[2rem] border border-black/10 bg-gradient-to-b from-[#f5f5f5] to-white">
      <Canvas
        dpr={reduced ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [3.6, 1.4, 4.6], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="rounded-[2rem]"
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#f7f7f7"]} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 5, 3]} intensity={1.3} color="#ffffff" />
          <pointLight position={[-2, 2, 2]} color="#FF8200" intensity={1.5} />
          <FloatingParticles count={60} />
          <FlipperModel
            explode={progress}
            lcdLit={0.7}
            glow={0.6 + progress * 0.5}
            autoRotate={false}
            scale={0.95}
          />
          {EXPLODED_PARTS.map((part) => (
            <PartCallout key={part.id} part={part} progress={progress} />
          ))}
          {!reduced && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.25}
              minPolarAngle={Math.PI / 3.2}
              maxPolarAngle={Math.PI / 1.7}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
