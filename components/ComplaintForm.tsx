"use client";

import { useState } from "react";
import { Loader2, Printer, CheckCircle2, AlertTriangle } from "lucide-react";

type Provider = { businessName: string; ruc: string; address: string };

const input = "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00469b]/40";
const label = "block text-xs font-bold text-slate-600 mb-1.5";
const section = "border border-slate-200 rounded-2xl p-5 md:p-6 space-y-4";
const legend = "px-2 text-sm font-black text-[#00469b] uppercase tracking-wide";

const empty = {
  kind: "reclamo",
  name: "",
  documentType: "DNI",
  documentNum: "",
  address: "",
  phone: "",
  email: "",
  isMinor: false,
  guardian: "",
  itemType: "servicio",
  amount: "",
  itemDetail: "",
  detail: "",
  request: "",
  truthful: false,
  website: "",
};

export default function ComplaintForm({ provider }: { provider: Provider }) {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const [receipt, setReceipt] = useState<{ code: string; createdAt: string } | null>(null);

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((cur) => ({ ...cur, [key]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const err = (key: string) => (fieldErrors[key]?.[0] ? <p className="text-xs text-red-600 mt-1">{fieldErrors[key]![0]}</p> : null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, guardian: f.guardian || undefined, amount: f.amount || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(data.details ?? {});
        setError(data.error ?? "No pudimos registrar tu reclamo.");
        setStatus("error");
        return;
      }
      setReceipt({ code: data.code, createdAt: data.createdAt });
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Sin conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "sent" && receipt) {
    const date = new Intl.DateTimeFormat("es-PE", { dateStyle: "long", timeStyle: "short", timeZone: "America/Lima" }).format(new Date(receipt.createdAt));
    const rows: [string, string][] = [
      ["Número", receipt.code],
      ["Fecha", date],
      ["Proveedor", [provider.businessName, provider.ruc && `RUC ${provider.ruc}`].filter(Boolean).join(" · ")],
      ["Tipo", f.kind === "reclamo" ? "Reclamo" : "Queja"],
      ["Consumidor", `${f.name} (${f.documentType} ${f.documentNum})`],
      ["Domicilio", f.address],
      ["Teléfono / correo", `${f.phone} · ${f.email}`],
      ...(f.isMinor ? ([["Padre, madre o apoderado", f.guardian]] as [string, string][]) : []),
      ["Bien contratado", `${f.itemType === "producto" ? "Producto" : "Servicio"}: ${f.itemDetail}${f.amount ? ` (monto reclamado: ${f.amount})` : ""}`],
      ["Detalle", f.detail],
      ["Pedido", f.request],
    ];
    return (
      <div role="status">
        <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 print:hidden">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-sm text-emerald-900">
            <p className="font-black mb-1">Registramos tu {f.kind} con el número {receipt.code}.</p>
            <p>Enviamos una copia a <strong>{f.email}</strong>. Te responderemos en un plazo no mayor a 15 días hábiles. Guarda o imprime esta hoja como constancia.</p>
          </div>
        </div>
        <article className="border border-slate-300 rounded-2xl p-6">
          <h2 className="text-xl font-black mb-4">Hoja de Reclamación</h2>
          <dl className="divide-y divide-slate-100">
            {rows.map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 py-2.5 text-sm">
                <dt className="font-bold text-slate-500">{k}</dt>
                <dd className="text-slate-900 whitespace-pre-wrap break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
        <button type="button" onClick={() => window.print()} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white text-sm font-bold print:hidden">
          <Printer className="w-4 h-4" /> Imprimir o guardar en PDF
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <fieldset className={section}>
        <legend className={legend}>1. Datos del consumidor</legend>
        <div>
          <label htmlFor="c-name" className={label}>Nombre completo *</label>
          <input id="c-name" autoComplete="name" value={f.name} onChange={set("name")} className={input} />
          {err("name")}
        </div>
        <div className="grid sm:grid-cols-[160px_1fr] gap-4">
          <div>
            <label htmlFor="c-doctype" className={label}>Documento *</label>
            <select id="c-doctype" value={f.documentType} onChange={set("documentType")} className={input}>
              <option value="DNI">DNI</option>
              <option value="CE">Carné de extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
          <div>
            <label htmlFor="c-docnum" className={label}>Número de documento *</label>
            <input id="c-docnum" inputMode="numeric" value={f.documentNum} onChange={set("documentNum")} className={input} />
            {err("documentNum")}
          </div>
        </div>
        <div>
          <label htmlFor="c-address" className={label}>Domicilio *</label>
          <input id="c-address" autoComplete="street-address" value={f.address} onChange={set("address")} className={input} />
          {err("address")}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="c-phone" className={label}>Teléfono *</label>
            <input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className={input} />
            {err("phone")}
          </div>
          <div>
            <label htmlFor="c-email" className={label}>Correo electrónico *</label>
            <input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} className={input} />
            {err("email")}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={f.isMinor} onChange={set("isMinor")} className="w-4 h-4 accent-[#00469b]" /> Soy menor de edad
        </label>
        {f.isMinor && (
          <div>
            <label htmlFor="c-guardian" className={label}>Nombre del padre, madre o apoderado *</label>
            <input id="c-guardian" value={f.guardian} onChange={set("guardian")} className={input} />
            {err("guardian")}
          </div>
        )}
      </fieldset>

      <fieldset className={section}>
        <legend className={legend}>2. Bien contratado</legend>
        <div className="flex gap-6 text-sm">
          {(["servicio", "producto"] as const).map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input type="radio" name="itemType" value={t} checked={f.itemType === t} onChange={set("itemType")} className="accent-[#00469b]" />
              {t === "servicio" ? "Servicio" : "Producto"}
            </label>
          ))}
        </div>
        <div className="grid sm:grid-cols-[1fr_200px] gap-4">
          <div>
            <label htmlFor="c-item" className={label}>Descripción *</label>
            <input id="c-item" value={f.itemDetail} onChange={set("itemDetail")} className={input} placeholder='Ej.: Plan Crece "bien parado" (1,000 seguidores)' />
            {err("itemDetail")}
          </div>
          <div>
            <label htmlFor="c-amount" className={label}>Monto reclamado (opcional)</label>
            <input id="c-amount" value={f.amount} onChange={set("amount")} className={input} placeholder="S/ 0.00" />
          </div>
        </div>
      </fieldset>

      <fieldset className={section}>
        <legend className={legend}>3. Detalle de la reclamación</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { v: "reclamo", t: "Reclamo", d: "Disconformidad relacionada con los productos o servicios." },
            { v: "queja", t: "Queja", d: "Disconformidad no relacionada con los productos o servicios, o malestar por la atención al público." },
          ].map((o) => (
            <label key={o.v} className={`rounded-xl border p-4 cursor-pointer text-sm ${f.kind === o.v ? "border-[#00469b] bg-[#00469b]/5 ring-1 ring-[#00469b]" : "border-slate-200"}`}>
              <span className="flex items-center gap-2 font-black">
                <input type="radio" name="kind" value={o.v} checked={f.kind === o.v} onChange={set("kind")} className="accent-[#00469b]" /> {o.t}
              </span>
              <span className="block text-xs text-slate-500 mt-1">{o.d}</span>
            </label>
          ))}
        </div>
        <div>
          <label htmlFor="c-detail" className={label}>Detalle *</label>
          <textarea id="c-detail" rows={5} maxLength={3000} value={f.detail} onChange={set("detail")} className={`${input} resize-y`} />
          {err("detail")}
        </div>
        <div>
          <label htmlFor="c-request" className={label}>Pedido del consumidor *</label>
          <textarea id="c-request" rows={3} maxLength={1500} value={f.request} onChange={set("request")} className={`${input} resize-y`} placeholder="¿Qué solución esperas?" />
          {err("request")}
        </div>
      </fieldset>

      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="c-website">No llenar este campo</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" checked={f.truthful} onChange={set("truthful")} className="mt-0.5 w-4 h-4 accent-[#00469b] shrink-0" />
        <span>Declaro que los datos consignados son verdaderos y acepto recibir la respuesta en el correo electrónico indicado.</span>
      </label>
      {err("truthful")}

      {status === "error" && (
        <p className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm" role="alert">
          <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
        </p>
      )}

      <button type="submit" disabled={!f.truthful || status === "sending"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed">
        {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</> : "Registrar"}
      </button>
    </form>
  );
}
