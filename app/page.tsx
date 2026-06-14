"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Code2, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-4 pt-24 pb-20 md:pt-32 md:pb-32 flex flex-col items-center text-center border-b border-slate-200/60">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-100/50 via-green-50/50 to-slate-50 -z-10" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-green-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-semibold text-slate-700">Soluciones Tecnológicas & Crecimiento</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900"
        >
          Impulsa tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Potencial</span><br />
          al Siguiente Nivel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
        >
          En Innovatech te ofrecemos las herramientas definitivas. Desde desarrollo de software a medida hasta crecimiento explosivo y orgánico en Instagram.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <Link href="/crece">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5 text-blue-400" />
              Explorar Innovatech Crece
            </button>
          </Link>
          <Link href="/solutions">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 transition-all shadow-sm flex items-center justify-center gap-2">
              <Code2 className="w-5 h-5 text-green-500" />
              Ver Innovatech Solutions
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative w-full max-w-5xl mx-auto rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-blue-900/5 bg-white p-2"
        >
          <div className="rounded-2xl overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero.png" alt="Innovatech Dashboard Mockup" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Services Split Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Todo lo que necesitas en un solo lugar</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Dos divisiones especializadas trabajando en conjunto para escalar tu negocio de forma integral.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Innovatech Crece Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl shadow-slate-200/50"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 blur-[80px] rounded-full group-hover:bg-blue-100 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                <Rocket className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Innovatech <span className="text-blue-600">Crece</span></h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Potencia tu perfil hoy mismo. Obtén seguidores de calidad, likes y un crecimiento orgánico-simulado con 100% de seguridad y sin riesgo de Shadowban.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700 font-medium gap-3"><ShieldCheck className="text-blue-500 w-5 h-5 bg-blue-50 rounded-full" /> Seguro y Efectivo</li>
                <li className="flex items-center text-slate-700 font-medium gap-3"><TrendingUp className="text-blue-500 w-5 h-5 bg-blue-50 rounded-full" /> Crecimiento Rápido</li>
                <li className="flex items-center text-slate-700 font-medium gap-3"><Users className="text-blue-500 w-5 h-5 bg-blue-50 rounded-full" /> Seguidores de Calidad</li>
              </ul>
              <Link href="/crece">
                <button className="w-full py-4 rounded-xl font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-all">
                  Ver Paquetes de Crecimiento
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Innovatech Solutions Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl shadow-slate-200/50"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 blur-[80px] rounded-full group-hover:bg-teal-100 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 border border-teal-100 shadow-sm">
                <Code2 className="w-7 h-7 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Innovatech <span className="text-teal-600">Solutions</span></h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Soluciones tecnológicas a medida para tu empresa. Desarrollo de software, webs modernas, seguridad informática y automatización de procesos.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-700 font-medium gap-3"><Zap className="text-teal-500 w-5 h-5 bg-teal-50 rounded-full" /> Desarrollo a Medida</li>
                <li className="flex items-center text-slate-700 font-medium gap-3"><ShieldCheck className="text-teal-500 w-5 h-5 bg-teal-50 rounded-full" /> Ciberseguridad Integrada</li>
                <li className="flex items-center text-slate-700 font-medium gap-3"><Code2 className="text-teal-500 w-5 h-5 bg-teal-50 rounded-full" /> Modernidad y Eficiencia</li>
              </ul>
              <Link href="/solutions">
                <button className="w-full py-4 rounded-xl font-bold bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-all">
                  Conocer Nuestros Servicios
                </button>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
