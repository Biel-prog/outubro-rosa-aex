"use client";

import { useId, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/** Strand A: perna esquerda → topo do laço. Strand B: topo do laço → perna direita (cruza sobre A). */
const STRAND_A = "M95 492 C150 402 230 332 270 222 C305 112 282 42 200 42";
const STRAND_B = "M200 42 C118 42 95 112 130 222 C168 332 252 402 305 492";

interface CircuitNode {
  x: number;
  y: number;
  bx: number;
  by: number;
  delay: number;
  big: boolean;
}

/**
 * Laço do Outubro Rosa em SVG puro com "circuito digital" sobreposto.
 * Os nós são calculados no cliente com `getPointAtLength`, garantindo que
 * fiquem exatamente sobre a fita independentemente do desenho.
 */
export function RibbonGraphic({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const refA = useRef<SVGPathElement>(null);
  const refB = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<CircuitNode[]>([]);

  useIsomorphicLayoutEffect(() => {
    const out: CircuitNode[] = [];
    const fractions = [0.1, 0.27, 0.45, 0.62, 0.8, 0.94];
    [refA.current, refB.current].forEach((path, strand) => {
      if (!path) return;
      const total = path.getTotalLength();
      fractions.forEach((f, i) => {
        const l = total * f;
        const p = path.getPointAtLength(l);
        const q = path.getPointAtLength(Math.min(total, l + 1));
        const tx = q.x - p.x;
        const ty = q.y - p.y;
        const len = Math.hypot(tx, ty) || 1;
        // normal unitária; alterna o lado e o comprimento do "ramo" do circuito
        const side = (i + strand) % 2 === 0 ? 1 : -1;
        const reach = 9 + ((i * 7 + strand * 5) % 3) * 4;
        out.push({
          x: p.x,
          y: p.y,
          bx: p.x + (-ty / len) * reach * side,
          by: p.y + (tx / len) * reach * side,
          delay: (i * 0.55 + strand * 0.8) % 3.2,
          big: (i + strand) % 3 === 0,
        });
      });
    });
    setNodes(out);
  }, []);

  const gradA = `${uid}-ga`;
  const gradB = `${uid}-gb`;
  const glow = `${uid}-glow`;

  return (
    <svg
      viewBox="-70 -30 540 580"
      role="img"
      aria-label="Laço rosa do Outubro Rosa com linhas de circuito digital"
      className={className}
    >
      <defs>
        <linearGradient id={gradA} gradientUnits="userSpaceOnUse" x1="90" y1="490" x2="290" y2="60">
          <stop offset="0" stopColor="#860F42" />
          <stop offset="0.55" stopColor="#C8135F" />
          <stop offset="1" stopColor="#F2619F" />
        </linearGradient>
        <linearGradient id={gradB} gradientUnits="userSpaceOnUse" x1="120" y1="60" x2="310" y2="490">
          <stop offset="0" stopColor="#F2619F" />
          <stop offset="0.5" stopColor="#DE2F82" />
          <stop offset="1" stopColor="#A50E4D" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FF9CC8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF9CC8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* halo + órbitas tecnológicas */}
      <circle cx="200" cy="270" r="270" fill={`url(#${glow})`} />
      <circle cx="200" cy="270" r="238" fill="none" stroke="#12B5D6" strokeOpacity="0.22" strokeWidth="1" />
      <circle
        cx="200"
        cy="270"
        r="206"
        fill="none"
        stroke="#C8135F"
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeDasharray="2 9"
        strokeLinecap="round"
        className="animate-dash-flow"
      />
      <circle cx="200" cy="32" r="3.5" fill="#12B5D6" className="origin-center animate-node-pulse [transform-box:fill-box]" />
      <circle cx="438" cy="270" r="3" fill="#12B5D6" className="origin-center animate-node-pulse [transform-box:fill-box]" style={{ animationDelay: "1.2s" }} />
      <circle cx="-38" cy="270" r="3" fill="#C8135F" className="origin-center animate-node-pulse [transform-box:fill-box]" style={{ animationDelay: "2s" }} />

      <g style={{ filter: "drop-shadow(0 22px 24px rgb(200 19 95 / 0.28))" }}>
        {/* Strand A */}
        <path ref={refA} d={STRAND_A} fill="none" stroke="#6D0F38" strokeWidth="64" strokeLinecap="butt" />
        <path d={STRAND_A} fill="none" stroke={`url(#${gradA})`} strokeWidth="57" strokeLinecap="butt" />
        {/* Strand B (por cima, cria o cruzamento) */}
        <path ref={refB} d={STRAND_B} fill="none" stroke="#6D0F38" strokeWidth="64" strokeLinecap="butt" />
        <path d={STRAND_B} fill="none" stroke={`url(#${gradB})`} strokeWidth="57" strokeLinecap="butt" />

        {/* brilho interno suave */}
        <path d={STRAND_A} fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="9" transform="translate(-9 0)" />
        <path d={STRAND_B} fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="9" transform="translate(-9 0)" />
      </g>

      {/* trilha de circuito */}
      {[STRAND_A, STRAND_B].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#BFF3FC"
          strokeOpacity="0.8"
          strokeWidth="1.2"
          strokeDasharray="1 7"
          strokeLinecap="round"
          className="animate-dash-flow"
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2={n.bx} y2={n.by} stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />
          <circle cx={n.bx} cy={n.by} r="2.4" fill="#fff" />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.big ? 3.6 : 2.4}
            fill="#7DE3F4"
            className="origin-center animate-node-pulse [transform-box:fill-box]"
            style={{ animationDelay: `${n.delay}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
