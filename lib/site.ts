// Datos de contacto y de la marca usados en todo el sitio.
// Cambia aquí y se actualiza en navbar, footer, formularios, SEO y páginas legales.

export const site = {
  name: "Innovatech",
  description:
    "Desarrollo de software a medida (web, apps, ERP/CRM, IA) y crecimiento de Instagram para negocios en Perú.",
  // URL pública del sitio. Configúrala con la variable NEXT_PUBLIC_SITE_URL (ej. https://innovatech.pe).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  whatsapp: "51921831358",
  phoneDisplay: "+51 921 831 358",
  // Correo de contacto con dominio propio. Si está vacío no se muestra en el sitio.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  country: "Perú",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
