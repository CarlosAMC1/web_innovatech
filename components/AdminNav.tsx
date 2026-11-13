import Link from "next/link";
import { LogOut } from "lucide-react";
import { logout } from "@/app/admin/actions";

// Pestañas del panel privado.
export default function AdminNav({ active }: { active: "resumen" | "leads" | "reclamos" }) {
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${on ? "bg-white text-[#00469b]" : "bg-white/10 text-white hover:bg-white/20"}`}>
      {label}
    </Link>
  );
  return (
    <nav className="flex flex-wrap items-center gap-2 mb-6" aria-label="Panel">
      {tab("/admin", "Resumen", active === "resumen")}
      {tab("/admin/leads", "Leads", active === "leads")}
      {tab("/admin/reclamos", "Reclamos", active === "reclamos")}
      <form action={logout} className="ml-auto">
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-100/80 hover:text-white hover:bg-white/10">
          <LogOut className="w-4 h-4" /> Salir
        </button>
      </form>
    </nav>
  );
}
