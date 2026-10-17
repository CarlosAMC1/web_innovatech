export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-[#00469b] via-[#091f5e] to-[#040e2c] text-white pt-36 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">{title}</h1>
          <p className="text-blue-100/70 text-sm">Última actualización: {updated}</p>
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-4 py-16 text-slate-700 text-sm leading-relaxed space-y-4 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:pt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-[#00469b] [&_a]:underline">
        {children}
      </article>
    </div>
  );
}
