import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminEnabled, isAuthorized } from "@/lib/admin-auth";

// Pide usuario y contraseña (HTTP Basic) antes de entrar al panel de leads.
// Cada página y ruta de /admin vuelve a verificar el acceso por su cuenta.
export function proxy(request: NextRequest) {
  if (!isAdminEnabled()) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!isAuthorized(request.headers.get("authorization"))) {
    return new NextResponse("Acceso restringido", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Innovatech Admin", charset="UTF-8"' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
