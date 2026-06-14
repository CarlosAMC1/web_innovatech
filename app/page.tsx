"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Code2, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 blur-[120px] -z-10 rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300">Soluciones Tecnológicas & Crecimiento</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Impulsa tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Potencial</span><br />
          al Siguiente Nivel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          En Innovatech te ofrecemos las herramientas definitivas. Desde desarrollo de software a medida hasta crecimiento explosivo y orgánico en Instagram.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/crece">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Explorar Innovatech Crece
            </button>
          </Link>
          <Link href="/solutions">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2">
              <Code2 className="w-5 h-5" />
              Ver Innovatech Solutions
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Services Split Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Innovatech Crece Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-blue-900/20 to-black p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                <Rocket className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Innovatech <span className="text-blue-400">Crece</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Potencia tu perfil hoy mismo. Obtén seguidores de calidad, likes y un crecimiento orgánico-simulado con 100% de seguridad y sin riesgo de Shadowban.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300 gap-3"><ShieldCheck className="text-blue-400 w-5 h-5" /> Seguro y Efectivo</li>
                <li className="flex items-center text-gray-300 gap-3"><TrendingUp className="text-blue-400 w-5 h-5" /> Crecimiento Rápido</li>
                <li className="flex items-center text-gray-300 gap-3"><Users className="text-blue-400 w-5 h-5" /> Seguidores de Calidad</li>
              </ul>
              <Link href="/crece" className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 group-hover:gap-3 transition-all gap-2">
                Ver Paquetes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Innovatech Solutions Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-green-900/20 to-black p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full group-hover:bg-green-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
                <Code2 className="w-7 h-7 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Innovatech <span className="text-green-400">Solutions</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Soluciones tecnológicas a medida para tu empresa. Desarrollo de software, webs modernas, seguridad informática y automatización de procesos.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300 gap-3"><Zap className="text-green-400 w-5 h-5" /> Desarrollo a Medida</li>
                <li className="flex items-center text-gray-300 gap-3"><ShieldCheck className="text-green-400 w-5 h-5" /> Ciberseguridad Integrada</li>
                <li className="flex items-center text-gray-300 gap-3"><Code2 className="text-green-400 w-5 h-5" /> Modernidad y Eficiencia</li>
              </ul>
              <Link href="/solutions" className="inline-flex items-center text-green-400 font-medium hover:text-green-300 group-hover:gap-3 transition-all gap-2">
                Conocer Servicios <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
