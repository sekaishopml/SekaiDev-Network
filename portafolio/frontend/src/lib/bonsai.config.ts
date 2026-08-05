// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.
// Camera is top-down: +X = right on screen, +Z = down on screen.

export const BONSAI_CONFIG = {
  // Camera settings
  camera: {
    // Top-down view with a tighter lens so scale 18 fills the screen
    position: [0, 5.5, 0.2] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    // World -Z points up on screen; +Z moves the model down
    up: [0, 0, -1] as [number, number, number],
    fov: 24,
    near: 0.1,
    far: 100,
  },

  // Main model transform (desktop rest — horizontal unchanged, height raised)
  bonsai: {
    // Same X as before (right of copy). Z≈0 = optical vertical center (~54vh).
    // Previous z: 0.28 sat too low on the hero.
    position: [1.2, -0.55, 0] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    scale: 7.8,
  },

  /**
   * Mobile hero: keep canopy in the lower half after curtain.
   * Scroll intro uses the same coverBoost growth as desktop.
   */
  mobile: {
    /** Compact canopy — leaves room for headline + bottom cues */
    scaleFactor: 0.52,
    /** Camera balanced for mobile canopy */
    cameraY: 7.0,
    /** Reveal — lower half already */
    zCenter: 0.42,
    /** After curtain — sit under CTAs, clear of scroll cue */
    zSettled: 0.95,
    /** coverBoost ceiling during scroll intro (matches desktop feel) */
    coverBoostMax: 3.2,
  },

  // Auto-rotation
  // Cylindrical / turntable rotation around the vertical Y axis
  animation: {
    rotationSpeed: 0.15,
  },

  // Lights
  lights: {
    ambient: { intensity: 0.8 },
    directional: [
      { position: [5, 8, 5] as [number, number, number], intensity: 1.5 },
      { position: [-5, 4, -5] as [number, number, number], intensity: 0.6 },
    ],
    point: [
      { position: [0, 4, 0] as [number, number, number], intensity: 0.8 },
    ],
  },
} as const;
