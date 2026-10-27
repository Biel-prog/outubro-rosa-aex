"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wrapper de animação global.
 *
 * - Inicializa o Lenis (smooth scroll) e o sincroniza com o ticker do GSAP,
 *   de modo que o ScrollTrigger sempre leia a posição "suavizada".
 * - Respeita `prefers-reduced-motion`: nesse caso mantém o scroll nativo.
 * - Links âncora (#autoexame, #mitos…) são tratados pelo próprio Lenis.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -88 }, // altura aproximada da navbar fixa
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
