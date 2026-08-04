"use client";

import { useRef, useEffect, useMemo, memo, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";
import { useViewport } from "@/hooks/useViewport";
import CameraController from "./CameraController";

export interface TrackMetrics {
  width: number;
  height: number;
  ratioW: number;
  ratioH: number;
  innerScale?: number;
}

interface BonsaiProps {
  onLoaded?: () => void;
  baseScale?: number;
  position?: [number, number, number];
  /** Mobile: start z (centered) before post-curtain settle */
  settleFromZ?: number;
  /** Mobile: end z after curtain settle (lower on screen) */
  settleToZ?: number;
  coverBoostMax?: number;
  trackRef?: RefObject<TrackMetrics | null>;
}

const Bonsai = memo(function Bonsai({
  onLoaded,
  baseScale = BONSAI_CONFIG.bonsai.scale,
  position = BONSAI_CONFIG.bonsai.position,
  settleFromZ,
  settleToZ,
  coverBoostMax = 3.4,
  trackRef,
}: BonsaiProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const targetScaleVec = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const targetZRef = useRef(
    settleFromZ !== undefined ? settleFromZ : position[2]
  );
  const settleSpeedRef = useRef(8);
  const didInitZ = useRef(false);

  useEffect(() => {
    onLoaded?.();
  }, [onLoaded]);

  // Mobile: centered on reveal → drop after curtain + hold
  useEffect(() => {
    if (settleFromZ === undefined || settleToZ === undefined) {
      targetZRef.current = position[2];
      return;
    }

    targetZRef.current = settleFromZ;
    settleSpeedRef.current = 8;
    let timeoutId = 0;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const startSettle = () => {
      if (reduced) {
        targetZRef.current = settleToZ;
        settleSpeedRef.current = 40;
        return;
      }
      timeoutId = window.setTimeout(() => {
        targetZRef.current = settleToZ;
        // Smooth settle ≈ bonsaiSettleDuration
        settleSpeedRef.current = 2.8;
      }, HERO_ENTRANCE.bonsaiSettleDelay * 1000);
    };

    if (document.documentElement.dataset.loader === "done") {
      startSettle();
    } else {
      window.addEventListener("sekaidev:loader-dismissed", startSettle, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("sekaidev:loader-dismissed", startSettle);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [settleFromZ, settleToZ, position]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Snap initial z once so we don't lerp from desktop default
    if (!didInitZ.current) {
      group.position.z = targetZRef.current;
      didInitZ.current = true;
    }

    const metrics = trackRef?.current;
    if (!metrics) return;

    const { ratioW, ratioH, innerScale = 1 } = metrics;
    const minRatio = Math.min(ratioW, ratioH);

    // Hero (ratio≈1): coverBoost = 1 → default size unchanged.
    // End rectangle: stronger boost so blossoms dominate the framed stage
    // (still capped to avoid zooming into empty foliage gaps).
    const coverBoost = THREE.MathUtils.clamp(
      1 / Math.max(minRatio, 0.28),
      1,
      coverBoostMax
    );
    const scrollShrink = THREE.MathUtils.clamp(innerScale, 0.9, 1);
    const targetScale = baseScale * 1.08 * coverBoost * scrollShrink;

    const damping = 1 - Math.exp(-12 * delta);
    targetScaleVec.setScalar(targetScale);
    group.scale.lerp(targetScaleVec, damping);

    const zDamp = 1 - Math.exp(-settleSpeedRef.current * delta);
    group.position.z = THREE.MathUtils.lerp(
      group.position.z,
      targetZRef.current,
      zDamp
    );

    group.rotation.y += delta * BONSAI_CONFIG.animation.rotationSpeed;
  });

  const startZ =
    settleFromZ !== undefined ? settleFromZ : position[2];

  return (
    <group
      ref={groupRef}
      position={[position[0], position[1], startZ]}
    >
      <Center>
        <primitive
          object={clonedScene}
          rotation={BONSAI_CONFIG.bonsai.rotation}
          scale={1}
        />
      </Center>
    </group>
  );
});

interface BonsaiSceneProps {
  onLoaded?: () => void;
  trackRef?: RefObject<TrackMetrics | null>;
}

const BonsaiScene = memo(function BonsaiScene({
  onLoaded,
  trackRef,
}: BonsaiSceneProps) {
  const width = useViewport();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const mobile = BONSAI_CONFIG.mobile;

  const { scale: baseScale, cameraConfig, position, settleFromZ, settleToZ, coverBoostMax } =
    useMemo(() => {
      if (isMobile) {
        return {
          scale: BONSAI_CONFIG.bonsai.scale * mobile.scaleFactor,
          settleFromZ: mobile.zCenter,
          settleToZ: mobile.zSettled,
          coverBoostMax: mobile.coverBoostMax,
          position: [
            BONSAI_CONFIG.bonsai.position[0],
            BONSAI_CONFIG.bonsai.position[1],
            mobile.zCenter,
          ] as [number, number, number],
          cameraConfig: {
            ...BONSAI_CONFIG.camera,
            position: [0, mobile.cameraY, 0.2] as [number, number, number],
          },
        };
      }

      const scale = isTablet
        ? BONSAI_CONFIG.bonsai.scale * 0.85
        : BONSAI_CONFIG.bonsai.scale;

      return {
        scale,
        settleFromZ: undefined as number | undefined,
        settleToZ: undefined as number | undefined,
        coverBoostMax: 3.4,
        position: [...BONSAI_CONFIG.bonsai.position] as [number, number, number],
        cameraConfig: {
          ...BONSAI_CONFIG.camera,
          position: [0, BONSAI_CONFIG.camera.position[1], 0.2] as [
            number,
            number,
            number,
          ],
        },
      };
    }, [isMobile, isTablet, mobile]);

  const { lights } = BONSAI_CONFIG;

  return (
    <>
      <CameraController cameraConfig={cameraConfig} />
      <ambientLight intensity={lights.ambient.intensity} />
      {lights.directional.map((light) => (
        <directionalLight
          key={light.position.join("-")}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      {lights.point.map((light) => (
        <pointLight
          key={light.position.join("-")}
          position={light.position}
          intensity={light.intensity}
        />
      ))}
      {/* Black frame fill comes from CSS on #intro-bonsai-frame — no 3D plane */}
      <Bonsai
        onLoaded={onLoaded}
        baseScale={baseScale}
        position={position}
        settleFromZ={settleFromZ}
        settleToZ={settleToZ}
        coverBoostMax={coverBoostMax}
        trackRef={trackRef}
      />
    </>
  );
});

interface BonsaiCanvasProps {
  visible?: boolean;
  zIndex?: number;
}

export const BonsaiCanvas = memo(function BonsaiCanvas({
  visible = true,
  zIndex = 1,
}: BonsaiCanvasProps) {
  return (
    <Canvas
      id="bonsai-canvas"
      frameloop={visible ? "always" : "never"}
      camera={{
        fov: BONSAI_CONFIG.camera.fov,
        near: BONSAI_CONFIG.camera.near,
        far: BONSAI_CONFIG.camera.far,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: visible ? zIndex : 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <View.Port />
    </Canvas>
  );
});

export { BonsaiScene };
