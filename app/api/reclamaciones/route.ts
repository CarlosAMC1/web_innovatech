import { NextResponse, after } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";
import { sendEmail, ownerEmails } from "@/lib/notify";
import { complaintCode, complaintEmailHtml } from "@/lib/complaints";
import { site } from "@/lib/site";

const text = (min: number, max: number, msg: string) => z.string().trim().min(min, msg).max(max);

const complaintSchema = z.object({
  kind: z.enum(["reclamo", "queja"], "Elige si es reclamo o queja"),
  name: text(3, 120, "Ingresa tu nombre completo"),
  documentType: z.enum(["DNI", "CE", "Pasaporte"], "Elige un tipo de documento"),
  documentNum: text(6, 20, "Número de documento inválido"),
  address: text(5, 200, "Ingresa tu domicilio"),
  phone: text(6, 20, "Ingresa un teléfono"),
  email: z.email("Correo electrónico inválido").max(200),
  isMinor: z.boolean().default(false),
  guardian: z.string().trim().max(120).optional(),
  itemType: z.enum(["producto", "servicio"], "Elige producto o servicio"),
  amount: z.string().trim().max(40).optional(),
  itemDetail: text(3, 300, "Describe el producto o servicio"),
  detail: text(10, 3000, "Describe el detalle (mínimo 10 caracteres)"),
  request: text(5, 1500, "Indica tu pedido"),
  truthful: z.literal(true, "Debes confirmar que los datos son verdaderos"),
  website: z.string().optional(),
}).refine((d) => !d.isMinor || (d.guardian && d.guardian.length >= 3), {
  message: "Ingresa el nombre del padre, madre o apoderado",
  path: ["guardian"],
});

export async function POST(req: Request) {
  if (isRateLimited(req, "reclamos", 3)) {
    return NextResponse.json({ error: "Demasiados envíos. Inténtalo en unos minutos." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const result = complaintSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Revisa los datos del formulario", details: z.flattenError(result.error).fieldErrors },
      { status: 400 }
    );
  }
  const { isMinor, truthful, website, ...d } = result.data;
  void truthful;
  if (website) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });

  try {
    // Número correlativo: SQLite serializa las escrituras dentro de la transacción.
    const complaint = await prisma.$transaction(async (tx) => {
      const last = await tx.complaint.findFirst({ orderBy: { number: "desc" }, select: { number: true } });
      return tx.complaint.create({
        data: {
          ...d,
          guardian: isMinor ? d.guardian : null,
          amount: d.amount || null,
          number: (last?.number ?? 0) + 1,
        },
      });
    });

    const code = complaintCode(complaint.number, complaint.createdAt);
    const html = complaintEmailHtml(complaint);
    after(async () => {
      await Promise.all([
        sendEmail({ to: [complaint.email], subject: `Constancia de tu ${complaint.kind} ${code} - ${site.legal.businessName || site.name}`, html }),
        sendEmail({ to: ownerEmails(), replyTo: complaint.email, subject: `Nuevo ${complaint.kind} en el Libro de Reclamaciones: ${code}`, html: `${html}<p><a href="${site.url}/admin/reclamos">Responder desde el panel</a></p>` }),
      ]);
    });

    return NextResponse.json(
      { success: true, code, number: complaint.number, createdAt: complaint.createdAt.toISOString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving complaint:", error);
    return NextResponse.json({ error: "No pudimos registrar tu reclamo. Inténtalo de nuevo en unos minutos." }, { status: 503 });
  }
}
