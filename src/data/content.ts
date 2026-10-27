import type { LucideIcon } from "lucide-react";
import { Eye, Hand, Droplets } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navegação                                                                  */
/* -------------------------------------------------------------------------- */
export const NAV_LINKS = [
  { label: "Autoexame", href: "#autoexame" },
  { label: "Mitos", href: "#mitos" },
  { label: "Atendimento local", href: "#atendimento" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Guia de autoexame                                                          */
/* -------------------------------------------------------------------------- */
export interface ExamStep {
  id: "inspecao" | "palpacao" | "verificacao";
  number: string;
  title: string;
  short: string;
  icon: LucideIcon;
  text: string;
  tips: string[];
}

export const EXAM_STEPS: ExamStep[] = [
  {
    id: "inspecao",
    number: "01",
    title: "Inspeção Visual",
    short: "Frente ao espelho",
    icon: Eye,
    text: "Em frente ao espelho, observe o formato, contorno e simetria das mamas. Faça com os braços abaixados, depois levantados e, por fim, com as mãos na cintura. Atenção a retrações ou mudanças na pele/mamilo.",
    tips: ["Braços abaixados", "Braços levantados", "Mãos na cintura"],
  },
  {
    id: "palpacao",
    number: "02",
    title: "Palpação",
    short: "No banho ou deitada",
    icon: Hand,
    text: "No banho ou deitada, levante um braço e use as pontas dos três dedos da outra mão. Faça movimentos circulares firmes de fora para dentro por toda a mama e axila, buscando pequenos nódulos.",
    tips: ["Três dedos", "Movimentos circulares", "Mama e axila"],
  },
  {
    id: "verificacao",
    number: "03",
    title: "Verificação",
    short: "Base do mamilo",
    icon: Droplets,
    text: "Pressione suavemente a base do mamilo. Fique atenta à saída espontânea de qualquer líquido ou secreção.",
    tips: ["Pressão suave", "Atenção a secreções"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Mitos e verdades                                                           */
/* -------------------------------------------------------------------------- */
export interface MythFact {
  id: string;
  myth: string;
  fact: string;
}

export const MYTHS: MythFact[] = [
  {
    id: "caroco",
    myth: "Encontrar um caroço significa câncer.",
    fact: "Cerca de 80% dos nódulos são benignos, mas exija sempre avaliação médica.",
  },
  {
    id: "historico",
    myth: "Quem não tem histórico familiar não corre risco.",
    fact: "Apenas cerca de 10% dos casos são genéticos/hereditários.",
  },
  {
    id: "desodorante",
    myth: "Desodorante roll-on causa câncer.",
    fact: "Não há nenhuma evidência científica que comprove essa relação.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Rede de atendimento                                                        */
/* -------------------------------------------------------------------------- */
export type CareActionKind = "maps" | "phone" | "external";

export interface CareAction {
  kind: CareActionKind;
  label: string;
  href: string;
}

export interface CareCard {
  id: string;
  title: string;
  description: string;
  address?: string;
  actions: CareAction[];
}

export const CARE_CARDS: CareCard[] = [
  {
    id: "pro-mulher",
    title: "Pró-Mulher Mogi das Cruzes",
    description: "Centro de Referência em Saúde da Mulher.",
    address: "R. Manuel de Oliveira, 51 - Mogilar.",
    actions: [
      {
        kind: "maps",
        label: "Ver no Google Maps",
        href: "https://goo.gl/maps/search/Pro+Mulher+Mogi+das+Cruzes",
      },
      { kind: "phone", label: "Ligar: (11) 4798-6700", href: "tel:+551147986700" },
    ],
  },
  {
    id: "sis-mogi",
    title: "Agendamento SUS / SIS Mogi",
    description: "Sistema Integrado de Saúde e Unidades Básicas (UBSs) da Prefeitura.",
    actions: [
      {
        kind: "external",
        label: "Acessar Portal SIS Mogi",
        href: "https://sismogi.mogidascruzes.sp.gov.br/",
      },
      {
        kind: "external",
        label: "Lista de UBSs",
        href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-saude/unidades-basicas-de-saude",
      },
    ],
  },
  {
    id: "oficial",
    title: "Informações Oficiais",
    description: "Dados detalhados no portal do Ministério da Saúde.",
    actions: [
      {
        kind: "external",
        label: "Portal INCA / Gov.br",
        href: "https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama",
      },
    ],
  },
];
