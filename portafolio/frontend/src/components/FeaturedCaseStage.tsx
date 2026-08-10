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
  tabApp: string;
  tabCrm: string;
  tabMap: string;
  crmTitle: string;
  crmTrip: string;
  crmDriver: string;
  crmQueue: string;
  gps: string;
}

interface FeaturedCaseStageProps {
  ui: FeaturedCaseStageUi;
}

export default function FeaturedCaseStage({ ui }: FeaturedCaseStageProps) {
  return (
    <div className={styles.stageCol}>
      <div className={styles.stage} role="img" aria-label={ui.aria}>
        <div className={styles.stageGlow} aria-hidden="true" />

        <header className={styles.stageChrome} aria-hidden="true">
          <div className={styles.windowChrome}>
            <span className={styles.windowDot} data-tone="close" />
            <span className={styles.windowDot} data-tone="min" />
            <span className={styles.windowDot} data-tone="max" />
          </div>

          <span className={`${styles.hudBit} ${styles.stageProduct}`}>
            {ui.product}
          </span>

          <nav className={`${styles.hudBit} ${styles.stageTabs}`}>
            <span className={styles.tab}>{ui.tabApp}</span>
            <span className={`${styles.tab} ${styles.tabActive}`}>{ui.tabCrm}</span>
            <span className={`${styles.tab} ${styles.tabActiveSoft}`}>{ui.tabMap}</span>
          </nav>

          <span className={`${styles.hudBit} ${styles.liveBadge}`}>
            <span className={styles.liveDot} />
            {ui.live}
          </span>
        </header>

        <div className={styles.stageBody} aria-hidden="true">
          <aside className={`${styles.crmPane} ${styles.hudBit}`}>
            <p className={styles.crmTitle}>{ui.crmTitle}</p>
            <p className={styles.crmQueue}>{ui.crmQueue}</p>

            <article className={`${styles.crmCard} ${styles.crmCardActive}`}>
              <span className={styles.crmCardTag}>{ui.gps}</span>
              <p className={styles.crmCardTitle}>{ui.crmTrip}</p>
              <p className={styles.crmCardMeta}>{ui.crmDriver}</p>
              <div className={styles.crmProgress}>
                <span className={styles.crmProgressFill} />
              </div>
            </article>

            <article className={styles.crmCard}>
              <p className={styles.crmCardTitle}>#{ui.product.slice(0, 2)} · 1839</p>
              <p className={styles.crmCardMeta}>{ui.status}</p>
            </article>
          </aside>

          <div className={styles.mapPane}>
            <div className={styles.mapFog} />
            <span className={styles.mapGpsChip}>
              <span className={styles.mapGpsPulse} />
              {ui.gps}
            </span>

            <svg className={styles.routeSvg} viewBox="0 0 420 160" fill="none">
              <g className={styles.mapGrid} opacity="0.5">
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
                <circle r="14" className={styles.stopHalo} />
                <circle r="5.5" className={styles.stopCore} />
                <text y="-16" textAnchor="middle" className={styles.stopLetter}>
                  A
                </text>
              </g>
              <g className={styles.routeStop} transform="translate(384 90)">
                <circle r="14" className={styles.stopHalo} />
                <circle r="5.5" className={styles.stopCoreB} />
                <text y="-16" textAnchor="middle" className={styles.stopLetter}>
                  B
                </text>
              </g>

              <g className={styles.routeCar}>
                <circle r="16" className={styles.gpsRing} />
                <circle r="10" className={styles.gpsRing} style={{ animationDelay: "0.55s" }} />
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
        </div>

        <footer className={styles.tripHud} aria-hidden="true">
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
        </footer>
      </div>
    </div>
  );
}
