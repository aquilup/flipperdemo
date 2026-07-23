"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import {
  Suspense,
  useMemo,
  useRef,
  type MutableRefObject,
  type RefObject,
} from "react";
import * as THREE from "three";
import { FlipperModel } from "./FlipperModel";
import { FloatingParticles } from "./Effects";
import { HARDWARE_FEATURES } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  activeId: string | null;
  onSelect: (id: string) => void;
};

type FatLine = THREE.Mesh & {
  geometry: THREE.BufferGeometry & {
    setPositions: (array: number[] | Float32Array) => void;
  };
};

function ActiveCallout({
  feature,
  rotationRef,
  onSelect,
  portal,
}: {
  feature: (typeof HARDWARE_FEATURES)[number];
  rotationRef: MutableRefObject<THREE.Euler>;
  onSelect: (id: string) => void;
  portal: RefObject<HTMLElement | null>;
}) {
  const lineRef = useRef<FatLine>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const localAnchor = useMemo(
    () => new THREE.Vector3(...feature.anchor),
    [feature],
  );
  const worldAnchor = useMemo(() => new THREE.Vector3(), []);
  const elbow = useMemo(() => new THREE.Vector3(), []);
  const label = useMemo(
    () => new THREE.Vector3(...feature.labelPos),
    [feature],
  );
  const posArray = useMemo(() => new Float32Array(9), []);

  useFrame(() => {
    worldAnchor.copy(localAnchor).applyEuler(rotationRef.current);
    // Keep elbow clearly offset so the stroke never collapses into a point
    const midX = THREE.MathUtils.lerp(worldAnchor.x, label.x, 0.55);
    elbow.set(midX, worldAnchor.y, THREE.MathUtils.lerp(worldAnchor.z, label.z, 0.35));

    posArray[0] = worldAnchor.x;
    posArray[1] = worldAnchor.y;
    posArray[2] = worldAnchor.z;
    posArray[3] = elbow.x;
    posArray[4] = elbow.y;
    posArray[5] = elbow.z;
    posArray[6] = label.x;
    posArray[7] = label.y;
    posArray[8] = label.z;

    if (lineRef.current?.geometry?.setPositions) {
      lineRef.current.geometry.setPositions(posArray);
    }
    if (dotRef.current) {
      dotRef.current.position.copy(worldAnchor);
    }
  });

  return (
    <group renderOrder={20}>
      <Line
        ref={lineRef as never}
        points={[
          feature.anchor,
          [
            (feature.anchor[0] + feature.labelPos[0]) * 0.55,
            feature.anchor[1],
            feature.anchor[2],
          ],
          feature.labelPos,
        ]}
        color="#FF8200"
        lineWidth={3}
        transparent
        opacity={1}
        depthTest={false}
        depthWrite={false}
        renderOrder={20}
      />
      <mesh ref={dotRef} renderOrder={21}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#FF8200" depthTest={false} depthWrite={false} />
      </mesh>
      <mesh position={feature.labelPos} renderOrder={21}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial
          color="#FF8200"
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
      <Html
        position={feature.labelPos}
        center
        portal={portal}
        zIndexRange={[40, 0]}
        style={{ pointerEvents: "auto" }}
      >
        <button
          type="button"
          onClick={() => onSelect(feature.id)}
          aria-label={feature.title}
          className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap"
        >
          {feature.side === "left" && (
            <span className="h-px w-4 shrink-0 bg-[#FF8200]" aria-hidden />
          )}
          <span className="inline-flex items-center rounded-md border border-[#FF8200]/45 bg-white px-2.5 py-1.5 text-[11px] font-semibold leading-none tracking-[0.08em] text-black uppercase shadow-md">
            {feature.title}
          </span>
          {feature.side === "right" && (
            <span className="h-px w-4 shrink-0 bg-[#FF8200]" aria-hidden />
          )}
        </button>
      </Html>
    </group>
  );
}

function SmoothRotatingModel({
  activeId,
  onSelect,
  portal,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  portal: RefObject<HTMLElement | null>;
}) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const current = useRef(new THREE.Euler(0.12, 0.35, 0.08));

  const goal = useMemo(() => {
    const feature = HARDWARE_FEATURES.find((f) => f.id === activeId);
    const a = feature?.angle ?? ([0.12, 0.35, 0.08] as [number, number, number]);
    return new THREE.Euler(a[0], a[1], a[2]);
  }, [activeId]);

  const activeFeature = HARDWARE_FEATURES.find((f) => f.id === activeId);

  useFrame((_, dt) => {
    if (!group.current) return;
    const speed = reduced ? 18 : 3.2;
    current.current.x = THREE.MathUtils.damp(current.current.x, goal.x, speed, dt);
    current.current.y = THREE.MathUtils.damp(current.current.y, goal.y, speed, dt);
    current.current.z = THREE.MathUtils.damp(current.current.z, goal.z, speed, dt);
    group.current.rotation.copy(current.current);
  });

  return (
    <>
      <group ref={group}>
        <FlipperModel
          highlight={activeId}
          lcdLit={activeId === "display" ? 1 : 0.55}
          glow={activeId ? 0.9 : 0.45}
          autoRotate={false}
          scale={1.05}
        />
      </group>
      {activeFeature && (
        <ActiveCallout
          key={activeFeature.id}
          feature={activeFeature}
          rotationRef={current}
          onSelect={onSelect}
          portal={portal}
        />
      )}
    </>
  );
}

export function HardwareScene({ activeId, onSelect }: Props) {
  const reduced = useReducedMotion();
  const feature = HARDWARE_FEATURES.find((f) => f.id === activeId);
  const portalRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={portalRef}
      className="relative h-[60vh] min-h-[420px] w-full overflow-visible rounded-[2rem] border border-black/10 bg-[#f7f7f7]"
    >
      <Canvas
        dpr={reduced ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [0.2, 0.9, 4.2], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="rounded-[2rem]"
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#f7f7f7"]} />
          <ambientLight intensity={0.75} />
          <directionalLight
            position={[3, 4, 2]}
            intensity={1.25}
            color="#ffffff"
          />
          <pointLight position={[-2, 1, 2]} color="#FF8200" intensity={1.2} />
          <FloatingParticles count={50} />
          <SmoothRotatingModel
            activeId={activeId}
            onSelect={onSelect}
            portal={portalRef}
          />
        </Suspense>
      </Canvas>
      {feature && (
        <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 rounded-2xl border border-[#FF8200]/30 bg-white/95 p-4 shadow-sm backdrop-blur md:max-w-sm">
          <p className="font-[family-name:var(--font-space)] text-sm text-[#FF8200]">
            {feature.title}
          </p>
          <p className="mt-1 text-sm text-black/70">{feature.description}</p>
        </div>
      )}
    </div>
  );
}
