"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BONSAI_CONFIG } from "@/lib/bonsai.config";

type CameraConfig = typeof BONSAI_CONFIG.camera;

interface CameraControllerProps {
  cameraConfig?: CameraConfig;
}

export default function CameraController({ cameraConfig }: CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    const config = cameraConfig ?? BONSAI_CONFIG.camera;
    camera.position.set(...config.position);
    if (config.up) {
      camera.up.set(...config.up);
    }
    if (config.target) {
      camera.lookAt(new THREE.Vector3(...config.target));
    }
  }, [camera, cameraConfig]);

  return null;
}
