import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovatech Solutions: Software a Medida, ERP, CRM e IA",
  description:
    "Desarrollo web, apps móviles, sistemas ERP/CRM, ciberseguridad, cloud y automatización con IA para empresas en Perú. Solicita tu cotización.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
