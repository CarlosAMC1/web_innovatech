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
| `/api/contact` | Recibe el formulario y guarda el lead en la base de datos |

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

## Deploy en EasyPanel (Docker)

1. Agrega `NEXT_PUBLIC_SITE_URL` (y opcionalmente `NEXT_PUBLIC_CONTACT_EMAIL`) como **build args**.
2. Monta un **volumen persistente en `/app/data`**. Sin volumen, los leads se borran en cada redeploy.
3. Al arrancar, el contenedor crea o actualiza las tablas automáticamente (`prisma db push`).

## Ver los leads

Los mensajes del formulario se guardan en la tabla `Lead`. Para revisarlos, abre la base de datos del volumen con
`npx prisma studio` o cualquier visor de SQLite.

## Testimonios

La sección de testimonios del inicio solo aparece cuando agregas testimonios reales en el arreglo `testimonials` de
`app/page.tsx`.
