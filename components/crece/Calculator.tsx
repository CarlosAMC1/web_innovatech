"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2, Zap } from "lucide-react";
import { packages } from "@/lib/crece-packages";
import { whatsappLink } from "@/lib/site";

// Calculadora interactiva de planes Crece.
export default function Calculator() {
  const [sliderVal, setSliderVal] = useState(3); // Default index 3 (1000 followers)
  const currentPack = packages[sliderVal];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Slider Controls */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cantidad Elegida</span>
            <div className="flex items-baseline gap-1">
              <m.span 
                key={currentPack.followers}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="text-4xl md:text-5xl font-black text-[#00469b] tracking-tight"
              >
                {currentPack.followersText}
              </m.span>
              <span className="text-xs font-bold text-slate-500 uppercase">Seguidores</span>
            </div>
          </div>

          {/* Range Slider */}
          <div className="relative pt-4">
            <input 
              type="range"
              aria-label="Cantidad de seguidores"
              min="0" 
              max="4" 
              value={sliderVal} 
              onChange={(e) => setSliderVal(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#e1306c] border border-slate-200" 
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-3 px-1">
              <span>100</span>
              <span>500</span>
              <span>800</span>
              <span>1K (Pop)</span>
              <span>2K</span>
            </div>
          </div>

          {/* Delivery details */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase">Modo de Entrega</span>
              <AnimatePresence mode="wait">
                <m.span 
                  key={currentPack.time}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="font-black text-[#00469b]"
                >
                  {currentPack.time}
                </m.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase">Paquete</span>
              <AnimatePresence mode="wait">
                <m.span 
                  key={currentPack.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="font-black text-[#e1306c] capitalize"
                >
                  {currentPack.title}
                </m.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 uppercase">Garantía Incluida</span>
              <span className="font-black text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Reposición activa
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Price Output & Call to Action */}
        <div className="bg-gradient-to-br from-[#00469b] to-[#040e2c] rounded-2xl p-6 text-white text-center flex flex-col justify-between h-full relative overflow-hidden border border-[#00caa4]/20 shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1306c]/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div>
            <span className="inline-flex px-2.5 py-1 rounded-full bg-white/15 text-[#00caa4] text-[9px] font-black uppercase tracking-wider mb-4">
              {currentPack.badge}
            </span>
            <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Precio Total Especial</p>
            <AnimatePresence mode="wait">
              <m.p 
                key={currentPack.price}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="text-5xl font-black text-white mb-6"
              >
                {currentPack.price}
              </m.p>
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <ul className="text-left space-y-2 mb-6 text-xs text-blue-100/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00caa4] shrink-0" />
                <span>Entrega gradual</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00caa4] shrink-0" />
                <span>Solo con tu @usuario o link</span>
              </li>
            </ul>

            <Link 
              href={whatsappLink(`Hola, quiero el servicio Crece de ${currentPack.followersText} seguidores (${currentPack.title}) por ${currentPack.price}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full py-4 rounded-xl font-bold bg-[#00caa4] hover:bg-[#00b08e] hover:scale-[1.02] active:scale-[0.98] text-white transition-all shadow-md flex justify-center items-center gap-2 text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 animate-bounce" /> Comprar por WhatsApp
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
