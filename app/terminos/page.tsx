import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Condiciones de los servicios de Innovatech Solutions e Innovatech Crece.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalPage title="Términos de Servicio" updated="octubre de 2026">
      <p>
        Estos términos regulan el uso de este sitio web y la contratación de los servicios de {site.name}. Al contratar
        un servicio aceptas estas condiciones.
      </p>

      <h2>1. Innovatech Solutions (software a medida)</h2>
      <ul>
        <li>El alcance, precio, plazos y forma de pago de cada proyecto se definen en una cotización o propuesta escrita.</li>
        <li>Las imágenes de sistemas mostradas en este sitio son ejemplos ilustrativos del tipo de soluciones que desarrollamos.</li>
        <li>Los cambios fuera del alcance acordado se cotizan por separado.</li>
      </ul>

      <h2>2. Innovatech Crece (Instagram)</h2>
      <ul>
        <li>Solo necesitamos tu @usuario público. Nunca te pediremos contraseñas ni accesos a tu cuenta.</li>
        <li>Tu perfil debe estar en modo público durante la entrega.</li>
        <li>
          Los tiempos de entrega indicados en cada plan son referenciales. La entrega es gradual y puede variar según la
          demanda.
        </li>
        <li>
          Instagram puede eliminar seguidores en sus revisiones periódicas. Si hay bajas dentro del plazo de garantía de tu
          plan, las reponemos sin costo. La garantía no cubre bajas causadas por cambios de @usuario, perfiles privados o
          cuentas suspendidas.
        </li>
        <li>
          No garantizamos resultados de alcance, interacción o ventas. Innovatech Crece es un servicio independiente, sin
          afiliación con Instagram ni Meta, y el cliente decide contratarlo conociendo que las normas de esas plataformas
          pueden cambiar.
        </li>
      </ul>

      <h2>3. Pagos</h2>
      <p>
        Aceptamos Yape, Plin y transferencia bancaria. El servicio inicia cuando confirmamos el pago con el comprobante
        enviado por WhatsApp.
      </p>

      <h2>4. Datos personales</h2>
      <p>
        El tratamiento de tus datos se rige por nuestra <Link href="/privacidad">Política de Privacidad</Link>.
      </p>

      <h2>5. Contacto y reclamos</h2>
      <p>
        Para consultas o reclamos escríbenos por WhatsApp al{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}</a>
        {site.email && <> o a <a href={`mailto:${site.email}`}>{site.email}</a></>}.
      </p>
    </LegalPage>
  );
}
