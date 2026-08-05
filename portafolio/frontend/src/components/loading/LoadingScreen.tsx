import BlossomSpinner from "./BlossomSpinner";

/**
 * Loader curtain — SEKAIDEV as a single word (knockout aperture).
 * Solid type fades; letters stay cut out so the centered bonsai shows through.
 */
export default function LoadingScreen() {
  return (
    <div
      id="sekaidev-loader"
      className="fixed inset-0 z-[100] overflow-hidden will-change-transform"
      style={{
        transform: "translate3d(0, 0, 0) scaleY(1)",
        transformOrigin: "50% 0%",
        opacity: 1,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Knockout SVG: full-screen overlay with SEKAIDEV-shaped holes */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          <mask
            id="sekaidev-loader-mask"
            x="0"
            y="0"
            width="100"
            height="100"
            maskUnits="userSpaceOnUse"
            mask-type="luminance"
          >
            <rect width="100" height="100" fill="white" />

            {/* Mobile letters — single word, centered */}
            <text
              x="50"
              y="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="10"
              fontWeight="700"
              className="md:hidden"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              SEKAIDEV
            </text>

            {/* Desktop letters */}
            <text
              x="50"
              y="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="15"
              fontWeight="700"
              className="hidden md:inline"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              SEKAIDEV
            </text>
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          fill="white"
          mask="url(#sekaidev-loader-mask)"
        />

        {/* Solid SEKAIDEV on top — fades to reveal knockout + bonsai */}
        <text
          id="sekaidev-loader-text"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="10"
          fontWeight="700"
          className="md:hidden transition-opacity"
          style={{ fontFamily: "var(--font-oswald), sans-serif" }}
        >
          SEKAIDEV
        </text>
        <text
          id="sekaidev-loader-text-desktop"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="15"
          fontWeight="700"
          className="hidden md:inline transition-opacity"
          style={{ fontFamily: "var(--font-oswald), sans-serif" }}
        >
          SEKAIDEV
        </text>
      </svg>

      <span
        id="sekaidev-loader-subtitle"
        className="absolute top-[60%] left-0 right-0 z-10 text-center font-sans text-[10px] tracking-[0.3em] uppercase text-black/60 transition-opacity"
      >
        Loading experience
      </span>

      <div
        id="sekaidev-loader-spinner"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity"
      >
        <BlossomSpinner />
      </div>
    </div>
  );
}
