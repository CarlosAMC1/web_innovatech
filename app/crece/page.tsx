"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, CheckCircle2, ShieldCheck, Camera, Search, 
  CreditCard, TrendingUp, HelpCircle, ArrowRight, Zap, 
  Check, Sparkles, AlertCircle, Users, Activity, Eye, RefreshCw
} from "lucide-react";
import Link from "next/link";

const packages = [
  {
    id: 0,
    title: '"vamo a probar"',
    price: "S/ 30",
    followers: 100,
    followersText: "100",
    time: "Entrega Rápida (24h)",
    features: [
      "100 Seguidores de alta calidad",
      "Seguimiento de perfil activo",
      "Garantía de reposición (30 días)",
      "Método seguro sin contraseñas",
    ],
    highlighted: false,
    badge: "Prueba inicial",
    accent: "from-blue-500 to-indigo-500"
  },
  {
    id: 1,
    title: '"empecemos suave"',
    price: "S/ 60",
    followers: 500,
    followersText: "500",
    time: "Entrega Segura (24-48h)",
    features: [
      "500 Seguidores premium activos",
      "Aumento inmediato de credibilidad",
      "Regalo de Likes orgánicos",
      "Garantía de reposición (30 días)",
    ],
    highlighted: false,
    badge: "Recomendado marcas",
    accent: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: '"tamo fino"',
    price: "S/ 100",
    followers: 800,
    followersText: "800",
    time: "Entrega Gradual (2-3 días)",
    features: [
      "800 Seguidores de alta calidad",
      "Interacción simulada orgánica",
      "Garantía extendida (60 días)",
      "Soporte rápido por WhatsApp",
    ],
    highlighted: false,
    badge: "Mejor alcance",
    accent: "from-[#e1306c] to-[#f77737]"
  },
  {
    id: 3,
    title: '"bien parado"',
    price: "S/ 110",
    followers: 1000,
    followersText: "1,000",
    time: "Distribución Natural (3-4 días)",
    features: [
      "1,000 Seguidores premium activos",
      "Inyección orgánica segura",
      "Máxima relación valor/precio",
      "Garantía extendida (90 días)",
      "Soporte prioritario 24/7",
    ],
    highlighted: true,
    badge: "EL MÁS VENDIDO",
    accent: "from-[#00caa4] to-emerald-500"
  },
  {
    id: 4,
    title: '"opulencia total"',
    price: "S/ 199",
    followers: 2000,
    followersText: "2,000",
    time: "Entrega Secuencial (5-7 días)",
    features: [
      "2,000 Seguidores premium VIP",
      "Estrategia de goteo natural",
      "Garantía de por vida",
      "Análisis de perfil de regalo",
      "Soporte dedicado VIP",
    ],
    highlighted: false,
    badge: "Crecimiento corporativo",
    accent: "from-yellow-500 to-amber-500"
  },
];

const steps = [
  {
    icon: Search,
    title: "1. Elige tu Plan",
    desc: "Usa nuestra calculadora interactiva o revisa los paquetes clásicos para elegir la cantidad de seguidores ideales para tu marca."
  },
  {
    icon: Camera,
    title: "2. Envía tu @Usuario",
    desc: "Solo requerimos tu nombre de usuario de Instagram o el link de tu perfil. Jamás te pediremos contraseñas ni datos privados."
  },
  {
    icon: CreditCard,
    title: "3. Confirma tu Pago",
    desc: "Envíanos la captura de tu voucher mediante Yape, Plin o transferencia bancaria a nuestro chat de WhatsApp."
  },
  {
    icon: TrendingUp,
    title: "4. Despegue Orgánico",
    desc: "Nuestro software propietario inicia el envío progresivo de seguidores reales simulando actividad natural para cuidar tu cuenta."
  }
];

export default function CrecePage() {
  // Calculator state
  const [sliderVal, setSliderVal] = useState(3); // Default index 3 (1000 followers)
  const currentPack = packages[sliderVal];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">
      
      {/* ========== HERO HEADER (Instagram Gradient Fusion) ========== */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-gradient-to-br from-[#00469b] via-[#09163b] to-[#36092b] text-white">
        {/* Subtle grid and decorative circles */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#e1306c]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00caa4]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#00caa4] text-xs font-black uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Innovatech Crece v2.0
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Domina el algoritmo <br />
                de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1306c] via-[#f77737] to-[#00caa4]">
                  Instagram
                </span>
                <span className="text-[#00caa4]">.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-xl mb-8">
                Deja de pelear por alcance. Generamos interacciones y seguidores reales, activos y seguros que le dan a tu marca la autoridad comercial que necesita para vender más. Sin bots basura, 100% libre de shadowbans.
              </p>

              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 mb-8 max-w-md">
                <div>
                  <p className="text-2xl font-black text-white">+580k</p>
                  <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-bold">Seguidores Entregados</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">99.8%</p>
                  <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-bold">Tasa de Seguridad</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">&lt; 24h</p>
                  <p className="text-[10px] text-blue-200/50 uppercase tracking-widest font-bold">Tiempo de Respuesta</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#calculator">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[#e1306c] to-[#f77737] hover:scale-[1.02] active:scale-[0.98] text-white transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                    <Zap className="w-4 h-4" /> Calcular Crecimiento
                  </button>
                </a>
                <a href="#packages">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all text-sm flex items-center justify-center gap-2">
                    Ver Paquetes Clásicos <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </motion.div>

            {/* Right Column — 3D Render Image */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-[450px]">
                {/* Glowing backdrop circle */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e1306c] to-[#00caa4] rounded-3xl blur-2xl opacity-35 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/80 p-2">
                  <img src="/images/instagram_growth.png" alt="Instagram Growth Graphics" className="w-full h-auto rounded-2xl" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========== WHY US BENTO BOXES (White Background) ========== */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-white rounded-t-[2.5rem] mt-[-2rem] relative z-20 shadow-xl border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
            Ventajas Clave
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">¿Por qué Innovatech Crece?</h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-xs md:text-sm">
            Nuestros servidores inyectan tráfico inteligente imitando la actividad real de los usuarios, haciendo el crecimiento imperceptible para el sistema de seguridad de Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              title: "Seguidores de Calidad",
              desc: "Perfiles estructurados, con publicaciones, fotos y actividad. Sin cuentas fantasma vacías."
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              title: "Crecimiento 100% Seguro",
              desc: "Simulamos goteo natural por software propio. Tu cuenta no infringe ninguna regla interna."
            },
            {
              icon: RefreshCw,
              color: "text-pink-600 bg-pink-50 border-pink-100",
              title: "Garantía de Reposición",
              desc: "¿Ocurrió una caída? Nuestro sistema detecta fluctuaciones y repone automáticamente las bajas de regalo."
            },
            {
              icon: Activity,
              color: "text-amber-600 bg-amber-50 border-amber-100",
              title: "Aumento de Alcance",
              desc: "Instagram premia el volumen de tu comunidad. Más seguidores implica que el algoritmo priorice tus posts."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:scale-[1.01] hover:border-slate-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== INTERACTIVE CALCULATOR (Slate-50) ========== */}
      <section id="calculator" className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/60 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e1306c]/15 text-[#e1306c] text-[10px] font-black uppercase tracking-wider mb-3">
              Herramienta Interactiva
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Calcula tu Crecimiento en Segundos</h2>
            <p className="text-slate-500 mt-2 text-xs md:text-sm">
              Arrastra el control deslizante para estimar tu volumen de seguidores, costo y velocidad de entrega.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Left Side: Slider Controls */}
              <div className="space-y-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cantidad Elegida</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-black text-[#00469b] tracking-tight">
                      {currentPack.followersText}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">Seguidores</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="relative pt-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="4" 
                    value={sliderVal} 
                    onChange={(e) => setSliderVal(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#e1306c] border border-slate-200" 
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-3 px-1">
                    <span>100</span>
                    <span>500</span>
                    <span>800</span>
                    <span>1K (Pop)</span>
                    <span>2K</span>
                  </div>
                </div>

                {/* Delivery details */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Modo de Entrega</span>
                    <span className="font-black text-[#00469b]">{currentPack.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Paquete</span>
                    <span className="font-black text-[#e1306c] capitalize">{currentPack.title}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Garantía Incluida</span>
                    <span className="font-black text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Reposición activa
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Price Output & Call to Action */}
              <div className="bg-gradient-to-br from-[#00469b] to-[#040e2c] rounded-2xl p-6 text-white text-center flex flex-col justify-between h-full relative overflow-hidden border border-[#00caa4]/20 shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1306c]/10 blur-[50px] rounded-full pointer-events-none" />
                
                <div>
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-white/15 text-[#00caa4] text-[9px] font-black uppercase tracking-wider mb-4">
                    {currentPack.badge}
                  </span>
                  <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Precio Total Especial</p>
                  <p className="text-5xl font-black text-white mb-6">
                    {currentPack.price}
                  </p>
                </div>

                <div className="space-y-4">
                  <ul className="text-left space-y-2 mb-6 text-xs text-blue-100/80">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00caa4] shrink-0" />
                      <span>Tráfico orgánico-simulado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00caa4] shrink-0" />
                      <span>Solo con tu @usuario o link</span>
                    </li>
                  </ul>

                  <Link 
                    href={`https://wa.me/51921831358?text=Hola,%20quiero%20el%20servicio%20Crece%20de%20${currentPack.followersText}%20seguidores%20(${encodeURIComponent(currentPack.title)})%20por%20${encodeURIComponent(currentPack.price)}.`}
                    target="_blank"
                    className="block w-full"
                  >
                    <button className="w-full py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] text-white transition-all shadow-md flex justify-center items-center gap-2 text-xs uppercase tracking-wider">
                      <Zap className="w-4 h-4" /> Comprar por WhatsApp
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== STEP BY STEP TIMELINE (White Background) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00caa4]/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Flujo Seguro
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">¿Cómo Iniciamos?</h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto text-xs md:text-sm">
              Sigue estos sencillos pasos. No requerimos claves ni accesos administrativos. Todo se procesa de forma externa.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-[#00469b]/10 select-none">{`0${idx + 1}`}</span>
                <div className="w-10 h-10 rounded-xl bg-[#00469b]/5 flex items-center justify-center mb-5 border border-[#00469b]/10">
                  <step.icon className="w-5 h-5 text-[#00caa4]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PACKAGES GRID (Slate-50 Background) ========== */}
      <section id="packages" className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
              Todos los Planes
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Elige tu Paquete Clásico</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-xs md:text-sm">
              Todos los paquetes se entregan de forma gradual para simular el comportamiento de viralidad de la plataforma.
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
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00caa4] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-10 shadow-md">
                    RECOMENDADO
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
                      {pkg.followersText}
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Seguidores</span>
                  </div>
                  
                  <div className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 mt-4">
                    <span className="text-xs text-slate-400 mr-1.5 font-bold uppercase">Inversión</span>
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
          <div className="bg-gradient-to-br from-[#00469b] to-[#040e2c] rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-center relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00caa4]/10 blur-[80px] rounded-full pointer-events-none" />
            <ShieldCheck className="w-14 h-14 text-[#00caa4] mx-auto mb-6 relative z-10 bg-white/10 rounded-full p-2 border border-white/10 shadow-sm" />
            
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-white relative z-10">Cero riesgos de penalización</h2>
            <p className="text-blue-100/70 max-w-2xl mx-auto leading-relaxed relative z-10 text-xs md:text-sm">
              Nuestros procesos de crecimiento están diseñados para respetar las directrices de la plataforma.
              <strong className="text-white"> Jamás solicitaremos tus credenciales de acceso.</strong> Nuestro software inyecta visitas orgánicas que indexan de manera natural el perfil para garantizar total confidencialidad y estabilidad a largo plazo. ¡Asegura tu crecimiento!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
