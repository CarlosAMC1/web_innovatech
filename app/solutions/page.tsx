"use client";

import { motion } from "framer-motion";
import { Code2, Server, ShieldCheck, Database, Smartphone, Globe, TerminalSquare } from "lucide-react";
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

export default function SolutionsPage() {
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
            className="text-4xl md:text-6xl font-bold mb-4"
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
              <button className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)]">
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
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
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
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* CRM Showcase */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden group shadow-[0_0_40px_rgba(37,99,235,0.1)]"
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/crm.png" alt="Plataforma CRM" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent opacity-80" />
            </div>
            <div className="p-8 -mt-10 relative z-10">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">CRM & CHAT</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Sistemas de Gestión de Leads</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Plataformas de atención al cliente (Omnicanalidad) con interfaces modernas, oscuras y de alta respuesta para tus asesores de ventas.
              </p>
            </div>
          </motion.div>

          {/* ERP Showcase */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden group shadow-[0_0_40px_rgba(34,197,94,0.1)]"
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/erp.png" alt="Sistema ERP" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent opacity-80" />
            </div>
            <div className="p-8 -mt-10 relative z-10">
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">INTRANET ERP</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Gestión de Recursos y Reportes</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Dashboards gerenciales con métricas en tiempo real, filtros detallados y exportación de datos para la toma de decisiones empresariales.
              </p>
            </div>
          </motion.div>

          {/* Ecommerce Showcase */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden group shadow-[0_0_40px_rgba(234,179,8,0.1)]"
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ecommerce.png" alt="E-Commerce Website" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent opacity-80" />
            </div>
            <div className="p-8 -mt-10 relative z-10">
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">E-COMMERCE</span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">Tiendas Virtuales Premium</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Páginas de ventas de alto impacto visual (ej. Bodegas, Retail) diseñadas para generar confianza, retener al cliente y maximizar la conversión.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">¿Listo para innovar?</h2>
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
    </div>
  );
}
