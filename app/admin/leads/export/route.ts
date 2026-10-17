import prisma from "@/lib/db";
import { isAuthorized } from "@/lib/admin-auth";

const csvCell = (value: string) => {
  // Evita que Excel interprete el contenido como fórmula.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  if (!isAuthorized(req.headers.get("authorization"))) {
    return new Response("Not found", { status: 404 });
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const rows = [
    ["Fecha", "Nombre", "Correo", "Mensaje"],
    ...leads.map((l) => [l.createdAt.toISOString(), l.name, l.email, l.message]),
  ];
  // El BOM inicial hace que Excel lea bien las tildes.
  const csv = "﻿" + rows.map((r) => r.map(csvCell).join(",")).join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-innovatech-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
