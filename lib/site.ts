// Datos de contacto y de la marca usados en todo el sitio.
// Cambia aquí y se actualiza en navbar, footer, formularios, SEO y páginas legales.

export const site = {
  name: "Innovatech",
  description:
    "Desarrollo de software a medida (web, apps, ERP/CRM, IA) y crecimiento de Instagram para negocios en Perú.",
  // URL pública del sitio. Configúrala con la variable NEXT_PUBLIC_SITE_URL (ej. https://innovatech.pe).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://innovatech-peru.com").replace(/\/$/, ""),
  whatsapp: "51921831358",
  phoneDisplay: "+51 921 831 358",
  // Correo de contacto con dominio propio. Si está vacío no se muestra en el sitio.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  country: "Perú",
  // Datos del proveedor para el Libro de Reclamaciones (obligatorios para vender a consumidores).
  legal: {
    businessName: process.env.NEXT_PUBLIC_RAZON_SOCIAL || "CENTRO DE INVESTIGACION, INNOVACION Y SOLUCIONES TECNOLOGICAS S.A.C.",
    ruc: process.env.NEXT_PUBLIC_RUC || "20615130151",
    address: process.env.NEXT_PUBLIC_DIRECCION_FISCAL || "Asoc. Sr de los Milagros, Alto de la Alianza, Tacna",
  },
  // Enlace para agendar una llamada (Google Calendar, Calendly, etc.). Sin enlace, se agenda por WhatsApp.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  // Widget de chat de Pacto (bandeja "innovatech-peru.com" con el bot Pacto Web asignado).
  // Se pueden cambiar sin recompilar con las variables PACTO_URL y PACTO_WEBSITE_TOKEN (ver /api/pacto-config).
  pacto: {
    url: "https://crm.innovatech-peru.com",
    websiteToken: "TCNyRU2rJLYuu2cqUDCjF38K",
  },
};

export const BOOKING_WHATSAPP_MESSAGE = "Hola, quiero agendar una llamada de 15 minutos para conversar sobre mi proyecto.";

export function bookingLink() {
  return site.bookingUrl || whatsappLink(BOOKING_WHATSAPP_MESSAGE);
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
