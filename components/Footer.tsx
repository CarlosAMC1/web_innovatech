import Link from "next/link";
import { Rocket, Mail, Phone, MapPin, BookOpen } from "lucide-react";
import { services } from "@/lib/services";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-green-400 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-blue-500/20">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-extrabold text-white tracking-tight">Innovatech</span>
            </Link>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Impulsa tu negocio al siguiente nivel. Software a medida para empresas y crecimiento de Instagram para marcas y emprendedores.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Servicios</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/crece" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> Innovatech Crece
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span> Innovatech Solutions
                </Link>
              </li>
              <li>
                <Link href="/cotizar" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span> Cotizar proyecto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Software</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicios/${s.slug}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center mr-3">
                    <Phone className="w-4 h-4 text-green-400" />
                  </div>
                  {site.phoneDisplay}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    {site.email}
                  </a>
                </li>
              )}
              <li className="flex items-center text-slate-400">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center mr-3">
                  <MapPin className="w-4 h-4 text-teal-400" />
                </div>
                {site.country}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} {site.legal.businessName || "Innovatech"}
            {site.legal.ruc && <> · RUC {site.legal.ruc}</>}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-4 md:mt-0">
            <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <Link
              href="/libro-de-reclamaciones"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
