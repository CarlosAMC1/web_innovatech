import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import ComplaintForm from "@/components/ComplaintForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description: "Libro de Reclamaciones virtual de Innovatech conforme al Código de Protección y Defensa del Consumidor.",
  alternates: { canonical: "/libro-de-reclamaciones" },
};

export default function LibroReclamacionesPage() {
  const { businessName, ruc, address } = site.legal;
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-12 print:hidden">
        <div className="max-w-3xl mx-auto px-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7 text-[#00caa4]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Libro de Reclamaciones</h1>
            <p className="text-blue-100/70 text-sm mt-1">Conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571).</p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <section className="bg-white border border-slate-200 rounded-2xl p-5 text-sm print:hidden">
          <h2 className="font-black mb-2">Datos del proveedor</h2>
          <dl className="grid sm:grid-cols-[140px_1fr] gap-y-1 text-slate-700">
            <dt className="font-bold text-slate-500">Razón social</dt>
            <dd>{businessName || site.name}</dd>
            {ruc && (<><dt className="font-bold text-slate-500">RUC</dt><dd>{ruc}</dd></>)}
            {address && (<><dt className="font-bold text-slate-500">Dirección</dt><dd>{address}</dd></>)}
          </dl>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 shadow-sm">
          <ComplaintForm provider={{ businessName: businessName || site.name, ruc, address }} />
        </section>

        <section className="text-xs text-slate-500 leading-relaxed space-y-2 print:hidden">
          <p><strong>Reclamo:</strong> disconformidad relacionada con los productos o servicios. <strong>Queja:</strong> disconformidad no relacionada con los productos o servicios, o malestar o descontento respecto a la atención al público.</p>
          <p>El proveedor deberá dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles improrrogables.</p>
          <p>La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
        </section>
      </div>
    </div>
  );
}
