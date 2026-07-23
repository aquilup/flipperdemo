"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";
import { useModelLoad } from "@/components/providers/ModelLoadProvider";

type FlipperModelProps = {
  lcdLit?: number;
  glow?: number;
  explode?: number;
  highlight?: string | null;
  autoRotate?: boolean;
  scale?: number;
};

const ORANGE = new THREE.Color("#FF8200");
const WHITE = new THREE.Color("#F4F4F4");
const BLACK = new THREE.Color("#111111");

function classifyPart(name: string) {
  const n = name.toLowerCase();
  if (n.includes("screen") || n.includes("display") || n.includes("lightpipe")) {
    return "screen";
  }
  if (
    n.includes("button") ||
    n.includes("navigation") ||
    n.includes("ok_button") ||
    n.includes("back_button")
  ) {
    return "button";
  }
  if (n.includes("top_cover") || n.includes("bottom_cover")) {
    return "cover";
  }
  if (n.includes("ir_window") || n.includes("micro_sd") || n.includes("screw")) {
    return "accent";
  }
  if (n.includes("gpio") || n.includes("mount")) {
    return "gpio";
  }
  return "body";
}

function matchesHighlight(name: string, highlight: string | null) {
  if (!highlight) return false;
  const n = name.toLowerCase();
  const map: Record<string, string[]> = {
    display: ["screen", "display", "lightpipe"],
    gpio: ["gpio", "mount", "manifold"],
    subghz: ["ir_window", "top_cover"],
    nfc: ["bottom_cover", "screen"],
    bluetooth: ["top_cover"],
    infrared: ["ir_window"],
    rfid: ["bottom_cover"],
    microsd: ["micro_sd"],
    usbc: ["bottom_cover", "mount"],
  };
  return (map[highlight] ?? []).some((k) => n.includes(k));
}

export function FlipperModel({
  lcdLit = 0.35,
  glow = 0.4,
  explode = 0,
  highlight = null,
  autoRotate = true,
  scale = 1,
}: FlipperModelProps) {
  const group = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const screenMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const obj = useLoader(OBJLoader, "/models/flipper.obj");
  const { markModelReady } = useModelLoad();

  useEffect(() => {
    markModelReady();
  }, [obj, markModelReady]);

  const model = useMemo(() => {
    const clone = obj.clone(true);
    screenMats.current = [];

    clone.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const kind = classifyPart(mesh.name || mesh.parent?.name || "");
      const mat = new THREE.MeshStandardMaterial({
        metalness: kind === "cover" ? 0.15 : 0.35,
        roughness: kind === "cover" ? 0.45 : 0.4,
      });

      if (kind === "cover") {
        mat.color.copy(ORANGE);
      } else if (kind === "screen") {
        mat.color.set("#0A0A0A");
        mat.emissive.copy(ORANGE);
        mat.emissiveIntensity = 0.4;
        mat.roughness = 0.25;
        screenMats.current.push(mat);
      } else if (kind === "button") {
        mat.color.copy(BLACK);
      } else if (kind === "accent" || kind === "gpio") {
        mat.color.set("#1A1A1A");
        mat.metalness = 0.6;
      } else {
        mat.color.copy(WHITE);
        mat.metalness = 0.2;
        mat.roughness = 0.55;
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = mat;
      mesh.userData.kind = kind;
      mesh.userData.basePosition = mesh.position.clone();
    });

    return clone;
  }, [obj]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat?.emissive) return;
      const name = mesh.name || mesh.parent?.name || "";
      const active = matchesHighlight(name, highlight);
      if (active) {
        mat.emissive.copy(ORANGE);
        mat.emissiveIntensity = 0.55 + glow * 0.4;
      } else if (mesh.userData.kind !== "screen") {
        mat.emissive.set("#000000");
        mat.emissiveIntensity = 0;
      }
    });
  }, [model, highlight, glow]);

  useFrame((_, dt) => {
    if (group.current && autoRotate && explode < 0.05) {
      group.current.rotation.y += dt * 0.28;
    }

    screenMats.current.forEach((mat) => {
      mat.emissiveIntensity = 0.25 + lcdLit * 1.8;
    });

    if (!root.current) return;
    root.current.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const base: THREE.Vector3 =
        mesh.userData.basePosition ?? mesh.position.clone();
      if (!mesh.userData.basePosition) {
        mesh.userData.basePosition = base.clone();
      }
      const kind = mesh.userData.kind as string;
      const name = (mesh.name || "").toLowerCase();
      let ox = 0;
      let oy = 0;
      let oz = 0;
      if (explode > 0) {
        if (kind === "cover" && name.includes("top")) oy = explode * 18;
        else if (kind === "cover" && name.includes("bottom")) oy = -explode * 18;
        else if (kind === "screen") {
          oy = explode * 28;
          oz = explode * 8;
        } else if (kind === "button") {
          oz = explode * 16;
          ox = explode * 10;
        } else if (kind === "accent") ox = -explode * 14;
        else oy = -explode * 8;
      }
      mesh.position.set(base.x + ox, base.y + oy, base.z + oz);
    });
  });

  return (
    <group ref={group} scale={scale}>
      <Center>
        <group ref={root} rotation={[-Math.PI / 2, 0, Math.PI]} scale={0.035}>
          <primitive object={model} />
        </group>
      </Center>
      <pointLight
        position={[0, 1.2, 2]}
        intensity={0.5 + glow * 1.2}
        color="#FF8200"
        distance={8}
      />
      <pointLight
        position={[-2, 0.6, 1]}
        intensity={0.35}
        color="#FFFFFF"
        distance={7}
      />
    </group>
  );
}
