import type { Row } from "@/lib/analytics/queries";

export function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tight mt-1 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm ${className}`}>
      <h2 className="font-black text-slate-900">{title}</h2>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Empty({ text = "Todavía no hay datos en este periodo." }: { text?: string }) {
  return <p className="text-sm text-slate-400 py-6 text-center">{text}</p>;
}

// Lista con barra horizontal: una sola serie, con el valor escrito al lado.
export function BarList({ rows, limit = 8, unit = "" }: { rows: Row[]; limit?: number; unit?: string }) {
  if (rows.length === 0) return <Empty />;
  const shown = rows.slice(0, limit);
  const rest = rows.slice(limit).reduce((sum, r) => sum + r.value, 0);
  const all = rest > 0 ? [...shown, { label: "Otros", value: rest }] : shown;
  const max = Math.max(...all.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {all.map((r) => (
        <li key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-slate-700 truncate" title={r.label}>{r.label}</span>
            <span className="font-bold text-slate-900 tabular-nums shrink-0">
              {r.value.toLocaleString("es-PE")}{unit}
            </span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-[#00469b]" style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Embudo de conversión: cada etapa como porcentaje de quienes visitaron la web.
export function Funnel({ steps }: { steps: Row[] }) {
  const base = steps[0]?.value ?? 0;
  if (!base) return <Empty />;
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => {
        const pct = (s.value / base) * 100;
        return (
          <li key={s.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-slate-700">
                <span className="text-slate-400 font-bold mr-1.5">{i + 1}.</span>
                {s.label}
              </span>
              <span className="shrink-0 tabular-nums">
                <span className="font-black text-slate-900">{s.value.toLocaleString("es-PE")}</span>
                <span className="text-slate-500 ml-1.5">{pct.toFixed(pct < 10 && pct > 0 ? 1 : 0)}%</span>
              </span>
            </div>
            <div className="mt-1.5 h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-[#00469b]" style={{ width: `${Math.max(1.5, pct)}%` }} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
