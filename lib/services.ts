import { Globe, Smartphone, Database, MessagesSquare, Bot, ShieldCheck, Server, type LucideIcon } from "lucide-react";

// Contenido de las páginas /servicios/[slug]. Cada una apunta a búsquedas concretas en Google.
// Mantener los textos sin cifras ni promesas que no se puedan respaldar.

export type Service = {
  slug: string;
  icon: LucideIcon;
  name: string; // nombre corto (menú, tarjetas)
  short: string; // descripción de una línea para el menú
  title: string; // <title> para Google
  description: string; // meta description
  h1: string;
  intro: string;
  mockup?: "crm" | "erp" | "ecommerce";
  pains: string[];
  features: { title: string; desc: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "desarrollo-web",
    icon: Globe,
    name: "Desarrollo Web",
    short: "Webs y tiendas rápidas, listas para Google.",
    title: "Desarrollo Web en Perú: Páginas Web y Tiendas Virtuales",
    description:
      "Diseñamos y desarrollamos páginas web, landing pages y tiendas virtuales rápidas, optimizadas para celulares y Google, con pagos por Yape, Plin y tarjeta.",
    h1: "Desarrollo de páginas web y tiendas virtuales",
    intro:
      "Creamos sitios rápidos, pensados para celulares y para aparecer en Google, que convierten visitas en mensajes, cotizaciones y ventas.",
    mockup: "ecommerce",
    pains: [
      "Tu web es lenta o se ve mal en el celular.",
      "No apareces en Google cuando te buscan.",
      "Recibes visitas, pero casi nadie te escribe ni compra.",
      "Cada cambio depende de alguien más y tarda semanas.",
    ],
    features: [
      { title: "Webs corporativas y landing pages", desc: "Páginas claras, con tu marca y llamados a la acción hacia WhatsApp o formularios." },
      { title: "Tiendas virtuales", desc: "Catálogo, carrito y pagos con Yape, Plin, tarjeta o transferencia." },
      { title: "SEO técnico desde el inicio", desc: "Estructura, velocidad, metadatos y sitemap para que Google te encuentre." },
      { title: "Panel autoadministrable", desc: "Actualiza productos, precios y textos sin depender de un programador." },
    ],
    deliverables: ["Diseño a medida y responsive", "Dominio, hosting y certificado SSL configurados", "Formularios conectados a tu WhatsApp o CRM", "Capacitación para administrar tu web"],
    faqs: [
      { q: "¿Cuánto demora hacer una página web?", a: "Depende del alcance. Una landing page suele estar lista en pocas semanas y una tienda virtual toma más. Te damos un cronograma por etapas en la propuesta." },
      { q: "¿La web será mía?", a: "Sí. El dominio, el contenido y el código del proyecto quedan a nombre de tu empresa." },
      { q: "¿Puedo cobrar con Yape o Plin?", a: "Sí. Integramos pasarelas que aceptan Yape, Plin, tarjetas y transferencias según lo que necesite tu negocio." },
    ],
  },
  {
    slug: "apps-moviles",
    icon: Smartphone,
    name: "Apps Móviles",
    short: "Apps para iOS y Android con un solo código.",
    title: "Desarrollo de Aplicaciones Móviles iOS y Android en Perú",
    description:
      "Desarrollamos apps móviles para iOS y Android con un solo código: apps para clientes, delivery, reservas y herramientas internas para tu equipo.",
    h1: "Desarrollo de aplicaciones móviles para iOS y Android",
    intro: "Construimos apps con un solo código para ambas tiendas, para que llegues a tus clientes o equipo desde su celular.",
    pains: [
      "Tus clientes te piden una app para pedir o reservar más fácil.",
      "Tu equipo de campo reporta en papel o por chats sueltos.",
      "Pagar dos desarrollos separados (iOS y Android) no te cuadra.",
    ],
    features: [
      { title: "Un solo código para iOS y Android", desc: "Menor costo y mantenimiento usando React Native." },
      { title: "Notificaciones push", desc: "Avisa a tus usuarios de pedidos, promociones o recordatorios." },
      { title: "Conexión con tus sistemas", desc: "La app se integra con tu web, ERP o CRM por API." },
      { title: "Publicación en tiendas", desc: "Te acompañamos en la publicación en Google Play y App Store." },
    ],
    deliverables: ["Diseño de pantallas (UX/UI)", "App para iOS y Android", "Panel web de administración", "Publicación y soporte inicial"],
    faqs: [
      { q: "¿Necesito una app o me basta una web?", a: "Si tus usuarios la usarán con frecuencia o necesitas notificaciones, una app suma. Si no, una web rápida puede ser suficiente. Te lo decimos con honestidad en la primera llamada." },
      { q: "¿Quién publica la app en las tiendas?", a: "Nosotros nos encargamos del proceso, usando las cuentas de desarrollador de tu empresa." },
    ],
  },
  {
    slug: "sistemas-erp",
    icon: Database,
    name: "Sistemas ERP a Medida",
    short: "Inventario, ventas y facturación a tu medida.",
    title: "Sistemas ERP a Medida en Perú: Inventario, Ventas y Facturación",
    description:
      "Desarrollamos sistemas ERP e intranets a medida: inventario, ventas, compras, facturación electrónica y reportes gerenciales para empresas en Perú.",
    h1: "Sistemas ERP e intranets a medida para tu empresa",
    intro: "Ordenamos la operación de tu negocio en un solo sistema hecho a la medida de tus procesos, no al revés.",
    mockup: "erp",
    pains: [
      "Tu información vive en Excels que nadie actualiza igual.",
      "No sabes en tiempo real cuánto vendes ni cuánto stock tienes.",
      "Los sistemas genéricos te obligan a cambiar tu forma de trabajar.",
      "Haces reportes a mano cada fin de mes.",
    ],
    features: [
      { title: "Inventario y almacenes", desc: "Stock en tiempo real, alertas de stock bajo y movimientos por almacén." },
      { title: "Ventas, compras y caja", desc: "Cotizaciones, pedidos, órdenes de compra y cierre de caja." },
      { title: "Facturación electrónica", desc: "Integración con tu proveedor de facturación electrónica para emitir comprobantes." },
      { title: "Reportes gerenciales", desc: "Dashboards con las métricas que importan y exportación a Excel o PDF." },
    ],
    deliverables: ["Levantamiento de procesos", "Sistema web con usuarios y permisos", "Migración de tus datos actuales", "Capacitación y soporte"],
    faqs: [
      { q: "¿Por qué un ERP a medida y no uno genérico?", a: "Porque se adapta a cómo trabaja tu empresa. Construimos solo los módulos que necesitas y puede crecer contigo." },
      { q: "¿Pueden migrar mi información de Excel?", a: "Sí. Revisamos tus archivos actuales y los importamos al sistema como parte del proyecto." },
      { q: "¿El sistema funciona desde cualquier lugar?", a: "Sí. Es un sistema web: entras desde la computadora o el celular con tu usuario y contraseña." },
    ],
  },
  {
    slug: "crm-whatsapp",
    icon: MessagesSquare,
    name: "CRM con WhatsApp (Pacto)",
    short: "Nuestro CRM con WhatsApp, pipeline e IA.",
    title: "Pacto: CRM con WhatsApp e IA para Vender Más en Perú",
    description:
      "Pacto es el CRM de Innovatech: WhatsApp, Instagram, Messenger y chat web en una sola bandeja, con pipeline de ventas, automatizaciones e IA que responde por ti.",
    h1: "Pacto: el CRM con WhatsApp e IA para tu equipo de ventas",
    intro:
      "Pacto reúne todas tus conversaciones en una sola bandeja y te ayuda a convertirlas en ventas: pipeline, seguimientos, automatizaciones y una IA que atiende a tus clientes.",
    mockup: "crm",
    pains: [
      "Tus vendedores atienden desde sus celulares personales y pierdes el historial.",
      "Los leads se enfrían porque nadie les hace seguimiento a tiempo.",
      "No sabes cuántas oportunidades tienes ni en qué etapa están.",
      "Respondes las mismas preguntas todo el día.",
    ],
    features: [
      { title: "Bandeja omnicanal", desc: "WhatsApp, Instagram, Messenger y el chat de tu web en un solo lugar, con todo tu equipo." },
      { title: "Pipeline de ventas", desc: "Arrastra cada oportunidad por etapas y mira tus metas de venta en un dashboard." },
      { title: "Pacto AI", desc: "Una IA entrenada con la información de tu negocio responde al instante y pasa a un asesor cuando hace falta." },
      { title: "Flows y seguimientos", desc: "Automatiza mensajes, etiquetas y recordatorios para reactivar leads que dejaron de responder." },
    ],
    deliverables: ["Implementación y configuración de canales", "Pipeline y automatizaciones a tu medida", "Entrenamiento de Pacto AI con tu información", "Capacitación a tu equipo y soporte mensual"],
    faqs: [
      { q: "¿Puedo probar Pacto antes?", a: "Sí: el chat de esta web funciona con Pacto. Escríbenos por ahí y verás cómo atiende la IA. También te hacemos una demo en vivo." },
      { q: "¿Funciona con mi número de WhatsApp actual?", a: "Se conecta a través de la API oficial de WhatsApp Business. En la implementación te guiamos para habilitar tu número." },
      { q: "¿Cómo es el pago?", a: "Hay un pago de implementación y una mensualidad por el servicio. Te enviamos la propuesta según el tamaño de tu equipo y canales." },
    ],
  },
  {
    slug: "automatizacion-ia",
    icon: Bot,
    name: "Automatización con IA",
    short: "Asistentes y procesos automáticos con IA.",
    title: "Automatización con Inteligencia Artificial para Empresas en Perú",
    description:
      "Automatizamos procesos con inteligencia artificial: asistentes que responden clientes, clasifican leads, leen documentos y conectan tus sistemas.",
    h1: "Automatización de procesos con inteligencia artificial",
    intro: "Identificamos las tareas repetitivas de tu negocio y las automatizamos con IA conectada a tus datos y sistemas.",
    pains: [
      "Tu equipo pierde horas copiando datos entre sistemas.",
      "Respondes las mismas consultas una y otra vez.",
      "Revisas documentos o correos a mano para clasificarlos.",
    ],
    features: [
      { title: "Asistentes de atención", desc: "Responden preguntas frecuentes con la información real de tu empresa." },
      { title: "Clasificación de leads y tickets", desc: "La IA lee cada mensaje, lo etiqueta y lo deriva a la persona correcta." },
      { title: "Lectura de documentos", desc: "Extrae datos de facturas, pedidos o formularios y los carga a tus sistemas." },
      { title: "Integraciones", desc: "Conectamos modelos de IA con tu CRM, ERP, hojas de cálculo o correo mediante APIs." },
    ],
    deliverables: ["Diagnóstico de procesos a automatizar", "Prototipo funcional", "Integración con tus sistemas", "Monitoreo y mejoras"],
    faqs: [
      { q: "¿Mis datos están seguros?", a: "Usamos proveedores de IA con políticas empresariales y solo enviamos la información necesaria para cada tarea." },
      { q: "¿Por dónde empiezo?", a: "Por un proceso concreto que hoy te quite mucho tiempo. Lo automatizamos primero y medimos el resultado antes de seguir." },
    ],
  },
  {
    slug: "ciberseguridad",
    icon: ShieldCheck,
    name: "Ciberseguridad",
    short: "Auditorías, pentesting y protección.",
    title: "Ciberseguridad para Empresas en Perú: Auditorías y Pentesting",
    description:
      "Auditorías de seguridad, pruebas de penetración (pentesting) y protección de sitios web y servidores para empresas en Perú.",
    h1: "Ciberseguridad: auditorías y pruebas de penetración",
    intro: "Encontramos las vulnerabilidades de tus sistemas antes que un atacante y te ayudamos a corregirlas.",
    pains: [
      "Tu web o sistema guarda datos de clientes y nunca se revisó su seguridad.",
      "Sufriste un incidente y no sabes por dónde entraron.",
      "Un cliente o socio te pide evidencia de buenas prácticas de seguridad.",
    ],
    features: [
      { title: "Pentesting web", desc: "Pruebas controladas sobre tu web, APIs y paneles para encontrar fallas explotables." },
      { title: "Revisión de servidores", desc: "Configuración, accesos, actualizaciones y copias de seguridad." },
      { title: "Informe por severidad", desc: "Cada hallazgo clasificado (crítico, alto, medio, bajo) con su recomendación." },
      { title: "Acompañamiento en la corrección", desc: "Te ayudamos a aplicar los cambios y volvemos a verificar." },
    ],
    deliverables: ["Alcance y autorización por escrito", "Informe ejecutivo y técnico", "Plan de corrección priorizado", "Re-test de los hallazgos corregidos"],
    faqs: [
      { q: "¿Las pruebas pueden afectar mi sistema?", a: "Acordamos el alcance y los horarios contigo, y trabajamos con cuidado para no afectar la operación." },
      { q: "¿Qué recibo al final?", a: "Un informe con los hallazgos ordenados por severidad, evidencias y cómo corregir cada uno." },
    ],
  },
  {
    slug: "cloud-devops",
    icon: Server,
    name: "Cloud & DevOps",
    short: "Servidores, Docker y despliegues.",
    title: "Cloud y DevOps en Perú: Servidores, Docker y Despliegues",
    description:
      "Migramos y administramos tus aplicaciones en la nube: servidores, Docker, copias de seguridad, monitoreo y despliegues automáticos.",
    h1: "Cloud y DevOps: tus sistemas estables y en la nube",
    intro: "Ponemos tus aplicaciones en servidores confiables, con copias de seguridad y despliegues automáticos.",
    pains: [
      "Tu sistema se cae y nadie sabe por qué.",
      "Actualizar tu aplicación es un proceso manual y riesgoso.",
      "No tienes copias de seguridad que hayas probado.",
    ],
    features: [
      { title: "Migración a la nube", desc: "Llevamos tus aplicaciones a AWS u otros proveedores, o a tu propio servidor." },
      { title: "Contenedores con Docker", desc: "Entornos iguales en desarrollo y producción, fáciles de mover y escalar." },
      { title: "Despliegues automáticos", desc: "Cada cambio se prueba y publica sin pasos manuales." },
      { title: "Monitoreo y backups", desc: "Alertas cuando algo falla y copias de seguridad automáticas." },
    ],
    deliverables: ["Diagnóstico de tu infraestructura", "Migración y configuración", "Documentación", "Soporte y mantenimiento mensual opcional"],
    faqs: [
      { q: "¿Tengo que cambiarme de proveedor de hosting?", a: "No necesariamente. Evaluamos tu situación y te recomendamos lo que conviene por costo y estabilidad." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
