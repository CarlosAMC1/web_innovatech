"use client";

import { motion } from "framer-motion";
import { Rocket, CheckCircle2, ShieldCheck, Camera, Search, CreditCard, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    title: '"vamo a probar"',
    price: "S/ 30",
    followers: "100",
    features: [
      "100 Seguidores de alta calidad",
      "Entrega Rápida (24h)",
      "Garantía de reposición",
    ],
    highlighted: false,
    gradient: "from-blue-600/20 to-blue-900/40",
    borderColor: "border-blue-500/30",
  },
  {
    title: '"empecemos suave"',
    price: "S/ 60",
    followers: "500",
    features: [
      "500 Seguidores premium",
      "Mejora tu visibilidad",
      "Regalo de Likes",
    ],
    highlighted: false,
    gradient: "from-blue-500/30 to-indigo-900/40",
    borderColor: "border-indigo-500/40",
  },
  {
    title: '"tamo fino"',
    price: "S/ 100",
    followers: "800",
    features: [
      "800 Seguidores de alta calidad",
      "Método orgánico-simulado",
      "Atención personalizada",
    ],
    highlighted: false,
    gradient: "from-teal-600/30 to-blue-900/40",
    borderColor: "border-teal-500/40",
  },
  {
    title: '"bien parado"',
    price: "S/ 110",
    followers: "1000",
    features: [
      "1000 Seguidores premium",
      "Crecimiento acelerado-orgánico",
      "Mejor valor/precio",
    ],
    highlighted: true,
    gradient: "from-green-500/40 to-blue-900/50",
    borderColor: "border-green-500",
  },
  {
    title: '"eso es opulencia total"',
    price: "S/ 199",
    followers: "2000",
    features: [
      "2000 Seguidores de alta calidad",
      "Soporte prioritario VIP",
      "Plan de crecimiento personalizado",
    ],
    highlighted: false,
    gradient: "from-yellow-500/30 to-amber-900/40",
    borderColor: "border-yellow-500/50",
  },
];

const steps = [
  {
    icon: Search,
    title: "1. Elige y Contacta",
    desc: "Selecciona el pack que mejor se adapte a tu objetivo y escríbenos por WhatsApp."
  },
  {
    icon: Camera,
    title: "2. Pásanos tu Usuario",
    desc: "Solo necesitamos tu @usuario o el link de tu perfil de Instagram. ¡Nunca te pediremos tu contraseña!"
  },
  {
    icon: CreditCard,
    title: "3. Confirma tu Pago",
    desc: "Envíanos el voucher de pago mediante transferencia o billetera digital (Yape/Plin)."
  },
  {
    icon: TrendingUp,
    title: "4. ¡Magia en Acción!",
    desc: "Nuestro software comienza a enviarte seguidores reales (no bots) de forma gradual según el pack elegido."
  }
];

export default function CrecePage() {
  return (
    <div className="min-h-screen bg-[#020b18] text-gray-100 font-sans">
      {/* Hero Header */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              Servicio de Crecimiento Instagram
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Alcanza la cima de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-green-400">
                Instagram Hoy
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Aumenta tu credibilidad y atrae más clientes con seguidores reales y un crecimiento metódico y seguro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <HelpCircle className="text-blue-400 w-8 h-8" />
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            El proceso es 100% transparente, seguro y no pone en riesgo tu cuenta.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                <step.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Elige tu Pack Ideal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Todos nuestros planes incluyen garantía de reposición. Dale a tu perfil el impulso que merece.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl border bg-gradient-to-b ${pkg.gradient} ${pkg.borderColor} p-8 flex flex-col h-full`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-green-500 text-black text-sm font-bold px-4 py-1 rounded-full z-10 shadow-lg">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="mb-6 border-b border-white/10 pb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className={`w-5 h-5 ${pkg.highlighted ? 'text-green-400' : 'text-blue-400'}`} />
                  <span className="text-sm font-semibold tracking-wide text-gray-300 uppercase">Pack</span>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">{pkg.title}</h3>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-5xl font-black ${pkg.highlighted ? 'text-green-400' : 'text-blue-400'}`}>
                    {pkg.followers}
                  </span>
                  <span className="text-gray-400 font-medium mb-1">Seguidores</span>
                </div>
                
                <div className="inline-block mt-3 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="text-sm text-gray-400 mr-2">¡Solo!</span>
                  <span className="text-2xl font-bold text-white">{pkg.price}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.highlighted ? 'text-green-400' : 'text-blue-400'}`} />
                    <span className="text-gray-200 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://wa.me/51921831358" target="_blank" className="w-full mt-auto">
                <button className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${
                  pkg.highlighted 
                    ? 'bg-green-500 hover:bg-green-400 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}>
                  WhatsApp: 921 831 358
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Trust Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-[#0a1628] rounded-3xl p-8 md:p-12 border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full" />
          <ShieldCheck className="w-16 h-16 text-blue-400 mx-auto mb-6 relative z-10" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white relative z-10">Tu cuenta siempre segura</h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed relative z-10">
            Nuestros procesos de crecimiento están diseñados para respetar los límites de Instagram. 
            <strong> Jamás te pediremos contraseñas.</strong> Nuestro software inyecta tráfico orgánico-simulado 
            que la plataforma reconoce como natural. ¡Crecemos juntos, sin riesgos!
          </p>
        </div>
      </section>
    </div>
  );
}
