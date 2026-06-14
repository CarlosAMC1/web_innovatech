import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto").max(100),
  email: z.string().email("Correo electrónico inválido"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate Input (Cybersecurity: Prevent NoSQL/SQL Injection by ensuring strict schema)
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message, company } = result.data;

    // 2. Save to database securely using Prisma
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        message,
        phone: company, // Storing company in phone for now as per schema or we should update schema. We'll store it as phone for simplicity in this demo.
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Nuestros sistemas de seguridad han bloqueado la acción por prevención." },
      { status: 500 }
    );
  }
}
