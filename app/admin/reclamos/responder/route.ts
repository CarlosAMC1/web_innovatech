import prisma from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";
import { sendEmail, escapeHtml } from "@/lib/notify";
import { complaintCode } from "@/lib/complaints";
import { site } from "@/lib/site";

// Guarda la respuesta del proveedor y la envía al correo del consumidor.
export async function POST(req: Request) {
  if (!isAuthorized(req.headers.get("authorization"))) {
    return new Response("Not found", { status: 404 });
  }

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  const response = String(form.get("response") ?? "").trim().slice(0, 5000);
  if (!id || response.length < 10) {
    return new Response("La respuesta debe tener al menos 10 caracteres.", { status: 400 });
  }

  const complaint = await prisma.complaint.findUnique({ where: { id } });
  if (!complaint) return new Response("Not found", { status: 404 });
  if (complaint.respondedAt) return Response.redirect(new URL("/admin/reclamos", req.url), 303);

  const updated = await prisma.complaint.update({ where: { id }, data: { response, respondedAt: new Date() } });
  const code = complaintCode(updated.number, updated.createdAt);
  const mailed = await sendEmail({
    to: [updated.email],
    subject: `Respuesta a tu ${updated.kind} ${code} - ${site.legal.businessName || site.name}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a">
      <p>Hola, ${escapeHtml(updated.name)}:</p>
      <p>Respondemos a tu ${updated.kind} <strong>${code}</strong>:</p>
      <p style="white-space:pre-wrap">${escapeHtml(response)}</p>
      <p>Atentamente,<br>${escapeHtml(site.legal.businessName || site.name)}</p></div>`,
  });

  return Response.redirect(new URL(`/admin/reclamos?ok=${mailed ? "mail" : "saved"}`, req.url), 303);
}
