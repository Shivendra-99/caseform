import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store.jsx";
import { MODELS } from "../catalog.js";

// Model links set the shopper's model (index into MODELS) and jump to Best Sellers.
const MODEL_COLUMNS = [
  ["iPhone 16 Series", [["iPhone 16 Pro Max", 0], ["iPhone 16 Pro", 1], ["iPhone 16 Plus", 2], ["iPhone 16", 2]]],
  ["iPhone 15 Series", [["iPhone 15 Pro Max", 3], ["iPhone 15 Pro", 3], ["iPhone 15 Plus", 3], ["iPhone 15", 3]]],
  ["iPhone 14 & 13", [["iPhone 14 Pro Max", 4], ["iPhone 14 Pro", 4], ["iPhone 14 / 14 Plus", 4], ["iPhone 13 Series", 5]]],
];
// [label, policy page] (null: no page yet)
const GUARANTEES = [["Warranty & Replacement", "warranty"], ["Drop Protection Standards", null], ["Bubble-Free Install Promise", null], ["Returns & Exchanges", "returns"], ["Shipping Policy", "shipping"]];
const PAYMENTS = ["UPI", "Visa", "Mastercard", "RuPay", "Net Banking", "Cash on Delivery"];

const colHeading = { margin: "0 0 6px", fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "#222222" };
const colNav = { gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" };

export default function StoreFooter() {
  const { setDevices } = useStore();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="se-root se-font" style={{ background: "#F5F5F5", color: "#222222" }}>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "80px 40px 32px", display: "flex", flexDirection: "column", gap: "56px" }}>
        <div className="g12" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", columnGap: "24px", rowGap: "40px" }}>
          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <Link to="/" aria-label="SnapEdge home" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#000000" }}>
              <span style={{ width: "36px", height: "36px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px", letterSpacing: "-0.02em" }}>SE</span>
              <span style={{ fontWeight: "800", fontSize: "17px", letterSpacing: "0.16em" }}>SNAP EDGE</span>
            </Link>
            <p style={{ margin: "0", color: "#666666", maxWidth: "340px", fontSize: "15px" }}>Precision-fit iPhone covers and 9H tempered glass, designed to work as one.</p>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "420px" }}
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="se-nl" style={{ fontSize: "14px", fontWeight: "700", color: "#222222" }}>
                {"Get new-model drops & combo deals"}
              </label>
              {subscribed ? (
                <p role="status" style={{ margin: "0", fontSize: "14px", color: "#222222" }}>
                  You're on the list. We'll email you when new models and combos drop.
                </p>
              ) : (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <input id="se-nl" type="email" required autoComplete="email" placeholder="you@example.com" style={{ flex: "1 1 200px", minWidth: "0", height: "48px", padding: "0 20px", borderRadius: "50px", border: "1px solid #DDDDDD", background: "#FFFFFF", fontFamily: "inherit", fontSize: "14px", color: "#222222" }} />
                  <button type="submit" className="btn-solid" style={{ height: "48px", padding: "0 24px", border: "0", borderRadius: "50px", background: "#000000", color: "#FFFFFF", fontFamily: "inherit", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>
          {MODEL_COLUMNS.map(([title, links]) => (
            <nav key={title} className="fcol foot" aria-label={title} style={colNav}>
              <h3 style={colHeading}>{title}</h3>
              {links.map(([label, mi]) => (
                <Link key={label} to="/#bestsellers" onClick={() => setDevices([MODELS[mi]])}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
          <nav className="fcol foot" aria-label="Protection Guarantees" style={colNav}>
            <h3 style={colHeading}>Protection Guarantees</h3>
            {GUARANTEES.map(([label, slug]) =>
              slug ? (
                <Link key={label} to={`/policies/${slug}`}>
                  {label}
                </Link>
              ) : (
                <a key={label} href="#">
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
        <div style={{ borderTop: "1px solid #E2E2E2", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#666666" }}>
          <span>© 2026 SnapEdge. All rights reserved.</span>
          <ul aria-label="Accepted payment methods" style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {PAYMENTS.map((p) => (
              <li key={p} style={{ height: "30px", padding: "0 12px", background: "#FFFFFF", border: "1px solid #E2E2E2", display: "flex", alignItems: "center", fontSize: "12px", fontWeight: "700", color: "#222222" }}>
                {p}
              </li>
            ))}
          </ul>
          <div className="foot" style={{ display: "flex", gap: "20px" }}>
            <Link to="/policies/privacy">Privacy</Link>
            <Link to="/policies/terms">Terms</Link>
            <Link to="/policies/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
