import { COLORS, FINISHES } from "../catalog.js";

// Product picture: the photo when there is one (`img`), else a drawing from the SnapEdge design.
// kind "case"/"combo" draws a cover in `color`, "glass" a 2-pack in `finish`, "lens" the lens glass.
// multiply blends a photo's white backdrop into the grey tile behind it.
export default function ProductArt({ kind, img, alt = "", color = COLORS[0], finish = FINISHES[0], style }) {
  const svgStyle = { width: "80%", height: "80%", display: "block", ...style };
  if (img) return <img src={img} alt={alt} loading="lazy" style={{ ...svgStyle, width: "88%", height: "88%", objectFit: "contain", mixBlendMode: "multiply" }} />;
  if (kind === "lens")
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true" style={svgStyle}>
        <rect x="22" y="22" width="56" height="56" rx="16" fill="#E4EBEF" stroke="#222222" strokeWidth="1.2" />
        <g fill="#111111" stroke="#222222" strokeWidth="1">
          <circle cx="38" cy="38" r="9" />
          <circle cx="38" cy="62" r="9" />
          <circle cx="62" cy="50" r="9" />
        </g>
        <g fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1">
          <circle cx="38" cy="38" r="5" />
          <circle cx="38" cy="62" r="5" />
          <circle cx="62" cy="50" r="5" />
        </g>
      </svg>
    );
  if (kind === "glass")
    return (
      <svg viewBox="0 0 320 320" aria-hidden="true" style={svgStyle}>
        <ellipse cx="172" cy="296" rx="70" ry="6" fill="#000000" fillOpacity="0.07" />
        <rect x="94" y="30" width="112" height="240" rx="21" fill={finish.fill} stroke={finish.edge} strokeWidth="1.2" />
        <rect x="98" y="34" width="104" height="232" rx="17" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeOpacity="0.85" />
        <rect x="116" y="46" width="112" height="240" rx="21" fill={finish.fill} stroke={finish.edge} strokeWidth="1.2" />
        <rect x="120" y="50" width="104" height="232" rx="17" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeOpacity="0.85" />
        <rect x="160" y="58" width="24" height="4" rx="2" fill="#1A1A1A" fillOpacity="0.5" />
        <polygon points="124,210 196,58 214,58 142,210" fill="#FFFFFF" fillOpacity={finish.glare} />
        <polygon points="148,210 216,66 220,66 152,210" fill="#FFFFFF" fillOpacity={finish.glare} />
        <text x="172" y="268" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="2" fill={finish.text}>
          9H · 2-PACK
        </text>
      </svg>
    );
  const c = color;
  return (
    <svg viewBox="0 0 320 320" aria-hidden="true" style={svgStyle}>
      <ellipse cx="160" cy="294" rx="64" ry="6" fill="#000000" fillOpacity="0.08" />
      <rect x="106" y="38" width="108" height="236" rx="20" fill="#D6D2CA" stroke="#B4AFA5" strokeWidth="1" />
      <rect x="100" y="32" width="120" height="248" rx="24" fill={c.body} stroke={c.edge} strokeWidth="1.5" />
      <rect x="104" y="36" width="112" height="240" rx="20.5" fill="none" stroke={c.hl} strokeWidth="1" />
      <g fill="none" stroke={c.edge} strokeWidth="3" strokeLinecap="round">
        <path d="M100.8 62 V56 A23.2 23.2 0 0 1 124 32.8 H130" />
        <path d="M190 32.8 H196 A23.2 23.2 0 0 1 219.2 56 V62" />
        <path d="M219.2 250 V256 A23.2 23.2 0 0 1 196 279.2 H190" />
        <path d="M130 279.2 H124 A23.2 23.2 0 0 1 100.8 256 V250" />
      </g>
      <rect x="110" y="42" width="58" height="58" rx="15" fill="#0D0D0D" stroke={c.edge} strokeWidth="1.5" />
      <g fill="#1E1E1E" stroke="#3C3C3C" strokeWidth="1.5">
        <circle cx="125" cy="57" r="9.5" />
        <circle cx="125" cy="85" r="9.5" />
        <circle cx="153" cy="71" r="9.5" />
      </g>
      <g fill="#050505">
        <circle cx="125" cy="57" r="4.5" />
        <circle cx="125" cy="85" r="4.5" />
        <circle cx="153" cy="71" r="4.5" />
      </g>
      <circle cx="153" cy="51" r="3" fill="#E9E4D6" />
      <circle cx="153" cy="91" r="2.6" fill="#2A2A2A" />
      <circle cx="160" cy="170" r="34" fill="none" stroke={c.ring} strokeWidth="3" />
      <rect x="158" y="210" width="4" height="14" rx="2" fill={c.ring} />
      <rect x="97" y="96" width="3" height="30" rx="1.5" fill={c.edge} />
      <rect x="97" y="150" width="3" height="22" rx="1.5" fill={c.edge} />
      <rect x="220" y="84" width="3" height="16" rx="1.5" fill={c.edge} />
      <rect x="220" y="108" width="3" height="26" rx="1.5" fill={c.edge} />
      <text x="160" y="258" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="2.5" fill={c.ring}>
        SNAP EDGE
      </text>
    </svg>
  );
}
