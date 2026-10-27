"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Contador que sobe de 0 até `value` quando entra no viewport. */
export function AnimatedNumber({ value, suffix = "", className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { n: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(counter, {
        n: value,
        duration: 2.2,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    return () => mm.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
