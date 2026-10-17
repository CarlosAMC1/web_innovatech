"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, Code2, ChevronDown, Globe, Database, ShieldCheck, Smartphone, Server, TerminalSquare, ArrowRight, Sparkles } from "lucide-react";

const servicesItems = [
  { icon: Globe, name: "Desarrollo Web", desc: "Sitios rápidos, modernos y optimizados para SEO.", href: "/solutions" },
  { icon: Smartphone, name: "Apps Móviles", desc: "Aplicaciones nativas e híbridas iOS/Android.", href: "/solutions" },
  { icon: Database, name: "Sistemas ERP/CRM", desc: "Sistemas a medida adaptados a tu gestión interna.", href: "/solutions" },
  { icon: ShieldCheck, name: "Ciberseguridad", desc: "Auditorías de seguridad, pentesting y protección.", href: "/solutions" },
  { icon: Server, name: "Cloud & DevOps", desc: "Despliegue escalable en AWS, Docker y la nube.", href: "/solutions" },
  { icon: TerminalSquare, name: "Automatización con IA", desc: "Procesos y agentes de IA para ahorrar costos.", href: "/solutions" },
];

const techItems = [
  { name: "Next.js", desc: "React Framework" },
  { name: "React", desc: "Frontend Library" },
  { name: "Node.js", desc: "Backend Platform" },
  { name: "TypeScript", desc: "Safe JS" },
  { name: "Python", desc: "AI & Data Science" },
  { name: "PostgreSQL", desc: "Relational DB" },
  { name: "AWS", desc: "Cloud Infrastructure" },
  { name: "Docker", desc: "Containerization" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ${
      scrolled 
        ? "bg-[#00469b]/95 backdrop-blur-lg shadow-xl shadow-blue-900/10 border-b border-[#00caa4]/20 py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setActiveDropdown(null)}>
          <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-xl bg-[#00469b] border-2 border-[#00caa4] overflow-hidden shadow-md group-hover:border-white transition-colors">
            {/* SVG Logo - Royal Blue Background with Green "i" isotype */}
            <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="38" y="36" width="24" height="48" rx="8" fill="#00caa4"/>
              <circle cx="50" cy="18" r="14" fill="#00caa4"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-white tracking-tight leading-none">
              INNOVATECH
            </span>
            <span className="text-[10px] font-bold text-[#00caa4] tracking-widest uppercase">
              Solutions & Crece
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 text-sm font-bold text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10">
            Inicio
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
            onKeyDown={(e) => e.key === "Escape" && setActiveDropdown(null)}
          >
            <button
              type="button"
              aria-expanded={activeDropdown === "services"}
              aria-haspopup="true"
              onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
              className="px-4 py-2 text-sm font-bold text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-1">
              Servicios <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`}/>
            </button>
            <AnimatePresence>
              {activeDropdown === "services" && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                >
                  <div className="grid grid-cols-[280px_260px_1fr] divide-x divide-slate-100">
                    {/* Left - Services Column */}
                    <div className="p-6 bg-slate-50/50">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#00469b]" /> Qué Hacemos
                      </p>
                      <div className="space-y-3">
                        {servicesItems.map(s => (
                          <Link key={s.name} href={s.href} onClick={() => setActiveDropdown(null)} className="group/item flex gap-3 text-left">
                            <div className="w-8 h-8 rounded-lg bg-[#00469b]/5 flex items-center justify-center group-hover/item:bg-[#00469b]/15 transition-colors shrink-0 mt-0.5">
                              <s.icon className="w-4 h-4 text-[#00469b]" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 group-hover/item:text-[#00469b] transition-colors">{s.name}</p>
                              <p className="text-[11px] text-slate-500 leading-normal">{s.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Middle - Technologies Column */}
                    <div className="p-6">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#00caa4]" /> Tecnologías
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {techItems.map(tech => (
                          <div key={tech.name} className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{tech.name}</span>
                            <span className="text-[10px] text-slate-400">{tech.desc}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/solutions" className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold text-[#00469b] hover:text-[#00caa4] transition-colors">
                        Ver soluciones de software <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Right - Highlight / Crece Promo Column */}
                    <div className="p-6 bg-gradient-to-b from-blue-50 to-teal-50/20 flex flex-col justify-between">
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase mb-3">
                          Destacado
                        </span>
                        <h4 className="text-lg font-black text-slate-900 leading-tight mb-2">
                          Innovatech Crece
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          Impulsa tu Instagram con paquetes de seguidores de entrega gradual. Solo con tu @usuario, sin contraseñas.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Link href="/crece" className="block w-full text-center py-2.5 px-4 bg-[#00469b] hover:bg-[#003c85] text-white text-xs font-bold rounded-xl transition-all shadow-md">
                          Ver Planes Crece
                        </Link>
                        <Link href="/solutions#contact" className="block w-full text-center py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all shadow-sm">
                          Cotizar Software
                        </Link>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/crece" className="px-4 py-2 text-sm font-bold text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-[#00caa4]" /> Innovatech Crece
          </Link>
          <Link href="/solutions" className="px-4 py-2 text-sm font-bold text-white/90 hover:text-white transition-colors rounded-lg hover:bg-white/10 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#00caa4]" /> Innovatech Solutions
          </Link>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/solutions#contact" className="hidden sm:block">
            <button className="px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl bg-white text-[#00469b] hover:bg-[#00caa4] hover:text-white transition-all shadow-md">
              Contáctanos
            </button>
          </Link>
          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center p-2 justify-center text-white rounded-lg hover:bg-white/10"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#00469b] border-t border-[#00caa4]/20"
          >
            <div className="px-4 py-6 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-3 px-4 text-white hover:bg-white/10 rounded-xl font-bold">
                Inicio
              </Link>
              
              <div className="border-t border-white/10 my-2 pt-2">
                <p className="px-4 text-[10px] font-black text-[#00caa4] uppercase tracking-wider">Servicios & Soluciones</p>
                <Link href="/solutions" onClick={() => setIsOpen(false)} className="block py-2.5 px-6 text-white/90 hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Innovatech Solutions
                </Link>
                <Link href="/crece" onClick={() => setIsOpen(false)} className="block py-2.5 px-6 text-white/90 hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Innovatech Crece (Instagram)
                </Link>
              </div>

              <Link href="/solutions#contact" onClick={() => setIsOpen(false)} className="block mt-6">
                <button className="w-full py-3.5 bg-[#00caa4] text-white font-bold rounded-xl shadow-lg shadow-teal-500/20">
                  Contáctanos
                </button>
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
