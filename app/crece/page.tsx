"use client";

import { motion } from "framer-motion";
import { Rocket, CheckCircle2, ShieldCheck, Camera, Zap } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    title: "Empuje Inicial",
    price: "S/ 60",
    followers: "500",
    features: [
      "¡REGALO DE LIKES EN TU ÚLTIMA FOTO!",
      "Crecimiento Orgánico-Simulado",
      "Entrega Rápida",
      "Garantía de Reposición",
    ],
    highlighted: false,
  },
  {
    title: "Emprendedor Total",
    price: "S/ 100",
    followers: "1000",
    features: [
      "+REGALO: 200 Likes y 50 Comentarios",
      "+30 DÍAS DE GARANTÍA",
      "Aumenta tu Confianza y Ventas",
      "Resultados Visibles",
      "Pago Seguro",
      "Atención Personalizada",
    ],
    highlighted: true,
  },
];

export default function CrecePage() {
  return (
    <div className="min-h-screen bg-[#050510]">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-blue-600/20 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6 border border-blue-500/30"
          >
            <Camera className="w-10 h-10 text-blue-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Potencia tu Perfil <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Hoy Mismo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Únete a cientos de perfiles que ya crecieron. ¿Qué esperas para brillar en Instagram?
          </motion.p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className={`relative rounded-3xl border ${pkg.highlighted ? 'border-green-500/50 bg-gradient-to-b from-blue-900/40 to-black' : 'border-white/10 bg-white/5'} p-8 overflow-hidden flex flex-col h-full`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-bl-xl z-10">
                  MÁS POPULAR
                </div>
              )}
              <div className="mb-6">
                <span className="text-sm text-blue-400 font-semibold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">Paquete</span>
                <h3 className="text-2xl font-bold mt-4">{pkg.title}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold">{pkg.price}</span>
                </div>
                <div className="mt-4 text-3xl font-bold text-green-400">
                  {pkg.followers} <span className="text-lg text-gray-300">Seguidores</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://wa.me/51921831358" target="_blank" className="w-full">
                <button className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${pkg.highlighted ? 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  ¡Chatea con nosotros! <Zap className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Método Innovatech: Seguro y Efectivo</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Nuestro crecimiento orgánico-simulado te asegura cero riesgo de Shadowban, entrega gradual y natural, y garantía de satisfacción total. Impulsa tu marca con tranquilidad.
          </p>
          <Link href="https://wa.me/51921831358" target="_blank">
            <button className="px-8 py-4 rounded-xl font-medium bg-white text-black hover:bg-gray-200 transition-all">
              Consultar por WhatsApp (+51 921 831 358)
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
