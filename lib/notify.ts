import { site } from "@/lib/site";

type LeadNotice = { name: string; email: string; company?: string; message: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Envía un correo por cada lead nuevo usando Resend (https://resend.com).
// Requiere RESEND_API_KEY y LEADS_NOTIFY_EMAIL; si faltan, no hace nada.
export async function notifyNewLead(lead: LeadNotice) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.LEADS_FROM_EMAIL || "Innovatech Web <onboarding@resend.dev>";
  const html = `
    <h2>Nuevo lead desde la web</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Correo:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
    ${lead.company ? `<p><strong>Empresa:</strong> ${escapeHtml(lead.company)}</p>` : ""}
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    <p><a href="${site.url}/admin/leads">Ver todos los leads</a></p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((e) => e.trim()),
        reply_to: lead.email,
        subject: `Nuevo lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
        html,
      }),
    });
    if (!res.ok) console.error("Error sending lead email:", res.status, await res.text());
  } catch (error) {
    console.error("Error sending lead email:", error);
  }
}
