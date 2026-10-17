"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

/* ─── Live Profile Growing Widget ─── */
export default function LiveCounterWidget() {
  const [followers, setFollowers] = useState(12482);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFollowers(prev => prev + Math.floor(Math.random() * 2) + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 900);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <m.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full max-w-[280px] shadow-2xl relative"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e1306c] to-[#f77737] p-[2px]">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xs font-black text-white">
            i
          </div>
        </div>
        <div>
          <p className="text-xs font-black text-white">@tu.marca</p>
          <p className="text-[9px] text-[#00caa4] font-black uppercase tracking-wider">Crecimiento Activo</p>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-3">
        <div>
          <p className="text-[9px] font-bold text-blue-200/50 uppercase tracking-widest">Seguidores</p>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black text-white tracking-tight">
              {followers.toLocaleString()}
            </span>
            <AnimatePresence>
              {pulse && (
                <m.span 
                  initial={{ opacity: 0, y: 8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-[10px] font-black text-emerald-400"
                >
                  +1
                </m.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Simulación
        </span>
      </div>
    </m.div>
  );
}
