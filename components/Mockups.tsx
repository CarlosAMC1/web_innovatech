// Mockups ilustrativos en SVG con la marca Innovatech (reemplazan imágenes generadas
// que mostraban marcas ajenas). Se escalan como una imagen con object-cover, anclados arriba.
// Todos los datos son de ejemplo.

type MockupProps = { className?: string; title: string };

const C = {
  bg: "#06122e",
  panel: "#0c1d45",
  line: "#1c2f5e",
  text: "#ffffff",
  muted: "#8fa3c8",
  teal: "#00caa4",
  blue: "#00469b",
  sky: "#3b82f6",
  green: "#22c55e",
  pink: "#ec4899",
  amber: "#f59e0b",
};

function Svg({ className, title, children, bg = C.bg }: MockupProps & { children: React.ReactNode; bg?: string }) {
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMin slice"
      role="img"
      aria-label={title}
      className={className}
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      <rect width="640" height="400" fill={bg} />
      {children}
    </svg>
  );
}

function WindowBar({ label, dark = true }: { label: string; dark?: boolean }) {
  return (
    <g>
      <rect width="640" height="34" fill={dark ? "#091737" : "#f1f5f9"} />
      <circle cx="18" cy="17" r="4.5" fill="#f87171" opacity="0.8" />
      <circle cx="32" cy="17" r="4.5" fill="#fbbf24" opacity="0.8" />
      <circle cx="46" cy="17" r="4.5" fill="#4ade80" opacity="0.8" />
      <rect x="66" y="9" width="16" height="16" rx="4" fill={C.blue} stroke={C.teal} strokeWidth="1.5" />
      <rect x="72" y="15" width="4" height="7" rx="1.5" fill={C.teal} />
      <circle cx="74" cy="12.5" r="2" fill={C.teal} />
      <text x="90" y="21.5" fontSize="11" fontWeight="700" fill={dark ? C.muted : "#475569"}>{label}</text>
      <rect x="586" y="10" width="40" height="14" rx="7" fill={dark ? "#ffffff14" : "#e2e8f0"} />
      <text x="606" y="20" fontSize="8" fontWeight="800" fill={dark ? C.muted : "#64748b"} textAnchor="middle">DEMO</text>
    </g>
  );
}

/* ─── CRM multicanal ─── */
export function CrmMockup(props: MockupProps) {
  const chats = [
    { name: "María Gómez", msg: "¿Tienen delivery a Surco?", ch: C.green, tag: "W", active: true },
    { name: "Bodega Sol", msg: "Quiero cotizar 50 cajas", ch: C.pink, tag: "I" },
    { name: "Jorge Ramos", msg: "Gracias, ya pagué por Yape", ch: C.sky, tag: "M" },
    { name: "Ana Torres", msg: "¿Cuál es el horario?", ch: C.green, tag: "W" },
    { name: "Ferretería Luz", msg: "Necesito la factura", ch: C.teal, tag: "@" },
  ];
  return (
    <Svg {...props}>
      <WindowBar label="CRM · Bandeja unificada" />
      {/* Lista de chats */}
      <rect x="0" y="34" width="200" height="366" fill="#081633" />
      <rect x="12" y="46" width="176" height="24" rx="8" fill={C.panel} />
      <text x="24" y="62" fontSize="10" fill={C.muted}>Buscar conversación…</text>
      {chats.map((c, i) => (
        <g key={c.name} transform={`translate(0 ${80 + i * 58})`}>
          {c.active && <rect x="8" y="0" width="184" height="50" rx="10" fill={C.panel} stroke={C.teal} strokeOpacity="0.5" />}
          <circle cx="34" cy="25" r="14" fill={c.ch} opacity="0.18" />
          <text x="34" y="29.5" fontSize="12" fontWeight="800" fill={c.ch} textAnchor="middle">{c.tag}</text>
          <text x="56" y="21" fontSize="11.5" fontWeight="700" fill={C.text}>{c.name}</text>
          <text x="56" y="37" fontSize="9.5" fill={C.muted}>{c.msg}</text>
        </g>
      ))}
      {/* Conversación */}
      <text x="220" y="60" fontSize="13" fontWeight="800" fill={C.text}>María Gómez</text>
      <text x="220" y="75" fontSize="9" fill={C.green}>● WhatsApp · en línea</text>
      <line x1="210" x2="470" y1="88" y2="88" stroke={C.line} />
      <rect x="220" y="102" width="170" height="30" rx="12" fill={C.panel} />
      <text x="232" y="121" fontSize="10.5" fill={C.text}>Hola, ¿tienen delivery a Surco?</text>
      <rect x="276" y="142" width="184" height="44" rx="12" fill={C.blue} />
      <text x="288" y="160" fontSize="10" fill={C.text}>¡Hola María! Sí, llegamos a</text>
      <text x="288" y="175" fontSize="10" fill={C.text}>Surco en 24 h. ¿Qué producto buscas?</text>
      <rect x="220" y="196" width="150" height="30" rx="12" fill={C.panel} />
      <text x="232" y="215" fontSize="10.5" fill={C.text}>El combo familiar, porfa</text>
      <rect x="300" y="236" width="160" height="30" rx="12" fill={C.teal} />
      <text x="312" y="255" fontSize="10.5" fontWeight="700" fill="#03211b">Te paso con un asesor</text>
      <rect x="220" y="350" width="240" height="32" rx="12" fill={C.panel} />
      <text x="234" y="370" fontSize="10" fill={C.muted}>Escribe un mensaje…</text>
      <circle cx="444" cy="366" r="11" fill={C.teal} />
      {/* Métricas */}
      <rect x="480" y="34" width="160" height="366" fill="#081633" />
      <text x="494" y="62" fontSize="11" fontWeight="800" fill={C.text}>Hoy</text>
      {[
        { l: "Chats atendidos", v: "148", c: C.teal },
        { l: "Respuesta promedio", v: "1.2 min", c: C.sky },
        { l: "Resueltos por bot", v: "42%", c: C.amber },
      ].map((m, i) => (
        <g key={m.l} transform={`translate(492 ${76 + i * 70})`}>
          <rect width="136" height="58" rx="10" fill={C.panel} />
          <text x="12" y="22" fontSize="9" fill={C.muted}>{m.l}</text>
          <text x="12" y="45" fontSize="19" fontWeight="900" fill={m.c}>{m.v}</text>
        </g>
      ))}
      <text x="494" y="310" fontSize="9" fill={C.muted}>Canales</text>
      {[["WhatsApp", 62, C.green], ["Instagram", 24, C.pink], ["Messenger", 14, C.sky]].map(([n, p, c], i) => (
        <g key={n as string} transform={`translate(494 ${320 + i * 22})`}>
          <rect width="132" height="6" rx="3" fill={C.line} />
          <rect width={(132 * (p as number)) / 100} height="6" rx="3" fill={c as string} />
          <text x="0" y="17" fontSize="8.5" fill={C.muted}>{n} · {p}%</text>
        </g>
      ))}
    </Svg>
  );
}

/* ─── ERP / Intranet ─── */
export function ErpMockup(props: MockupProps) {
  const bars = [52, 61, 48, 70, 66, 78, 74, 86, 81, 92, 88, 100];
  const months = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const rows = [
    ["F001-0234", "Comercial Andina", "S/ 4,820", "Pagada", C.green],
    ["F001-0235", "Distribuidora Norte", "S/ 2,150", "Pendiente", C.amber],
    ["F001-0236", "Agro Export SAC", "S/ 9,400", "Pagada", C.green],
  ];
  return (
    <Svg {...props}>
      <WindowBar label="Intranet ERP · Resumen gerencial" />
      <rect x="0" y="34" width="120" height="366" fill="#081633" />
      {["Inicio", "Ventas", "Inventario", "Facturación", "RR.HH.", "Reportes"].map((n, i) => (
        <g key={n} transform={`translate(10 ${50 + i * 34})`}>
          {i === 0 && <rect width="100" height="26" rx="8" fill={C.blue} />}
          <rect x="10" y="9" width="8" height="8" rx="2" fill={i === 0 ? C.teal : C.muted} opacity={i === 0 ? 1 : 0.5} />
          <text x="26" y="17" fontSize="10.5" fontWeight={i === 0 ? 800 : 600} fill={i === 0 ? C.text : C.muted}>{n}</text>
        </g>
      ))}
      {/* KPIs */}
      {[
        { l: "Ventas del mes", v: "S/ 182,400", d: "+9.4%", c: C.green },
        { l: "Margen bruto", v: "31.2%", d: "+1.8 pts", c: C.green },
        { l: "Productos con stock bajo", v: "12", d: "Revisar", c: C.amber },
      ].map((k, i) => (
        <g key={k.l} transform={`translate(${136 + i * 166} 48)`}>
          <rect width="154" height="66" rx="12" fill={C.panel} />
          <text x="14" y="22" fontSize="9" fill={C.muted}>{k.l}</text>
          <text x="14" y="45" fontSize="18" fontWeight="900" fill={C.text}>{k.v}</text>
          <text x="14" y="59" fontSize="8.5" fontWeight="700" fill={k.c}>{k.d}</text>
        </g>
      ))}
      {/* Gráfico de barras */}
      <rect x="136" y="126" width="320" height="150" rx="12" fill={C.panel} />
      <text x="150" y="146" fontSize="10" fontWeight="700" fill={C.text}>Ventas por mes (S/ miles)</text>
      {bars.map((h, i) => (
        <g key={i}>
          <rect x={152 + i * 25} y={262 - h} width="15" height={h} rx="3" fill={i === 9 ? C.teal : C.sky} opacity={i === 9 ? 1 : 0.55} />
          <text x={159.5 + i * 25} y="272" fontSize="7" fill={C.muted} textAnchor="middle">{months[i]}</text>
        </g>
      ))}
      {/* Dona */}
      <rect x="468" y="126" width="154" height="150" rx="12" fill={C.panel} />
      <text x="482" y="146" fontSize="10" fontWeight="700" fill={C.text}>Ventas por canal</text>
      <g transform="translate(545 210)">
        <circle r="38" fill="none" stroke={C.line} strokeWidth="14" />
        <circle r="38" fill="none" stroke={C.teal} strokeWidth="14" strokeDasharray="131 239" transform="rotate(-90)" />
        <circle r="38" fill="none" stroke={C.sky} strokeWidth="14" strokeDasharray="72 239" strokeDashoffset="-131" transform="rotate(-90)" />
        <circle r="38" fill="none" stroke={C.amber} strokeWidth="14" strokeDasharray="36 239" strokeDashoffset="-203" transform="rotate(-90)" />
        <text y="4" fontSize="12" fontWeight="900" fill={C.text} textAnchor="middle">55%</text>
      </g>
      <text x="482" y="268" fontSize="8" fill={C.muted}>Tienda · Web · Mayorista</text>
      {/* Tabla de facturas */}
      <rect x="136" y="288" width="486" height="100" rx="12" fill={C.panel} />
      <text x="150" y="307" fontSize="10" fontWeight="700" fill={C.text}>Últimas facturas electrónicas</text>
      {rows.map(([n, c, m, s, col], i) => (
        <g key={n as string} transform={`translate(150 ${326 + i * 22})`}>
          <text fontSize="9.5" fill={C.muted}>{n}</text>
          <text x="80" fontSize="9.5" fontWeight="700" fill={C.text}>{c}</text>
          <text x="280" fontSize="9.5" fontWeight="700" fill={C.text}>{m}</text>
          <rect x="380" y="-10" width="64" height="15" rx="7.5" fill={col as string} opacity="0.18" />
          <text x="412" y="0.5" fontSize="8.5" fontWeight="800" fill={col as string} textAnchor="middle">{s}</text>
        </g>
      ))}
    </Svg>
  );
}

/* ─── Tienda virtual ─── */
export function EcommerceMockup(props: MockupProps) {
  const products = [
    { n: "Polo Básico", p: "S/ 39.90", c: "#bfdbfe" },
    { n: "Zapatillas Urban", p: "S/ 189.00", c: "#a7f3d0" },
    { n: "Mochila Ejecutiva", p: "S/ 129.90", c: "#fde68a" },
    { n: "Gorra Clásica", p: "S/ 49.90", c: "#fbcfe8" },
  ];
  return (
    <Svg {...props} bg="#f8fafc">
      <WindowBar label="tutienda.pe" dark={false} />
      <rect x="0" y="34" width="640" height="44" fill="#ffffff" />
      <text x="24" y="62" fontSize="17" fontWeight="900" fill={C.blue}>TU TIENDA</text>
      {["Novedades", "Hombre", "Mujer", "Ofertas"].map((n, i) => (
        <text key={n} x={250 + i * 74} y="61" fontSize="10.5" fontWeight="700" fill="#334155">{n}</text>
      ))}
      <circle cx="604" cy="56" r="13" fill={C.teal} />
      <text x="604" y="60" fontSize="10" fontWeight="900" fill="#fff" textAnchor="middle">2</text>
      {/* Banner */}
      <defs>
        <linearGradient id="ecoBanner" x1="0" x2="1">
          <stop offset="0" stopColor={C.blue} />
          <stop offset="1" stopColor="#091f5e" />
        </linearGradient>
        <clipPath id="ecoBannerClip">
          <rect x="20" y="90" width="600" height="110" rx="16" />
        </clipPath>
      </defs>
      <rect x="20" y="90" width="600" height="110" rx="16" fill="url(#ecoBanner)" />
      <circle cx="560" cy="145" r="70" fill={C.teal} opacity="0.15" clipPath="url(#ecoBannerClip)" />
      <text x="44" y="122" fontSize="10" fontWeight="800" fill={C.teal}>TEMPORADA DE VERANO</text>
      <text x="44" y="150" fontSize="24" fontWeight="900" fill="#fff">Hasta 30% de descuento</text>
      <rect x="44" y="164" width="104" height="26" rx="13" fill={C.teal} />
      <text x="96" y="181" fontSize="10.5" fontWeight="800" fill="#fff" textAnchor="middle">Comprar ahora</text>
      {/* Productos */}
      {products.map((p, i) => (
        <g key={p.n} transform={`translate(${20 + i * 152} 214)`}>
          <rect width="140" height="150" rx="14" fill="#fff" stroke="#e2e8f0" />
          <rect x="10" y="10" width="120" height="74" rx="10" fill={p.c} />
          <text x="12" y="104" fontSize="10.5" fontWeight="700" fill="#0f172a">{p.n}</text>
          <text x="12" y="122" fontSize="13" fontWeight="900" fill={C.blue}>{p.p}</text>
          <rect x="12" y="130" width="116" height="14" rx="7" fill="#0f172a" />
          <text x="70" y="140" fontSize="8" fontWeight="800" fill="#fff" textAnchor="middle">Agregar al carrito</text>
        </g>
      ))}
      {/* Pagos */}
      <text x="20" y="386" fontSize="9" fontWeight="700" fill="#64748b">Paga con:</text>
      {[["Yape", "#742284"], ["Plin", "#00b6d6"], ["Tarjeta", "#0f172a"], ["Transferencia", C.blue]].map(([n, c], i) => (
        <g key={n} transform={`translate(${74 + i * 82} 375)`}>
          <rect width="74" height="16" rx="8" fill={c} />
          <text x="37" y="11.5" fontSize="8.5" fontWeight="800" fill="#fff" textAnchor="middle">{n}</text>
        </g>
      ))}
    </Svg>
  );
}

/* ─── Crecimiento de un perfil (Innovatech Crece) ─── */
export function GrowthMockup(props: MockupProps) {
  const pts = [20, 24, 23, 30, 34, 33, 41, 48, 52, 61, 68, 76];
  const path = pts.map((v, i) => `${i ? "L" : "M"}${300 + i * 27},${330 - v * 2.6}`).join(" ");
  return (
    <Svg {...props}>
      <defs>
        <linearGradient id="igRing" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#ec4899" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.teal} stopOpacity="0.35" />
          <stop offset="1" stopColor={C.teal} stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="470" cy="120" r="160" fill={C.pink} opacity="0.08" />
      <circle cx="160" cy="320" r="160" fill={C.teal} opacity="0.08" />
      {/* Teléfono */}
      <rect x="40" y="30" width="200" height="340" rx="28" fill="#0b1530" stroke="#2a3b66" strokeWidth="3" />
      <rect x="110" y="40" width="60" height="8" rx="4" fill="#2a3b66" />
      <circle cx="140" cy="100" r="30" fill="none" stroke="url(#igRing)" strokeWidth="4" />
      <circle cx="140" cy="100" r="24" fill={C.blue} />
      <text x="140" y="106" fontSize="16" fontWeight="900" fill={C.teal} textAnchor="middle">CL</text>
      <text x="140" y="150" fontSize="12" fontWeight="800" fill={C.text} textAnchor="middle">@cafeteria.lima</text>
      <text x="140" y="165" fontSize="9" fill={C.muted} textAnchor="middle">Cafetería · Miraflores</text>
      {[["86", "Posts"], ["2,240", "Seguidores"], ["310", "Seguidos"]].map(([v, l], i) => (
        <g key={l} transform={`translate(${82 + i * 58} 196)`}>
          <text fontSize="13" fontWeight="900" fill={C.text} textAnchor="middle">{v}</text>
          <text y="14" fontSize="8" fill={C.muted} textAnchor="middle">{l}</text>
        </g>
      ))}
      <rect x="60" y="222" width="160" height="22" rx="8" fill={C.teal} />
      <text x="140" y="237" fontSize="9.5" fontWeight="800" fill="#03211b" textAnchor="middle">Seguir</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={60 + (i % 3) * 54}
          y={254 + Math.floor(i / 3) * 54}
          width="50"
          height="50"
          rx="6"
          fill={[C.blue, C.pink, C.teal, C.amber, C.sky, "#8b5cf6"][i]}
          opacity="0.55"
        />
      ))}
      {/* Gráfico de seguidores */}
      <rect x="280" y="70" width="330" height="280" rx="18" fill={C.panel} />
      <text x="300" y="100" fontSize="12" fontWeight="800" fill={C.text}>Seguidores</text>
      <text x="300" y="128" fontSize="26" fontWeight="900" fill={C.text}>2,240</text>
      <rect x="400" y="110" width="66" height="22" rx="11" fill={C.green} opacity="0.18" />
      <text x="433" y="125" fontSize="10.5" fontWeight="800" fill={C.green} textAnchor="middle">+1,000</text>
      {[160, 210, 260, 310].map((y) => (
        <line key={y} x1="300" x2="596" y1={y} y2={y} stroke={C.line} />
      ))}
      <path d={`${path} L597,330 L300,330 Z`} fill="url(#growthArea)" />
      <path d={path} fill="none" stroke={C.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="597" cy={330 - 76 * 2.6} r="5" fill={C.teal} stroke={C.panel} strokeWidth="2" />
      <text x="300" y="344" fontSize="8.5" fill={C.muted}>Entrega gradual · ilustración de ejemplo</text>
    </Svg>
  );
}
