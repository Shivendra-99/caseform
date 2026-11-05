import { useState } from "react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../business.js";
import SocialLinks from "./SocialLinks.jsx";

// Link columns. Every link goes somewhere real: a homepage section, the collection or a policy page.
const SHOP = [
  ["Shop all", "/collection"],
  ["MagSafe covers", "/#lineup"],
  ["Tempered glass", "/#glass"],
  ["Camera lens glass", "/#glass"],
  ["Case + glass combos", "/#bestsellers"],
];
const HELP = [
  ["Shipping", "/policies/shipping"],
  ["Returns & exchanges", "/policies/returns"],
  ["Warranty & replacement", "/policies/warranty"],
  ["Contact us", "/policies/contact"],
];
const YEAR = new Date().getFullYear();
// Shown once business.js has a real address instead of its [placeholder].
const EMAIL = BUSINESS.email.startsWith("[") ? null : BUSINESS.email;

// Site footer: brand + socials, two link columns and the newsletter in one row, legal line centred below.
export default function StoreFooter() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="se-root se-font" style={{ background: "#FFFFFF", color: "#111111", borderTop: "1px solid #EEEEEE" }}>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "56px 40px 28px", display: "flex", flexDirection: "column", gap: "40px" }}>
        <div className="foot-grid">
          <div className="foot-brand" style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
            <Link to="/" aria-label="SnapEdge home" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#000000", alignSelf: "flex-start" }}>
              <span style={{ width: "30px", height: "30px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", letterSpacing: "-0.02em" }}>SE</span>
              <span style={{ fontWeight: "800", fontSize: "15px", letterSpacing: "0.16em" }}>SNAP EDGE</span>
            </Link>
            <p style={{ margin: "0", maxWidth: "300px", fontSize: "14px", lineHeight: "1.6", color: "#555555" }}>Precision-fit iPhone covers and 9H tempered glass, designed to work as one.</p>
            <div style={{ marginLeft: "-11px" }}>
              <SocialLinks />
            </div>
          </div>

          <nav className="foot-col" aria-labelledby="foot-shop">
            <h2 id="foot-shop">Shop</h2>
            <ul>
              {SHOP.map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="foot-col" aria-labelledby="foot-help">
            <h2 id="foot-help">Customer service</h2>
            <ul>
              {HELP.map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col foot-news" style={{ minWidth: "0" }}>
            <h2 id="foot-news">Stay connected</h2>
            <p style={{ margin: "0 0 14px", fontSize: "14px", lineHeight: "1.6", color: "#555555" }}>New-model drops and combo deals, straight to your inbox.</p>
            {subscribed ? (
              <p role="status" style={{ margin: "0", fontSize: "14px", color: "#1A7F4B" }}>
                {"You're on the list. We'll email you when new models and combos land."}
              </p>
            ) : (
              <form
                aria-labelledby="foot-news"
                style={{ display: "flex", gap: "8px", maxWidth: "340px" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label htmlFor="se-nl" className="sr-only">
                  Email address
                </label>
                <input id="se-nl" type="email" required autoComplete="email" placeholder="Your email address" style={{ flex: "1 1 auto", minWidth: "0", height: "44px", padding: "0 14px", borderRadius: "10px", border: "1px solid #DDDDDD", background: "#FFFFFF", fontFamily: "inherit", fontSize: "16px", color: "#111111" }} />
                <button type="submit" aria-label="Subscribe" className="btn-solid" style={{ width: "44px", height: "44px", flexShrink: "0", border: "0", borderRadius: "10px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 3 10 14" />
                    <path d="M21 3 14.5 21l-4.5-7-7-4.5z" />
                  </svg>
                </button>
              </form>
            )}
            {EMAIL && (
              <a href={`mailto:${EMAIL}`} style={{ marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 0", fontSize: "14px", color: "#555555" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {EMAIL}
              </a>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #EEEEEE", paddingTop: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", fontSize: "13px", color: "#666666", textAlign: "center" }}>
          <span>{`© ${YEAR} SnapEdge. All rights reserved.`}</span>
          <nav className="foot-legal" aria-label="Legal" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to="/policies/privacy" style={{ color: "#666666", padding: "6px 0" }}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" style={{ color: "#CCCCCC" }}>
              |
            </span>
            <Link to="/policies/terms" style={{ color: "#666666", padding: "6px 0" }}>
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
