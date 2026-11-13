"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track, CONSENT_KEY } from "@/lib/analytics/client";

// Clasifica los clics en enlaces importantes (WhatsApp, agenda, cotizador, teléfono/correo).
function onDocumentClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.("a");
  if (!link) return;
  const href = link.getAttribute("href") ?? "";
  const where = link.dataset.track || link.getAttribute("aria-label") || link.textContent?.trim().slice(0, 40) || "";

  if (/calendar\.app\.google|calendly\.com|cal\.com/.test(href)) return track("book_call", { where });
  if (/wa\.me|whatsapp\.com/.test(href)) {
    const text = decodeURIComponent(href.split("text=")[1] ?? "");
    return track(/agendar una llamada/i.test(text) ? "book_call" : "whatsapp_click", { where });
  }
  if (href.startsWith("/cotizar")) return track("cta_cotizar", { where });
  if (href.startsWith("tel:") || href.startsWith("mailto:")) return track("contact_click", { where });
}

// Estado del consentimiento leído de localStorage (null = todavía no eligió).
const CONSENT_EVENT = "itk-consent";
function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return "unavailable";
  }
}
function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function Analytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "server");
  const showNotice = consent === null;
  const isAdmin = pathname.startsWith("/admin");

  // Página vista en cada cambio de ruta
  useEffect(() => {
    if (!isAdmin) track("pageview");
  }, [pathname, isAdmin]);

  useEffect(() => {
    document.addEventListener("click", onDocumentClick, true);
    const chatOpened = () => track("chat_open");
    const chatStarted = () => track("chat_start");
    window.addEventListener("chatwoot:opened", chatOpened);
    window.addEventListener("chatwoot:on-start-conversation", chatStarted);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("chatwoot:opened", chatOpened);
      window.removeEventListener("chatwoot:on-start-conversation", chatStarted);
    };
  }, []);

  const choose = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // sin almacenamiento disponible: el aviso volverá a salir
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  if (!showNotice || isAdmin) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 text-sm text-slate-600 print:hidden"
    >
      <p className="mb-4 leading-relaxed">
        Usamos un identificador anónimo propio para medir visitas y mejorar la web. No lo compartimos con terceros.{" "}
        <Link href="/privacidad" className="underline text-[#00469b]">Más información</Link>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => choose("granted")} className="flex-1 px-4 py-2.5 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white font-bold text-xs">
          Aceptar
        </button>
        <button type="button" onClick={() => choose("denied")} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs">
          Rechazar
        </button>
      </div>
    </div>
  );
}
