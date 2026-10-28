export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-stone-950 text-white">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="container-page relative flex flex-col items-center py-16 text-center">
        <svg
          viewBox="0 0 200 70"
          className="mb-6 h-auto w-32 fill-current text-rose-600"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Logo da Universidade de Mogi das Cruzes (UMC)"
        >
          <text x="100" y="45" fontFamily="Arial Black, Impact, sans-serif" fontSize="56" fontWeight="900" textAnchor="middle" letterSpacing="-2">UMC</text>
          <text x="100" y="65" fontFamily="Georgia, serif" fontSize="14" textAnchor="middle" letterSpacing="3">UNIVERSIDADE</text>
        </svg>

        <h3 className="text-lg font-semibold text-rose-100">Projeto de Extensão Universitária - Outubro Rosa + Tecnologia</h3>
        <p className="mb-6 text-rose-300">Análise e Desenvolvimento de Sistemas</p>

        <p className="text-sm text-rose-400/80">Desenvolvimento Web: Gabriel Rodrigues</p>
      </div>
    </footer>
  );
}
