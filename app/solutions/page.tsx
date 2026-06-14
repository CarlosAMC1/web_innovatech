"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, ShieldCheck, Database, Smartphone, Globe, TerminalSquare, X } from "lucide-react";
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

export default function SolutionsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-teal-100/50 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 rounded-2xl mb-8 border border-teal-100 shadow-sm"
          >
            <Code2 className="w-10 h-10 text-teal-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900"
          >
            Soluciones Tecnológicas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">para tu Empresa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Desarrollamos software robusto, seguro y escalable. Nos enfocamos en la ciberseguridad para proteger tu información de cualquier amenaza.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="#contact">
              <button className="px-8 py-4 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xl shadow-slate-900/10">
                Solicitar Cotización
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 border border-teal-100">
                <service.icon className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Casos de Éxito y Ejemplos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Creamos interfaces premium que no solo se ven espectaculares, sino que optimizan el trabajo diario de tu equipo y aumentan tus ventas.
            <br/><span className="text-sm text-teal-600 font-bold mt-2 inline-block">Haz clic en cada imagen para ver los detalles.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProject(item)}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden group cursor-pointer shadow-xl shadow-slate-200/50"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <span className={`inline-block mb-3 bg-${item.color}-50 text-${item.color}-700 text-xs font-bold px-3 py-1.5 rounded-full border border-${item.color}-200`}>
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 blur-[80px] rounded-full pointer-events-none" />
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">¿Listo para innovar?</h2>
            <p className="text-slate-600 text-lg">Déjanos tus datos y un experto en tecnología se comunicará contigo.</p>
          </div>
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Nombre Completo</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Empresa (Opcional)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400" placeholder="Mi Empresa S.A.C." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Correo Electrónico</label>
              <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400" placeholder="correo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Mensaje / Requerimiento</label>
              <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none placeholder:text-slate-400" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
              Enviar Mensaje Seguro
            </button>
            <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-500" /> Tus datos están protegidos y cifrados de extremo a extremo.
            </p>
          </form>
        </div>
      </section>

      {/* Project Detail Modal */}
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full backdrop-blur-md transition-all shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 md:p-10">
                <span className={`inline-block mb-4 bg-${selectedProject.color}-50 text-${selectedProject.color}-700 text-sm font-bold px-4 py-1.5 rounded-full border border-${selectedProject.color}-200`}>
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{selectedProject.title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {selectedProject.details}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-2xl shrink-0 border border-teal-200">
                    <Code2 className="w-6 h-6 text-teal-700" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold mb-1 text-lg">Tecnología de Vanguardia</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">Implementado usando Next.js, React, TailwindCSS y bases de datos seguras con encriptación avanzada para asegurar el máximo rendimiento corporativo.</p>
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
