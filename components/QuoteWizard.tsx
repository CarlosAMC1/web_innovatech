"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, MessageCircle, AlertTriangle } from "lucide-react";
import { projectTypes, featureOptions, budgets, timelines, teamSizes, type ProjectType } from "@/lib/quote-options";
import { whatsappLink } from "@/lib/site";
import BookCallLink from "@/components/BookCallLink";

const STEPS = ["Proyecto", "Detalles", "Presupuesto", "Contacto"] as const;

const card = "rounded-2xl border p-4 text-left text-sm font-bold transition-all";
const cardOn = "border-[#00469b] bg-[#00469b]/5 text-[#00469b] ring-1 ring-[#00469b]";
const cardOff = "border-slate-200 bg-white text-slate-700 hover:border-slate-300";
const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00469b]/40";
const label = "text-xs font-bold text-slate-500 uppercase tracking-wide";

function isProjectType(v: string | null): v is ProjectType {
  return projectTypes.some((t) => t.id === v);
}

export default function QuoteWizard() {
  const params = useSearchParams();
  const initial = params.get("servicio");

  const [step, setStep] = useState(isProjectType(initial) ? 1 : 0);
  const [projectType, setProjectType] = useState<ProjectType | "">(isProjectType(initial) ? initial : "");
  const [features, setFeatures] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  const typeLabel = projectTypes.find((t) => t.id === projectType)?.label ?? "";
  const canContinue = [
    projectType !== "",
    goal.trim().length >= 10,
    budget !== "" && timeline !== "" && teamSize !== "",
    contact.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(contact.email) && contact.phone.replace(/\D/g, "").length >= 9 && consent,
  ][step];

  const toggleFeature = (f: string) => setFeatures((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const whatsappSummary = [
    `Hola, soy ${contact.name || "..."}${contact.company ? ` de ${contact.company}` : ""}. Quiero cotizar: ${typeLabel}.`,
    features.length ? `Necesito: ${features.join(", ")}.` : "",
    budget ? `Presupuesto: ${budget}. Plazo: ${timeline}.` : "",
    goal,
  ]
    .filter(Boolean)
    .join("\n\n");

  async function submit() {
    setStatus("sending");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType, features, goal, budget, timeline, teamSize, ...contact, company: contact.company || undefined, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(data.details ?? {});
        setError(data.error ?? "No pudimos enviar tu solicitud.");
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
      <div className="text-center py-8" role="status">
        <CheckCircle2 className="w-16 h-16 text-[#00caa4] mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-black mb-3">¡Recibimos tu solicitud!</h2>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          Gracias, {contact.name.split(" ")[0]}. Revisaremos tu proyecto y te escribiremos por WhatsApp. Si quieres avanzar más rápido,
          agenda una llamada de 15 minutos.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <BookCallLink className="bg-[#00469b] hover:bg-[#003c85] text-white" />
          <a href={whatsappLink(whatsappSummary)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-green-500 hover:bg-green-600 text-white">
            <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const fieldError = (key: string) => (fieldErrors[key]?.[0] ? <p className="text-xs text-red-600 mt-1">{fieldErrors[key]![0]}</p> : null);

  return (
    <div>
      {/* Progreso */}
      <ol className="flex items-center gap-2 mb-8" aria-label="Progreso">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-[#00caa4]" : "bg-slate-200"}`} />
            <p className={`mt-2 text-[11px] font-bold uppercase tracking-wide ${i === step ? "text-[#00469b]" : "text-slate-400"}`} aria-current={i === step ? "step" : undefined}>
              {i + 1}. {s}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="text-xl font-black mb-5">¿Qué necesitas?</legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {projectTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={projectType === t.id}
                onClick={() => {
                  setProjectType(t.id);
                  setFeatures([]);
                  setStep(1);
                }}
                className={`${card} ${projectType === t.id ? cardOn : cardOff}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && projectType && (
        <div className="space-y-6">
          {featureOptions[projectType].length > 0 && (
            <fieldset>
              <legend className="text-xl font-black mb-1">{typeLabel}: ¿qué debería incluir?</legend>
              <p className="text-sm text-slate-500 mb-4">Marca todo lo que aplique. Si no estás seguro, déjalo en blanco.</p>
              <div className="flex flex-wrap gap-2">
                {featureOptions[projectType].map((f) => {
                  const on = features.includes(f);
                  return (
                    <button key={f} type="button" aria-pressed={on} onClick={() => toggleFeature(f)} className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${on ? cardOn : cardOff}`}>
                      {on && <Check className="w-3.5 h-3.5" />} {f}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
          <div className="space-y-2">
            <label htmlFor="q-goal" className={label}>Cuéntanos tu objetivo</label>
            <textarea id="q-goal" rows={5} maxLength={1500} value={goal} onChange={(e) => setGoal(e.target.value)} className={`${input} resize-none`} placeholder="Ej.: Tenemos una distribuidora y queremos controlar el stock de 2 almacenes y emitir facturas desde el mismo sistema." />
            <p className="text-xs text-slate-400">{goal.trim().length < 10 ? "Mínimo 10 caracteres." : " "}</p>
            {fieldError("goal")}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-7">
          {[
            { title: "Presupuesto aproximado", options: budgets, value: budget, set: setBudget, key: "budget" },
            { title: "¿Para cuándo lo necesitas?", options: timelines, value: timeline, set: setTimeline, key: "timeline" },
            { title: "Tamaño de tu equipo", options: teamSizes, value: teamSize, set: setTeamSize, key: "teamSize" },
          ].map((g) => (
            <fieldset key={g.key}>
              <legend className="font-black mb-3">{g.title}</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {g.options.map((o) => (
                  <button key={o} type="button" aria-pressed={g.value === o} onClick={() => g.set(o)} className={`${card} py-3 ${g.value === o ? cardOn : cardOff}`}>
                    {o}
                  </button>
                ))}
              </div>
              {fieldError(g.key)}
            </fieldset>
          ))}
          <p className="text-xs text-slate-500">El presupuesto nos ayuda a proponerte la solución que mejor encaje. No es un compromiso.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-xl font-black">¿A quién le enviamos la propuesta?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="q-name" className={label}>Nombre completo</label>
              <input id="q-name" autoComplete="name" maxLength={100} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className={input} placeholder="Juan Pérez" />
              {fieldError("name")}
            </div>
            <div className="space-y-2">
              <label htmlFor="q-company" className={label}>Empresa (opcional)</label>
              <input id="q-company" autoComplete="organization" maxLength={100} value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} className={input} placeholder="Mi Empresa S.A.C." />
            </div>
            <div className="space-y-2">
              <label htmlFor="q-email" className={label}>Correo</label>
              <input id="q-email" type="email" autoComplete="email" maxLength={200} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={input} placeholder="correo@empresa.com" />
              {fieldError("email")}
            </div>
            <div className="space-y-2">
              <label htmlFor="q-phone" className={label}>WhatsApp</label>
              <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={input} placeholder="987 654 321" />
              {fieldError("phone")}
            </div>
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="q-website">No llenar este campo</label>
            <input id="q-website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} />
          </div>
          <label className="flex items-start gap-3 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#00469b] shrink-0" />
            <span>
              Acepto que Innovatech use mis datos para enviarme una propuesta y contactarme por WhatsApp, según la{" "}
              <Link href="/privacidad" className="underline text-[#00469b]">política de privacidad</Link>.
            </span>
          </label>
          {status === "error" && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm" role="alert">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="flex-1 text-red-700">{error}</p>
              <a href={whatsappLink(whatsappSummary)} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          )}
        </div>
      )}

      {/* Navegación */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" /> Atrás
          </button>
        ) : (
          <span />
        )}
        {step > 0 && step < 3 && (
          <button type="button" disabled={!canContinue} onClick={() => setStep(step + 1)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#00469b] hover:bg-[#003c85] text-white disabled:opacity-40 disabled:cursor-not-allowed">
            Continuar <ArrowRight className="w-4 h-4" />
          </button>
        )}
        {step === 3 && (
          <button type="button" disabled={!canContinue || status === "sending"} onClick={submit} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#00caa4] hover:bg-[#00b08e] text-white disabled:opacity-40 disabled:cursor-not-allowed">
            {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <>Enviar solicitud <ArrowRight className="w-4 h-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
