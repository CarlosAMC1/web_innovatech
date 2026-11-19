import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import logoOscuro from "@/public/brand/logo-oscuro.png";
import { login } from "@/app/admin/actions";
import { isAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Ingresar al panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/admin";
  if (await isAdminSession()) redirect(next.startsWith("/admin") ? next : "/admin");
  const error = params.error === "limit" ? "Demasiados intentos. Espera unos minutos." : params.error ? "Usuario o contraseña incorrectos." : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] flex items-center justify-center px-4 pt-24 pb-16">
      <form action={login} className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 space-y-5">
        <div className="text-center">
          <Image src={logoOscuro} alt="Innovatech" sizes="180px" className="h-10 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-black text-slate-900">Panel</h1>
          <p className="text-sm text-slate-500 mt-1">Ingresa con tu usuario y contraseña.</p>
        </div>
        <input type="hidden" name="next" value={next} />
        <div className="space-y-1.5">
          <label htmlFor="user" className="text-xs font-bold text-slate-600">Usuario</label>
          <input id="user" name="user" required autoComplete="username" defaultValue="admin" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00469b]/40" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-bold text-slate-600">Contraseña</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" autoFocus className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00469b]/40" />
        </div>
        {error && <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</p>}
        <button className="w-full py-3.5 rounded-xl bg-[#00469b] hover:bg-[#003c85] text-white font-bold text-sm">Ingresar</button>
      </form>
    </div>
  );
}
