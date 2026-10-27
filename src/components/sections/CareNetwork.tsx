import { Building2, ExternalLink, Landmark, MapPin, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { CARE_CARDS, type CareAction, type CareActionKind, type CareCard } from "@/data/content";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const ACTION_ICON: Record<CareActionKind, LucideIcon> = {
  maps: MapPin,
  phone: Phone,
  external: ExternalLink,
};

const CARD_ICON: Record<string, LucideIcon> = {
  "pro-mulher": Building2,
  "sis-mogi": Landmark,
  oficial: ShieldCheck,
};

/** Botão estilo "app nativo": ícone em bolha, rótulo e affordance de ação. */
function ActionButton({ action, primary }: { action: CareAction; primary: boolean }) {
  const Icon = ACTION_ICON[action.kind];
  const isExternal = action.kind !== "phone";

  return (
    <a
      href={action.href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 active:scale-[0.985]",
        primary
          ? "bg-navy-900 text-white shadow-[0_10px_24px_-12px_rgb(10_35_80_/_0.7)] hover:bg-brand-600 hover:shadow-brand"
          : "bg-snow text-navy-900 ring-1 ring-inset ring-slate-200 hover:bg-white hover:ring-brand-600",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
          primary ? "bg-white/15" : "bg-white text-brand-600 shadow-sm ring-1 ring-slate-200",
        )}
      >
        <Icon strokeWidth={1.75} className="size-[1.1rem]" />
      </span>
      <span className="flex-1 leading-tight">{action.label}</span>
      {isExternal && <span className="sr-only">(abre em nova aba)</span>}
      <ExternalLink
        aria-hidden
        strokeWidth={1.75}
        className={cn(
          "size-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-70",
          !isExternal && "hidden",
        )}
      />
    </a>
  );
}

function CareCardView({ card }: { card: CareCard }) {
  const Icon = CARD_ICON[card.id] ?? Building2;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-100/70 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
      />
      <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-100">
        <Icon aria-hidden strokeWidth={1.5} className="size-7" />
      </span>

      <h3 className="relative mt-7 text-2xl font-bold leading-tight tracking-tight">{card.title}</h3>
      <p className="relative mt-3 leading-relaxed text-slate-600">{card.description}</p>

      {card.address && (
        <address className="relative mt-5 flex items-start gap-2.5 text-sm not-italic text-slate-500">
          <MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-brand-600" />
          {card.address}
        </address>
      )}

      <div className="relative mt-auto flex flex-col gap-2.5 pt-8">
        {card.actions.map((action, i) => (
          <ActionButton key={action.href} action={action} primary={i === 0} />
        ))}
      </div>
    </article>
  );
}

export function CareNetwork() {
  return (
    <section id="atendimento" className="relative overflow-hidden bg-snow py-24 sm:py-32">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_45%_at_80%_100%,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Rede de atendimento"
          align="center"
          title={
            <>
              Cuidado <span className="text-brand-600">perto de você</span>, em Mogi das Cruzes.
            </>
          }
          description="Serviços públicos e canais oficiais para agendar consultas, exames e tirar dúvidas."
        />

        <Reveal stagger={0.14} className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {CARE_CARDS.map((card) => (
            <CareCardView key={card.id} card={card} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
