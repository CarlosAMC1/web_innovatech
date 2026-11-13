"use client";

import type { Attribution, EventType } from "@/lib/analytics/events";

// Estadísticas propias en el navegador: un identificador aleatorio por visitante (localStorage)
// y uno por sesión (se renueva tras 30 minutos sin actividad). Sin datos personales.

const VID_KEY = "itk_vid";
const SESSION_KEY = "itk_session";
export const CONSENT_KEY = "itk_consent"; // "granted" | "denied"
const SESSION_TIMEOUT = 30 * 60 * 1000;

type Session = Omit<Attribution, "visitorId"> & { lastSeen: number };

function randomId() {
  return crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function storage(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function trackingAllowed() {
  return storage("local")?.getItem(CONSENT_KEY) !== "denied";
}

function visitorId() {
  const ls = storage("local");
  let vid = ls?.getItem(VID_KEY);
  if (!vid) {
    vid = randomId();
    ls?.setItem(VID_KEY, vid);
  }
  return vid;
}

function currentSession(): Session {
  const ss = storage("local");
  const now = Date.now();
  const url = new URL(window.location.href);
  const utm = {
    utmSource: url.searchParams.get("utm_source") ?? undefined,
    utmMedium: url.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
  };
  let session: Session | null = null;
  try {
    session = JSON.parse(ss?.getItem(SESSION_KEY) ?? "null");
  } catch {
    session = null;
  }
  // Nueva sesión si no hay, si pasó el tiempo de inactividad o si llega con otra campaña
  const newCampaign = utm.utmSource && utm.utmSource !== session?.utmSource;
  if (!session || now - session.lastSeen > SESSION_TIMEOUT || newCampaign) {
    session = { sessionId: randomId(), referrer: document.referrer || undefined, ...utm, lastSeen: now };
  }
  session.lastSeen = now;
  ss?.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

// Datos de atribución para adjuntar a los formularios (cotizador, contacto).
export function getAttribution(): Attribution | undefined {
  if (typeof window === "undefined" || !trackingAllowed()) return undefined;
  const { lastSeen, ...session } = currentSession();
  void lastSeen;
  return { visitorId: visitorId(), ...session };
}

export function track(type: EventType, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !trackingAllowed()) return;
  if (window.location.pathname.startsWith("/admin")) return;
  const attribution = getAttribution();
  if (!attribution) return;
  const payload = JSON.stringify({ type, path: window.location.pathname, ...attribution, props });
  try {
    const sent = navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "text/plain" }));
    if (!sent) void fetch("/api/track", { method: "POST", body: payload, keepalive: true });
  } catch {
    // Las estadísticas nunca deben romper la página
  }
}
