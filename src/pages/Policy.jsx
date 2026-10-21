import { Link, useParams } from "react-router-dom";
import { POLICIES, POLICIES_UPDATED } from "../policies.js";

const mono = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666666" };

// /policies/:slug: shipping, returns, warranty, privacy, terms, contact.
export default function Policy() {
  const { slug } = useParams();
  const policy = POLICIES[slug];

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "56px 40px 96px", display: "grid", gridTemplateColumns: "minmax(0, 760px)", gap: "32px" }}>
        {policy ? (
          <>
            <nav aria-label="Breadcrumb" style={mono}>
              <Link to="/" style={{ color: "#666666" }}>
                Home
              </Link>
              {" / "}
              {policy.title}
            </nav>
            <header style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h1 style={{ margin: "0", fontSize: "40px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.025em", color: "#222222" }}>{policy.title}</h1>
              {slug !== "contact" && <span style={mono}>Last updated {POLICIES_UPDATED}</span>}
            </header>
            {policy.sections.map(([heading, paras]) => (
              <section key={heading} style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid #EEEEEE", paddingTop: "24px" }}>
                <h2 style={{ margin: "0", fontSize: "20px", fontWeight: "700", color: "#222222" }}>{heading}</h2>
                {paras.map((p) => (
                  <p key={p} style={{ margin: "0", color: "#444444" }}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <nav aria-label="Other policies" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", borderTop: "1px solid #EEEEEE", paddingTop: "24px", fontSize: "14px" }}>
              {Object.entries(POLICIES)
                .filter(([s]) => s !== slug)
                .map(([s, p]) => (
                  <Link key={s} to={`/policies/${s}`} style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    {p.title}
                  </Link>
                ))}
            </nav>
          </>
        ) : (
          <>
            <h1 style={{ margin: "0", fontSize: "40px", fontWeight: "800", color: "#222222" }}>Page not found</h1>
            <Link to="/" style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Back to the store
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
