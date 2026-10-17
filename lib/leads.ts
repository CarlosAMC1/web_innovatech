import { after } from "next/server";
import prisma from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";
import { sendToPacto, normalizePhone, type PactoEvent } from "@/lib/pacto";

type NewLead = {
  source: "contacto" | "cotizador";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  details?: Record<string, unknown>;
  page?: string;
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
    },
  });

  const event: PactoEvent = { ...lead, summary };
  after(async () => {
    await Promise.all([
      notifyNewLead({ name: lead.name, email: lead.email, company: lead.company, message: summary, source: lead.source }),
      sendToPacto(event),
    ]);
  });

  return saved;
}
