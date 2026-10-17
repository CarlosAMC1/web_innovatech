"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/lib/site";
import heroImg from "@/public/images/hero.png";
import crmImg from "@/public/images/crm.png";
import erpImg from "@/public/images/erp.png";
import ecommerceImg from "@/public/images/ecommerce.png";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Rocket, Code2, ShieldCheck, Zap, TrendingUp, Star, ChevronDown, Globe, Database,
  Smartphone, MessageCircle, HelpCircle,
  Check, Sparkles
} from "lucide-react";

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

/* ─── Testimonios ───
   Agrega solo testimonios reales, con autorización del cliente.
   Mientras la lista esté vacía, la sección no se muestra. Ejemplo:
   { name: "Nombre A.", role: "Cargo, Empresa", text: "Lo que dijo el cliente." } */
const testimonials: { name: string; role: string; text: string }[] = [];

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-lg font-bold text-slate-900 group-hover:text-[#00469b] transition-colors pr-8">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-600 leading-relaxed text-sm">{a}</p>
      </motion.div>
    </div>
  );
}

/* ─── Main Home Component ─── */
export default function Home() {
  // Datos verificables del propio sitio. Si quieres mostrar clientes o proyectos,
  // usa solo cifras reales que puedas respaldar.
  const stats = [
    useCounter(6),   // Servicios de software
    useCounter(5),   // Planes Crece
    useCounter(30),  // Precio desde (S/)
    useCounter(0),   // Contraseñas solicitadas
  ];

  // State for the interactive case-studies section
  const [activeTab, setActiveTab] = useState("crm");

  const showcaseProjects = [
    {
      id: "crm",
      title: "Sistemas de Gestión de Leads (CRM)",
      category: "CRM & CHAT",
      image: crmImg,
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
      image: erpImg,
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
      image: ecommerceImg,
      color: "#10b981",
      description: "Páginas de venta de alta conversión y velocidad de carga diseñadas bajo el framework de Next.js.",
      features: [
        "Carga rápida y optimizada para celulares y SEO",
        "Pasarelas de pago locales integradas (Yape, Plin, Niubiz)",
        "Panel administrativo simplificado para inventarios y ofertas"
      ]
    }
  ];

  const activeProject = showcaseProjects.find(p => p.id === activeTab) || showcaseProjects[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">

      {/* ========== 1. HERO — Split Layout (Dark Royal Blue) ========== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00caa410_1px,transparent_1px),linear-gradient(to_bottom,#00caa410_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00caa4]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#00caa4] animate-pulse" />
                Agencia Tecnológica Enterprise
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Impulsamos tu <br />
                negocio con{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00caa4] to-emerald-300">
                  software & redes
                </span>
                <span className="text-[#00caa4]">.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-xl mb-8">
                Desarrollamos software a medida (web, apps, CRM, ERP e IA) para ordenar y hacer crecer tu negocio. Y si necesitas impulso en Instagram, también te ayudamos con Innovatech Crece.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/solutions">
                  <button className="px-8 py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2">
                    Desarrollo de Software <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/crece">
                  <button className="px-8 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Rocket className="w-5 h-5 text-[#00caa4]" /> Innovatech Crece
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right — Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 bg-slate-900/50 p-2 backdrop-blur-sm">
                <div className="rounded-2xl overflow-hidden bg-slate-950">
                  <Image src={heroImg} alt="Ejemplo de panel de control desarrollado a medida" preload sizes="(min-width: 1024px) 600px, 100vw" placeholder="blur" className="w-full h-auto opacity-90" />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 p-4 hidden md:flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                  <TrendingUp className="w-6 h-6 text-[#00caa4]" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pagos Locales</p>
                  <p className="text-sm font-black text-slate-900">Yape, Plin y Transferencia</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 2. STATS BAR (Light Contrast) ========== */}
      <section className="w-full bg-white py-12 md:py-16 shadow-md border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-100">
            {[
              { label: "Servicios de Software", prefix: "", suffix: "", idx: 0 },
              { label: "Planes Innovatech Crece", prefix: "", suffix: "", idx: 1 },
              { label: "Planes Crece Desde", prefix: "S/ ", suffix: "", idx: 2 },
              { label: "Contraseñas Solicitadas", prefix: "", suffix: "", idx: 3 },
            ].map(({ label, prefix, suffix, idx }) => (
              <div key={label} className="px-4">
                <p className="text-4xl md:text-5xl font-black text-[#00469b] tracking-tight leading-none">
                  {prefix && <span className="text-[#00caa4]">{prefix}</span>}
                  <span ref={stats[idx].ref}>{stats[idx].count}</span>
                  <span className="text-[#00caa4]">{suffix}</span>
                </p>
                <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. BENTO SERVICES GRID (Slate-50) ========== */}
      <section className="w-full py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-[#00469b] uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#00caa4]" /> Nuestras Divisiones
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Impulso digital en dos frentes
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
              Desarrollamos soluciones de software robustas para tu negocio y te ayudamos a impulsar tu presencia en Instagram.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Big card — Solutions */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00caa4] to-teal-800 p-10 md:p-14 text-white shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-sm">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-[10px] font-black text-white/90 uppercase tracking-widest mb-2 block">Ingeniería de Software</span>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-none">
                  Innovatech Solutions
                </h3>
                <p className="text-teal-50 text-sm md:text-base leading-relaxed max-w-xl mb-8">
                  Diseño de ERPs, CRMs integrados, despliegue en la nube, y automatización de procesos con Inteligencia Artificial. Software robusto para transformar la operativa.
                </p>
                <Link href="/solutions">
                  <button className="px-6 py-3.5 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-md flex items-center gap-2 text-sm">
                    Conocer Soluciones <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
            {/* Small cards */}
            {[
              { icon: Globe, title: "Desarrollo Web", desc: "Plataformas rápidas, adaptadas a dispositivos móviles y orientadas a captar clientes." },
              { icon: Database, title: "Sistemas ERP/CRM", desc: "Software corporativo a medida para ordenar la facturación, ventas y stock." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div 
                key={title} 
                whileHover={{ y: -6 }} 
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#00469b]/5 rounded-xl flex items-center justify-center mb-5 border border-[#00469b]/10">
                  <Icon className="w-6 h-6 text-[#00469b]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {[
              { icon: ShieldCheck, title: "Ciberseguridad", desc: "Protección contra hackeos, auditorías de código y blindaje de servidores." },
              { icon: Smartphone, title: "Apps Móviles", desc: "Desarrollamos aplicaciones nativas o híbridas fluidas para iOS y Android." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div 
                key={title} 
                whileHover={{ y: -6 }} 
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#00caa4]/5 rounded-xl flex items-center justify-center mb-5 border border-[#00caa4]/10">
                  <Icon className="w-6 h-6 text-[#00caa4]" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {/* Big card — Crece */}
            <motion.div
              whileHover={{ y: -6 }}
              className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00469b] to-[#040e2c] p-10 md:p-14 text-white shadow-xl transition-all"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00caa4]/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-sm">
                  <Rocket className="w-7 h-7 text-[#00caa4]" />
                </div>
                <span className="text-[10px] font-black text-[#00caa4] uppercase tracking-widest mb-2 block">Marketing de Crecimiento</span>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-none">
                  Innovatech Crece
                </h3>
                <p className="text-blue-100/80 text-sm md:text-base leading-relaxed max-w-xl mb-8">
                  Impulsa tu perfil de Instagram con paquetes de seguidores entregados de forma gradual. Solo necesitamos tu @usuario: nunca pedimos contraseñas.
                </p>
                <Link href="/crece">
                  <button className="px-6 py-3.5 bg-[#00caa4] text-white hover:bg-[#00b08e] font-bold rounded-xl transition-all shadow-md flex items-center gap-2 text-sm">
                    Ver Paquetes <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========== 4. CÓMO FUNCIONA (Dark Royal Blue) ========== */}
      <section className="w-full py-24 bg-gradient-to-br from-[#040e2c] via-[#091f5e] to-[#00469b] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00caa4]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Proceso Transparente
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              ¿Cómo Funciona Nuestro Servicio?
            </h2>
            <p className="text-blue-100/70 text-sm md:text-base max-w-lg mx-auto">
              Te explicamos el flujo de trabajo en 4 simples pasos para que sepas exactamente cómo impulsamos tus canales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Selecciona tu Pack o Requisito",
                desc: "Elige uno de nuestros paquetes de Instagram Crece (desde S/ 30) o indícanos qué tipo de software a medida necesitas desarrollar."
              },
              {
                step: "02",
                title: "Compártenos tus Datos",
                desc: "Solo necesitamos tu @usuario o link de perfil de Instagram (¡nunca pedimos contraseñas!) o los requerimientos funcionales de tu sistema."
              },
              {
                step: "03",
                title: "Envía el Voucher de Pago",
                desc: "Realiza la transferencia bancaria o pago móvil vía Yape/Plin y envíanos el voucher directamente a nuestro WhatsApp de atención."
              },
              {
                step: "04",
                title: "Software en Acción",
                desc: "Para Crece, iniciamos la entrega progresiva de seguidores. Para software, arrancamos el desarrollo con entregas por etapas que puedes revisar."
              }
            ].map((s, idx) => (
              <div key={idx} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <span className="absolute top-4 right-4 text-4xl font-black text-[#00caa4]/20 tracking-tighter select-none">{s.step}</span>
                <div className="w-10 h-10 rounded-xl bg-[#00caa4]/15 flex items-center justify-center mb-5 border border-[#00caa4]/25">
                  <span className="text-[#00caa4] text-sm font-black">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{s.title}</h3>
                <p className="text-xs text-blue-100/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. CASOS DE ÉXITO & PORTAFOLIO INTERACTIVO (White) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
              Qué Construimos
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Tipos de Sistemas que Desarrollamos
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
              Ejemplos ilustrativos del alcance de las plataformas web, CRM y ERP que podemos construir para tu negocio.
            </p>
          </div>

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
                  <Image src={activeProject.image} alt={`Ejemplo ilustrativo: ${activeProject.title}`} sizes="(min-width: 1024px) 420px, 100vw" placeholder="blur" className="w-full h-auto rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. TESTIMONIALS (Slate-50) ========== */}
      {testimonials.length > 0 && (
      <section className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-[#00469b] uppercase tracking-widest mb-3">Testimonios</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00469b] to-[#00caa4] flex items-center justify-center text-white font-bold text-xs uppercase">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{t.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ========== 7. FAQ SECTION (White) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-black text-[#00469b] uppercase tracking-widest mb-3 flex items-center justify-center gap-1">
              <HelpCircle className="w-4 h-4 text-[#00caa4]" /> Dudas Resueltas
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Preguntas Frecuentes
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            <FaqItem q="¿Es seguro el servicio de Innovatech Crece?" a="Nunca te pediremos contraseñas: solo necesitamos tu @usuario. Entregamos los seguidores de forma gradual para que el crecimiento se vea natural. Ten en cuenta que Instagram puede eliminar seguidores en sus revisiones; por eso todos los planes incluyen garantía de reposición." />
            <FaqItem q="¿En cuánto tiempo veo resultados en Instagram?" a="Desde las primeras 24 horas para packs pequeños. Para packs grandes (2,000 seguidores), los enviamos de forma secuencial y distribuida en 3-5 días para mantener la seguridad." />
            <FaqItem q="¿Qué tipo de desarrollos a medida realizan?" a="Desarrollamos intranets ERP, sistemas de atención al cliente CRM multicanal, portales e-commerce Next.js y automatizaciones de flujos con inteligencia artificial." />
            <FaqItem q="¿Cómo entregan los reportes de ciberseguridad?" a="Entregamos un informe ejecutivo detallando las vulnerabilidades halladas en servidores o código, clasificados por severidad (Crítica, Alta, Media, Baja) junto con parches sugeridos." />
            <FaqItem q="¿Cuáles son los medios de pago aceptados?" a="Aceptamos Yape, Plin y transferencia bancaria. Para proyectos de software coordinamos el pago por etapas." />
          </div>
        </div>
      </section>

      {/* ========== 8. FINAL CTA (Dark Royal Blue) ========== */}
      <section className="w-full py-24 bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] relative overflow-hidden text-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00caa4]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-blue-100/70 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Ya sea que busques construir una intranet empresarial robusta o aumentar tu alcance y ventas en Instagram, somos tu socio tecnológico estratégico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions#contact">
              <button className="px-8 py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 justify-center text-sm uppercase tracking-wider">
                <MessageCircle className="w-5 h-5" /> Contáctanos
              </button>
            </Link>
            <Link href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center gap-2 justify-center text-sm uppercase tracking-wider">
                <Zap className="w-5 h-5" /> WhatsApp Directo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
