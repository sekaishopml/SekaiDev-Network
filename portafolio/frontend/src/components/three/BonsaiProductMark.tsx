"use client";

import { Suspense, memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { getPerfProfile } from "@/lib/perf";

const CFG = BONSAI_CONFIG.product;

/**
 * True only while the home hero WebGL canvas is actually mounted and owning
 * the intro/overlay. Leftover data-intro from a prior /es visit must NOT
 * block the /precios mark (that left the canvas blank after navbar round-trips).
 */
function heroWebglBusy(): boolean {
  if (typeof document === "undefined") return false;
  if (!document.getElementById("bonsai-canvas")) return false;
  const { intro, overlay } = document.documentElement.dataset;
  if (intro === "hero" || intro === "animating") return true;
  if (overlay === "on" || overlay === "exiting") return true;
  return false;
}

/** Drop stale home intro flags so /precios never inherits a stuck GPU gate. */
function clearStaleHeroIntroFlags() {
  if (typeof document === "undefined") return;
  if (document.getElementById("bonsai-canvas")) return;
  const root = document.documentElement;
  if (root.dataset.intro === "hero" || root.dataset.intro === "animating") {
    root.dataset.intro = "done";
  }
  if (root.dataset.overlay === "on" || root.dataset.overlay === "exiting") {
    root.dataset.overlay = "off";
  }
}

function ProductCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.up.set(...CFG.camera.up);
    camera.position.set(...CFG.camera.position);
    camera.lookAt(...CFG.camera.target);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function StandingBonsai({ spinning }: { spinning: boolean }) {
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);
  const spin =
    getPerfProfile().tier === "low" ? 0 : CFG.animation.rotationSpeed;

  useFrame((_, delta) => {
    if (!group.current || !spinning || !spin) return;
    // Continuous unbounded yaw — never reset / never clip to a finite loop.
    group.current.rotation.y += delta * spin;
  });

  return (
    <group ref={group} position={CFG.bonsai.position}>
      <Center>
        <primitive
          object={cloned}
          rotation={CFG.bonsai.rotation}
          scale={CFG.bonsai.scale}
        />
      </Center>
    </group>
  );
}

/** Kick the R3F loop once when we switch back to always. */
function ResumeFrames({ active }: { active: boolean }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);
  return null;
}

type Props = {
  className?: string;
};

/**
 * Small product-mark canvas for Pricing intro.
 * Own Canvas (not hero View.Port). Continuous frameloop while on-screen.
 * Standing Y-up pose — contrast with hero top-down BONSAI_CONFIG.
 */
function BonsaiProductMark({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [gpuFree, setGpuFree] = useState(true);
  const perf = getPerfProfile();
  const active = visible && gpuFree;

  useEffect(() => {
    clearStaleHeroIntroFlags();
    setGpuFree(!heroWebglBusy());

    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0.05);
      },
      { root: null, threshold: [0, 0.05, 0.2, 0.5], rootMargin: "80px" }
    );
    io.observe(el);

    const syncGpu = () => {
      clearStaleHeroIntroFlags();
      setGpuFree(!heroWebglBusy());
    };

    const mo = new MutationObserver(syncGpu);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro", "data-overlay"],
    });

    // Re-check after route paint — home canvas may still be tearing down.
    const t = window.setTimeout(syncGpu, 0);
    const t2 = window.setTimeout(syncGpu, 120);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const lights = CFG.lights;

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, perf.maxDpr]}
        camera={{
          position: CFG.camera.position,
          fov: CFG.camera.fov,
          near: CFG.camera.near,
          far: CFG.camera.far,
        }}
        gl={{
          antialias: perf.antialias,
          alpha: true,
          powerPreference: perf.lowPowerGpu ? "low-power" : "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ResumeFrames active={active} />
        <ProductCamera />
        <ambientLight intensity={lights.ambient.intensity} />
        {lights.directional.map((light, i) => (
          <directionalLight
            key={`d-${i}`}
            position={light.position}
            intensity={light.intensity}
          />
        ))}
        {lights.point.map((light, i) => (
          <pointLight
            key={`p-${i}`}
            position={light.position}
            intensity={light.intensity}
          />
        ))}
        <Suspense fallback={null}>
          <StandingBonsai spinning={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(ASSETS.model, ASSETS.dracoPath);

export default memo(BonsaiProductMark);
