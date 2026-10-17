"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingCart, MessageCircle, Globe, Camera } from "lucide-react";

// Panel de ejemplo hecho en código con la marca Innovatech (reemplaza la imagen del hero).
// Todos los datos son ilustrativos.

const kpis = [
  { icon: TrendingUp, label: "Ventas del mes", value: "S/ 48,320", delta: "+12%" },
  { icon: Users, label: "Leads nuevos", value: "126", delta: "+18%" },
  { icon: ShoppingCart, label: "Pedidos", value: "342", delta: "+7%" },
];

const chart = [32, 41, 38, 52, 47, 60, 58, 71, 66, 78, 84, 92];

const leads = [
  { name: "María G.", channel: "WhatsApp", icon: MessageCircle, color: "text-green-400 bg-green-400/10" },
  { name: "Bodega Sol", channel: "Web", icon: Globe, color: "text-[#00caa4] bg-[#00caa4]/10" },
  { name: "Jorge R.", channel: "Instagram", icon: Camera, color: "text-pink-400 bg-pink-400/10" },
];

function buildPath(values: number[], w: number, h: number) {
  const max = Math.max(...values);
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => [i * step, h - (v / max) * (h - 8)]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z` };
}

export default function HeroDashboard() {
  const { line, area } = buildPath(chart, 320, 110);

  return (
    <div
      role="img"
      aria-label="Ejemplo de panel de gestión desarrollado a medida, con ventas, leads y pedidos"
      className="rounded-2xl overflow-hidden bg-[#06122e] text-white select-none"
    >
      {/* Barra de ventana */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-[#00469b] border border-[#00caa4] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 100 100" aria-hidden="true">
              <rect x="38" y="36" width="24" height="48" rx="8" fill="#00caa4" />
              <circle cx="50" cy="18" r="14" fill="#00caa4" />
            </svg>
          </span>
          <span className="text-[11px] font-bold text-white/80">Panel de Gestión</span>
        </div>
        <span className="ml-auto text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-blue-100/70">
          Demo
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-xl bg-white/[0.05] border border-white/10 p-2.5 sm:p-3"
            >
              <k.icon className="w-3.5 h-3.5 text-[#00caa4] mb-1.5" />
              <p className="text-[9px] sm:text-[10px] text-blue-100/60 font-semibold leading-tight">{k.label}</p>
              <p className="text-sm sm:text-lg font-black tracking-tight leading-tight">{k.value}</p>
              <p className="text-[9px] sm:text-[10px] font-bold text-emerald-400">{k.delta}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-[1.4fr_1fr] gap-3">
          {/* Gráfico */}
          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-blue-100/70">Ventas 2026</p>
              <p className="text-[9px] text-blue-100/40">Ene – Dic</p>
            </div>
            <svg viewBox="0 0 320 110" className="w-full h-auto" aria-hidden="true">
              <defs>
                <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00caa4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#00caa4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[27, 55, 82].map((y) => (
                <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
              ))}
              <motion.path
                d={area}
                fill="url(#heroArea)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              />
              <motion.path
                d={line}
                fill="none"
                stroke="#00caa4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Últimos leads */}
          <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3">
            <p className="text-[10px] font-bold text-blue-100/70 mb-2">Últimos leads</p>
            <ul className="space-y-2">
              {leads.map((l, i) => (
                <motion.li
                  key={l.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="flex items-center gap-2"
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${l.color}`}>
                    <l.icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-bold flex-1 truncate">{l.name}</span>
                  <span className="text-[9px] text-blue-100/50">{l.channel}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
