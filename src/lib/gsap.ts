import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Ponto único de registro de plugins do GSAP.
 * Importe sempre `gsap` e `ScrollTrigger` a partir daqui.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
