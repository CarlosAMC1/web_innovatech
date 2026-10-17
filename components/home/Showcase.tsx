"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CrmMockup, ErpMockup, EcommerceMockup } from "@/components/Mockups";

const showcaseProjects = [
  {
    id: "crm",
    title: "Sistemas de Gestión de Leads (CRM)",
    category: "CRM & CHAT",
    Mockup: CrmMockup,
    color: "#00469b",
    description: "Plataformas de atención al cliente multicanal con interfaces modernas e integración de WhatsApp para asesores de ventas.",
    features: [
      "Unificación de chats de WhatsApp, Instagram y Messenger",
      "Bots automatizados de IA para respuestas iniciales y desvíos",
      "Métricas avanzadas de desempeño y tiempo de respuesta"
    ]
  },
  {
    id: "erp",
    title: "Intranet ERP Empresarial",
    category: "INTRANET ERP",
    Mockup: ErpMockup,
    color: "#00caa4",
    description: "Dashboards gerenciales con métricas en tiempo real, filtros detallados y exportación de datos para la toma de decisiones corporativas.",
    features: [
      "Módulos integrados de Inventario, Ventas y Facturación",
      "Interfaz intuitiva para que tu equipo aprenda a usarlo rápido",
      "Exportación en un clic a formatos PDF, Excel y CSV"
    ]
  },
  {
    id: "ecommerce",
    title: "Tiendas Virtuales Premium",
    category: "E-COMMERCE",
    Mockup: EcommerceMockup,
    color: "#10b981",
    description: "Páginas de venta de alta conversión y velocidad de carga diseñadas bajo el framework de Next.js.",
    features: [
      "Carga rápida y optimizada para celulares y SEO",
      "Pasarelas de pago locales integradas (Yape, Plin, Niubiz)",
      "Panel administrativo simplificado para inventarios y ofertas"
    ]
  }
];

// Pestañas interactivas de "Tipos de Sistemas que Desarrollamos".
export default function Showcase() {
  const [activeTab, setActiveTab] = useState("crm");
  const activeProject = showcaseProjects.find((p) => p.id === activeTab) || showcaseProjects[0];

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
      {/* Left — Tabs */}
      <div className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
        {showcaseProjects.map(proj => (
          <button
            key={proj.id}
            onClick={() => setActiveTab(proj.id)}
            className={`w-full text-left py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
              activeTab === proj.id
                ? "bg-white text-[#00469b] shadow-sm border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <span>{proj.title}</span>
            {activeTab === proj.id && <div className="w-2 h-2 rounded-full bg-[#00caa4]" />}
          </button>
        ))}
      </div>

      {/* Right — Active Tab Visuals */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left col - Details */}
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#00caa4] uppercase mb-2 block">{activeProject.category}</span>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{activeProject.title}</h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">{activeProject.description}</p>
            
            <ul className="space-y-3">
              {activeProject.features.map((feat, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-[#00caa4] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link href="/solutions" className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-[#00469b] hover:text-[#00caa4] transition-all">
              Ver más detalles técnicos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right col - Mockup Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
            <activeProject.Mockup title={`Ejemplo ilustrativo: ${activeProject.title}`} className="block w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
