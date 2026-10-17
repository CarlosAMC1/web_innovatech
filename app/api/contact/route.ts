import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre es muy corto").max(100),
  email: z.email("Correo electrónico inválido").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 9, "Número de WhatsApp inválido")
    .optional(),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
  consent: z.literal(true, "Debes aceptar la política de privacidad"),
  // Campo trampa para bots: los humanos no lo ven, así que siempre llega vacío.
  website: z.string().optional(),
});

export async function POST(req: Request) {
  if (isRateLimited(req, "contact")) {
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

  const { name, email, phone, company, message, website } = result.data;
  if (website) {
    // Bot detectado: respondemos como si todo fuera bien, pero no guardamos nada.
    return NextResponse.json({ success: true }, { status: 201 });
  }

  try {
    const lead = await saveLead({ source: "contacto", name, email, phone: phone || undefined, company, message, page: "/solutions" });
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tu mensaje. Envíalo por WhatsApp y te respondemos ahí." },
      { status: 503 }
    );
  }
}
