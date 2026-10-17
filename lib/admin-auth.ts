import { timingSafeEqual } from "node:crypto";

// Acceso al panel /admin con usuario "admin" y la contraseña de la variable ADMIN_PASSWORD.
// Si ADMIN_PASSWORD no está configurada, el panel queda desactivado.
export const ADMIN_USER = "admin";

export function isAdminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isAuthorized(authHeader: string | null) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !authHeader?.startsWith("Basic ")) return false;
  const decoded = Buffer.from(authHeader.slice(6), "base64").toString();
  const sep = decoded.indexOf(":");
  if (sep === -1) return false;
  return safeEqual(decoded.slice(0, sep), ADMIN_USER) && safeEqual(decoded.slice(sep + 1), password);
}
