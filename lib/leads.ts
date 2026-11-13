import { after } from "next/server";
import prisma from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";
import { sendToPacto, normalizePhone, type PactoEvent } from "@/lib/pacto";
import type { LeadAttribution } from "@/lib/analytics/attribution";

type NewLead = {
  source: "contacto" | "cotizador";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  details?: Record<string, unknown>;
  page?: string;
  attribution?: LeadAttribution;
};

// Guarda el lead y, después de responder al visitante, avisa por correo y lo envía a Pacto.
export async function saveLead(lead: NewLead) {
  const summary = [
    lead.company ? `Empresa: ${lead.company}` : "",
    lead.phone ? `WhatsApp: ${lead.phone}` : "",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n\n");

  const saved = await prisma.lead.create({
    data: {
      name: lead.name,
      email: lead.email,
      phone: normalizePhone(lead.phone) ?? null,
      message: lead.company ? `Empresa: ${lead.company}\n\n${lead.message}` : lead.message,
      source: lead.source,
      details: lead.details ? JSON.stringify(lead.details) : null,
      visitorId: lead.attribution?.visitorId ?? null,
      attrSource: lead.attribution?.source ?? null,
      attrMedium: lead.attribution?.medium ?? null,
      attrCampaign: lead.attribution?.campaign ?? null,
    },
  });

  const { attribution, ...rest } = lead;
  const event: PactoEvent = {
    ...rest,
    summary,
    origin: attribution?.source,
    campaign: attribution?.campaign,
  };
  after(async () => {
    await Promise.all([
      notifyNewLead({ name: lead.name, email: lead.email, company: lead.company, message: summary, source: lead.source }),
      sendToPacto(event),
    ]);
  });

  return saved;
}
