/**
 * Silhueta estilizada de Mogi das Cruzes (igreja matriz, ponte e skyline),
 * em tom rosa translúcido — eco direto da ilustração do panfleto.
 */
export function Skyline({ className }: { className?: string }) {
  const towers: Array<[number, number, number]> = [
    // x, width, height
    [985, 34, 120],
    [1030, 26, 160],
    [1064, 44, 96],
    [1118, 30, 138],
    [1156, 52, 178],
    [1216, 30, 110],
    [1254, 40, 146],
    [1302, 28, 92],
    [1338, 46, 124],
    [1392, 30, 82],
  ];

  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" aria-hidden className={className}>
      <defs>
        <linearGradient id="sk-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2619F" stopOpacity="0.32" />
          <stop offset="1" stopColor="#F2619F" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <g fill="url(#sk-fade)">
        {/* árvores */}
        <circle cx="60" cy="150" r="34" />
        <circle cx="100" cy="132" r="42" />
        <circle cx="150" cy="150" r="32" />
        <circle cx="230" cy="158" r="28" />

        {/* igreja matriz */}
        <rect x="300" y="128" width="150" height="92" />
        <rect x="330" y="56" width="42" height="72" />
        <path d="M322 58 L351 14 L380 58 Z" />
        <rect x="388" y="100" width="40" height="28" />
        <path d="M388 100 Q408 74 428 100 Z" />
        <rect x="462" y="150" width="46" height="70" />

        {/* ponte em arcos */}
        <path d="M520 160 H940 V172 H520 Z" />
        <path d="M540 172 Q610 118 680 172 Z" />
        <path d="M680 172 Q750 118 820 172 Z" />
        <path d="M820 172 Q880 118 940 172 Z" />

        {/* skyline */}
        {towers.map(([x, w, h]) => (
          <rect key={x} x={x} y={220 - h} width={w} height={h} />
        ))}
        <rect x="0" y="196" width="1440" height="24" />
      </g>
    </svg>
  );
}
