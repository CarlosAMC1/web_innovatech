"use client";

import { LazyMotion, MotionConfig, m } from "framer-motion";

// Carga liviana de animaciones: el motor se descarga aparte (LazyMotion)
// y se respeta la preferencia "reducir movimiento" del dispositivo.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

// Elementos animados que se pueden usar desde componentes de servidor.
export const MotionDiv = m.div;
export const MotionH1 = m.h1;
export const MotionP = m.p;
export const MotionSpan = m.span;
export const MotionLi = m.li;
