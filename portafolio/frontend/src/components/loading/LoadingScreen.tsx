import BlossomSpinner from "./BlossomSpinner";

export default function LoadingScreen() {
  return (
    <div
      id="sekaidev-loader"
      className="fixed inset-0 z-[100] overflow-hidden will-change-transform"
      style={{
        transform: "translate3d(0, 0, 0)",
        opacity: 1,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Knockout SVG: full-screen white overlay with SEKAIDEV-shaped holes */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
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

            {/* Mobile letters */}
            <text
              x="50"
              y="48"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="10"
              fontFamily="var(--font-oswald)"
              fontWeight="700"
              className="md:hidden"
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
              fontFamily="var(--font-oswald)"
              fontWeight="700"
              className="hidden md:inline"
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

        {/* Solid SEKAIDEV text on top, fades out to reveal the knockout */}
        <text
          id="sekaidev-loader-text"
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="10"
          fontFamily="var(--font-oswald)"
          fontWeight="700"
          className="md:hidden transition-opacity duration-1000 ease-out"
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
          fontFamily="var(--font-oswald)"
          fontWeight="700"
          className="hidden md:inline transition-opacity duration-1000 ease-out"
        >
          SEKAIDEV
        </text>
      </svg>

      <span
        id="sekaidev-loader-subtitle"
        className="absolute top-[60%] left-0 right-0 z-10 text-center text-[10px] tracking-[0.3em] uppercase text-black/60 transition-opacity duration-1000 ease-out"
      >
        Loading experience
      </span>

      <div
        id="sekaidev-loader-spinner"
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex flex-col items-center gap-3 transition-opacity duration-1000 ease-out"
      >
        <BlossomSpinner />
      </div>
    </div>
  );
}
