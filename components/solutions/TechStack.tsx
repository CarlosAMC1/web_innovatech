"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

const techStacks = [
  {
    id: "web",
    name: "Desarrollo Web",
    techs: [
      { name: "Next.js / React", type: "Frontend", desc: "Velocidad de carga instantánea y optimización SEO nativa." },
      { name: "TailwindCSS", type: "Estilos", desc: "Estilos consistentes, modernos y adaptabilidad móvil total." },
      { name: "Node.js / Express", type: "Backend", desc: "Servicios escalables y APIs RESTful de baja latencia." },
      { name: "TypeScript", type: "Lenguaje", desc: "Código robusto y libre de errores tipográficos en producción." }
    ]
  },
  {
    id: "mobile",
    name: "Apps Móviles",
    techs: [
      { name: "React Native / Expo", type: "Frontend", desc: "Un solo código base para iOS y Android reduciendo costos." },
      { name: "Tailwind Native", type: "Estilos", desc: "Consistencia visual móvil y transiciones aceleradas." },
      { name: "Firebase / Supabase", type: "Backend", desc: "Sincronización en tiempo real y notificaciones push inmediatas." },
      { name: "Fastlane", type: "Despliegue", desc: "Automatización de entregas directas a Play Store y App Store." }
    ]
  },
  {
    id: "enterprise",
    name: "Sistemas ERP/CRM",
    techs: [
      { name: "React / Vite", type: "Frontend", desc: "Consola de administración ultrarrápida con dashboards fluidos." },
      { name: "Prisma ORM", type: "Acceso Datos", desc: "Conexión robusta y consultas optimizadas a base de datos." },
      { name: "PostgreSQL", type: "Base de Datos", desc: "Almacenamiento relacional altamente seguro y transacciones ACID." },
      { name: "AWS / Docker", type: "Nube & DevOps", desc: "Contenedores aislados y escalabilidad elástica automatizada." }
    ]
  },
  {
    id: "ai_tech",
    name: "Automatización IA",
    techs: [
      { name: "FastAPI / Python", type: "Backend", desc: "Servicios ligeros para procesamiento asíncrono y machine learning." },
      { name: "LangChain / Llamaindex", type: "Framework IA", desc: "Gestión de memoria de agentes y encadenamiento de prompts." },
      { name: "OpenAI / Anthropic APIs", type: "Modelos LLM", desc: "Razonamiento lógico avanzado y chatbots con lenguaje natural." },
      { name: "PgVector", type: "Base de Datos Vectorial", desc: "Búsqueda semántica inteligente en base a documentos corporativos." }
    ]
  }
];

// Selector interactivo de tecnologías por tipo de solución.
export default function TechStack() {
  const [activeStack, setActiveStack] = useState("web");
  const currentStack = techStacks.find(s => s.id === activeStack) || techStacks[0];

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start max-w-5xl mx-auto">
      {/* Left - Selectors */}
      <div className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        {techStacks.map(stack => (
          <button
            key={stack.id}
            onClick={() => setActiveStack(stack.id)}
            className={`w-full text-left py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-between uppercase tracking-wide ${
              activeStack === stack.id
                ? "bg-[#00469b] text-white shadow-md"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/50"
            }`}
          >
            <span>{stack.name}</span>
            {activeStack === stack.id && <div className="w-1.5 h-1.5 rounded-full bg-[#00caa4]" />}
          </button>
        ))}
      </div>
    
      {/* Right - Tech description details */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <AnimatePresence mode="wait">
          <m.div
            key={activeStack}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {currentStack.techs.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-slate-900">{t.name}</span>
                  <span className="text-[9px] font-black text-[#00caa4] bg-[#00caa4]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">{t.type}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
