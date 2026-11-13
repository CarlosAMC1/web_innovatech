"use client";

import { useState } from "react";

type Point = { day: string; visitors: number; pageviews: number };

const BLUE = "#00469b";
const W = 720;
const H = 220;
const PAD = { top: 12, right: 8, bottom: 28, left: 36 };

const shortDate = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "short", timeZone: "UTC" });
const longDate = new Intl.DateTimeFormat("es-PE", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const asDate = (day: string) => new Date(`${day}T12:00:00Z`);

function niceMax(value: number) {
  if (value <= 4) return 4;
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

// Visitantes únicos por día: una serie (barras) con tooltip al pasar el mouse o enfocar.
export default function DailyChart({ data }: { data: Point[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.visitors), 0));
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const slot = plotW / data.length;
  const barW = Math.min(24, Math.max(3, slot - 2));
  const y = (v: number) => PAD.top + plotH - (v / max) * plotH;
  const labelEvery = Math.ceil(data.length / 8);
  const point = active !== null ? data[active] : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Visitantes únicos por día">
        {[0, max / 2, max].map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(t) + 4} fontSize="11" fill="#64748b" textAnchor="end">
              {Math.round(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = PAD.left + i * slot + (slot - barW) / 2;
          const top = y(d.visitors);
          const h = PAD.top + plotH - top;
          const r = Math.min(4, h / 2, barW / 2);
          return (
            <g key={d.day}>
              {h > 0 && (
                <path
                  d={`M${x},${top + h} V${top + r} Q${x},${top} ${x + r},${top} H${x + barW - r} Q${x + barW},${top} ${x + barW},${top + r} V${top + h} Z`}
                  fill={BLUE}
                  opacity={active === null || active === i ? 1 : 0.35}
                />
              )}
              {i % labelEvery === 0 && (
                <text x={x + barW / 2} y={H - 8} fontSize="11" fill="#64748b" textAnchor="middle">
                  {shortDate.format(asDate(d.day))}
                </text>
              )}
              {/* Zona de interacción más grande que la barra */}
              <rect
                x={PAD.left + i * slot}
                y={PAD.top}
                width={slot}
                height={plotH}
                fill="transparent"
                tabIndex={0}
                aria-label={`${longDate.format(asDate(d.day))}: ${d.visitors} visitantes, ${d.pageviews} páginas vistas`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="outline-none cursor-default"
              />
            </g>
          );
        })}
      </svg>

      {point && active !== null && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 bg-slate-900 text-white rounded-lg px-3 py-2 text-xs shadow-lg whitespace-nowrap"
          style={{ left: `${((PAD.left + active * slot + slot / 2) / W) * 100}%` }}
        >
          <p className="font-bold capitalize mb-0.5">{longDate.format(asDate(point.day))}</p>
          <p>{point.visitors} visitantes · {point.pageviews} páginas vistas</p>
        </div>
      )}

      <details className="mt-3 text-xs text-slate-500">
        <summary className="cursor-pointer font-semibold">Ver como tabla</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 font-semibold">Día</th>
              <th className="py-1 font-semibold text-right">Visitantes</th>
              <th className="py-1 font-semibold text-right">Páginas vistas</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((d) => (
              <tr key={d.day} className="border-t border-slate-100">
                <td className="py-1 capitalize">{longDate.format(asDate(d.day))}</td>
                <td className="py-1 text-right tabular-nums">{d.visitors}</td>
                <td className="py-1 text-right tabular-nums">{d.pageviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
