import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
      stagger={0.12}
      duration={0.9}
    >
      <p className={cn("eyebrow", centered && "justify-center")}>
        <span aria-hidden className="h-px w-8 bg-brand-600/60" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-display-lg font-bold">{title}</h2>
      {description && <p className="mt-6 text-lg leading-relaxed text-slate-600">{description}</p>}
    </Reveal>
  );
}
