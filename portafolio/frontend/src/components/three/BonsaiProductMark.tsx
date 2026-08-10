"use client";

import { Suspense, memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { getPerfProfile } from "@/lib/perf";

const CFG = BONSAI_CONFIG.product;

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

function StandingBonsai({ active }: { active: boolean }) {
  const { scene } = useGLTF(ASSETS.model, ASSETS.dracoPath);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const group = useRef<THREE.Group>(null);
  const spin =
    getPerfProfile().tier === "low" ? 0 : CFG.animation.rotationSpeed;

  useFrame((_, delta) => {
    if (!group.current || !active || !spin) return;
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

type Props = {
  className?: string;
};

/**
 * Small product-mark canvas for Pricing intro.
 * Own Canvas (not hero View.Port) — demand loop when offscreen.
 * Standing Y-up pose — contrast with hero top-down BONSAI_CONFIG.
 */
function BonsaiProductMark({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const perf = getPerfProfile();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(!heroWebglBusy());
      return;
    }

    let intersecting = false;

    const sync = () => {
      setActive(intersecting && !heroWebglBusy());
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting =
          entry.isIntersecting && entry.intersectionRatio > 0.12;
        sync();
      },
      { root: null, threshold: [0, 0.12, 0.35], rootMargin: "40px" }
    );
    io.observe(el);

    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-intro", "data-overlay"],
    });

    sync();
    return () => {
      io.disconnect();
      mo.disconnect();
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
        style={{ width: "100%", height: "100%", display: "block" }}
      >
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
          <StandingBonsai active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(ASSETS.model, ASSETS.dracoPath);

export default memo(BonsaiProductMark);
