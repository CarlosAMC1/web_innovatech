import Link from "next/link";
import {
  Rocket, ShieldCheck, Camera, Search,
  CreditCard, TrendingUp, ArrowRight, Zap,
  Check, Sparkles, Activity, Users, RefreshCw
} from "lucide-react";
import { MotionDiv } from "@/components/motion";
import { GrowthMockup } from "@/components/Mockups";
import LiveCounterWidget from "@/components/crece/LiveCounterWidget";
import Calculator from "@/components/crece/Calculator";
import { packages } from "@/lib/crece-packages";
import { whatsappLink } from "@/lib/site";

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
    desc: "Iniciamos el envío progresivo de seguidores, distribuido en el tiempo para que el crecimiento se vea natural."
  }
];

/* ─── Floating Starry Sky Particles ─── */
// Valores pseudoaleatorios fijos por índice para que servidor y navegador coincidan.
// Se animan con CSS (sin JavaScript).
const rand = (i: number, seed: number) => {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const particles = Array.from({ length: 25 }, (_, i) => ({
  size: rand(i, 1) * 3 + 1.5,
  left: rand(i, 2) * 100,
  top: rand(i, 3) * 100,
  opacity: rand(i, 4) * 0.25 + 0.05,
  drift: rand(i, 5) * 30 - 15,
  duration: rand(i, 6) * 15 + 12,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-float-up"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            "--drift": `${p.drift.toFixed(1)}px`,
            "--duration": `${p.duration.toFixed(1)}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function CrecePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">
      
      {/* ========== HERO HEADER (Instagram Gradient Fusion) ========== */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-gradient-to-br from-[#00469b] via-[#09163b] to-[#36092b] text-white">
        <FloatingParticles />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-[#e1306c]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00caa4]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Info */}
            <div className="animate-fade-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#00caa4] text-xs font-black uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#e1306c]" /> Innovatech Crece v2.0
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                Domina el algoritmo <br />
                de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1306c] via-[#f77737] to-[#00caa4] animate-pulse">
                  Instagram
                </span>
                <span className="text-[#00caa4]">.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-xl mb-8">
                Dale a tu marca el empujón inicial que necesita. Paquetes de seguidores con entrega gradual, sin pedirte contraseñas y con garantía de reposición si hay bajas.
              </p>

              {/* Floating Widget & Info row */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8 border-t border-white/10 pt-6">
                <LiveCounterWidget />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-100/90">
                    <Check className="w-4 h-4 text-[#00caa4]" />
                    <span>Entrega Gradual y Natural</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-100/90">
                    <Check className="w-4 h-4 text-[#00caa4]" />
                    <span>Sin Contraseñas: Solo tu @usuario</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-100/90">
                    <Check className="w-4 h-4 text-[#00caa4]" />
                    <span>Garantía de Reposición Incluida</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#calculator">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[#e1306c] to-[#f77737] hover:scale-[1.03] hover:shadow-pink-500/35 active:scale-[0.98] text-white transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                    <Zap className="w-4 h-4" /> Calcular Crecimiento
                  </button>
                </a>
                <a href="#packages">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2">
                    Ver Paquetes Clásicos <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right Column — Illustration */}
            <div className="relative flex justify-center animate-fade-right">
              <div className="relative w-full max-w-[450px]">
                {/* Glowing backdrop circle */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e1306c] to-[#00caa4] rounded-3xl blur-2xl opacity-35" />
                <div
                  className="hover:-translate-y-2 hover:rotate-1 transition-transform duration-300 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/80 p-2 cursor-pointer"
                >
                  <GrowthMockup title="Ilustración de crecimiento de seguidores de un perfil" className="block w-full h-auto rounded-2xl" />
                </div>
              </div>
            </div>

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
            Un servicio simple y transparente para darle a tu perfil la prueba social que ayuda a generar confianza en nuevos clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              title: "Perfiles con Foto y Publicaciones",
              desc: "Cuentas con foto de perfil y publicaciones, no perfiles vacíos sin contenido."
            },
            {
              icon: ShieldCheck,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              title: "Sin Contraseñas",
              desc: "Solo necesitamos tu @usuario. Nunca pedimos accesos y la entrega es gradual para que se vea natural."
            },
            {
              icon: RefreshCw,
              color: "text-pink-600 bg-pink-50 border-pink-100",
              title: "Garantía de Reposición",
              desc: "¿Ocurrió una caída? Reponemos las bajas sin costo dentro del plazo de garantía de tu plan."
            },
            {
              icon: Activity,
              color: "text-amber-600 bg-amber-50 border-amber-100",
              title: "Prueba Social",
              desc: "Un perfil con más seguidores transmite más confianza a quien lo visita por primera vez."
            }
          ].map((item, idx) => (
            <MotionDiv 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </MotionDiv>
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

          <Calculator />
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
              <MotionDiv 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <span className="absolute top-4 right-4 text-3xl font-black text-[#00469b]/10 select-none">{`0${idx + 1}`}</span>
                <div className="w-10 h-10 rounded-xl bg-[#00469b]/5 flex items-center justify-center mb-5 border border-[#00469b]/10">
                  <step.icon className="w-5 h-5 text-[#00caa4]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </MotionDiv>
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
              Todos los paquetes se entregan de forma gradual para que el crecimiento se vea natural.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: pkg.highlighted 
                    ? "0 20px 40px -15px rgba(0, 202, 164, 0.35)" 
                    : "0 20px 40px -15px rgba(0, 70, 155, 0.2)"
                }}
                className={`relative rounded-3xl border bg-white p-8 flex flex-col h-full shadow-sm cursor-pointer transition-all duration-300 ${
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

                <Link href={whatsappLink(`Hola, me interesa el paquete ${pkg.title} (${pkg.followersText} seguidores por ${pkg.price}).`)} target="_blank" rel="noopener noreferrer" className="w-full mt-auto">
                  <button className={`w-full py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-wider shadow-sm ${
                    pkg.highlighted 
                      ? 'bg-[#00caa4] hover:bg-[#00b08e] text-white shadow-teal-500/20' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
                  }`}>
                    <Zap className="w-3.5 h-3.5" /> Adquirir Plan
                  </button>
                </Link>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECURITY TRUST SECTION (White Background) ========== */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#00469b] to-[#040e2c] rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-center relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00caa4]/10 blur-[80px] rounded-full pointer-events-none" />
            <ShieldCheck className="w-14 h-14 text-[#00caa4] mx-auto mb-6 relative z-10 bg-white/10 rounded-full p-2 border border-white/10 shadow-sm" />
            
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-white relative z-10">Tu cuenta, siempre en tus manos</h2>
            <p className="text-blue-100/70 max-w-2xl mx-auto leading-relaxed relative z-10 text-xs md:text-sm">
              <strong className="text-white">Jamás solicitaremos tus credenciales de acceso.</strong> Solo trabajamos con tu @usuario público, la entrega es gradual y, si hay bajas dentro del plazo de tu plan, las reponemos sin costo.
            </p>
          </MotionDiv>
          <p className="text-[11px] text-slate-400 leading-relaxed text-center mt-8 max-w-2xl mx-auto">
            Innovatech Crece es un servicio independiente, sin afiliación con Instagram ni Meta. Instagram puede eliminar
            seguidores en sus revisiones periódicas y los resultados en alcance o ventas no están garantizados; las bajas se
            reponen según la garantía de cada plan. Más detalles en nuestros{" "}
            <Link href="/terminos" className="underline hover:text-slate-600">términos de servicio</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
