// Utilidades del lado del servidor para clasificar visitas sin guardar datos personales.

const BOT_RE =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp\/|curl|wget|python-requests|axios|node-fetch|go-http|monitor|uptime/i;

export function isBot(userAgent: string | null) {
  return !userAgent || BOT_RE.test(userAgent);
}

export function parseUserAgent(ua: string) {
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
    ? "tablet"
    : /mobi|iphone|android/i.test(ua)
      ? "mobile"
      : "desktop";
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /samsungbrowser/i.test(ua)
        ? "Samsung"
        : /chrome|crios/i.test(ua)
          ? "Chrome"
          : /firefox|fxios/i.test(ua)
            ? "Firefox"
            : /safari/i.test(ua)
              ? "Safari"
              : "Otro";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad|ios/i.test(ua)
        ? "iOS"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Otro";
  return { device, browser, os };
}

const SOURCE_RULES: [RegExp, string][] = [
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$/, "facebook"],
  [/(^|\.)(wa\.me|whatsapp\.com)$/, "whatsapp"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)(t\.co|x\.com|twitter\.com)$/, "x"],
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt"],
];

// Origen de la visita: primero la etiqueta utm_source del enlace, luego el dominio de referencia.
export function resolveSource(utmSource: string | undefined, referrerHost: string | undefined) {
  if (utmSource) return utmSource.trim().toLowerCase().slice(0, 60);
  if (!referrerHost) return "directo";
  const host = referrerHost.toLowerCase().replace(/^www\./, "");
  for (const [re, name] of SOURCE_RULES) if (re.test(host)) return name;
  return host.slice(0, 60);
}

export function referrerHost(referrer: string | undefined, siteHost: string) {
  if (!referrer) return undefined;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host && host !== siteHost.replace(/^www\./, "") ? host : undefined;
  } catch {
    return undefined;
  }
}

const dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" });

// Día (YYYY-MM-DD) en hora de Lima, para agrupar estadísticas por día.
export function limaDay(date = new Date()) {
  return dayFormat.format(date);
}
