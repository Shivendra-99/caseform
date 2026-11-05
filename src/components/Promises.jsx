import { Link } from "react-router-dom";
import { FREE_SHIPPING, inr } from "../catalog.js";

// Shop promises. Keep each line in step with its policy page (src/policies.js).
const PROMISES = [
  {
    title: "Free shipping",
    text: `On orders over ${inr(FREE_SHIPPING)}`,
    to: "/policies/shipping",
    icon: (
      <>
        <path d="M3 6.5h11v9H3z" />
        <path d="M14 9.5h3.5l3 3v3H14z" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </>
    ),
  },
  {
    title: "7-day exchange",
    text: "Wrong model? Swap it",
    to: "/policies/returns",
    icon: (
      <>
        <path d="M4 9h13l-3.5-3.5" />
        <path d="M20 15H7l3.5 3.5" />
      </>
    ),
  },
  {
    title: "Defect warranty",
    text: "Free replacement if it fails",
    to: "/policies/warranty",
    icon: (
      <>
        <path d="M12 21s7.5-3.5 7.5-9.5V5.5L12 3 4.5 5.5v6C4.5 17.5 12 21 12 21z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </>
    ),
  },
  {
    title: "Cash on delivery",
    text: "On eligible pincodes",
    to: "/policies/shipping",
    icon: (
      <>
        <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
        <circle cx="12" cy="12" r="2.6" />
        <path d="M6 9.5v5M18 9.5v5" />
      </>
    ),
  },
];

// The four promise tiles (Home lineup, Collection): a grey shell with white tiles, the same
// language as the product cards. Each tile links to the policy page that backs it.
export default function Promises() {
  return (
    <div className="se-root se-font">
      <ul className="promises" aria-label="Our promises">
        {PROMISES.map((pr) => (
          <li key={pr.title}>
            <Link to={pr.to} className="promise">
              <span className="promise-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {pr.icon}
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#111111" }}>{pr.title}</span>
                <span style={{ fontSize: "13px", color: "#666666" }}>{pr.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
