import Link from "next/link";

// Pestañas del panel privado.
export default function AdminNav({ active }: { active: "leads" | "reclamos" }) {
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${on ? "bg-white text-[#00469b]" : "bg-white/10 text-white hover:bg-white/20"}`}>
      {label}
    </Link>
  );
  return (
    <nav className="flex gap-2 mb-6" aria-label="Panel">
      {tab("/admin/leads", "Leads", active === "leads")}
      {tab("/admin/reclamos", "Reclamos", active === "reclamos")}
    </nav>
  );
}
