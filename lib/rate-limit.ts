// Límite simple en memoria por IP (suficiente para un solo contenedor).
const buckets = new Map<string, number[]>();

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// Devuelve true si la clave superó `max` usos dentro de la ventana.
export function isRateLimitedKey(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 10_000) {
    for (const [k, times] of buckets) if (now - times[times.length - 1] > windowMs) buckets.delete(k);
  }
  return recent.length > max;
}

export function isRateLimited(req: Request, key: string, max = 5, windowMs = 10 * 60 * 1000) {
  return isRateLimitedKey(`${key}:${clientIp(req)}`, max, windowMs);
}
