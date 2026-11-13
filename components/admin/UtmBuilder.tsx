"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const PAGES = [
  { path: "/", label: "Inicio" },
  { path: "/servicios/crm-whatsapp", label: "Pacto (CRM)" },
  { path: "/crece", label: "Innovatech Crece" },
  { path: "/cotizar", label: "Cotizador" },
  { path: "/servicios", label: "Servicios" },
];
const SOURCES = ["instagram", "facebook", "tiktok", "whatsapp", "google", "linkedin", "email"];

// Arma enlaces con etiquetas UTM para saber qué publicación o anuncio trae visitas y leads.
export default function UtmBuilder({ siteUrl }: { siteUrl: string }) {
  const [page, setPage] = useState("/servicios/crm-whatsapp");
  const [source, setSource] = useState("instagram");
  const [medium, setMedium] = useState("anuncio");
  const [campaign, setCampaign] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = (v: string) => v.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const params = new URLSearchParams({ utm_source: source, utm_medium: medium });
  if (slug(campaign)) params.set("utm_campaign", slug(campaign));
  const link = `${siteUrl}${page}?${params.toString()}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const field = "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white";
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs font-bold text-slate-600 space-y-1">
          <span>Página</span>
          <select value={page} onChange={(e) => setPage(e.target.value)} className={field}>
            {PAGES.map((p) => <option key={p.path} value={p.path}>{p.label}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600 space-y-1">
          <span>Dónde lo publicas</span>
          <select value={source} onChange={(e) => setSource(e.target.value)} className={field}>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600 space-y-1">
          <span>Tipo</span>
          <select value={medium} onChange={(e) => setMedium(e.target.value)} className={field}>
            <option value="anuncio">Anuncio pagado</option>
            <option value="organico">Publicación orgánica</option>
            <option value="bio">Link en bio</option>
            <option value="mensaje">Mensaje directo</option>
          </select>
        </label>
        <label className="text-xs font-bold text-slate-600 space-y-1">
          <span>Nombre de la campaña</span>
          <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="ej. pacto noviembre" className={field} />
        </label>
      </div>
      <div className="flex items-stretch gap-2">
        <code className="flex-1 min-w-0 truncate bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700">{link}</code>
        <button type="button" onClick={copy} className="shrink-0 inline-flex items-center gap-1.5 px-4 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white text-xs font-bold">
          {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar</>}
        </button>
      </div>
    </div>
  );
}
