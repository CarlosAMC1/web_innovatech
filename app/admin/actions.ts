"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, SESSION_DAYS, checkCredentials, createSessionToken } from "@/lib/admin-auth";
import { isRateLimitedKey } from "@/lib/rate-limit";

export async function login(formData: FormData) {
  const user = String(formData.get("user") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/admin");
  const next = nextRaw.startsWith("/admin") && !nextRaw.startsWith("/admin/login") ? nextRaw : "/admin";

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimitedKey(`admin-login:${ip}`, 8, 15 * 60 * 1000)) {
    redirect(`/admin/login?error=limit&next=${encodeURIComponent(next)}`);
  }
  if (!checkCredentials(user, password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  (await cookies()).set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  redirect(next);
}

export async function logout() {
  (await cookies()).set(ADMIN_COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/login");
}
