"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, Rocket, Code2, ShieldCheck, Zap, Users,
  TrendingUp, Star, ChevronDown, Globe, Database,
  TerminalSquare, Smartphone, MessageCircle
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
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return { count, ref };
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors pr-8">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-slate-600 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

/* ─── Page ─── */
export default function Home() {
  const stats = [
    useCounter(500),
    useCounter(98),
    useCounter(24),
    useCounter(15),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* ========== 1. HERO — Split Layout (BairesDev style) ========== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Soluciones Tecnológicas & Crecimiento Digital
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Lleva tu negocio al{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                  siguiente nivel
                </span>
                <span className="text-blue-600">.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Somos <strong className="text-slate-900">Innovatech</strong>. Desarrollamos software a medida, automatizamos procesos con IA y hacemos crecer tu presencia en Instagram con seguidores reales. Todo bajo un mismo techo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/solutions">
                  <button className="px-8 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2">
                    Solicitar Cotización <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/crece">
                  <button className="px-8 py-4 rounded-xl font-bold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-all shadow-sm flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-blue-500" /> Crecer en Instagram
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white p-2">
                <div className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/hero.png" alt="Innovatech Platform Dashboard" className="w-full h-auto" />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 hidden md:flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">+340% crecimiento</p>
                  <p className="text-xs text-slate-500">Promedio de nuestros clientes</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 2. STATS BAR (Globant-style numbers) ========== */}
      <section className="w-full bg-slate-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Clientes Satisfechos", suffix: "+", idx: 0 },
              { label: "Tasa de Retención", suffix: "%", idx: 1 },
              { label: "Soporte 24/7", suffix: "h", idx: 2 },
              { label: "Proyectos Entregados", suffix: "+", idx: 3 },
            ].map(({ label, suffix, idx }) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  <span ref={stats[idx].ref}>{stats[idx].count}</span>
                  <span className="text-blue-400">{suffix}</span>
                </p>
                <p className="text-sm text-slate-400 mt-2 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. TRUST LOGOS (Globant pattern) ========== */}
      <section className="w-full py-16 bg-slate-50/50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Tecnologías que dominamos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {["Next.js", "React", "Node.js", "PostgreSQL", "Python", "AWS", "Tailwind", "Prisma"].map(tech => (
              <span key={tech} className="text-xl md:text-2xl font-extrabold text-slate-400 hover:text-slate-700 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. BENTO SERVICES GRID (Odoo / Globant) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Nuestras Divisiones</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Todo lo que tu negocio necesita
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dos divisiones especializadas trabajando en conjunto para escalar tu empresa de forma integral.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Big card — Crece */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-14 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                  <Rocket className="w-7 h-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                  Innovatech Crece
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed max-w-xl mb-8">
                  Potencia tu perfil de Instagram con seguidores reales, likes orgánicos y un crecimiento metódico y seguro. Sin bots, sin riesgo de Shadowban.
                </p>
                <Link href="/crece">
                  <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2">
                    Ver Paquetes <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Small cards */}
            {[
              { icon: Globe, title: "Desarrollo Web", desc: "Sitios rápidos, modernos y que convierten visitantes en clientes." },
              { icon: Database, title: "Sistemas ERP/CRM", desc: "Software de gestión adaptado a tus procesos internos." },
              { icon: ShieldCheck, title: "Ciberseguridad", desc: "Auditorías, pentesting y protección contra amenazas." },
              { icon: Smartphone, title: "Apps Móviles", desc: "Aplicaciones nativas e híbridas para iOS y Android." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} whileHover={{ y: -5 }} className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/30 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5 border border-teal-100">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {/* Big card — Solutions */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 p-10 md:p-14 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/20 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                  Innovatech Solutions
                </h3>
                <p className="text-teal-100 text-lg leading-relaxed max-w-xl mb-8">
                  Desarrollo de software a medida, automatización con IA, ciberseguridad y despliegue en la nube. Soluciones completas para empresas que quieren escalar.
                </p>
                <Link href="/solutions">
                  <button className="px-6 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-all shadow-lg flex items-center gap-2">
                    Conocer Servicios <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 5. TESTIMONIALS (Social Proof) ========== */}
      <section className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Testimonios</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos M.",
                role: "CEO, AgriTech Perú",
                text: "Innovatech nos desarrolló un ERP a medida que nos ahorró 5 horas diarias en gestión administrativa. La inversión se recuperó en 2 meses.",
              },
              {
                name: "Lucía R.",
                role: "Influencer, @luciafitperu",
                text: "Pasé de 800 seguidores a 3,200 en menos de un mes con Innovatech Crece. Todos reales y activos. Me empezaron a llegar colaboraciones de marcas.",
              },
              {
                name: "Roberto S.",
                role: "Gerente de TI, Logística Express",
                text: "Su equipo de ciberseguridad detectó vulnerabilidades críticas que otros pasaron por alto. Nos sentimos mucho más seguros ahora.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-200/30"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. FAQ SECTION ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Preguntas Frecuentes</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              ¿Tienes dudas? Te las resolvemos
            </h2>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 md:p-8">
            <FaqItem q="¿Es seguro comprar seguidores de Instagram?" a="Sí. No usamos bots. Nuestro software genera tráfico orgánico-simulado que Instagram reconoce como interacción natural. Jamás te pedimos tu contraseña." />
            <FaqItem q="¿En cuánto tiempo veo resultados con Innovatech Crece?" a="Dependiendo del paquete, desde 24 horas (paquetes pequeños) hasta 1-2 semanas (paquetes grandes de 2000 seguidores para un crecimiento gradual y natural)." />
            <FaqItem q="¿Qué tipo de software desarrollan?" a="Desarrollamos sistemas a medida (ERP, CRM), aplicaciones web y móviles, tiendas e-commerce, dashboards gerenciales y todo tipo de automatización con IA." />
            <FaqItem q="¿Ofrecen servicios de ciberseguridad?" a="Sí. Realizamos auditorías de seguridad, pentesting, monitoreo de amenazas y protección de datos para mantener tu infraestructura a salvo de hackers." />
            <FaqItem q="¿Qué métodos de pago aceptan?" a="Para Innovatech Crece aceptamos Yape, Plin y transferencia bancaria. Para proyectos de software, trabajamos con pagos fraccionados por hitos de entrega." />
          </div>
        </div>
      </section>

      {/* ========== 7. FINAL CTA ========== */}
      <section className="w-full py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ya sea que necesites crecer en redes sociales o construir el software que tu empresa merece, estamos aquí para ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions#contact">
              <button className="px-8 py-4 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2 justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" /> Contáctanos Ahora
              </button>
            </Link>
            <Link href="https://wa.me/51921831358" target="_blank">
              <button className="px-8 py-4 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 transition-all shadow-lg flex items-center gap-2 justify-center">
                <Zap className="w-5 h-5" /> WhatsApp Directo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
