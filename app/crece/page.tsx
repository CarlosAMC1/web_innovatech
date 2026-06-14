"use client";

import { motion } from "framer-motion";
import { Rocket, CheckCircle2, ShieldCheck, Camera, Search, CreditCard, TrendingUp, HelpCircle, ArrowRight, Zap, Check } from "lucide-react";
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
  },
  {
    title: '"empecemos suave"',
    price: "S/ 60",
    followers: "500",
    features: [
      "500 Seguidores premium",
      "Mejora tu visibilidad",
      "Regalo de Likes orgánicos",
    ],
    highlighted: false,
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
  },
  {
    title: '"bien parado"',
    price: "S/ 110",
    followers: "1000",
    features: [
      "1000 Seguidores premium",
      "Crecimiento acelerado-orgánico",
      "Mejor relación valor/precio",
      "Soporte rápido por WhatsApp",
    ],
    highlighted: true,
  },
  {
    title: '"eso es opulencia total"',
    price: "S/ 199",
    followers: "2000",
    features: [
      "2000 Seguidores de alta calidad",
      "Soporte prioritario VIP",
      "Plan de crecimiento gradual",
    ],
    highlighted: false,
  },
];

const steps = [
  {
    icon: Search,
    title: "1. Elige tu Plan",
    desc: "Selecciona el pack de seguidores que mejor se adapte a tus metas y contacta con nosotros."
  },
  {
    icon: Camera,
    title: "2. Envía tu Usuario",
    desc: "Solo requerimos tu @usuario o el enlace directo a tu perfil de Instagram. ¡No pedimos claves!"
  },
  {
    icon: CreditCard,
    title: "3. Confirma el Pago",
    desc: "Envíanos la captura de tu voucher mediante transferencia bancaria o Yape/Plin."
  },
  {
    icon: TrendingUp,
    title: "4. Crecimiento Seguro",
    desc: "Nuestro software inyecta interacciones progresivas y seguidores reales según el plan elegido."
  }
];

export default function CrecePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">
      
      {/* ========== HERO HEADER (Dark Royal Blue) ========== */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00caa408_1px,transparent_1px),linear-gradient(to_bottom,#00caa408_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00caa4]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#00caa4] animate-pulse" />
              Instagram Marketing
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">
              Impulsa tu Perfil de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00caa4] to-emerald-300">
                Instagram Hoy
              </span>
            </h1>
            <p className="text-blue-100/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Consigue seguidores reales y activos mediante nuestro software de crecimiento simulado. Aumenta la credibilidad y el impacto de tu marca personal o corporativa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS (White Background) ========== */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-white rounded-t-[2.5rem] mt-[-2rem] relative z-20 shadow-xl border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
            Simplicidad
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center justify-center gap-2">
            ¿Cómo funciona?
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-xs md:text-sm">
            Un flujo rápido, transparente y 100% seguro para garantizar interacciones óptimas.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00469b]/5 flex items-center justify-center mb-5 border border-[#00469b]/10">
                <step.icon className="w-6 h-6 text-[#00469b]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== PACKAGES SECTION (Slate-50 Background) ========== */}
      <section className="w-full py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00caa4]/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Precios Claros
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Planes de Crecimiento</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-xs md:text-sm">
              Todos los paquetes disponen de garantía de reposición. Aumenta tu alcance con total tranquilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 ${
                  pkg.highlighted 
                    ? 'border-[#00caa4] ring-1 ring-[#00caa4]' 
                    : 'border-slate-200'
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00caa4] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-md">
                    MÁS POPULAR
                  </div>
                )}
                
                <div className="mb-6 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Rocket className={`w-4 h-4 ${pkg.highlighted ? 'text-[#00caa4]' : 'text-[#00469b]'}`} />
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Paquete</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 capitalize">{pkg.title}</h3>
                  
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-5xl font-black tracking-tight ${pkg.highlighted ? 'text-[#00caa4]' : 'text-slate-900'}`}>
                      {pkg.followers}
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Seguidores</span>
                  </div>
                  
                  <div className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 mt-4">
                    <span className="text-xs text-slate-400 mr-1.5 font-bold uppercase">Valor</span>
                    <span className="text-xl font-black text-slate-900">{pkg.price}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlighted ? 'text-[#00caa4]' : 'text-[#00469b]'}`} />
                      <span className="text-slate-600 font-semibold">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`https://wa.me/51921831358?text=Hola,%20me%20interesa%20el%20paquete%20${encodeURIComponent(pkg.title)}`} target="_blank" className="w-full mt-auto">
                  <button className={`w-full py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-wider shadow-sm ${
                    pkg.highlighted 
                      ? 'bg-[#00caa4] hover:bg-[#00b08e] text-white shadow-teal-500/20' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}>
                    <Zap className="w-3.5 h-3.5" /> Adquirir Plan
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECURITY TRUST SECTION (White Background) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 blur-[80px] rounded-full pointer-events-none" />
            <ShieldCheck className="w-14 h-14 text-[#00469b] mx-auto mb-6 relative z-10 bg-white rounded-full p-2 border border-slate-100 shadow-sm" />
            
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 relative z-10">Tu cuenta siempre segura</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed relative z-10 text-xs md:text-sm">
              Nuestros procesos de crecimiento están diseñados para respetar las políticas de la plataforma.
              <strong className="text-slate-900"> Jamás te pediremos contraseñas.</strong> Nuestro software inyecta visitas orgánicas que indexan de manera natural el perfil para garantizar estabilidad. ¡Crece sin riesgos!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
