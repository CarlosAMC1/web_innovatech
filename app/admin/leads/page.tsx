import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Download, Mail, Inbox } from "lucide-react";
import prisma from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

const dateFormat = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});

export default async function LeadsPage() {
  // El proxy ya pide la contraseña; se verifica otra vez aquí por seguridad.
  if (!isAuthorized((await headers()).get("authorization"))) notFound();

  let leads: Awaited<ReturnType<typeof prisma.lead.findMany>> = [];
  let dbError = false;
  try {
    leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
  } catch (error) {
    console.error("Error loading leads:", error);
    dbError = true;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black text-[#00caa4] uppercase tracking-widest mb-2">Panel privado</p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Leads del formulario</h1>
            <p className="text-blue-100/70 text-sm mt-2">{leads.length} mensaje{leads.length === 1 ? "" : "s"} recibido{leads.length === 1 ? "" : "s"}</p>
          </div>
          {leads.length > 0 && (
            <a
              href="/admin/leads/export"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#00469b] hover:bg-[#00caa4] hover:text-white text-xs font-black uppercase tracking-wider transition-all self-start"
            >
              <Download className="w-4 h-4" /> Descargar CSV
            </a>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        {dbError && (
          <p className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
            No se pudo conectar a la base de datos. Revisa la variable DATABASE_URL y el volumen de /app/data.
          </p>
        )}

        {!dbError && leads.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Inbox className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm font-semibold">Todavía no llegan mensajes.</p>
          </div>
        )}

        {leads.map((lead) => (
          <article key={lead.id} className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h2 className="font-black text-slate-900">{lead.name}</h2>
                <a href={`mailto:${lead.email}`} className="text-sm text-[#00469b] hover:underline break-all">{lead.email}</a>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <time dateTime={lead.createdAt.toISOString()} className="text-xs text-slate-400 font-semibold">
                  {dateFormat.format(lead.createdAt)}
                </time>
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: tu consulta en Innovatech")}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#00469b] hover:bg-[#003c85] text-white text-xs font-bold"
                >
                  <Mail className="w-3.5 h-3.5" /> Responder
                </a>
              </div>
            </div>
            <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{lead.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
