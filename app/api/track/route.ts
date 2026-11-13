import { z } from "zod";
import prisma from "@/lib/db";
import { site } from "@/lib/site";
import { EVENT_TYPES } from "@/lib/analytics/events";
import { isBot, parseUserAgent, resolveSource, referrerHost, limaDay } from "@/lib/analytics/server";
import { isRateLimited } from "@/lib/rate-limit";

const id = z.string().regex(/^[a-zA-Z0-9-]{8,64}$/);
const short = z.string().trim().max(120).optional();

const eventSchema = z.object({
  type: z.enum(EVENT_TYPES),
  path: z.string().max(300).regex(/^\//),
  visitorId: id,
  sessionId: id,
  referrer: z.string().max(500).optional(),
  utmSource: short,
  utmMedium: short,
  utmCampaign: short,
  props: z.record(z.string(), z.union([z.string().max(200), z.number(), z.boolean()])).optional(),
});

const siteHost = new URL(site.url).hostname;

// Recibe los eventos del navegador (sendBeacon). Siempre responde 204 para no
// revelar nada a quien intente abusar del endpoint.
export async function POST(req: Request) {
  const ua = req.headers.get("user-agent");
  if (isBot(ua) || isRateLimited(req, "track", 120, 60 * 1000)) return new Response(null, { status: 204 });

  let body: unknown;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response(null, { status: 204 });
  }
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return new Response(null, { status: 204 });

  const e = parsed.data;
  const ref = referrerHost(e.referrer, siteHost);
  const { device, browser, os } = parseUserAgent(ua!);
  const props = e.props ? JSON.stringify(e.props).slice(0, 1000) : null;

  try {
    await prisma.event.create({
      data: {
        day: limaDay(),
        type: e.type,
        path: e.path.split("?")[0],
        visitorId: e.visitorId,
        sessionId: e.sessionId,
        source: resolveSource(e.utmSource, ref),
        medium: e.utmMedium?.toLowerCase() || null,
        campaign: e.utmCampaign?.toLowerCase() || null,
        referrer: ref ?? null,
        device,
        browser,
        os,
        props,
      },
    });
  } catch (error) {
    console.error("Error saving analytics event:", error);
  }
  return new Response(null, { status: 204 });
}
