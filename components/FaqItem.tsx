"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─── FAQ Accordion Item ─── */
// Usa CSS (grid-template-rows) para abrir y cerrar, sin librería de animaciones.
export default function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-[#00469b] transition-colors pr-8">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={id}
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-slate-600 leading-relaxed text-sm">{a}</p>
        </div>
      </div>
    </div>
  );
}
