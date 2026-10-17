import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/solutions", priority: 0.9 },
    { path: "/crece", priority: 0.9 },
    { path: "/servicios", priority: 0.9 },
    ...services.map((s) => ({ path: `/servicios/${s.slug}`, priority: s.slug === "crm-whatsapp" ? 0.9 : 0.8 })),
    { path: "/cotizar", priority: 0.8 },
    { path: "/libro-de-reclamaciones", priority: 0.3 },
    { path: "/privacidad", priority: 0.3 },
    { path: "/terminos", priority: 0.3 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
