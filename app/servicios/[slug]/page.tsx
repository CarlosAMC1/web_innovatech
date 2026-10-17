import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, AlertCircle, ClipboardList, MessagesSquare } from "lucide-react";
import { services, getService } from "@/lib/services";
import { site } from "@/lib/site";
import { CrmMockup, ErpMockup, EcommerceMockup } from "@/components/Mockups";
import FaqItem from "@/components/FaqItem";
import BookCallLink from "@/components/BookCallLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: { absolute: `${service.title} | Innovatech` },
    description: service.description,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: { title: service.title, description: service.description },
  };
}

const mockups = { crm: CrmMockup, erp: ErpMockup, ecommerce: EcommerceMockup };

const steps = [
  { title: "Conversamos", desc: "Una llamada corta para entender tu negocio y lo que necesitas." },
  { title: "Propuesta", desc: "Te enviamos alcance, cronograma por etapas y presupuesto." },
  { title: "Desarrollo", desc: "Avanzamos por entregas que puedes revisar y comentar." },
  { title: "Lanzamiento y soporte", desc: "Publicamos, capacitamos a tu equipo y te acompañamos." },
];

export default async function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const Mockup = service.mockup ? mockups[service.mockup] : null;
  const others = services.filter((s) => s.slug !== service.slug);
  const url = `${site.url}/servicios/${service.slug}`;

  // Datos estructurados para Google: servicio, preguntas frecuentes y migas de pan.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.h1,
      description: service.description,
      url,
      areaServed: { "@type": "Country", name: "Perú" },
      provider: { "@type": "Organization", name: site.name, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${site.url}/servicios` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00caa410_1px,transparent_1px),linear-gradient(to_bottom,#00caa410_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-left">
            <nav aria-label="Migas de pan" className="text-xs text-blue-100/60 mb-6">
              <Link href="/" className="hover:text-white">Inicio</Link> <span aria-hidden>/</span>{" "}
              <Link href="/servicios" className="hover:text-white">Servicios</Link> <span aria-hidden>/</span>{" "}
              <span className="text-white/90">{service.name}</span>
            </nav>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/15">
              <service.icon className="w-7 h-7 text-[#00caa4]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.08] mb-5">{service.h1}</h1>
            <p className="text-blue-100/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">{service.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/cotizar?servicio=${service.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#00caa4] hover:bg-[#00b08e] text-white shadow-lg shadow-teal-500/20 transition-all"
              >
                <ClipboardList className="w-4 h-4" /> Cotizar mi proyecto
              </Link>
              <BookCallLink className="bg-white/10 hover:bg-white/20 border border-white/20 text-white" />
            </div>
          </div>
          {Mockup && (
            <div className="relative animate-fade-right">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10 bg-slate-900/50 p-2">
                <Mockup title={`Ejemplo ilustrativo: ${service.name}`} className="block w-full h-auto rounded-2xl" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Problemas */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">¿Te pasa algo de esto?</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {service.pains.map((p) => (
              <li key={p} className="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-black text-[#00469b] uppercase tracking-widest mb-3 text-center">Cómo te ayudamos</p>
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Qué incluye</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#00caa4]/10 border border-[#00caa4]/20 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-[#00caa4]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#00469b]/5 border border-[#00469b]/10 rounded-3xl p-7">
            <h3 className="font-black mb-4">Entregables</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-[#00469b] shrink-0 mt-0.5" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-gradient-to-br from-[#040e2c] via-[#091f5e] to-[#00469b] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Cómo trabajamos</h2>
          <ol className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="w-9 h-9 rounded-xl bg-[#00caa4]/15 border border-[#00caa4]/25 flex items-center justify-center text-[#00caa4] font-black text-sm mb-4">{i + 1}</span>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-xs text-blue-100/70 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">Preguntas frecuentes</h2>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
            {service.faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">¿Conversamos sobre tu proyecto?</h2>
          <p className="text-slate-600 mb-8">Cuéntanos qué necesitas en 2 minutos y te enviamos una propuesta.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/cotizar?servicio=${service.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#00469b] hover:bg-[#003c85] text-white transition-all"
            >
              <ClipboardList className="w-4 h-4" /> Cotizar mi proyecto
            </Link>
            <BookCallLink className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800" />
          </div>
          {service.slug !== "crm-whatsapp" && (
            <p className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <MessagesSquare className="w-4 h-4" /> ¿Prefieres chatear? Escríbenos en el chat de la web.
            </p>
          )}
        </div>
      </section>

      {/* Otros servicios */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-black mb-6">Otros servicios</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`} className="group flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#00469b]/30 hover:shadow-sm transition-all">
                <s.icon className="w-5 h-5 text-[#00469b] shrink-0" />
                <span className="text-sm font-bold flex-1">{s.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00469b] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
