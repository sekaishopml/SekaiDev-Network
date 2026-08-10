"use client";

import {
  Suspense,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ASSETS } from "@/lib/constants";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";
import { getPerfProfile } from "@/lib/perf";

const CFG = BONSAI_CONFIG.static;

function StaticCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...CFG.camera.position);
    camera.up.set(...CFG.camera.up);
    camera.lookAt(new THREE.Vector3(...CFG.camera.target));
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = CFG.camera.fov;
      camera.near = CFG.camera.near;
      camera.far = CFG.camera.far;
      camera.updateProjectionMatrix();
    }
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

/** True when hero WebGL owns the GPU (intro or LOOK overlay). */
function heroWebglBusy(): boolean {
  if (typeof document === "undefined") return true;
  const { intro, overlay } = document.documentElement.dataset;
  if (intro === "hero" || intro === "animating") return true;
  if (overlay === "on" || overlay === "exiting") return true;
  return false;
}

type Props = {
  className?: string;
};

/**
 * Upright product-mark bonsai for Pricing (and similar).
 * Dedicated small Canvas — never shares hero View.Port / #bonsai-canvas.
 * useGLTF shares the hero GLTF cache; frameloop="demand" when offscreen.
 *
 * Mount in a ~152–184px stage for ~120–180px visual canopy.
 */
function BonsaiStatic({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const perf = getPerfProfile();
  const { lights } = CFG;

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

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "demand"}
        dpr={[1, Math.min(perf.maxDpr, 1.25)]}
        camera={{
          position: CFG.camera.position,
          fov: CFG.camera.fov,
          near: CFG.camera.near,
          far: CFG.camera.far,
        }}
        gl={{
          antialias: perf.antialias,
          alpha: true,
          powerPreference: perf.lowPowerGpu
            ? "low-power"
            : "high-performance",
          stencil: false,
        }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <StaticCamera />
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
        <Suspense fallback={null}>
          <StandingBonsai active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(ASSETS.model, ASSETS.dracoPath);

export default memo(BonsaiStatic);
