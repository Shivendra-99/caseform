// SnapEdge logo: the SE mark beside the SNAPEDGE wordmark, with the tagline under the wordmark.
// Glyphs are traced from the brand artwork. Drawn in currentColor on a transparent background,
// so it blends with whatever it sits on. The wordmark half carries the "wordmark" class, which
// the header hides on small screens.
export const MARK_PATH =
  "M22 0H50L45 6.5H25.5Q22 6.5 22 10V11C22 13 29 14 36 14.8C42 15.6 44 18 44 21.5V27L37 34H10L14.5 27H37V22.5C35 21 31 20.3 25 19.6C19 18.8 16 16 15.5 13L15.3 11.5H8L11.5 7H15.5C15.5 3 18 0 22 0Z" +
  "M52 3H86L81.5 9H47.5Z" +
  "M55.5 15H72L67.5 20.8H56L52.3 26.3H43V23H49.7Z" +
  "M48 27H80L75.5 34H43.5Z";

const WORD_PATH =
  "M7 0H30V4.5H8V8.5H28Q32 8.5 32 12.5V18Q32 22 28 22H3V17.5H27V13H7Q3 13 3 9V4Q3 0 7 0Z" +
  "M38 0H43.5L62 15.5V0H67V22H61.5L43 6.5V22H38Z" +
  "M84 0H90L104 22H96.5L85.5 6.5L76 22H69.5ZM84 13.5H94V16H84Z" +
  "M108 0H131.5Q135 0 135 3.5V10.5Q135 14 131.5 14H111.5V22H106V10.5H129V4H108Z" +
  "M142 0H168L165.5 4H146ZM141 3L146.5 8.5H163.5L160 13H146.5V17.5H168V22H141Z" +
  "M175.5 0H198.5L202 3.5V17Q202 22 197 22H175V3.5L180 8.5V17.5H196V4H179Z" +
  "M214 0H237V4H214.5V17.5H231V13H222.5V8.5H237V22H214Q209 22 209 17V5Q209 0 214 0Z" +
  "M244 0H270L267.5 4H248ZM243 3L248.5 8.5H265.5L262 13H248.5V17.5H270V22H243Z";

export function Mark({ height = 40, style }) {
  return (
    <svg width={(height * 82) / 38} height={height} viewBox="6 -2 82 38" aria-hidden="true" style={{ display: "block", flexShrink: "0", ...style }}>
      <path d={MARK_PATH} fill="currentColor" />
    </svg>
  );
}

export default function Logo({ height = 40 }) {
  const word = height * 0.85;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: `${Math.round(height * 0.3)}px` }}>
      <Mark height={height} />
      <svg className="wordmark" width={(word * 268) / 36} height={word} viewBox="3 0 268 36" aria-hidden="true" style={{ flexShrink: "0" }}>
        <path d={WORD_PATH} fill="currentColor" />
        <path d="M3 31.2H31M243 31.2H271" stroke="currentColor" strokeWidth="1.1" />
        <text x="137" y="33.9" textAnchor="middle" textLength="198" fontFamily="'Sora', 'Helvetica Neue', Helvetica, sans-serif" fontSize="7.7" fontWeight="600" fill="currentColor">
          SNAP IT. PROTECT IT. OWN IT.
        </text>
      </svg>
    </span>
  );
}
