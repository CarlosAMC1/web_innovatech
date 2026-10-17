"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, MessageCircle, Loader2, AlertTriangle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00caa4] transition-all placeholder:text-blue-200/30 text-sm";
const labelClass = "text-xs font-bold text-blue-100/80 uppercase tracking-wide";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Mensaje prellenado para WhatsApp con lo que la persona ya escribió.
  const whatsappMessage = [
    `Hola, soy ${form.name || "..."}${form.company ? ` de ${form.company}` : ""}.`,
    form.message,
    form.email ? `Mi correo: ${form.email}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: form.company || undefined, phone: form.phone || undefined, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(data.details ?? {});
        setError(data.error ?? "No pudimos enviar tu mensaje.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Sin conexión. Inténtalo de nuevo o escríbenos por WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center relative z-10 py-6" role="status">
        <CheckCircle2 className="w-14 h-14 text-[#00caa4] mx-auto mb-4" />
        <h3 className="text-2xl font-black mb-2">¡Mensaje recibido!</h3>
        <p className="text-blue-100/70 text-sm mb-8 max-w-md mx-auto">
          Gracias, {form.name.split(" ")[0]}. Te escribiremos a <strong className="text-white">{form.email}</strong>. Si
          prefieres una respuesta más rápida, mándanos tu consulta por WhatsApp.
        </p>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white text-xs uppercase tracking-wider transition-all"
        >
          <MessageCircle className="w-4 h-4" /> Continuar por WhatsApp
        </a>
      </div>
    );
  }

  const fieldError = (key: string) =>
    fieldErrors[key]?.[0] ? <p className="text-xs text-red-300 mt-1">{fieldErrors[key]![0]}</p> : null;

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-name" className={labelClass}>Nombre Completo</label>
          <input id="contact-name" type="text" required minLength={2} maxLength={100} autoComplete="name" value={form.name} onChange={update("name")} className={inputClass} placeholder="Juan Pérez" />
          {fieldError("name")}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-company" className={labelClass}>Empresa (Opcional)</label>
          <input id="contact-company" type="text" maxLength={100} autoComplete="organization" value={form.company} onChange={update("company")} className={inputClass} placeholder="Mi Empresa S.A.C." />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="contact-email" className={labelClass}>Correo Electrónico</label>
          <input id="contact-email" type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={update("email")} className={inputClass} placeholder="correo@ejemplo.com" />
          {fieldError("email")}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-phone" className={labelClass}>WhatsApp (Opcional)</label>
          <input id="contact-phone" type="tel" inputMode="tel" maxLength={20} autoComplete="tel" value={form.phone} onChange={update("phone")} className={inputClass} placeholder="987 654 321" />
          {fieldError("phone")}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className={labelClass}>Mensaje / Requerimiento</label>
        <textarea id="contact-message" rows={4} required minLength={10} maxLength={1000} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Cuéntanos brevemente sobre tu proyecto..." />
        {fieldError("message")}
      </div>

      {/* Campo trampa anti-spam: oculto para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="contact-website">No llenar este campo</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-xs text-blue-100/80 cursor-pointer">
          <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#00caa4] shrink-0" />
          <span>
            Acepto que Innovatech use mis datos para responder esta consulta, según la{" "}
            <Link href="/privacidad" className="underline text-white hover:text-[#00caa4]">política de privacidad</Link>.
          </span>
        </label>
        {fieldError("consent")}
      </div>

      {status === "error" && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-red-500/10 border border-red-400/30 rounded-xl p-4 text-sm" role="alert">
          <AlertTriangle className="w-5 h-5 text-red-300 shrink-0" />
          <p className="flex-1 text-red-100">{error}</p>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="w-full py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] disabled:opacity-60 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-teal-500/20 uppercase text-xs tracking-wider flex items-center justify-center gap-2"
      >
        {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : "Enviar Mensaje"}
      </button>

      <p className="text-[10px] text-center text-blue-200/50 mt-4 flex items-center justify-center gap-1 font-bold">
        <ShieldCheck className="w-4 h-4 text-[#00caa4]" /> Solo usamos tus datos para responderte. No los compartimos con terceros.
      </p>
    </form>
  );
}
