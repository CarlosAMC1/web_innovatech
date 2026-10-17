import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import BookCallLink from "@/components/BookCallLink";

export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software en Perú",
  description:
    "Desarrollo web, apps móviles, sistemas ERP, CRM con WhatsApp (Pacto), automatización con IA, ciberseguridad y cloud para empresas en Perú.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Servicios de software para tu empresa</h1>
          <p className="text-blue-100/80 max-w-2xl mx-auto">Elige un servicio para ver qué incluye, cómo trabajamos y las preguntas más comunes.</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Link key={s.slug} href={`/servicios/${s.slug}`} className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-[#00469b]/5 rounded-xl flex items-center justify-center mb-5 border border-[#00469b]/10">
              <s.icon className="w-6 h-6 text-[#00469b]" />
            </div>
            <h2 className="text-lg font-bold mb-2">{s.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.intro}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00469b] group-hover:text-[#00caa4]">
              Ver servicio <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </section>
      <section className="pb-24 text-center px-4">
        <p className="text-slate-600 mb-4">¿No sabes cuál necesitas? Te orientamos sin compromiso.</p>
        <BookCallLink className="bg-[#00469b] hover:bg-[#003c85] text-white" />
      </section>
    </div>
  );
}
