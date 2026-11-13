import { createHash, createHmac, timingSafeEqual } from "node:crypto";

// Acceso al panel /admin con usuario (ADMIN_USER, por defecto "admin") y contraseña (ADMIN_PASSWORD).
// Si ADMIN_PASSWORD no está configurada, el panel queda desactivado.
// La sesión es una cookie firmada; al cambiar la contraseña se invalidan todas las sesiones.
export const ADMIN_COOKIE = "itk_admin";
export const SESSION_DAYS = 7;

export function adminUser() {
  return process.env.ADMIN_USER || "admin";
}

export function isAdminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function signingKey() {
  return createHash("sha256")
    .update(`innovatech-admin:${process.env.ADMIN_PASSWORD}:${process.env.ADMIN_SESSION_SECRET ?? ""}`)
    .digest();
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function sign(value: string) {
  return createHmac("sha256", signingKey()).update(value).digest("base64url");
}

export function checkCredentials(user: string, password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Se comparan ambos siempre, para no revelar cuál de los dos falló
  const userOk = safeEqual(user, adminUser());
  const passOk = safeEqual(password, expected);
  return userOk && passOk;
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function isValidSession(token: string | undefined) {
  if (!isAdminEnabled() || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}
