import { Building2, Download, ExternalLink, Landmark, MapPin, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { CARE_CARDS, type CareAction, type CareActionKind, type CareCard, type StoreLink } from "@/data/content";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const ACTION_ICON: Record<CareActionKind, LucideIcon> = {
  maps: MapPin,
  phone: Phone,
  external: ExternalLink,
  app: Download,
};

const STORE_LABEL: Record<StoreLink["platform"], string> = {
  android: "Android",
  ios: "iOS",
};

const CARD_ICON: Record<string, LucideIcon> = {
  "pro-mulher": Building2,
  "sis-mogi": Landmark,
  oficial: ShieldCheck,
};

/** Ícones de marca (apenas SVG, sem texto) para o Split Button. */
function AppleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 384 512" className="h-5 w-5 fill-white">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg aria-hidden viewBox="0 0 576 512" className="h-5 w-5 fill-white">
      <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55" />
    </svg>
  );
}

const STORE_ICON: Record<StoreLink["platform"], () => React.JSX.Element> = {
  ios: AppleIcon,
  android: AndroidIcon,
};

/** Ordem fixa do Split Button: Apple à esquerda, Android à direita. */
const STORE_ORDER: StoreLink["platform"][] = ["ios", "android"];

/**
 * Split Button: mesma altura (h-16), cor e raio do botão primário dos outros cards.
 * Duas áreas de 50% (`flex-1`), só com ícones, separadas por um divisor sutil.
 */
function StoreSplitButton({ action }: { action: CareAction }) {
  const stores = STORE_ORDER.flatMap((platform) => action.stores?.find((s) => s.platform === platform) ?? []);

  return (
    <div className="flex h-16 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-[0_10px_24px_-12px_rgb(200_19_95_/_0.6)]">
      {stores.map((store, i) => {
        const StoreIcon = STORE_ICON[store.platform];
        return (
          <a
            key={store.platform}
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${action.label} para ${STORE_LABEL[store.platform]} (abre em nova aba)`}
            className={cn(
              "flex h-full flex-1 items-center justify-center transition-colors hover:bg-brand-700/50 focus-visible:bg-brand-700/50",
              i < stores.length - 1 && "border-r border-white/20",
            )}
          >
            <StoreIcon />
          </a>
        );
      })}
    </div>
  );
}


/** Botão estilo "app nativo": ícone em bolha, rótulo e affordance de ação. */
function ActionButton({ action, primary }: { action: CareAction; primary: boolean }) {
  if (action.kind === "app") return <StoreSplitButton action={action} />;

  const Icon = ACTION_ICON[action.kind];
  const isExternal = action.kind !== "phone";

  return (
    <a
      href={action.href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 active:scale-[0.985]",
        primary
          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-[0_10px_24px_-12px_rgb(200_19_95_/_0.6)] hover:from-brand-600 hover:to-brand-700 hover:shadow-brand"
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
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-100/70 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
      />

      <div className="relative">
        <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-100">
          <Icon aria-hidden strokeWidth={1.5} className="size-7" />
        </span>

        <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight text-brand-900">{card.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{card.description}</p>

        {card.address && (
          <address className="mt-5 flex items-start gap-2.5 text-sm not-italic text-slate-500">
            <MapPin aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-brand-600" />
            {card.address}
          </address>
        )}
      </div>

      <div className="relative flex flex-col gap-2.5 pt-8">
        {card.actions.map((action, i) => (
          <ActionButton key={action.href ?? action.label} action={action} primary={i === 0} />
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
