// Bonsai 3D scene configuration
// Edit these values to adjust the model position, rotation, scale, camera and lights.

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

  // Main model transform
  bonsai: {
    // Centered in the framed hero
    position: [0, -0.6, 0.2] as [number, number, number],

    // Starting rotation in radians (x, y, z)
    // Y rotation so the flowers face the camera
    rotation: [0, Math.PI, 0] as [number, number, number],

    // Full-screen hero presence; coverBoost fills the framed rectangle.
    scale: 9,
  },

  /**
   * Mobile hero: large + centered after curtain, then settle down.
   * Scroll intro uses the same coverBoost growth as desktop.
   */
  mobile: {
    /** Slightly under desktop — readable but not overwhelming */
    scaleFactor: 0.78,
    /** Camera balanced for mobile canopy */
    cameraY: 6.2,
    /** Reveal — mid-viewport center */
    zCenter: -0.18,
    /** After curtain — soft drop into the lower third */
    zSettled: 0.48,
    /** coverBoost ceiling during scroll intro (matches desktop feel) */
    coverBoostMax: 3.4,
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
