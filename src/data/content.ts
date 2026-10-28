import type { LucideIcon } from "lucide-react";
import { Eye, Hand, Droplets } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navegação                                                                  */
/* -------------------------------------------------------------------------- */
export const NAV_LINKS = [
  { label: "Mitos e Verdades", href: "#mitos" },
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
    id: "idade",
    myth: "Só preciso me preocupar com o câncer de mama após os 50 anos.",
    fact: "Embora o risco aumente com a idade, mulheres jovens também desenvolvem a doença. O Ministério da Saúde alerta que é fundamental criar o hábito de observar o próprio corpo desde cedo e manter consultas de rotina com o ginecologista.",
  },
  {
    id: "caroco",
    myth: "Encontrar um caroço na mama significa câncer.",
    fact: "Cerca de 80% dos nódulos encontrados nas mamas são benignos (cistos ou fibroadenomas). No entanto, toda alteração deve ser imediatamente avaliada por um médico.",
  },
  {
    id: "historico",
    myth: "Quem não tem histórico familiar de câncer não corre risco.",
    fact: "Apenas de 5% a 10% dos casos têm origem genética ou hereditária. A imensa maioria ocorre em mulheres sem nenhum histórico na família.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Rede de atendimento                                                        */
/* -------------------------------------------------------------------------- */
export type CareActionKind = "maps" | "phone" | "external" | "app";

export interface StoreLink {
  platform: "android" | "ios";
  href: string;
}

export interface CareAction {
  kind: CareActionKind;
  label: string;
  /** Obrigatório, exceto em `kind: "app"` (que usa `stores`). */
  href?: string;
  /** Links de download por plataforma (`kind: "app"`). */
  stores?: StoreLink[];
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
    title: "Pró-Mulher e Unidades Básicas",
    description: "Centro de referência da saúde da mulher e postos de bairro.",
    address: "R. Francisco Affonso de Melo, 550 - Braz Cubas, Mogi das Cruzes.",
    actions: [
      {
        kind: "maps",
        label: "Ver no Google Maps",
        href: "https://maps.app.goo.gl/5t8K8ihDtesm4KVx9",
      },
      { kind: "phone", label: "Ligar: (11) 4798-6737", href: "tel:+551147986737" },
    ],
  },
  {
    id: "sis-mogi",
    title: "SIS Mogi e Exames",
    description:
      "Acesse seu Cartão SIS, histórico médico e agendamentos. Papanicolau é demanda livre nas UBSs para 40+.",
    actions: [
      {
        kind: "app",
        label: "Baixar App SIS Mogi",
        stores: [
          {
            platform: "android",
            href: "https://play.google.com/store/apps/details?id=com.sistemaintegradoasuade.sis&hl=pt_BR",
          },
          {
            platform: "ios",
            href: "https://apps.apple.com/br/app/sis-sistema-integrado-a-saude/id6760408207",
          },
        ],
      },
      {
        kind: "external",
        label: "Lista de UBSs",
        href: "https://www.mogidascruzes.sp.gov.br/pagina/secretaria-de-saude-e-bem-estar/unidades?pesquisa=&page=2",
      },
    ],
  },
  {
    id: "oficial",
    title: "Informações Oficiais e Governo",
    description: "Dados detalhados e mamografia gratuita via Prog. Mulheres de Peito (Gov. SP).",
    actions: [
      {
        kind: "external",
        label: "Portal INCA / Gov.br",
        href: "https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama",
      },
      {
        kind: "external",
        label: "Agendar no Poupatempo",
        href: "https://www.poupatempo.sp.gov.br/carta/4CC55F40-E724-4158-BD99-EE33B4D9B29E",
      },
    ],
  },
];
