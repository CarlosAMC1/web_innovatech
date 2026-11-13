import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isAdminEnabled, isValidSession } from "@/lib/admin-auth";

// Protege el panel /admin: sin sesión válida, redirige al login.
// Cada página y ruta de /admin vuelve a verificar la sesión por su cuenta.
export function proxy(request: NextRequest) {
  if (!isAdminEnabled()) {
    return new NextResponse("Not found", { status: 404 });
  }
  const { pathname, search } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  if (!isValidSession(request.cookies.get(ADMIN_COOKIE)?.value)) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
