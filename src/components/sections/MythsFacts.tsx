"use client";

import { useState } from "react";
import { CheckCircle2, Minus, Plus, XCircle } from "lucide-react";
import { MYTHS } from "@/data/content";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * Acordeão minimalista. A altura anima via `grid-template-rows: 0fr → 1fr`
 * (CSS puro, sem medir DOM). O painel fechado recebe `inert`, saindo da
 * árvore de acessibilidade e da ordem de tabulação.
 */
export function MythsFacts() {
  const [openId, setOpenId] = useState<string | null>(MYTHS[0].id);

  return (
    <section id="mitos" className="relative bg-white py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Informação que protege"
            title={
              <>
                Mitos e <span className="text-brand-600">Verdades</span>
              </>
            }
            description="Desconfie do que circula nas redes. Toque em cada mito para ver o que a ciência diz."
          />
        </div>

        <Reveal stagger={0.12} className="border-t border-slate-200">
          {MYTHS.map((item, index) => {
            const open = openId === item.id;
            const buttonId = `myth-btn-${item.id}`;
            const panelId = `myth-panel-${item.id}`;
            return (
              <div key={item.id} className="border-b border-slate-200">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="group flex w-full items-start gap-5 py-7 text-left sm:gap-8 sm:py-9"
                  >
                    <span className="mt-1.5 w-6 shrink-0 font-display text-sm font-semibold tabular-nums text-slate-300 transition-colors group-hover:text-brand-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-red-600 ring-1 ring-inset ring-red-200">
                        <XCircle aria-hidden strokeWidth={2} className="size-3.5" />
                        Mito
                      </span>
                      <span className="mt-3 block font-display text-xl font-semibold leading-snug tracking-tight text-navy-900 sm:text-2xl">
                        {item.myth}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        open
                          ? "rotate-180 border-brand-600 bg-brand-600 text-white"
                          : "border-slate-200 text-navy-900 group-hover:border-brand-600 group-hover:text-brand-600",
                      )}
                    >
                      {open ? <Minus strokeWidth={1.75} className="size-5" /> : <Plus strokeWidth={1.75} className="size-5" />}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={open}
                  className="accordion-panel"
                >
                  <div inert={!open}>
                    <div
                      className={cn(
                        "mb-8 ml-9 flex gap-4 rounded-2xl bg-snow p-5 transition-opacity duration-500 sm:ml-[3.75rem] sm:p-6",
                        open ? "opacity-100 delay-150" : "opacity-0",
                      )}
                    >
                      <span aria-hidden className="mt-1 h-auto w-1 shrink-0 rounded-full bg-emerald-500" />
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-700 ring-1 ring-inset ring-emerald-200">
                          <CheckCircle2 aria-hidden strokeWidth={2} className="size-3.5" />
                          Verdade
                        </span>
                        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
