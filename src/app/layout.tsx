import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outubro Rosa + Tecnologia em Mogi das Cruzes",
  description:
    "Informação que cuida. Prevenção que salva. Guia de autoexame, mitos e verdades e rede de atendimento em Mogi das Cruzes. Projeto de Extensão Universitária – UMC.",
  openGraph: {
    title: "Outubro Rosa + Tecnologia em Mogi das Cruzes",
    description: "A tecnologia a favor da saúde da mulher mogiana.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#C8135F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
