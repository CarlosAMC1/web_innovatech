import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BookOpen, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import prisma from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";
import { complaintCode, addBusinessDays, RESPONSE_BUSINESS_DAYS, dateFormat, dateTimeFormat } from "@/lib/complaints";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "Reclamos",
  robots: { index: false, follow: false },
};

export default async function ReclamosAdminPage({ searchParams }: PageProps<"/admin/reclamos">) {
  if (!isAuthorized((await headers()).get("authorization"))) notFound();
  const { ok } = await searchParams;

  let complaints: Awaited<ReturnType<typeof prisma.complaint.findMany>> = [];
  let dbError = false;
  try {
    complaints = await prisma.complaint.findMany({ orderBy: { number: "desc" }, take: 500 });
  } catch (error) {
    console.error("Error loading complaints:", error);
    dbError = true;
  }
  const pending = complaints.filter((c) => !c.respondedAt).length;
  const now = new Date();

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <AdminNav active="reclamos" />
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Libro de Reclamaciones</h1>
          <p className="text-blue-100/70 text-sm mt-2">
            {complaints.length} registrado{complaints.length === 1 ? "" : "s"} · {pending} pendiente{pending === 1 ? "" : "s"} de respuesta.
            Plazo: {RESPONSE_BUSINESS_DAYS} días hábiles (revisa los feriados). Conserva los registros al menos 2 años.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        {ok && <p className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-sm">Respuesta guardada{ok === "mail" ? " y enviada al correo del consumidor." : ". No se pudo enviar por correo (configura Resend) — envíala tú y guarda la constancia."}</p>}
        {dbError && <p className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">No se pudo conectar a la base de datos.</p>}
        {!dbError && complaints.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm font-semibold">No hay reclamos registrados.</p>
          </div>
        )}

        {complaints.map((c) => {
          const due = addBusinessDays(c.createdAt, RESPONSE_BUSINESS_DAYS);
          const overdue = !c.respondedAt && now > due;
          return (
            <article key={c.id} className={`bg-white border rounded-2xl p-5 md:p-6 shadow-sm ${overdue ? "border-red-300" : "border-slate-200"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{complaintCode(c.number, c.createdAt)} · {c.kind}</p>
                  <h2 className="font-black text-slate-900">{c.name}</h2>
                  <p className="text-sm text-slate-500">{c.documentType} {c.documentNum} · {c.phone} · <a href={`mailto:${c.email}`} className="text-[#00469b] hover:underline">{c.email}</a></p>
                </div>
                <div className="text-xs font-bold shrink-0">
                  {c.respondedAt ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="w-4 h-4" /> Respondido el {dateFormat.format(c.respondedAt)}</span>
                  ) : overdue ? (
                    <span className="inline-flex items-center gap-1 text-red-600"><AlertTriangle className="w-4 h-4" /> Vencido el {dateFormat.format(due)}</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-600"><Clock className="w-4 h-4" /> Responder hasta el {dateFormat.format(due)}</span>
                  )}
                  <p className="text-slate-400 font-semibold mt-1">Recibido: {dateTimeFormat.format(c.createdAt)}</p>
                </div>
              </div>
              <dl className="text-sm space-y-2 text-slate-700">
                <div><dt className="inline font-bold">Bien: </dt><dd className="inline">{c.itemType} · {c.itemDetail}{c.amount ? ` · ${c.amount}` : ""}</dd></div>
                <div><dt className="font-bold">Detalle</dt><dd className="whitespace-pre-wrap">{c.detail}</dd></div>
                <div><dt className="font-bold">Pedido</dt><dd className="whitespace-pre-wrap">{c.request}</dd></div>
                {c.guardian && <div><dt className="inline font-bold">Apoderado: </dt><dd className="inline">{c.guardian}</dd></div>}
              </dl>
              {c.respondedAt ? (
                <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
                  <p className="font-bold mb-1">Respuesta / acciones adoptadas</p>
                  <p className="whitespace-pre-wrap text-slate-700">{c.response}</p>
                </div>
              ) : (
                <form action="/admin/reclamos/responder" method="post" className="mt-4 space-y-3">
                  <input type="hidden" name="id" value={c.id} />
                  <label htmlFor={`r-${c.id}`} className="block text-xs font-bold text-slate-600">Respuesta y acciones adoptadas</label>
                  <textarea id={`r-${c.id}`} name="response" required minLength={10} rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm" />
                  <button className="px-5 py-2.5 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white text-xs font-black uppercase tracking-wider">Guardar y enviar respuesta</button>
                </form>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
