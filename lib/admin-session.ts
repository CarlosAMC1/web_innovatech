import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin-auth";

export async function isAdminSession() {
  return isValidSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

// Para páginas del panel: si no hay sesión válida, al login.
export async function requireAdmin(next = "/admin") {
  if (!(await isAdminSession())) redirect(`/admin/login?next=${encodeURIComponent(next)}`);
}
