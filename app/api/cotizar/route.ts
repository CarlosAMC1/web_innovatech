import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { projectTypes, featureOptions, budgets, timelines, teamSizes, type ProjectType } from "@/lib/quote-options";

const typeIds = projectTypes.map((t) => t.id) as [ProjectType, ...ProjectType[]];

const quoteSchema = z
  .object({
    projectType: z.enum(typeIds, "Elige un tipo de proyecto"),
    features: z.array(z.string().max(60)).max(12).default([]),
    goal: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)").max(1500),
    budget: z.enum(budgets, "Elige un rango de presupuesto"),
    timeline: z.enum(timelines, "Elige un plazo"),
    teamSize: z.enum(teamSizes, "Elige el tamaño de tu equipo"),
    name: z.string().trim().min(2, "El nombre es muy corto").max(100),
    company: z.string().trim().max(100).optional(),
    email: z.email("Correo electrónico inválido").max(200),
    phone: z.string().trim().max(20).refine((v) => v.replace(/\D/g, "").length >= 9, "Número de WhatsApp inválido"),
    consent: z.literal(true, "Debes aceptar la política de privacidad"),
    website: z.string().optional(),
  })
  .refine((d) => d.features.every((f) => featureOptions[d.projectType].includes(f)), {
    message: "Opción no válida",
    path: ["features"],
  });

export async function POST(req: Request) {
  if (isRateLimited(req, "cotizar")) {
    return NextResponse.json({ error: "Demasiados envíos. Inténtalo en unos minutos o escríbenos por WhatsApp." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const result = quoteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Revisa los datos del formulario", details: z.flattenError(result.error).fieldErrors },
      { status: 400 }
    );
  }

  const d = result.data;
  if (d.website) return NextResponse.json({ success: true }, { status: 201 });

  const typeLabel = projectTypes.find((t) => t.id === d.projectType)!.label;
  const message = [
    `Proyecto: ${typeLabel}`,
    d.features.length ? `Necesita: ${d.features.join(", ")}` : "",
    `Presupuesto: ${d.budget}`,
    `Plazo: ${d.timeline}`,
    `Equipo: ${d.teamSize}`,
    "",
    d.goal,
  ]
    .filter((l, i) => l !== "" || i === 5)
    .join("\n");

  try {
    const lead = await saveLead({
      source: "cotizador",
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company || undefined,
      message,
      page: "/cotizar",
      details: {
        projectType: d.projectType,
        projectTypeLabel: typeLabel,
        features: d.features,
        goal: d.goal,
        budget: d.budget,
        timeline: d.timeline,
        teamSize: d.teamSize,
      },
    });
    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving quote:", error);
    return NextResponse.json({ error: "No pudimos guardar tu solicitud. Envíala por WhatsApp y te respondemos ahí." }, { status: 503 });
  }
}
