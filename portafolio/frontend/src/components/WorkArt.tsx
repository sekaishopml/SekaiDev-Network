import type { ReactElement } from "react";
import styles from "./WorkArt.module.css";

type WorkSlug = "crm" | "websites" | "api" | "dashboards";

interface WorkArtProps {
  slug: WorkSlug;
  label?: string;
}

function CrmArt() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 220 70"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <path
        className={styles.crmLine}
        d="M18 36 H70 Q90 36 90 22 H130 Q150 22 150 36 H202"
      />
      <circle className={styles.crmNode} cx="18" cy="36" r="6" />
      <circle className={styles.crmNode} cx="90" cy="22" r="6" />
      <circle className={`${styles.crmNode} ${styles.crmNodeAccent}`} cx="150" cy="36" r="6">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle className={styles.crmNode} cx="202" cy="36" r="6" />
      <circle className={styles.crmPacket} cx="18" cy="36" r="3.5">
        <animateMotion
          dur="3.2s"
          repeatCount="indefinite"
          path="M0 0 H52 Q72 0 72 -14 H112 Q132 -14 132 0 H184"
        />
      </circle>
      <rect className={styles.crmCard} x="98" y="40" width="44" height="18" rx="2" />
      <rect className={styles.crmCard} x="148" y="44" width="36" height="14" rx="2" style={{ animationDelay: "0.4s" }} />
    </svg>
  );
}

function WebsitesArt() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 220 70"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect className={styles.webFrame} x="35" y="8" width="150" height="48" rx="3" />
      <rect className={styles.webBar} x="43" y="16" width="70" height="6" rx="1" style={{ transformOrigin: "43px 19px" }} />
      <rect className={styles.webBlock} x="43" y="28" width="48" height="20" rx="2" />
      <rect className={styles.webBlock} x="99" y="28" width="74" height="20" rx="2" style={{ animationDelay: "0.25s" }} />
      <path
        className={styles.webCursor}
        d="M178 26 L190 34 L184 35.5 L188 44 L185 45 L181 36.5 L176 40 Z"
      />
    </svg>
  );
}

function ApiArt() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 220 70"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect className={styles.apiServer} x="18" y="16" width="36" height="40" rx="3" />
      <rect className={styles.apiServer} x="166" y="16" width="36" height="40" rx="3" />
      <line className={styles.apiLine} x1="58" y1="28" x2="162" y2="28" />
      <line className={styles.apiLine} x1="58" y1="44" x2="162" y2="44" style={{ animationDelay: "0.4s" }} />
      <circle className={styles.apiDot} cx="58" cy="28" r="3.5">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M0 0 H104" />
      </circle>
      <circle className={styles.apiDot} cx="58" cy="44" r="3.5">
        <animateMotion
          dur="2.4s"
          begin="0.55s"
          repeatCount="indefinite"
          path="M0 0 H104"
        />
      </circle>
      <path className={styles.apiBrace} d="M78 20 H92 V52 H78" />
      <path className={styles.apiBrace} d="M128 20 H114 V52 H128" style={{ animationDelay: "0.3s" }} />
    </svg>
  );
}

function DashboardsArt() {
  return (
    <svg
      className={styles.scene}
      viewBox="0 0 220 70"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect className={styles.dashBar} x="24" y="38" width="14" height="22" rx="1" style={{ animationDelay: "0s", transformOrigin: "31px 60px" }} />
      <rect className={styles.dashBarAccent} x="46" y="24" width="14" height="36" rx="1" style={{ animationDelay: "0.15s", transformOrigin: "53px 60px" }} />
      <rect className={styles.dashBar} x="68" y="32" width="14" height="28" rx="1" style={{ animationDelay: "0.3s", transformOrigin: "75px 60px" }} />
      <rect className={styles.dashBarAccent} x="90" y="18" width="14" height="42" rx="1" style={{ animationDelay: "0.45s", transformOrigin: "97px 60px" }} />
      <path
        className={styles.dashLine}
        d="M120 48 C132 48 136 28 148 28 C160 28 164 42 176 36 C188 30 194 22 204 22"
      />
      <circle className={styles.dashAlert} cx="204" cy="18" r="4" style={{ transformOrigin: "204px 18px" }} />
    </svg>
  );
}

const SCENES: Record<WorkSlug, () => ReactElement> = {
  crm: CrmArt,
  websites: WebsitesArt,
  api: ApiArt,
  dashboards: DashboardsArt,
};

export default function WorkArt({ slug, label = "CAPABILITY" }: WorkArtProps) {
  const Scene = SCENES[slug];
  return (
    <div className={`${styles.art} ${styles[`art--${slug}`]}`} aria-hidden>
      <Scene />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
