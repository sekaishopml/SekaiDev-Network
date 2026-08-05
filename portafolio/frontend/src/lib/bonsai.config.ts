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

  // Main model transform (desktop rest after post-curtain settle)
  bonsai: {
    // Rest X = right of copy. Reveal starts at X=0 (center), then settles here.
    // Z≈0 = optical vertical center (~54vh).
    position: [1.2, -0.55, 0] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    scale: 7.8,
  },

  /**
   * Mobile: big centered reveal on load → settle just under SEE IF WE FIT.
   * LOOK-only fill uses zFramed + frameScaleBoost when the View shrinks.
   */
  mobile: {
    /** Settled — under CTA, not glued to the bottom */
    scaleFactor: 0.5,
    /** Load / curtain — fills the phone, optically centered */
    scaleFactorReveal: 0.9,
    /** Camera for large centered reveal */
    cameraY: 6.8,
    /** Reveal — screen center (Z≈0) */
    zCenter: 0.06,
    /** Settled — near SEE IF WE FIT, slight gap below */
    zSettled: 0.88,
    /** LOOK frame only — optical center of the View */
    zFramed: 0.02,
    /** LOOK frame only — extra fill once ratioH drops */
    frameScaleBoost: 1.85,
    /** Ceiling for LOOK coverBoost (hero ratio≈1 → boost 1) */
    coverBoostMax: 5.8,
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
