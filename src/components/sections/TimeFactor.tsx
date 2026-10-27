import { Info } from "lucide-react";
import { AnimatedNumber } from "@/components/animation/AnimatedNumber";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TimeFactor() {
  return (
    <section id="prevencao" className="relative bg-white py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="O fator tempo"
          title={
            <>
              Descobrir cedo <span className="text-brand-600">muda tudo.</span>
            </>
          }
        />

        <Reveal
          stagger={0.15}
          className="mt-14 grid overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-200/80 shadow-card lg:mt-20 lg:grid-cols-2 lg:gap-px"
        >
          <article className="relative bg-white p-8 sm:p-12 lg:p-14">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Até</p>
            <p className="mt-2 bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text font-display text-stat font-extrabold text-transparent">
              <AnimatedNumber value={95} suffix="%" />
            </p>
            <p className="mt-6 max-w-sm font-display text-2xl font-semibold leading-snug tracking-tight text-navy-900 sm:text-[1.7rem]">
              de chance de cura quando o câncer de mama é descoberto no início.
            </p>
          </article>

          <article className="relative border-t border-slate-200/80 bg-white p-8 sm:p-12 lg:border-t-0 lg:p-14">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Cerca de</p>
            <p className="mt-2 font-display text-stat font-extrabold text-navy-900">
              <AnimatedNumber value={30} suffix="%" />
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              <strong className="font-display font-semibold text-navy-900">
                dos casos podem ser evitados com hábitos saudáveis e informação.
              </strong>{" "}
              O autoexame é recomendado <strong className="font-semibold text-brand-600">mensalmente a partir dos 20 anos</strong>.
            </p>
          </article>
        </Reveal>

        <Reveal className="mt-8 lg:mt-10" delay={0.1}>
          <aside
            role="note"
            className="relative flex gap-4 overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-6 sm:items-center sm:gap-6 sm:p-8"
          >
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-brand-600" />
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-brand-100">
              <Info aria-hidden strokeWidth={1.5} className="size-6" />
            </span>
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              <strong className="font-display font-semibold text-navy-900">Lembre-se:</strong> O autoexame não substitui a
              mamografia (gratuita pelo SUS a cada 2 anos para mulheres de 50 a 69 anos) e nem a consulta clínica de rotina.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
