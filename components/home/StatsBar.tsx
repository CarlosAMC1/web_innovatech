"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return { count, ref };
}

// Datos verificables del propio sitio. Si quieres mostrar clientes o proyectos,
// usa solo cifras reales que puedas respaldar.
const items = [
  { label: "Servicios de Software", prefix: "", value: 6 },
  { label: "Planes Innovatech Crece", prefix: "", value: 5 },
  { label: "Planes Crece Desde", prefix: "S/ ", value: 30 },
  { label: "Contraseñas Solicitadas", prefix: "", value: 0 },
];

function Stat({ label, prefix, value }: (typeof items)[number]) {
  const { count, ref } = useCounter(value);
  return (
    <div className="px-4">
      <p className="text-4xl md:text-5xl font-black text-[#00469b] tracking-tight leading-none">
        {prefix && <span className="text-[#00caa4]">{prefix}</span>}
        <span ref={ref}>{count}</span>
      </p>
      <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-100">
      {items.map((item) => (
        <Stat key={item.label} {...item} />
      ))}
    </div>
  );
}
