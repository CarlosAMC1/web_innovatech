import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { price: 'asc' },
    });

    // If database is empty, return static fallback for demo purposes
    if (packages.length === 0) {
      return NextResponse.json([
        {
          id: "1",
          name: "Empuje Inicial",
          price: 60,
          description: "500 Seguidores de Calidad",
          category: "crece",
          features: JSON.stringify(["Crecimiento Orgánico-Simulado", "Entrega Rápida", "Garantía de Reposición"]),
        },
        {
          id: "2",
          name: "Emprendedor Total",
          price: 100,
          description: "1000 Seguidores de Calidad",
          category: "crece",
          features: JSON.stringify(["+REGALO: 200 Likes y 50 Comentarios", "+30 DÍAS DE GARANTÍA", "Pago Seguro", "Atención Personalizada"]),
        }
      ]);
    }

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Error al cargar los paquetes" }, { status: 500 });
  }
}
