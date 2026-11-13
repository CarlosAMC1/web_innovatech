# Innovatech Web

Sitio de Innovatech: **Innovatech Solutions** (software a medida) e **Innovatech Crece** (crecimiento en Instagram).

Hecho con Next.js 16 (App Router), Tailwind CSS 4, Framer Motion y Prisma (SQLite).

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/solutions` | Servicios de software y formulario de contacto |
| `/crece` | Planes de Instagram con calculadora y compra por WhatsApp |
| `/privacidad` | Política de privacidad (Ley 29733) |
| `/terminos` | Términos de servicio |
| `/servicios` y `/servicios/[slug]` | Una página por servicio (pensadas para Google). Contenido en `lib/services.ts` |
| `/cotizar` | Cotizador paso a paso (acepta `?servicio=slug` para preseleccionar) |
| `/libro-de-reclamaciones` | Libro de Reclamaciones virtual |
| `/api/contact`, `/api/cotizar` | Guardan el lead, avisan por correo y lo envían a Pacto |
| `/api/reclamaciones` | Registra el reclamo y envía la constancia por correo |
| `/admin` | Panel privado: estadísticas propias (visitas, orígenes, campañas, embudo), leads (con CSV) y reclamos |
| `/api/track` | Recibe los eventos de estadísticas del navegador |

Los datos de contacto (WhatsApp, email, país) se editan en un solo lugar: `lib/site.ts`.

## Desarrollo local

```bash
npm install
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma db push
npm run dev
```

Abre http://localhost:3000.

## Variables de entorno

| Variable | Cuándo | Para qué |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Al compilar (build arg) | Dominio público, ej. `https://innovatech.pe`. Lo usan el sitemap, robots y las vistas previas al compartir. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Al compilar (build arg) | Correo con dominio propio. Si no se define, no se muestra. |
| `DATABASE_URL` | Al ejecutar | Ya viene configurada en el Dockerfile: `file:/app/data/innovatech.db`. |
| `ADMIN_PASSWORD` | Al ejecutar | Contraseña del panel `/admin`. Sin ella, el panel está desactivado. Al cambiarla se cierran todas las sesiones. |
| `ADMIN_USER` | Al ejecutar | Opcional. Usuario del panel (por defecto `admin`). |
| `ADMIN_SESSION_SECRET` | Al ejecutar | Opcional. Texto secreto extra para firmar la sesión del panel. |
| `RESEND_API_KEY` | Al ejecutar | Opcional. Clave de [Resend](https://resend.com) para recibir un correo por cada lead. |
| `LEADS_NOTIFY_EMAIL` | Al ejecutar | Opcional. Correo(s) que reciben el aviso, separados por coma. |
| `LEADS_FROM_EMAIL` | Al ejecutar | Opcional. Remitente con tu dominio verificado en Resend. Sin dominio verificado, Resend solo envía al correo de tu cuenta. |
| `NEXT_PUBLIC_RAZON_SOCIAL`, `NEXT_PUBLIC_RUC`, `NEXT_PUBLIC_DIRECCION_FISCAL` | Al compilar (build arg) | Datos del proveedor para el Libro de Reclamaciones, el footer y la política de privacidad. **Obligatorios.** |
| `NEXT_PUBLIC_BOOKING_URL` | Al compilar (build arg) | Enlace de agenda (Google Calendar, Calendly). Sin él, "Agendar llamada" abre WhatsApp. |
| `PACTO_URL`, `PACTO_WEBSITE_TOKEN` | Al ejecutar (opcional) | Cambian el chat de Pacto sin recompilar (basta reiniciar). Por defecto usa `crm.innovatech-peru.com` y la bandeja `innovatech-peru.com` definidos en `lib/site.ts`. `PACTO_CHAT_DISABLED=1` lo oculta. |
| `PACTO_LEADS_WEBHOOK_URL` | Al ejecutar | URL del Flow de Pacto con disparador "Webhook". Cada lead del contacto y del cotizador se envía ahí. |

## Deploy en EasyPanel (Docker)

1. Agrega `NEXT_PUBLIC_SITE_URL` (y opcionalmente `NEXT_PUBLIC_CONTACT_EMAIL`) como **build args**.
2. Monta un **volumen persistente en `/app/data`**. Sin volumen, los leads se borran en cada redeploy.
3. Al arrancar, el contenedor crea o actualiza las tablas automáticamente (`prisma db push`).

## Panel de administración

Entra a `/admin` con usuario `admin` (o `ADMIN_USER`) y la contraseña de `ADMIN_PASSWORD`. La sesión dura 7 días.

- **Resumen:** visitantes, páginas vistas, leads, conversión, chats y clics de WhatsApp; visitantes por día; embudo
  de conversión; orígenes, campañas, páginas, acciones y dispositivos. Periodos: hoy, 7, 30 y 90 días.
- **Crear enlace para una campaña:** arma enlaces con `utm_source`, `utm_medium` y `utm_campaign` para medir cada
  anuncio o publicación. Los leads guardan de qué origen y campaña vinieron.
- **Leads:** todos los mensajes, responder por correo o WhatsApp y descargar CSV.
- **Reclamos:** Libro de Reclamaciones con plazos y respuesta.

## Estadísticas propias

La web mide visitas y acciones sin servicios externos (tabla `Event`). El navegador guarda un identificador
aleatorio (`localStorage`), sin IP ni datos personales; los bots se descartan. Quien pulsa "Rechazar" en el aviso de
cookies deja de ser medido. Eventos: `pageview`, `chat_open`, `chat_start`, `whatsapp_click`, `book_call`,
`cta_cotizar`, `quote_step`, `quote_submit`, `contact_submit`, `complaint_submit`, `calculator_use`, `contact_click`.

## Conectar con Pacto

**Chat con IA en la web**

1. En Pacto: Configuración → Bandejas → Nueva bandeja → **Sitio web**, con el dominio de la web.
2. Asigna el bot de **Pacto AI** a esa bandeja, para que responda y derive a un asesor cuando haga falta.
3. El token de la bandeja ya está en `lib/site.ts`. Para cambiarlo sin tocar código usa `PACTO_WEBSITE_TOKEN` (y `PACTO_URL`) en el entorno y reinicia.

**Leads de los formularios**

1. En Pacto: Flows → nuevo flow → disparador **Webhook**. Elige tu bandeja de WhatsApp y usa `{{ webhook.phone }}` como teléfono, `{{ webhook.name }}` como nombre y `{{ webhook.email }}` como correo. Pacto creará el contacto y la conversación.
2. Arma el flow como quieras. Por ejemplo: nota con `{{ webhook.summary }}`, etiqueta según `{{ webhook.source }}` (`contacto` o `cotizador`), etapa del pipeline y plantilla de bienvenida por WhatsApp.
3. Copia la URL del webhook en `PACTO_LEADS_WEBHOOK_URL`.

Datos que recibe el flow: `source`, `name`, `email`, `phone` (con 51), `company`, `message`, `summary`, `page` y, en el cotizador, `details` (`projectType`, `features`, `budget`, `timeline`, `teamSize`, `goal`).

## Libro de Reclamaciones

- Cada registro recibe un correlativo (`LR-2026-000001`). El consumidor ve su hoja y la puede imprimir, y si Resend está configurado recibe una copia por correo.
- En `/admin/reclamos` ves el plazo de respuesta (15 días hábiles, sin contar feriados) y respondes desde ahí. La respuesta se guarda y se envía al consumidor.
- Conserva los registros al menos 2 años (están en el volumen `/app/data`).

## Testimonios

La sección de testimonios del inicio solo aparece cuando agregas testimonios reales en el arreglo `testimonials` de
`app/page.tsx`.
