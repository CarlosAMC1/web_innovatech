import prisma from "@/lib/db";
import { limaDay } from "@/lib/analytics/server";
import { EVENT_LABELS, type EventType } from "@/lib/analytics/events";

export const RANGES = [
  { id: "hoy", label: "Hoy", days: 1 },
  { id: "7", label: "7 días", days: 7 },
  { id: "30", label: "30 días", days: 30 },
  { id: "90", label: "90 días", days: 90 },
] as const;

export type RangeId = (typeof RANGES)[number]["id"];

export function resolveRange(value: unknown) {
  return RANGES.find((r) => r.id === value) ?? RANGES[2];
}

// Páginas que muestran una oferta (servicios, Pacto, Crece, cotizador)
const OFFER_PREFIXES = ["/servicios", "/solutions", "/crece", "/cotizar"];
const INTEREST_EVENTS: EventType[] = ["chat_open", "quote_step", "calculator_use", "cta_cotizar", "book_call"];
const CONTACT_EVENTS: EventType[] = ["chat_start", "quote_submit", "contact_submit", "whatsapp_click"];

export type Row = { label: string; value: number };

function daysBack(days: number) {
  const list: string[] = [];
  for (let i = days - 1; i >= 0; i--) list.push(limaDay(new Date(Date.now() - i * 24 * 60 * 60 * 1000)));
  return list;
}

function countBy<T>(items: T[], key: (item: T) => string | null | undefined) {
  const map = new Map<string, number>();
  for (const item of items) {
    const k = key(item);
    if (k) map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

export async function getDashboard(days: number) {
  const dayList = daysBack(days);
  const startDay = dayList[0];
  const since = new Date(`${startDay}T00:00:00-05:00`); // medianoche en Lima
  const inRange = { day: { gte: startDay } };

  const [visitorDays, pageviewsByDay, sessions, topPages, eventCounts, offerVisitors, interestVisitors, contactVisitors, leads] =
    await Promise.all([
      prisma.event.groupBy({ by: ["day", "visitorId"], where: { ...inRange, type: "pageview" } }),
      prisma.event.groupBy({ by: ["day"], where: { ...inRange, type: "pageview" }, _count: { _all: true } }),
      prisma.event.groupBy({ by: ["sessionId", "source", "campaign", "device"], where: { ...inRange, type: "pageview" } }),
      prisma.event.groupBy({
        by: ["path"],
        where: { ...inRange, type: "pageview" },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),
      prisma.event.groupBy({ by: ["type"], where: { ...inRange, type: { not: "pageview" } }, _count: { _all: true } }),
      prisma.event.groupBy({
        by: ["visitorId"],
        where: { ...inRange, type: "pageview", OR: OFFER_PREFIXES.map((p) => ({ path: { startsWith: p } })) },
      }),
      prisma.event.groupBy({ by: ["visitorId"], where: { ...inRange, type: { in: INTEREST_EVENTS } } }),
      prisma.event.groupBy({ by: ["visitorId"], where: { ...inRange, type: { in: CONTACT_EVENTS } } }),
      prisma.lead.findMany({
        where: { createdAt: { gte: since } },
        select: { source: true, attrSource: true, attrCampaign: true },
      }),
    ]);

  // Visitantes únicos por día y en total
  const visitorsPerDay = new Map<string, number>();
  const visitors = new Set<string>();
  for (const v of visitorDays) {
    visitorsPerDay.set(v.day, (visitorsPerDay.get(v.day) ?? 0) + 1);
    visitors.add(v.visitorId);
  }
  const pageviewsPerDay = new Map(pageviewsByDay.map((d) => [d.day, d._count._all]));
  const daily = dayList.map((day) => ({ day, visitors: visitorsPerDay.get(day) ?? 0, pageviews: pageviewsPerDay.get(day) ?? 0 }));
  const pageviews = daily.reduce((sum, d) => sum + d.pageviews, 0);

  // Embudo: cada etapa incluye a quienes llegaron a una etapa posterior
  const contacted = new Set(contactVisitors.map((v) => v.visitorId).filter((id) => visitors.has(id)));
  const interested = new Set([...interestVisitors.map((v) => v.visitorId).filter((id) => visitors.has(id)), ...contacted]);
  const viewedOffer = new Set([...offerVisitors.map((v) => v.visitorId), ...interested].filter((id) => visitors.has(id)));

  const events = new Map(eventCounts.map((e) => [e.type as EventType, e._count._all]));
  const actions: Row[] = (Object.keys(EVENT_LABELS) as EventType[])
    .filter((t) => t !== "pageview" && t !== "quote_step" && (events.get(t) ?? 0) > 0)
    .map((t) => ({ label: EVENT_LABELS[t], value: events.get(t) ?? 0 }))
    .sort((a, b) => b.value - a.value);

  return {
    days: dayList.length,
    totals: {
      visitors: visitors.size,
      sessions: sessions.length,
      pageviews,
      leads: leads.length,
      conversion: visitors.size ? leads.length / visitors.size : 0,
      chats: events.get("chat_start") ?? 0,
      whatsapp: events.get("whatsapp_click") ?? 0,
    },
    daily,
    funnel: [
      { label: "Visitaron la web", value: visitors.size },
      { label: "Vieron un servicio, Pacto o Crece", value: viewedOffer.size },
      { label: "Mostraron interés (chat, cotizador, calculadora, agendar)", value: interested.size },
      { label: "Contactaron (cotización, formulario, chat o WhatsApp)", value: contacted.size },
    ],
    sources: countBy(sessions, (s) => s.source),
    campaigns: countBy(sessions, (s) => s.campaign),
    devices: countBy(sessions, (s) => ({ mobile: "Celular", tablet: "Tablet", desktop: "Computadora" })[s.device] ?? s.device),
    pages: topPages.map((p) => ({ label: p.path, value: p._count.path })),
    actions,
    leadsBySource: countBy(leads, (l) => l.attrSource ?? "sin dato"),
    leadsByCampaign: countBy(leads, (l) => l.attrCampaign),
    leadsByForm: countBy(leads, (l) => (l.source === "cotizador" ? "Cotizador" : "Formulario de contacto")),
  };
}

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;
