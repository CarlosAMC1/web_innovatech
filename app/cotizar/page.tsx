import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, ShieldCheck, MessageCircle } from "lucide-react";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Cotiza tu Proyecto de Software",
  description: "Cuéntanos qué necesitas en 4 pasos y te enviamos una propuesta para tu web, app, ERP, CRM o automatización con IA.",
  alternates: { canonical: "/cotizar" },
};

export default function CotizarPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Cotiza tu proyecto</h1>
          <p className="text-blue-100/80">Responde 4 pasos rápidos y te enviamos una propuesta a tu medida.</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs font-bold text-blue-100/80">
            <li className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#00caa4]" /> Toma 2 minutos</li>
            <li className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-[#00caa4]" /> Te respondemos por WhatsApp</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00caa4]" /> Sin compromiso</li>
          </ul>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 -mt-12 pb-24 relative z-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 md:p-10">
          <Suspense fallback={<div className="h-64" />}>
            <QuoteWizard />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
