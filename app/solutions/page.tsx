"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, ShieldCheck, Database, Smartphone, Globe, TerminalSquare, X, ArrowRight, Zap, Check } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Desarrollo Web Moderno",
    description: "Sitios web rápidos, responsivos y con diseños vanguardistas que convierten visitantes en clientes.",
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description: "Apps nativas e híbridas para iOS y Android con experiencias de usuario intuitivas.",
  },
  {
    icon: Database,
    title: "Sistemas a Medida",
    description: "Software de gestión empresarial (ERP, CRM) adaptado exactamente a los procesos de tu negocio.",
  },
  {
    icon: ShieldCheck,
    title: "Ciberseguridad",
    description: "Auditorías de seguridad, pentesting y protección de datos para mantener tu infraestructura a salvo de hackers.",
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Despliegue y mantenimiento de aplicaciones en la nube con alta disponibilidad y escalabilidad.",
  },
  {
    icon: TerminalSquare,
    title: "Automatización con IA",
    description: "Integración de inteligencia artificial para automatizar procesos repetitivos y ahorrar costos.",
  },
];

const portfolioItems = [
  {
    id: "crm",
    title: "Sistemas de Gestión de Leads (CRM)",
    category: "CRM & CHAT",
    image: "/images/crm.png",
    color: "blue",
    description: "Plataformas de atención al cliente (Omnicanalidad) con interfaces modernas y de alta respuesta para tus asesores de ventas.",
    details: "Desarrollamos CRMs personalizados que unifican WhatsApp, correos y redes sociales en una sola bandeja. Incorporamos analíticas de tiempo de respuesta, chatbots impulsados por IA para respuestas automáticas y una interfaz limpia que reduce la fatiga visual de los asesores que trabajan todo el día frente a la pantalla."
  },
  {
    id: "erp",
    title: "Intranet ERP Empresarial",
    category: "INTRANET ERP",
    image: "/images/erp.png",
    color: "teal",
    description: "Dashboards gerenciales con métricas en tiempo real, filtros detallados y exportación de datos para la toma de decisiones empresariales.",
    details: "Un sistema integral de planificación de recursos (ERP) diseñado a la medida de los procesos internos. Incluye módulos de recursos humanos, control de inventario, facturación electrónica y un dashboard gerencial avanzado que cruza datos de diferentes departamentos para generar reportes predictivos y en tiempo real."
  },
  {
    id: "ecommerce",
    title: "Tiendas Virtuales Premium",
    category: "E-COMMERCE",
    image: "/images/ecommerce.png",
    color: "green",
    description: "Páginas de ventas de alto impacto visual diseñadas para generar confianza, retener al cliente y maximizar la conversión.",
    details: "Tiendas online ultrarrápidas construidas con Next.js que ofrecen tiempos de carga en milisegundos. Integran pasarelas de pago seguras locales e internacionales, recuperación de carritos abandonados, gestión de cupones y un panel administrativo intuitivo para gestionar miles de productos sin complicaciones técnicas."
  }
];

const colorMap: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  blue: { bg: "bg-blue-50", text: "text-[#00469b]", border: "border-blue-200", accent: "bg-[#00469b]" },
  teal: { bg: "bg-teal-50", text: "text-[#00caa4]", border: "border-teal-200", accent: "bg-[#00caa4]" },
  green: { bg: "bg-green-50", text: "text-emerald-700", border: "border-green-200", accent: "bg-emerald-600" }
};

export default function SolutionsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">
      
      {/* ========== HERO HEADER (Dark Royal Blue) ========== */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00caa408_1px,transparent_1px),linear-gradient(to_bottom,#00caa408_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00caa4]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8 border border-white/20 shadow-md backdrop-blur-sm"
          >
            <Code2 className="w-8 h-8 text-[#00caa4]" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none"
          >
            Soluciones Tecnológicas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00caa4] to-emerald-300">para tu Empresa</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-100/80 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Construimos software robusto, escalable y con altos estándares de ciberseguridad. Protegemos tu infraestructura mientras automatizamos tus operaciones comerciales.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="#contact">
              <button className="px-8 py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] text-white transition-all shadow-lg shadow-teal-500/20 uppercase text-xs tracking-wider">
                Solicitar Cotización
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== SERVICES GRID (White Background) ========== */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-white rounded-t-[2.5rem] mt-[-2rem] relative z-20 shadow-xl border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
            Áreas de Especialización
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Ingeniería a Tu Medida</h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-xs md:text-sm">
            Diseñamos cada componente bajo arquitectura modular garantizando su escalabilidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#00caa4]/10 rounded-xl flex items-center justify-center mb-6 border border-[#00caa4]/20">
                <service.icon className="w-6 h-6 text-[#00469b]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">{service.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== PORTFOLIO SHOWCASE (Slate-50 Background) ========== */}
      <section className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00caa4]/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Garantía de Calidad
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Casos de Éxito y Ejemplos</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-xs md:text-sm">
              Creamos aplicaciones de alto rendimiento optimizadas para la conversión y la eficiencia operativa.
              <br/><span className="text-xs text-[#00caa4] font-bold mt-2 inline-block">Haz clic en cada tarjeta para ver los detalles.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => {
              const colors = colorMap[item.color] || colorMap.blue;
              return (
                <motion.div 
                  key={index}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedProject(item)}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION (Dark Royal Blue) ========== */}
      <section id="contact" className="w-full py-24 bg-gradient-to-br from-[#040e2c] via-[#091f5e] to-[#00469b] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00caa4]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
                ¿Tienes un Proyecto?
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4">¿Listo para innovar?</h2>
              <p className="text-blue-100/70 text-sm">Déjanos tus datos y un especialista técnico se comunicará contigo de inmediato.</p>
            </div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wide">Nombre Completo</label>
                  <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00caa4] transition-all placeholder:text-blue-200/30 text-sm" placeholder="Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wide">Empresa (Opcional)</label>
                  <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00caa4] transition-all placeholder:text-blue-200/30 text-sm" placeholder="Mi Empresa S.A.C." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wide">Correo Electrónico</label>
                <input type="email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00caa4] transition-all placeholder:text-blue-200/30 text-sm" placeholder="correo@ejemplo.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-100/80 uppercase tracking-wide">Mensaje / Requerimiento</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00caa4] transition-all resize-none placeholder:text-blue-200/30 text-sm" placeholder="Cuéntanos brevemente sobre tu proyecto..."></textarea>
              </div>
              
              <button type="submit" className="w-full py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] text-white transition-all shadow-lg shadow-teal-500/20 uppercase text-xs tracking-wider">
                Enviar Mensaje Seguro
              </button>
              
              <p className="text-[10px] text-center text-blue-200/50 mt-4 flex items-center justify-center gap-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#00caa4]" /> Datos resguardados y cifrados de extremo a extremo.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ========== PROJECT DETAIL MODAL ========== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 w-full bg-slate-100">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedProject(null)}
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
                    <p className="text-xs text-slate-500 leading-relaxed">Implementamos arquitecturas robustas y modulares bajo Next.js y React. Toda la base de datos se cifra de forma local e internacional para garantizar la confidencialidad.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
