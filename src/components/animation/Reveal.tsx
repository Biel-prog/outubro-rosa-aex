"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type RevealVariant = "up" | "fade" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  /** Atraso em segundos (útil para escalonar elementos irmãos). */
  delay?: number;
  duration?: number;
  /** Se verdadeiro, anima os filhos diretos em cascata em vez do próprio elemento. */
  stagger?: number;
  /** Ponto do viewport em que a animação dispara. */
  start?: string;
}

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 48, opacity: 0 },
  fade: { opacity: 0 },
  left: { x: -48, opacity: 0 },
  right: { x: 48, opacity: 0 },
  scale: { scale: 0.94, opacity: 0, y: 24 },
};

/**
 * Revelação on-scroll com GSAP + ScrollTrigger.
 * Em `prefers-reduced-motion` o conteúdo é exibido imediatamente.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "up",
  delay = 0,
  duration = 1,
  stagger,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = stagger !== undefined ? Array.from(el.children) : el;
      gsap.from(targets, {
        ...FROM[variant],
        duration,
        delay,
        ease: "power3.out",
        stagger,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start, once: true },
      });
    });

    return () => mm.revert();
  }, [variant, delay, duration, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
