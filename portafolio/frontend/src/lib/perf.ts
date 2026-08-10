/**
 * Runtime perf profile — gate heavy work on mobile / old PCs
 * without changing motion choreography on capable devices.
 */

export type PerfTier = "high" | "mid" | "low";

export type PerfProfile = {
  tier: PerfTier;
  /** Cap for canvas / WebGL devicePixelRatio */
  maxDpr: number;
  /** Hero TV grain pattern tile size */
  grainPatternSize: number;
  /** Paint every Nth frame (higher = cheaper) */
  grainFrameSkip: number;
  /** Three.js antialias */
  antialias: boolean;
  /** Prefer lower GPU power */
  lowPowerGpu: boolean;
  /** Coarse pointer / touch-first */
  coarse: boolean;
};

let cached: PerfProfile | null = null;

function readDeviceMemory(): number | undefined {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return nav.deviceMemory;
}

function readSaveData(): boolean {
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean };
  }).connection;
  return Boolean(conn?.saveData);
}

export function getPerfProfile(force = false): PerfProfile {
  if (cached && !force) return cached;
  if (typeof window === "undefined") {
    cached = {
      tier: "high",
      maxDpr: 1.5,
      grainPatternSize: 160,
      grainFrameSkip: 2,
      antialias: true,
      lowPowerGpu: false,
      coarse: false,
    };
    return cached;
  }

  const cores = navigator.hardwareConcurrency || 4;
  const mem = readDeviceMemory();
  const saveData = readSaveData();
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 899px)").matches;

  let score = 0;
  if (saveData) score += 3;
  if (reduced) score += 2;
  if (cores > 0 && cores <= 4) score += 2;
  if (cores > 0 && cores <= 2) score += 2;
  if (typeof mem === "number" && mem <= 4) score += 2;
  if (typeof mem === "number" && mem <= 2) score += 2;
  if (coarse) score += 1;
  if (narrow) score += 1;

  const tier: PerfTier = score >= 5 ? "low" : score >= 2 ? "mid" : "high";

  cached =
    tier === "low"
      ? {
          tier,
          maxDpr: 1,
          grainPatternSize: 96,
          grainFrameSkip: 4,
          antialias: false,
          lowPowerGpu: true,
          coarse,
        }
      : tier === "mid"
        ? {
            tier,
            maxDpr: 1.25,
            grainPatternSize: 128,
            grainFrameSkip: 3,
            antialias: !coarse,
            lowPowerGpu: coarse,
            coarse,
          }
        : {
            tier,
            maxDpr: 1.5,
            grainPatternSize: 160,
            grainFrameSkip: 2,
            antialias: true,
            lowPowerGpu: false,
            coarse,
          };

  return cached;
}

/** Early boot script — sets html[data-perf] before paint of heavy layers. */
export const PERF_BOOT_SCRIPT = `(function(){try{var c=navigator.hardwareConcurrency||4,m=navigator.deviceMemory,s=navigator.connection&&navigator.connection.saveData,q=0;if(s)q+=3;if(c<=4)q+=2;if(c<=2)q+=2;if(m&&m<=4)q+=2;if(m&&m<=2)q+=2;if(window.matchMedia("(pointer: coarse)").matches)q+=1;if(window.matchMedia("(max-width: 899px)").matches)q+=1;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)q+=2;document.documentElement.dataset.perf=q>=5?"low":q>=2?"mid":"high"}catch(e){}})();`;

export function applyPerfDataset(): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.perf = getPerfProfile().tier;
}
