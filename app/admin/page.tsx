import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { getDashboard, resolveRange, RANGES } from "@/lib/analytics/queries";
import { site } from "@/lib/site";
import AdminNav from "@/components/AdminNav";
import DailyChart from "@/components/admin/DailyChart";
import UtmBuilder from "@/components/admin/UtmBuilder";
import { StatTile, Card, BarList, Funnel, Empty } from "@/components/admin/DashboardParts";

export const metadata: Metadata = {
  title: "Resumen",
  robots: { index: false, follow: false },
};

const n = (v: number) => v.toLocaleString("es-PE");

export default async function AdminDashboard({ searchParams }: PageProps<"/admin">) {
  await requireAdmin("/admin");
  const range = resolveRange((await searchParams).r);

  let data: Awaited<ReturnType<typeof getDashboard>> | null = null;
  try {
    data = await getDashboard(range.days);
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <AdminNav active="resumen" />
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black text-[#00caa4] uppercase tracking-widest mb-2">Estadísticas propias</p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Resumen de la web</h1>
            </div>
            <div className="flex gap-1 bg-white/10 rounded-xl p-1 self-start" role="tablist" aria-label="Periodo">
              {RANGES.map((r) => (
                <Link
                  key={r.id}
                  href={`/admin?r=${r.id}`}
                  role="tab"
                  aria-selected={r.id === range.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${r.id === range.id ? "bg-white text-[#00469b]" : "text-white/80 hover:text-white"}`}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {!data ? (
          <p className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
            No se pudieron cargar las estadísticas. Revisa la base de datos (volumen /app/data).
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              <StatTile label="Visitantes" value={n(data.totals.visitors)} hint={`${n(data.totals.sessions)} visitas`} />
              <StatTile label="Páginas vistas" value={n(data.totals.pageviews)} />
              <StatTile label="Leads" value={n(data.totals.leads)} hint="Cotizador + contacto" />
              <StatTile
                label="Conversión"
                value={`${(data.totals.conversion * 100).toFixed(data.totals.conversion > 0 && data.totals.conversion < 0.1 ? 1 : 0)}%`}
                hint="Leads ÷ visitantes"
              />
              <StatTile label="Chats" value={n(data.totals.chats)} hint="Escribieron en el chat" />
              <StatTile label="WhatsApp" value={n(data.totals.whatsapp)} hint="Clics" />
            </div>

            {data.days > 1 && (
              <Card title="Visitantes por día" subtitle="Personas distintas que entraron cada día (hora de Lima)">
                {data.totals.visitors ? <DailyChart data={data.daily} /> : <Empty />}
              </Card>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="Embudo de conversión" subtitle="Cuántos visitantes avanzaron en cada etapa">
                <Funnel steps={data.funnel} />
              </Card>
              <Card title="De dónde vienen" subtitle="Visitas por origen (Google, redes, directo...)">
                <BarList rows={data.sources} />
              </Card>
              <Card title="Páginas más vistas">
                <BarList rows={data.pages} limit={10} />
              </Card>
              <Card title="Acciones" subtitle="Clics y conversiones registradas">
                <BarList rows={data.actions} limit={12} />
              </Card>
              <Card title="Leads por origen" subtitle="De dónde vinieron quienes cotizaron o escribieron">
                <BarList rows={data.leadsBySource} />
              </Card>
              <Card title="Campañas" subtitle="Visitas desde enlaces con utm_campaign">
                <BarList rows={data.campaigns} />
                {data.leadsByCampaign.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Leads por campaña</p>
                    <BarList rows={data.leadsByCampaign} />
                  </div>
                )}
              </Card>
              <Card title="Dispositivos" subtitle="Visitas por tipo de equipo">
                <BarList rows={data.devices} />
              </Card>
              <Card title="Crear enlace para una campaña" subtitle="Úsalo en tus anuncios y publicaciones para medir cuál funciona">
                <UtmBuilder siteUrl={site.url} />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
