"use client";

import Image from "next/image";

export default function BlossomSpinner() {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <div className="relative w-full h-full">
        {/* Base black logo */}
        <Image
          src="/spinner-logo-black.svg"
          alt=""
          fill
          sizes="80px"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {/* Rose fill overlay, revealed from left to right as progress grows */}
        <Image
          id="blossom-spinner-fill"
          src="/spinner-logo.svg"
          alt=""
          fill
          sizes="80px"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        />
      </div>

      <span
        id="blossom-spinner-counter"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] text-black/80 whitespace-nowrap"
      >
        0%
      </span>
    </div>
  );
}
