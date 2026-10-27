import type { ExamStep } from "@/data/content";

/** Gera um caminho em espiral (centro → borda invertida) para ilustrar a palpação circular. */
function spiralPath(cx: number, cy: number, rStart: number, rEnd: number, turns: number): string {
  const steps = 90;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const r = rStart + (rEnd - rStart) * t;
    const a = -Math.PI / 2 + t * turns * Math.PI * 2;
    pts.push(`${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

const NAVY = "#0A2350";
const PINK = "#C8135F";
const CYAN = "#12B5D6";

function InspectionArt() {
  return (
    <>
      {/* espelho */}
      <rect x="40" y="26" width="240" height="268" rx="120" fill="#fff" fillOpacity="0.55" stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
      <rect x="52" y="38" width="216" height="244" rx="108" fill="none" stroke={CYAN} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 6" />
      {/* cabeça e ombros */}
      <circle cx="160" cy="112" r="30" fill="none" stroke={NAVY} strokeWidth="2" />
      <path d="M92 270 C92 206 120 172 160 172 C200 172 228 206 228 270" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
      {/* mamas */}
      <circle cx="132" cy="222" r="21" fill={PINK} fillOpacity="0.1" stroke={PINK} strokeWidth="2.25" />
      <circle cx="188" cy="222" r="21" fill={PINK} fillOpacity="0.1" stroke={PINK} strokeWidth="2.25" />
      <circle cx="132" cy="226" r="3" fill={PINK} />
      <circle cx="188" cy="226" r="3" fill={PINK} />
      {/* eixo de simetria */}
      <line x1="160" y1="56" x2="160" y2="270" stroke={CYAN} strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash-flow" />
      <circle cx="160" cy="56" r="3.5" fill={CYAN} className="animate-node-pulse [transform-box:fill-box] origin-center" />
      {/* setas de posição dos braços */}
      <path d="M70 190 C56 160 56 130 72 104" fill="none" stroke={PINK} strokeWidth="1.75" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M250 190 C264 160 264 130 248 104" fill="none" stroke={PINK} strokeWidth="1.75" strokeLinecap="round" strokeDasharray="1 7" />
    </>
  );
}

function PalpationArt() {
  const spiral = spiralPath(160, 168, 88, 6, 2.6);
  return (
    <>
      <circle cx="160" cy="168" r="112" fill="#fff" fillOpacity="0.55" stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="160" cy="168" r="96" fill={PINK} fillOpacity="0.06" stroke={PINK} strokeOpacity="0.5" strokeWidth="1.5" />
      <path d={spiral} fill="none" stroke={PINK} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 7" className="animate-dash-flow" />
      {/* três dedos */}
      <g fill={PINK}>
        <circle cx="146" cy="76" r="9" fillOpacity="0.95" />
        <circle cx="166" cy="70" r="9" fillOpacity="0.8" />
        <circle cx="186" cy="76" r="9" fillOpacity="0.65" />
      </g>
      {/* nódulo hipotético */}
      <circle cx="205" cy="190" r="6" fill="none" stroke={CYAN} strokeWidth="1.75" className="animate-node-pulse [transform-box:fill-box] origin-center" />
      <circle cx="205" cy="190" r="1.8" fill={CYAN} />
      {/* axila */}
      <path d="M260 98 C292 114 300 150 292 190" fill="none" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="1 7" />
    </>
  );
}

function VerificationArt() {
  return (
    <>
      <circle cx="160" cy="168" r="112" fill="#fff" fillOpacity="0.55" stroke={NAVY} strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="160" cy="168" r="72" fill={PINK} fillOpacity="0.06" stroke={PINK} strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="160" cy="168" r="44" fill="none" stroke={PINK} strokeOpacity="0.55" strokeWidth="1.5" className="animate-node-pulse [transform-box:fill-box] origin-center" />
      <circle cx="160" cy="168" r="18" fill={PINK} fillOpacity="0.18" stroke={PINK} strokeWidth="2.25" />
      <circle cx="160" cy="168" r="4" fill={PINK} />
      {/* pressão suave (setas convergindo) */}
      <g stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M84 168 H118 M108 158 L118 168 L108 178" />
        <path d="M236 168 H202 M212 158 L202 168 L212 178" />
      </g>
      {/* gotas (atenção a secreções) */}
      <g fill="none" stroke={CYAN} strokeWidth="1.75">
        <path d="M160 214 C150 228 150 238 160 238 C170 238 170 228 160 214 Z" />
        <circle cx="160" cy="262" r="3" />
      </g>
    </>
  );
}

const ART: Record<ExamStep["id"], () => React.JSX.Element> = {
  inspecao: InspectionArt,
  palpacao: PalpationArt,
  verificacao: VerificationArt,
};

/** Ilustração de linha fina para cada etapa do autoexame (placeholder vetorial). */
export function StepIllustration({ step }: { step: ExamStep["id"] }) {
  const Art = ART[step];
  return (
    <svg viewBox="0 0 320 320" aria-hidden className="h-full w-full">
      <Art />
    </svg>
  );
}
