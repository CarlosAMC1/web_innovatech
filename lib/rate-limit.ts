// Límite simple en memoria por IP (suficiente para un solo contenedor).
const buckets = new Map<string, number[]>();

export function isRateLimited(req: Request, key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const id = `${key}:${ip}`;
  const now = Date.now();
  const recent = (buckets.get(id) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(id, recent);
  return recent.length > max;
}
