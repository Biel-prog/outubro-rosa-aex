import { useEffect, useLayoutEffect } from "react";

/** `useLayoutEffect` no cliente, `useEffect` no servidor (evita warnings de SSR). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
