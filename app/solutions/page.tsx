import { MotionDiv } from "@/components/motion";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/services";
import BookCallLink from "@/components/BookCallLink";
import ContactForm from "@/components/ContactForm";
import TechStack from "@/components/solutions/TechStack";
import Portfolio from "@/components/solutions/Portfolio";

// Tarjetas de servicios: enlazan a la página de cada servicio.
const serviceCards = services.map((s) => ({ icon: s.icon, title: s.name, description: s.intro, href: `/servicios/${s.slug}` }));

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#00469b]/10 selection:text-[#00469b]">
      
      {/* ========== HERO HEADER (Dark Royal Blue) ========== */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00caa408_1px,transparent_1px),linear-gradient(to_bottom,#00caa408_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00caa4]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8 border border-white/20 shadow-md backdrop-blur-sm animate-fade-up">
            <Code2 className="w-8 h-8 text-[#00caa4]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Soluciones Tecnológicas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00caa4] to-emerald-300">para tu Empresa</span>
          </h1>
          
          <p className="text-blue-100/80 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Construimos software robusto, escalable y con buenas prácticas de ciberseguridad. Protegemos tu infraestructura mientras automatizamos tus operaciones comerciales.
          </p>
          
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/cotizar" className="px-8 py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] hover:scale-[1.02] active:scale-[0.98] text-white transition-all shadow-lg shadow-teal-500/20 uppercase text-xs tracking-wider">
                Cotizar mi proyecto
              </Link>
              <BookCallLink className="bg-white/10 hover:bg-white/20 border border-white/20 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES GRID (White Background) ========== */}
      <section className="max-w-7xl mx-auto px-4 py-24 bg-white rounded-t-[2.5rem] mt-[-2rem] relative z-20 shadow-xl border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[#00469b]/5 border border-[#00469b]/10 text-[#00469b] text-[10px] font-black uppercase tracking-wider mb-3">
            Áreas de Especialización
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Ingeniería a Tu Medida</h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-xs md:text-sm">
            Diseñamos cada componente bajo arquitectura modular garantizando su escalabilidad.
          </p>
        </div>

        <MotionDiv 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCards.map((service, index) => (
            <MotionDiv
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 15px 30px -10px rgba(0,70,155,0.15)"
              }}
              className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm transition-all duration-300"
            >
              <Link href={service.href} className="group block p-8 h-full">
              <div className="w-12 h-12 bg-[#00caa4]/10 rounded-xl flex items-center justify-center mb-6 border border-[#00caa4]/20">
                <service.icon className="w-6 h-6 text-[#00469b]" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">{service.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00469b] group-hover:text-[#00caa4]">
                Ver servicio <ArrowRight className="w-3.5 h-3.5" />
              </span>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>

      {/* ========== INTERACTIVE TECH STACK SELECTOR (White Background) ========== */}
      <section className="w-full py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00caa4]/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Garantía Tecnológica
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Stack Tecnológico que Utilizamos</h2>
            <p className="text-slate-500 mt-2 max-w-lg mx-auto text-xs md:text-sm">
              Seleccionamos las tecnologías más eficientes del mercado para cada tipo de solución empresarial.
            </p>
          </div>

          <TechStack />
        </div>
      </section>

      {/* ========== PORTFOLIO SHOWCASE (Slate-50 Background) ========== */}
      <section className="w-full py-24 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#00caa4]/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
              Qué Podemos Construir
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">Tipos de Soluciones</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-xs md:text-sm">
              Ejemplos ilustrativos de los sistemas que desarrollamos a medida según los procesos de cada negocio.
              <br/><span className="text-xs text-[#00caa4] font-bold mt-2 inline-block">Haz clic en cada tarjeta para ver los detalles.</span>
            </p>
          </div>

          <Portfolio />
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION (Dark Royal Blue) ========== */}
      <section id="contact" className="w-full py-24 bg-gradient-to-br from-[#040e2c] via-[#091f5e] to-[#00469b] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <MotionDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00caa4]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#00caa4] text-[10px] font-black uppercase tracking-wider mb-3">
                ¿Tienes un Proyecto?
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-4">¿Listo para innovar?</h2>
              <p className="text-blue-100/70 text-sm">Déjanos tus datos y un especialista técnico se comunicará contigo de inmediato.</p>
            </div>
            
            <ContactForm />
          </MotionDiv>
        </div>
      </section>

    </div>
  );
}
