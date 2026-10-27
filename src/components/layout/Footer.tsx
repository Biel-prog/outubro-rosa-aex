import { GraduationCap, HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
                <GraduationCap aria-hidden strokeWidth={1.5} className="size-6" />
              </span>
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                Outubro Rosa <span className="text-brand-400">+</span> Tecnologia
              </p>
            </div>

            <p className="mt-6 font-display text-xl font-medium leading-snug text-white sm:text-2xl">
              Projeto de Extensão Universitária • Atividade Extensionista (80 Horas).
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-300 md:text-right">
            Desenvolvido por <strong className="font-semibold text-white">Gabriel Rodrigues da Silva Soares</strong>
            <span aria-hidden className="mx-2 text-slate-600 md:hidden">|</span>
            <br className="hidden md:block" />
            Curso: Análise e Desenvolvimento de Sistemas
            <span aria-hidden className="mx-2 text-slate-600 md:hidden">|</span>
            <br className="hidden md:block" />
            Universidade de Mogi das Cruzes (UMC).
          </p>
        </div>

        <div className="mt-14 flex flex-col items-start gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 font-display text-sm font-semibold text-white">
            <HeartHandshake aria-hidden strokeWidth={1.5} className="size-5 text-brand-400" />
            Tecnologia que salva vidas.
          </p>
          <p className="text-xs leading-relaxed text-slate-400 sm:text-right">
            Projeto com fins exclusivamente acadêmicos e informativos.
          </p>
        </div>
      </div>
    </footer>
  );
}
