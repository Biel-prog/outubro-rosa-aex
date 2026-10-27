"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EXAM_STEPS } from "@/data/content";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepIllustration } from "@/components/ui/StepIllustration";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { cn } from "@/lib/cn";

/**
 * Guia interativo de autoexame — padrão WAI-ARIA "Tabs":
 * setas ← → ↑ ↓ / Home / End navegam, a troca de painel é animada com GSAP.
 */
export function SelfExamGuide() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const firstRender = useRef(true);

  const step = EXAM_STEPS[active];
  const last = EXAM_STEPS.length - 1;

  useIsomorphicLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        panel.querySelectorAll("[data-swap]"),
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" },
      );
      gsap.fromTo(
        panel.querySelector("[data-art]"),
        { scale: 0.92, rotate: -3, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "expo.out", clearProps: "transform,opacity" },
      );
    });
    return () => mm.revert();
  }, [active]);

  const select = (index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: (active + 1) % EXAM_STEPS.length,
      ArrowDown: (active + 1) % EXAM_STEPS.length,
      ArrowLeft: (active - 1 + EXAM_STEPS.length) % EXAM_STEPS.length,
      ArrowUp: (active - 1 + EXAM_STEPS.length) % EXAM_STEPS.length,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <section id="autoexame" className="relative overflow-hidden bg-snow py-24 sm:py-32">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_20%_20%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 size-[32rem] rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="Guia interativo"
          title={
            <>
              Autoexame em <span className="text-brand-600">3 passos</span> simples.
            </>
          }
          description="Conhecer o próprio corpo é o primeiro gesto de cuidado. Escolha uma etapa e acompanhe."
        />

        <Reveal variant="scale" className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.4fr)] lg:gap-8">
          {/* Abas */}
          <div
            role="tablist"
            aria-label="Etapas do autoexame"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="grid grid-cols-3 gap-2.5 lg:grid-cols-1 lg:gap-3"
          >
            {EXAM_STEPS.map((s, i) => {
              const selected = i === active;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "group relative flex flex-col items-start gap-3 overflow-hidden rounded-3xl border p-4 text-left transition-all duration-500 sm:p-5 lg:flex-row lg:items-center lg:gap-5 lg:p-6",
                    selected
                      ? "border-brand-200 bg-white shadow-card"
                      : "border-transparent bg-white/50 hover:border-slate-200 hover:bg-white/80",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-y-0 left-0 w-1 origin-top bg-brand-600 transition-transform duration-500 max-lg:hidden",
                      selected ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors duration-500 lg:size-14",
                      selected ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600",
                    )}
                  >
                    <Icon aria-hidden strokeWidth={1.5} className="size-5 lg:size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Passo {s.number}
                    </span>
                    <span className="mt-0.5 block font-display text-sm font-semibold leading-tight text-navy-900 sm:text-base lg:text-lg">
                      {s.title}
                    </span>
                    <span className="mt-1 hidden text-sm text-slate-500 lg:block">{s.short}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Painel */}
          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${step.id}`}
            aria-labelledby={`tab-${step.id}`}
            tabIndex={0}
            className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-12"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[9rem] font-extrabold leading-none text-brand-600/[0.06] sm:text-[13rem]"
            >
              {step.number}
            </span>

            <div className="relative grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
              <div data-art className="mx-auto aspect-square w-full max-w-[17rem] rounded-[2rem] bg-gradient-to-br from-brand-50 to-circuit-300/20 p-4 md:max-w-none">
                <StepIllustration step={step.id} />
              </div>

              <div>
                <p data-swap className="eyebrow">
                  <span aria-hidden className="h-px w-8 bg-brand-600/60" />
                  Passo {step.number} / {String(EXAM_STEPS.length).padStart(2, "0")}
                </p>
                <h3 data-swap className="mt-4 text-3xl font-bold sm:text-4xl">
                  {step.title}
                </h3>
                <p data-swap className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {step.text}
                </p>

                <ul data-swap className="mt-6 flex flex-wrap gap-2">
                  {step.tips.map((tip) => (
                    <li
                      key={tip}
                      className="rounded-full border border-circuit-400/30 bg-circuit-300/10 px-3.5 py-1.5 text-xs font-semibold text-navy-800"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>

                <div data-swap className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => select(Math.max(0, active - 1))}
                    disabled={active === 0}
                    aria-label="Passo anterior"
                    className="grid size-12 place-items-center rounded-full border border-navy-900/15 text-navy-900 transition-all hover:border-brand-600 hover:text-brand-600 disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowLeft aria-hidden strokeWidth={1.75} className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => select(Math.min(last, active + 1))}
                    disabled={active === last}
                    aria-label="Próximo passo"
                    className="grid size-12 place-items-center rounded-full bg-navy-900 text-white transition-all hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-35"
                  >
                    <ArrowRight aria-hidden strokeWidth={1.75} className="size-5" />
                  </button>
                  <div aria-hidden className="ml-3 flex flex-1 gap-1.5">
                    {EXAM_STEPS.map((s, i) => (
                      <span
                        key={s.id}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors duration-500",
                          i <= active ? "bg-brand-600" : "bg-slate-200",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
