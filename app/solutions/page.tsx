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
    description: "Plataformas de atención al cliente (Omnicanalidad) con interfaces modernas, oscuras y de alta respuesta para tus asesores de ventas.",
    details: "Desarrollamos CRMs personalizados que unifican WhatsApp, correos y redes sociales en una sola bandeja. Incorporamos analíticas de tiempo de respuesta, chatbots impulsados por IA para respuestas automáticas y una interfaz oscura que reduce la fatiga visual de los asesores que trabajan todo el día frente a la pantalla."
  },
  {
    id: "erp",
    title: "Intranet ERP Empresarial",
    category: "INTRANET ERP",
    image: "/images/erp.png",
    color: "green",
    description: "Dashboards gerenciales con métricas en tiempo real, filtros detallados y exportación de datos para la toma de decisiones empresariales.",
    details: "Un sistema integral de planificación de recursos (ERP) diseñado a la medida de los procesos internos. Incluye módulos de recursos humanos, control de inventario, facturación electrónica y un dashboard gerencial avanzado que cruza datos de diferentes departamentos para generar reportes predictivos y en tiempo real."
  },
  {
    id: "ecommerce",
    title: "Tiendas Virtuales Premium",
    category: "E-COMMERCE",
    image: "/images/ecommerce.png",
    color: "yellow",
    description: "Páginas de ventas de alto impacto visual diseñadas para generar confianza, retener al cliente y maximizar la conversión.",
    details: "Tiendas online ultrarrápidas construidas con Next.js que ofrecen tiempos de carga en milisegundos. Integran pasarelas de pago seguras locales e internacionales, recuperación de carritos abandonados, gestión de cupones y un panel administrativo intuitivo para gestionar miles de productos sin complicaciones técnicas."
  }
];

export default function SolutionsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#050510]">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-green-600/20 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 border border-green-500/30"
          >
            <Code2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Soluciones Tecnológicas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">para tu Empresa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
          >
            Desarrollamos software robusto, seguro y escalable. Nos enfocamos en la ciberseguridad para proteger tu información de cualquier amenaza.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="#contact">
              <button className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                Solicitar Cotización
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 text-green-400">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Casos de Éxito y Ejemplos</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Creamos interfaces premium que no solo se ven espectaculares, sino que optimizan el trabajo diario de tu equipo y aumentan tus ventas.
            <br/><span className="text-sm text-green-400 font-medium">Haz clic en cada imagen para ver los detalles.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(item)}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent opacity-80" />
              </div>
              <div className="p-8 -mt-10 relative z-10">
                <span className={`bg-${item.color}-500/20 text-${item.color}-400 text-xs font-bold px-3 py-1 rounded-full border border-${item.color}-500/30`}>
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-white">¿Listo para innovar?</h2>
            <p className="text-gray-400">Déjanos tus datos y un experto en tecnología se comunicará contigo.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nombre Completo</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Empresa (Opcional)</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" placeholder="Mi Empresa S.A.C." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Correo Electrónico</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" placeholder="correo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Mensaje / Requerimiento</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all">
              Enviar Mensaje Seguro
            </button>
            <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Tus datos están protegidos y cifrados de extremo a extremo.
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a101f] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8">
                <span className={`inline-block mb-3 bg-${selectedProject.color}-500/20 text-${selectedProject.color}-400 text-sm font-bold px-4 py-1.5 rounded-full border border-${selectedProject.color}-500/30`}>
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {selectedProject.details}
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                  <div className="bg-green-500/20 p-3 rounded-full shrink-0">
                    <Code2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Tecnología de Vanguardia</h4>
                    <p className="text-sm text-gray-400">Implementado usando Next.js, React, TailwindCSS y bases de datos seguras con encriptación avanzada para asegurar el máximo rendimiento corporativo.</p>
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
