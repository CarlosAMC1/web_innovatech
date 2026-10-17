"use client";

import { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Code2, X } from "lucide-react";
import { CrmMockup, ErpMockup, EcommerceMockup } from "@/components/Mockups";
import aiImg from "@/public/images/ai_automation.png";

const portfolioItems = [
  {
    id: "crm",
    title: "Sistemas de Gestión de Leads (CRM)",
    category: "CRM & CHAT",
    visual: (title: string, className: string) => <CrmMockup title={title} className={`w-full h-full ${className}`} />,
    color: "blue",
    description: "Plataformas de atención al cliente (Omnicanalidad) con interfaces modernas y de alta respuesta para tus asesores de ventas.",
    details: "Desarrollamos CRMs personalizados que unifican WhatsApp, correos y redes sociales en una sola bandeja. Incorporamos analíticas de tiempo de respuesta, chatbots impulsados por IA para respuestas automáticas y una interfaz limpia que reduce la fatiga visual de los asesores que trabajan todo el día frente a la pantalla."
  },
  {
    id: "erp",
    title: "Intranet ERP Empresarial",
    category: "INTRANET ERP",
    visual: (title: string, className: string) => <ErpMockup title={title} className={`w-full h-full ${className}`} />,
    color: "teal",
    description: "Dashboards gerenciales con métricas en tiempo real, filtros detallados y exportación de datos para la toma de decisiones empresariales.",
    details: "Un sistema integral de planificación de recursos (ERP) diseñado a la medida de los procesos internos. Incluye módulos de recursos humanos, control de inventario, facturación electrónica y un dashboard gerencial avanzado que cruza datos de diferentes departamentos para generar reportes predictivos y en tiempo real."
  },
  {
    id: "ecommerce",
    title: "Tiendas Virtuales Premium",
    category: "E-COMMERCE",
    visual: (title: string, className: string) => <EcommerceMockup title={title} className={`w-full h-full ${className}`} />,
    color: "green",
    description: "Páginas de ventas de alto impacto visual diseñadas para generar confianza, retener al cliente y maximizar la conversión.",
    details: "Tiendas online rápidas construidas con Next.js y optimizadas para celulares. Integran pasarelas de pago seguras locales e internacionales, recuperación de carritos abandonados, gestión de cupones y un panel administrativo intuitivo para gestionar miles de productos sin complicaciones técnicas."
  },
  {
    id: "ai",
    title: "Automatización & Agentes Inteligentes IA",
    category: "AUTOMATIZACIÓN IA",
    visual: (title: string, className: string) => (
      <Image src={aiImg} alt={title} fill sizes="(min-width: 768px) 768px, 100vw" placeholder="blur" className={`object-cover ${className}`} />
    ),
    color: "teal",
    description: "Integración de modelos LLM y agentes de inteligencia artificial para optimizar soporte al cliente, análisis financiero y flujos internos.",
    details: "Desarrollamos agentes cognitivos de IA capaces de resolver tickets de soporte, clasificar leads y automatizar tareas administrativas complejas. Conectamos modelos de lenguaje avanzados con tus bases de datos mediante APIs seguras para que obtengas respuestas automáticas basadas en la realidad de tu empresa."
  }
];

const colorMap: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  blue: { bg: "bg-blue-50", text: "text-[#00469b]", border: "border-blue-200", accent: "bg-[#00469b]" },
  teal: { bg: "bg-teal-50", text: "text-[#00caa4]", border: "border-teal-200", accent: "bg-[#00caa4]" },
  green: { bg: "bg-green-50", text: "text-emerald-700", border: "border-green-200", accent: "bg-emerald-600" }
};

// Tarjetas del portafolio con modal de detalle.
export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <>
        <m.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {portfolioItems.map((item, index) => {
            const colors = colorMap[item.color] || colorMap.blue;
            return (
              <m.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelectedProject(item)}
                className="rounded-3xl border border-slate-200 bg-white overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  {item.visual(`Ejemplo ilustrativo: ${item.title}`, "group-hover:scale-102 transition-transform duration-500")}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <span className={`inline-block mb-3 ${colors.bg} ${colors.text} text-[10px] font-bold px-3 py-1 rounded-full border ${colors.border}`}>
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* ========== PROJECT DETAIL MODAL ========== */}
        <AnimatePresence>
          {selectedProject && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <m.div
                initial={{ scale: 0.96, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="relative h-64 sm:h-80 w-full bg-slate-100">
                  {selectedProject.visual(`Ejemplo ilustrativo: ${selectedProject.title}`, "")}
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Cerrar"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full backdrop-blur-md transition-all shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8 md:p-10">
                  <span className={`inline-block mb-4 ${(colorMap[selectedProject.color] || colorMap.blue).bg} ${(colorMap[selectedProject.color] || colorMap.blue).text} text-xs font-bold px-4 py-1.5 rounded-full border ${(colorMap[selectedProject.color] || colorMap.blue).border}`}>
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">{selectedProject.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-xs md:text-sm mb-8">
                    {selectedProject.details}
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-xl shrink-0 border border-teal-200">
                      <Code2 className="w-6 h-6 text-teal-700" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold mb-1 text-sm">Ingeniería Avanzada</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Implementamos arquitecturas modulares con Next.js y React, con control de accesos, copias de seguridad y conexiones cifradas (HTTPS) para proteger la información de tu negocio.</p>
                    </div>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
    </>
  );
}
