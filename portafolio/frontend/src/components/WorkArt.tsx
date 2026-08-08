import type { ReactElement } from "react";
import styles from "./WorkArt.module.css";

type WorkSlug = "crm" | "websites" | "api" | "dashboards";

interface WorkArtProps {
  slug: WorkSlug;
  label?: string;
  /** Slim mark for inline offer rows — no card chrome. */
  compact?: boolean;
}

/** Shared viewBox — compositions designed around the optical center. */
const VB = "0 0 320 120";

function CrmArt() {
  return (
    <svg className={styles.scene} viewBox={VB} preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="wa-crm-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(22,20,22,0.18)" />
          <stop offset="50%" stopColor="rgba(92,26,51,0.45)" />
          <stop offset="100%" stopColor="rgba(22,20,22,0.18)" />
        </linearGradient>
      </defs>
      <path
        className={styles.crmLine}
        d="M36 62 H96 Q118 62 118 40 H170 Q192 40 192 62 H284"
      />
      <circle className={styles.crmNode} cx="36" cy="62" r="7" />
      <circle className={styles.crmNode} cx="118" cy="40" r="7" />
      <circle className={`${styles.crmNode} ${styles.crmNodeAccent}`} cx="192" cy="62" r="7" />
      <circle className={styles.crmNode} cx="284" cy="62" r="7" />
      <circle className={styles.crmPacket} r="4">
        <animateMotion
          dur="4.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.4 0 0.2 1"
          path="M36 62 H96 Q118 62 118 40 H170 Q192 40 192 62 H284"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.08;0.88;1"
          dur="4.8s"
          repeatCount="indefinite"
        />
      </circle>
      <rect className={styles.crmCard} x="148" y="72" width="52" height="20" rx="2.5" />
      <rect
        className={styles.crmCard}
        x="210"
        y="78"
        width="42"
        height="16"
        rx="2.5"
        style={{ animationDelay: "0.55s" }}
      />
    </svg>
  );
}

function WebsitesArt() {
  return (
    <svg className={styles.scene} viewBox={VB} preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect className={styles.webFrame} x="56" y="18" width="208" height="72" rx="4" />
      <rect className={styles.webChrome} x="56" y="18" width="208" height="14" rx="4" />
      <circle className={styles.webDot} cx="70" cy="25" r="2.2" />
      <circle className={styles.webDot} cx="80" cy="25" r="2.2" />
      <circle className={styles.webDot} cx="90" cy="25" r="2.2" />
      <rect className={styles.webBar} x="72" y="42" width="88" height="7" rx="1.5" />
      <rect className={styles.webBlock} x="72" y="56" width="58" height="22" rx="2.5" />
      <rect
        className={styles.webBlock}
        x="140"
        y="56"
        width="100"
        height="22"
        rx="2.5"
        style={{ animationDelay: "0.35s" }}
      />
      <path
        className={styles.webCursor}
        d="M236 48 L248 56 L242 57.5 L246 66 L243 67 L239 58.5 L234 62 Z"
      />
    </svg>
  );
}

function ApiArt() {
  return (
    <svg className={styles.scene} viewBox={VB} preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect className={styles.apiServer} x="40" y="28" width="44" height="64" rx="4" />
      <rect className={styles.apiServer} x="236" y="28" width="44" height="64" rx="4" />
      <rect className={styles.apiSlot} x="50" y="42" width="24" height="4" rx="1" />
      <rect className={styles.apiSlot} x="50" y="52" width="24" height="4" rx="1" />
      <rect className={styles.apiSlot} x="50" y="62" width="18" height="4" rx="1" />
      <rect className={styles.apiSlot} x="246" y="42" width="24" height="4" rx="1" />
      <rect className={styles.apiSlot} x="246" y="52" width="24" height="4" rx="1" />
      <rect className={styles.apiSlot} x="246" y="62" width="18" height="4" rx="1" />
      <line className={styles.apiLine} x1="92" y1="48" x2="228" y2="48" />
      <line
        className={styles.apiLine}
        x1="92"
        y1="72"
        x2="228"
        y2="72"
        style={{ animationDelay: "0.5s" }}
      />
      <circle className={styles.apiDot} r="3.5">
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.45 0 0.2 1"
          path="M92 48 H228"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.85;1"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className={styles.apiDot} r="3.5">
        <animateMotion
          dur="3.2s"
          begin="0.7s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.45 0 0.2 1"
          path="M92 72 H228"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.85;1"
          dur="3.2s"
          begin="0.7s"
          repeatCount="indefinite"
        />
      </circle>
      <path className={styles.apiBrace} d="M118 36 H134 V84 H118" />
      <path
        className={styles.apiBrace}
        d="M202 36 H186 V84 H202"
        style={{ animationDelay: "0.4s" }}
      />
    </svg>
  );
}

function DashboardsArt() {
  return (
    <svg className={styles.scene} viewBox={VB} preserveAspectRatio="xMidYMid meet" aria-hidden>
      <line className={styles.dashAxis} x1="36" y1="92" x2="140" y2="92" />
      <rect className={styles.dashBar} x="44" y="58" width="16" height="34" rx="2" style={{ animationDelay: "0s" }} />
      <rect className={styles.dashBarAccent} x="70" y="40" width="16" height="52" rx="2" style={{ animationDelay: "0.12s" }} />
      <rect className={styles.dashBar} x="96" y="50" width="16" height="42" rx="2" style={{ animationDelay: "0.24s" }} />
      <rect className={styles.dashBarAccent} x="122" y="32" width="16" height="60" rx="2" style={{ animationDelay: "0.36s" }} />
      <path
        className={styles.dashLine}
        d="M168 78 C184 78 190 48 206 48 C222 48 228 68 244 58 C258 50 268 36 284 36"
      />
      <circle className={styles.dashAlert} cx="284" cy="36" r="4.5" />
    </svg>
  );
}

const SCENES: Record<WorkSlug, () => ReactElement> = {
  crm: CrmArt,
  websites: WebsitesArt,
  api: ApiArt,
  dashboards: DashboardsArt,
};

export default function WorkArt({
  slug,
  label = "CAPABILITY",
  compact = false,
}: WorkArtProps) {
  const Scene = SCENES[slug];
  return (
    <div
      className={`${styles.art} ${styles[`art--${slug}`]} ${compact ? styles.artCompact : ""}`}
      aria-hidden
    >
      <div className={styles.stage}>
        <Scene />
        {!compact ? <p className={styles.label}>{label}</p> : null}
      </div>
    </div>
  );
}
