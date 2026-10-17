import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre es muy corto").max(100),
  email: z.email("Correo electrónico inválido").max(200),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
  consent: z.literal(true, "Debes aceptar la política de privacidad"),
  // Campo trampa para bots: los humanos no lo ven, así que siempre llega vacío.
  website: z.string().optional(),
});

// Límite simple en memoria: 5 envíos cada 10 minutos por IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Inténtalo en unos minutos o escríbenos por WhatsApp." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  // Validación estricta de la entrada antes de tocar la base de datos.
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Revisa los datos del formulario", details: z.flattenError(result.error).fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, company, message, website } = result.data;
  if (website) {
    // Bot detectado: respondemos como si todo fuera bien, pero no guardamos nada.
    return NextResponse.json({ success: true }, { status: 201 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        message: company ? `Empresa: ${company}\n\n${message}` : message,
      },
    });
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tu mensaje. Envíalo por WhatsApp y te respondemos ahí." },
      { status: 503 }
    );
  }
}
