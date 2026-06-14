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
    color: "blue",
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
    color: "indigo",
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
    color: "teal",
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
    color: "green",
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
    color: "yellow",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-200/60 bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 blur-[120px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold mb-6 shadow-sm">
              Servicio de Crecimiento Instagram
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
              Alcanza la cima de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500">
                Instagram Hoy
              </span>
            </h1>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Aumenta tu credibilidad y atrae más clientes con seguidores reales y un crecimiento metódico y seguro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <HelpCircle className="text-blue-500 w-8 h-8 bg-blue-50 rounded-full p-1" />
            ¿Cómo funciona?
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
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
              className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
                <step.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Elige tu Pack Ideal</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Todos nuestros planes incluyen garantía de reposición. Dale a tu perfil el impulso que merece.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl border bg-white p-8 flex flex-col h-full shadow-2xl transition-all duration-300 ${
                pkg.highlighted ? 'border-green-400 shadow-green-500/10' : 'border-slate-200 shadow-slate-200/50'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-teal-500 text-white text-sm font-bold px-6 py-1.5 rounded-full z-10 shadow-lg">
                  MÁS POPULAR
                </div>
              )}
              
              <div className="mb-6 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className={`w-5 h-5 ${pkg.highlighted ? 'text-green-500' : 'text-blue-500'}`} />
                  <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Pack</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4 capitalize">{pkg.title}</h3>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-6xl font-black tracking-tight ${pkg.highlighted ? 'text-green-500' : 'text-slate-900'}`}>
                    {pkg.followers}
                  </span>
                </div>
                <span className="text-slate-500 font-medium block mb-4">Seguidores</span>
                
                <div className="inline-block bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <span className="text-sm text-slate-500 mr-2 font-medium">¡Solo!</span>
                  <span className="text-2xl font-extrabold text-slate-900">{pkg.price}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.highlighted ? 'text-green-500' : 'text-blue-500'}`} />
                    <span className="text-slate-700 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://wa.me/51921831358" target="_blank" className="w-full mt-auto">
                <button className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg ${
                  pkg.highlighted 
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                }`}>
                  WhatsApp: 921 831 358
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Trust Section */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-2xl shadow-blue-900/5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 blur-[80px] rounded-full" />
          <ShieldCheck className="w-16 h-16 text-blue-500 mx-auto mb-6 relative z-10 bg-blue-50 rounded-full p-2" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-slate-900 relative z-10">Tu cuenta siempre segura</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed relative z-10 text-lg">
            Nuestros procesos de crecimiento están diseñados para respetar los límites de Instagram. 
            <strong className="text-slate-900"> Jamás te pediremos contraseñas.</strong> Nuestro software inyecta tráfico orgánico-simulado 
            que la plataforma reconoce como natural. ¡Crecemos juntos, sin riesgos!
          </p>
        </div>
      </section>
    </div>
  );
}
