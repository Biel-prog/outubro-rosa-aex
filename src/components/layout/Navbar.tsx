"use client";

import { useEffect, useState } from "react";
import { Menu, Ribbon, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import { cn } from "@/lib/cn";

/**
 * Navbar fixa com glassmorphism.
 * Ganha mais "corpo" (fundo e sombra) depois que a página rola.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Navegação principal"
        className={cn(
          "glass mx-auto flex max-w-6xl items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-500",
          scrolled ? "shadow-card" : "shadow-none",
        )}
      >
        <a href="#topo" className="flex items-center gap-2.5" aria-label="Outubro Rosa + Tecnologia — início">
          <span className="grid size-8 place-items-center rounded-full bg-brand-600 text-white">
            <Ribbon aria-hidden strokeWidth={1.75} className="size-4" />
          </span>
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-navy-900">
            Outubro Rosa <span className="text-brand-600">+</span> Tecnologia
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pl-2">
            <a
              href="#autoexame"
              className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Guia de Autoexame
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-navy-900 transition-colors hover:bg-brand-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden strokeWidth={1.75} /> : <Menu aria-hidden strokeWidth={1.75} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-3 md:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3.5 text-base font-medium text-navy-900 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#autoexame"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-navy-900 px-4 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Guia de Autoexame
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
