// Opciones del cotizador (/cotizar). Las usan el formulario y la API para validar.

export const projectTypes = [
  { id: "desarrollo-web", label: "Página web o tienda virtual" },
  { id: "apps-moviles", label: "App móvil" },
  { id: "sistemas-erp", label: "Sistema ERP / intranet" },
  { id: "crm-whatsapp", label: "CRM con WhatsApp (Pacto)" },
  { id: "automatizacion-ia", label: "Automatización con IA" },
  { id: "ciberseguridad", label: "Ciberseguridad" },
  { id: "cloud-devops", label: "Cloud y servidores" },
  { id: "otro", label: "Otro / no estoy seguro" },
] as const;

export type ProjectType = (typeof projectTypes)[number]["id"];

export const featureOptions: Record<ProjectType, string[]> = {
  "desarrollo-web": ["Landing page", "Web corporativa", "Tienda virtual", "Pagos online (Yape, Plin, tarjeta)", "Blog", "Conexión con WhatsApp o CRM", "Varios idiomas"],
  "apps-moviles": ["App para clientes", "App para mi equipo", "Pagos dentro de la app", "Notificaciones", "Ubicación / mapas", "Panel de administración"],
  "sistemas-erp": ["Inventario", "Ventas y caja", "Compras", "Facturación electrónica", "RR.HH. / planillas", "Reportes gerenciales", "Migrar datos de Excel"],
  "crm-whatsapp": ["WhatsApp", "Instagram", "Messenger", "Chat de la web", "IA que responde (Pacto AI)", "Pipeline de ventas", "Automatizaciones y seguimientos", "Llamadas por WhatsApp"],
  "automatizacion-ia": ["Atención al cliente", "Clasificar leads o tickets", "Leer documentos o facturas", "Reportes automáticos", "Conectar mis sistemas"],
  ciberseguridad: ["Pentesting web", "Revisión de servidores", "Revisión de código", "Atender un incidente"],
  "cloud-devops": ["Migrar a la nube", "Contenedores (Docker)", "Despliegues automáticos", "Backups y monitoreo"],
  otro: [],
};

export const budgets = ["Menos de S/ 5,000", "S/ 5,000 a 15,000", "S/ 15,000 a 40,000", "Más de S/ 40,000", "Aún no lo sé"] as const;
export const timelines = ["Lo antes posible", "En 1 a 3 meses", "En 3 a 6 meses", "Sin fecha definida"] as const;
export const teamSizes = ["Solo yo", "2 a 10 personas", "11 a 50 personas", "Más de 50 personas"] as const;
