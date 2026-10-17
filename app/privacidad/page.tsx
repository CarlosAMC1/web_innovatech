import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo Innovatech recopila, usa y protege tus datos personales.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="17 de octubre de 2026">
      <p>
        En {site.name} respetamos tu privacidad. Esta política explica qué datos personales recopilamos a través de este
        sitio web y de WhatsApp, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley N.° 29733, Ley
        de Protección de Datos Personales del Perú, y su reglamento.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        {site.legal.businessName || site.name}
        {site.legal.ruc && <>, RUC {site.legal.ruc}</>}
        {site.legal.address ? <>, con domicilio en {site.legal.address}</> : <>, con domicilio en {site.country}</>}. Puedes contactarnos por WhatsApp al{" "}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{site.phoneDisplay}</a>
        {site.email && <> o al correo <a href={`mailto:${site.email}`}>{site.email}</a></>}.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <ul>
        <li>Formulario de contacto y cotizador: nombre, correo electrónico, WhatsApp, empresa (opcional), detalles de tu proyecto y el mensaje que nos envías.</li>
        <li>Chat de la web: lo que escribas en el chat y los datos que compartas en la conversación.</li>
        <li>Libro de Reclamaciones: los datos que exige la normativa (nombre, documento de identidad, domicilio, teléfono, correo y el detalle del reclamo o queja).</li>
        <li>WhatsApp: tu número de teléfono, nombre de perfil y lo que nos escribas.</li>
        <li>Innovatech Crece: tu @usuario público de Instagram. Nunca pedimos contraseñas.</li>
        <li>Pagos: el comprobante (voucher) que nos envíes para confirmar tu compra.</li>
      </ul>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y enviarte cotizaciones.</li>
        <li>Prestar el servicio que contrataste y darte soporte.</li>
        <li>Confirmar pagos y cumplir obligaciones contables y tributarias.</li>
      </ul>
      <p>
        Gestionamos las consultas y conversaciones en Pacto, nuestro propio CRM. El chat de la web puede responder con un
        asistente de inteligencia artificial y derivarte a una persona de nuestro equipo. Los correos de aviso se envían
        mediante un proveedor de correo electrónico. No vendemos ni compartimos tus datos con terceros para fines
        publicitarios.
      </p>

      <h2>4. Consentimiento</h2>
      <p>
        Al enviar el formulario de contacto, marcando la casilla correspondiente, o al escribirnos por WhatsApp, aceptas
        que usemos tus datos para las finalidades indicadas.
      </p>

      <h2>5. Conservación y seguridad</h2>
      <p>
        Guardamos tus datos solo el tiempo necesario para atender tu solicitud y cumplir obligaciones legales (por ejemplo,
        los registros del Libro de Reclamaciones se conservan al menos dos años). Aplicamos
        medidas técnicas y organizativas razonables, como conexiones cifradas (HTTPS) y acceso restringido, para
        protegerlos.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) escribiéndonos por
        los medios de la sección 1. Si consideras que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional de
        Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.
      </p>

      <h2>7. Cambios a esta política</h2>
      <p>Podemos actualizar esta política. Publicaremos cualquier cambio en esta misma página.</p>
    </LegalPage>
  );
}
