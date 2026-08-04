"use client";

import { useState, useLayoutEffect } from "react";

export function useViewport() {
  const [width, setWidth] = useState(1024);

  useLayoutEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
