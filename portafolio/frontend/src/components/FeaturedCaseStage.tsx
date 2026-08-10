"use client";

import styles from "./FeaturedCase.module.css";

const ROUTE_D = "M36 118C88 42 138 132 198 72S300 34 384 90";

interface FeaturedCaseStageUi {
  aria: string;
  product: string;
  live: string;
  pickup: string;
  pickupPlace: string;
  dropoff: string;
  dropoffPlace: string;
  status: string;
  eta: string;
}

interface FeaturedCaseStageProps {
  ui: FeaturedCaseStageUi;
}

export default function FeaturedCaseStage({ ui }: FeaturedCaseStageProps) {
  return (
    <div className={styles.stageCol}>
      <div className={styles.stage} role="img" aria-label={ui.aria}>
        <div className={styles.stageGlow} aria-hidden="true" />

        <div className={styles.stageChrome} aria-hidden="true">
          <span className={`${styles.hudBit} ${styles.stageProduct}`}>
            {ui.product}
          </span>
          <span className={`${styles.hudBit} ${styles.liveBadge}`}>
            <span className={styles.liveDot} />
            {ui.live}
          </span>
        </div>

        <div className={styles.mapPane} aria-hidden="true">
          <svg className={styles.routeSvg} viewBox="0 0 420 160" fill="none">
            <g className={styles.mapGrid} opacity="0.45">
              <path d="M0 40H420M0 80H420M0 120H420" />
              <path d="M70 0V160M140 0V160M210 0V160M280 0V160M350 0V160" />
            </g>
            <path
              className={styles.blockGhost}
              d="M52 28h48v34H52zM168 18h56v28h-56zM292 44h64v36h-64zM98 96h70v38H98zM248 102h78v30h-78z"
            />
            <path className={styles.routePathGhost} d={ROUTE_D} />
            <path className={styles.routePath} d={ROUTE_D} />

            <g className={styles.routeStop} transform="translate(36 118)">
              <circle r="11" className={styles.stopHalo} />
              <circle r="5.5" className={styles.stopCore} />
              <text y="-14" textAnchor="middle" className={styles.stopLetter}>
                A
              </text>
            </g>
            <g className={styles.routeStop} transform="translate(384 90)">
              <circle r="11" className={styles.stopHalo} />
              <circle r="5.5" className={styles.stopCoreB} />
              <text y="-14" textAnchor="middle" className={styles.stopLetter}>
                B
              </text>
            </g>

            <g className={styles.routeCar}>
              <rect
                x="-9"
                y="-5"
                width="18"
                height="10"
                rx="3"
                className={styles.carBody}
              />
              <rect
                x="-5"
                y="-3.2"
                width="7"
                height="6.4"
                rx="1.2"
                className={styles.carCab}
              />
            </g>
          </svg>
        </div>

        <div className={styles.tripHud} aria-hidden="true">
          <div className={`${styles.hudBit} ${styles.tripStops}`}>
            <p>
              <span>A</span>
              {ui.pickup} · {ui.pickupPlace}
            </p>
            <p>
              <span>B</span>
              {ui.dropoff} · {ui.dropoffPlace}
            </p>
          </div>
          <div className={`${styles.hudBit} ${styles.tripMeta}`}>
            <span>{ui.status}</span>
            <strong>{ui.eta}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
