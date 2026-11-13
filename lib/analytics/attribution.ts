import { z } from "zod";
import { site } from "@/lib/site";
import { resolveSource, referrerHost } from "@/lib/analytics/server";

// Atribución que el navegador adjunta a los formularios (opcional: puede venir vacía si rechazó cookies).
export const attributionSchema = z
  .object({
    visitorId: z.string().max(64),
    sessionId: z.string().max(64),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(120).optional(),
    utmMedium: z.string().max(120).optional(),
    utmCampaign: z.string().max(120).optional(),
  })
  .optional()
  .catch(undefined);

export type LeadAttribution = { visitorId?: string; source?: string; medium?: string; campaign?: string };

export function toLeadAttribution(a: z.infer<typeof attributionSchema>): LeadAttribution | undefined {
  if (!a) return undefined;
  const ref = referrerHost(a.referrer, new URL(site.url).hostname);
  return {
    visitorId: a.visitorId,
    source: resolveSource(a.utmSource, ref),
    medium: a.utmMedium?.toLowerCase(),
    campaign: a.utmCampaign?.toLowerCase(),
  };
}
