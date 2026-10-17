import { site } from "@/lib/site";

type LeadNotice = { name: string; email: string; company?: string; message: string; source?: string };

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

// Envía un correo con Resend (https://resend.com). Requiere RESEND_API_KEY; si falta, no hace nada.
// Devuelve true si Resend aceptó el envío.
export async function sendEmail({ to, subject, html, replyTo }: { to: string[]; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || to.length === 0) return false;

  const from = process.env.LEADS_FROM_EMAIL || "Innovatech Web <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: replyTo, subject, html }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("Error sending email:", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export function ownerEmails() {
  return (process.env.LEADS_NOTIFY_EMAIL || "").split(",").map((e) => e.trim()).filter(Boolean);
}

// Avisa por correo de cada lead nuevo. Requiere además LEADS_NOTIFY_EMAIL.
export async function notifyNewLead(lead: LeadNotice) {
  const html = `
    <h2>Nuevo lead desde la web${lead.source === "cotizador" ? " (cotizador)" : ""}</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Correo:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
    ${lead.company ? `<p><strong>Empresa:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    <p><a href="${site.url}/admin/leads">Ver todos los leads</a></p>`;

  await sendEmail({
    to: ownerEmails(),
    replyTo: lead.email,
    subject: `${lead.source === "cotizador" ? "Nueva cotización" : "Nuevo lead"}: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    html,
  });
}
