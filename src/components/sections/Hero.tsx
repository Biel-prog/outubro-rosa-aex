"use client";

import { useRef } from "react";
import { ArrowDown, MapPin, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RibbonGraphic } from "@/components/ui/RibbonGraphic";
import { Skyline } from "@/components/ui/Skyline";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/**
 * Hero: orquestra uma timeline de entrada (GSAP) para título, subtítulo,
 * CTAs e o laço. Os elementos animados são marcados com `data-hero`.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-hero='badge']", { y: 20, opacity: 0, duration: 0.8 })
        .from("[data-hero='line']", { yPercent: 110, duration: 1.15, stagger: 0.12 }, "-=0.5")
        .from("[data-hero='sub']", { y: 24, opacity: 0, duration: 0.9 }, "-=0.7")
        .from("[data-hero='cta']", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: "transform,opacity" }, "-=0.6")
        .from("[data-hero='ribbon']", { scale: 0.88, opacity: 0, rotate: -4, duration: 1.6, ease: "expo.out" }, 0.25)
        .from("[data-hero='chip']", { y: 20, opacity: 0, scale: 0.9, duration: 0.9, stagger: 0.15 }, "-=1");
    }, scope);

    return () => mm.revert();
  }, []);

  return (
    <section
      id="topo"
      ref={root}
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 via-white to-snow pt-32 sm:pt-36 lg:pt-40"
    >
      {/* fundo: grade tecnológica + blobs orgânicos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]" />
        <div className="absolute -right-40 -top-32 size-[38rem] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -left-40 top-1/2 size-[30rem] rounded-full bg-circuit-300/20 blur-3xl" />
        <svg className="absolute -bottom-px left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path d="M0 80 C 240 10 520 120 820 60 C 1080 8 1280 70 1440 30 V120 H0 Z" fill="#fff" />
        </svg>
      </div>
      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full sm:h-52" />

      <div className="container-page grid items-center gap-8 pb-28 sm:pb-36 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-44">
        {/* Texto */}
        <div className="relative z-10">
          <p
            data-hero="badge"
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy-800"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
            </span>
            <MapPin aria-hidden strokeWidth={1.75} className="size-3.5 text-brand-600" />
            Mogi das Cruzes · SP
          </p>

          <h1 className="mt-7 whitespace-nowrap font-extrabold uppercase text-display-xl lg:text-[clamp(3.2rem,5.1vw,4.9rem)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero="line" className="block text-brand-600">
                Outubro Rosa
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero="line" className="block text-navy-900">
                <span className="text-brand-600">+</span> Tecnologia
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.25em]">
              <span
                data-hero="line"
                className="mt-3 block text-[clamp(0.95rem,1.9vw,1.35rem)] font-semibold normal-case tracking-[0.02em] text-navy-700"
              >
                em Mogi das Cruzes
              </span>
            </span>
          </h1>

          <p data-hero="sub" className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            <strong className="font-semibold text-navy-900">Informação que cuida. Prevenção que salva.</strong>{" "}
            A tecnologia a favor da saúde da mulher mogiana.
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button data-hero="cta" href="#autoexame" icon={ArrowDown} iconClassName="group-hover:translate-y-1">
              Guia de Autoexame
            </Button>
            <Button data-hero="cta" href="#atendimento" variant="outline">
              Onde buscar atendimento
            </Button>
          </div>
        </div>

        {/* Laço */}
        <div className="relative mx-auto w-full max-w-[26rem] sm:max-w-md lg:max-w-none">
          <div data-hero="ribbon">
            <div className="animate-float-slow">
              <RibbonGraphic className="mx-auto h-auto w-full max-w-[34rem] overflow-visible" />
            </div>
          </div>

          <div
            data-hero="chip"
            className="glass absolute left-0 top-[18%] flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-left-2"
          >
            <span className="size-2 rounded-full bg-brand-600" aria-hidden />
            <span className="font-display text-sm font-semibold text-navy-900">Informação que cuida</span>
          </div>
          <div
            data-hero="chip"
            className="glass absolute bottom-[22%] right-0 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-right-2"
          >
            <Cpu aria-hidden strokeWidth={1.75} className="size-4 text-circuit-500" />
            <span className="font-display text-sm font-semibold text-navy-900">Prevenção que salva</span>
          </div>
        </div>
      </div>
    </section>
  );
}
