import Link from "next/link";
import { Rocket, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white">Innovatech</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Impulsa tu negocio al siguiente nivel. Soluciones tecnológicas, software a medida y crecimiento orgánico-simulado en redes sociales.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crece" className="text-gray-400 hover:text-green-400 transition-colors">
                  Innovatech Crece (Seguidores)
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Innovatech Solutions (Software)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                +51 921 831 358
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                contacto@innovatech.com
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                Perú
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Innovatech. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
