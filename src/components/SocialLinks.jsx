import { SOCIAL } from "../business.js";

// Brand glyphs for the SOCIAL links in business.js, drawn in the 24px outline icon grid used site-wide.
const ICONS = {
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: <path fill="currentColor" stroke="none" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" />,
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
    </>
  ),
  WhatsApp: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z" />
      <path d="M9.2 8.6c.2-.4.6-.4.9-.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.9 2.8l.6-.6c.2-.2.4-.2.6-.1l1.4.7c0 .4-.1.8-.4 1.1-.5.5-1.4.7-2.4.3-1.8-.7-3.4-2.3-4.1-4.1-.3-.9-.1-1.8.5-2.3z" fill="currentColor" stroke="none" />
    </>
  ),
};

// Round icon links to SnapEdge's social accounts (menu drawer footer and site footer).
export default function SocialLinks() {
  return (
    <ul aria-label="SnapEdge on social media" style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", gap: "2px" }}>
      {SOCIAL.map((so) => (
        <li key={so.name}>
          <a href={so.url} target="_blank" rel="noopener noreferrer" aria-label={`SnapEdge on ${so.name} (opens in a new tab)`} className="social-link" style={{ width: "44px", height: "44px", borderRadius: "50px", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {ICONS[so.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
