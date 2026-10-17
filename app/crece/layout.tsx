import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovatech Crece: Seguidores de Instagram desde S/ 30",
  description:
    "Paquetes de seguidores de Instagram con entrega gradual, sin contraseñas y con garantía de reposición. Pago con Yape, Plin o transferencia.",
  alternates: { canonical: "/crece" },
};

export default function CreceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
