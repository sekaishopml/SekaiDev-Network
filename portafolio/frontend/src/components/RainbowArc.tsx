import Image from "next/image";
import { HERO_ENTRANCE } from "@/lib/motion/heroEntrance";

export default function RainbowArc() {
  const origin = HERO_ENTRANCE.bloomOrigin;

  return (
    <div
      className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
      }}
    >
      {/* Center → out color bloom (GSAP owns --bloom-r + opacity) */}
      <div
        data-hero-bloom
        className="absolute inset-0 z-0 will-change-[clip-path,opacity]"
        style={{
          opacity: 0,
          ["--bloom-r" as string]: HERO_ENTRANCE.bloomClipStart,
          clipPath: `circle(var(--bloom-r) at ${origin})`,
          WebkitClipPath: `circle(var(--bloom-r) at ${origin})`,
          backgroundImage: [
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(232,150,175,0.52), transparent 62%)",
            "radial-gradient(ellipse 55% 45% at 32% 48%, rgba(160,190,230,0.30), transparent 58%)",
            "radial-gradient(ellipse 50% 40% at 68% 42%, rgba(240,200,150,0.26), transparent 55%)",
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(255,255,255,0.06), transparent 70%)",
          ].join(","),
        }}
        aria-hidden="true"
      />

      <Image
        src="/rainbow-arc.svg"
        alt=""
        fill
        sizes="100vw"
        className="relative z-[1] w-full h-full object-fill"
        aria-hidden="true"
      />
      <div
        className="frame-grain absolute inset-0 z-[2] opacity-20"
        aria-hidden="true"
      />
    </div>
  );
}
