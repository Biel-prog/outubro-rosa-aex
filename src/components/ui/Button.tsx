import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  icon?: LucideIcon;
  /** Classes do ícone; padrão: desliza para a direita no hover. */
  iconClassName?: string;
  children: ReactNode;
}

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 ease-out focus-visible:outline-brand-600 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-brand hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_18px_36px_-12px_rgb(200_19_95_/_0.65)]",
  outline:
    "border border-navy-900/20 bg-white/50 text-navy-900 hover:-translate-y-0.5 hover:border-brand-600 hover:bg-white hover:text-brand-600",
};

/** Botão semântico (<a>) — sempre navegável, funciona sem JavaScript. */
export function Button({
  variant = "primary",
  icon: Icon,
  iconClassName = "group-hover:translate-x-1",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {Icon && (
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className={cn("size-[1.15rem] transition-transform duration-300", iconClassName)}
        />
      )}
    </a>
  );
}
