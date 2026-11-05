import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RESEND_AFTER = 30; // seconds before "Resend code" unlocks
const pretty = (d) => (d.length > 5 ? `${d.slice(0, 5)} ${d.slice(5)}` : d);
// Keep digits only; a pasted "+91 98765 43210" or "098765 43210" drops its prefix.
const toMobile = (v) => {
  const d = v.replace(/\D/g, "");
  return d.length > 10 && /^(91|0)/.test(d) ? d.slice(-10) : d.slice(0, 10);
};

const help = { margin: "0", fontSize: "13px", lineHeight: "1.5" };
const cta = { width: "100%", height: "52px", border: "0", borderRadius: "50px", background: "#111111", color: "#FFFFFF", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" };

// Mobile-number sign-in: one field, a 6-digit code, done. Signing in and signing up are the same flow.
// Front-end only for now: no SMS provider is wired up, so any 6 digits are accepted.
export default function SignIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    if (!wait) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const sendCode = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setCode("");
      setError("");
      setStep("code");
      setWait(RESEND_AFTER);
    }, 600);
  };
  const submitMobile = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a valid 10-digit mobile number.");
    setError("");
    sendCode();
  };
  const verify = (c) => {
    if (c.length < 6) return setError("Enter all 6 digits of the code.");
    setError("");
    setBusy(true);
    setTimeout(() => navigate("/account"), 600);
  };
  // Typing, pasting or SMS autofill: the 6th digit signs you in, no extra tap.
  const onCode = (v) => {
    const c = v.replace(/\D/g, "").slice(0, 6);
    setCode(c);
    if (c.length === 6 && !busy) verify(c);
  };

  return (
    <main className="se-root se-font si-page">
      <header className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <Link to="/" aria-label="SnapEdge home" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#000000" }}>
          <span style={{ width: "32px", height: "32px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "13px", letterSpacing: "-0.02em" }}>SE</span>
          <span style={{ fontWeight: "800", fontSize: "15px", letterSpacing: "0.16em" }}>SNAP EDGE</span>
        </Link>
        <Link to="/" className="si-quiet" style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", fontSize: "14px", fontWeight: "500", color: "#555555" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back to shop
        </Link>
      </header>

      <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", padding: "9vh 20px 64px" }}>
        {step === "mobile" ? (
          <form key="mobile" className="si-step" onSubmit={submitMobile} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h1 style={{ margin: "0", fontSize: "28px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#111111" }}>Sign in or sign up</h1>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#666666" }}>Just your mobile number. We text you a code, no password to remember.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="si-mobile" style={{ fontSize: "14px", fontWeight: "600", color: "#111111" }}>
                Mobile number
              </label>
              <div className="si-field" data-invalid={error ? "" : undefined}>
                <span aria-hidden="true" style={{ padding: "0 12px 0 16px", borderRight: "1px solid #EAEAEA", fontSize: "16px", fontWeight: "500", color: "#111111" }}>
                  +91
                </span>
                <input id="si-mobile" type="tel" inputMode="numeric" autoComplete="tel-national" autoFocus placeholder="98765 43210" aria-invalid={error ? true : undefined} aria-describedby="si-mobile-help" value={pretty(mobile)} onChange={(e) => (setMobile(toMobile(e.target.value)), error && setError(""))} style={{ flex: "1 1 auto", minWidth: "0", height: "100%", padding: "0 14px", border: "0", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: "17px", letterSpacing: "0.02em", color: "#111111" }} />
              </div>
              <p id="si-mobile-help" role={error ? "alert" : undefined} style={{ ...help, color: error ? "#C4281C" : "#666666" }}>
                {error || "Indian numbers only. The code arrives by SMS."}
              </p>
            </div>

            <button type="submit" className="btn-solid" disabled={busy} style={cta}>
              {busy ? "Sending code…" : "Get OTP"}
            </button>

            <p style={{ ...help, fontSize: "12px", color: "#888888", textAlign: "center" }}>
              {"By continuing you agree to our "}
              <Link to="/policies/terms" className="si-quiet" style={{ color: "#555555", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Terms
              </Link>
              {" and "}
              <Link to="/policies/privacy" className="si-quiet" style={{ color: "#555555", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        ) : (
          <form
            key="code"
            className="si-step"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              verify(code);
            }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h1 style={{ margin: "0", fontSize: "28px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#111111" }}>Enter the code</h1>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#666666" }}>
                {"Sent by SMS to "}
                <strong style={{ fontWeight: "600", color: "#111111", whiteSpace: "nowrap" }}>{`+91 ${pretty(mobile)}`}</strong>
                {" · "}
                <button type="button" className="si-link" onClick={() => (setStep("mobile"), setError(""))}>
                  Change
                </button>
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {/* One real input (paste + SMS autofill friendly) drawn as six boxes. */}
              <div style={{ position: "relative" }}>
                <input id="si-code" className="si-code" type="text" inputMode="numeric" autoComplete="one-time-code" autoFocus aria-label="6-digit code" aria-invalid={error ? true : undefined} aria-describedby="si-code-help" value={code} onChange={(e) => onCode(e.target.value)} style={{ position: "absolute", inset: "0", zIndex: "1", width: "100%", height: "100%", opacity: "0", border: "0", fontSize: "16px", cursor: "text" }} />
                <div aria-hidden="true" className="si-cells" style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: "8px" }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className={`si-cell${i === Math.min(code.length, 5) ? " is-next" : ""}${error ? " is-invalid" : ""}`}>
                      {code[i] ?? ""}
                    </span>
                  ))}
                </div>
              </div>
              <p id="si-code-help" role={error ? "alert" : undefined} style={{ ...help, color: error ? "#C4281C" : "#666666" }}>
                {error || "It can take up to a minute to arrive."}
              </p>
            </div>

            <button type="submit" className="btn-solid" disabled={busy} style={cta}>
              {busy ? "Signing in…" : "Verify and continue"}
            </button>

            <p style={{ ...help, fontSize: "14px", color: "#666666", textAlign: "center" }}>
              {"Didn't get it? "}
              {wait ? (
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{`Resend in 0:${String(wait).padStart(2, "0")}`}</span>
              ) : (
                <button type="button" className="si-link" disabled={busy} onClick={sendCode}>
                  Resend code
                </button>
              )}
            </p>
          </form>
        )}

        <p style={{ ...help, marginTop: "48px", paddingTop: "20px", borderTop: "1px solid #EAEAEA", fontSize: "13px", color: "#666666", textAlign: "center" }}>
          {"Trouble signing in? "}
          <Link to="/policies/contact" className="si-quiet" style={{ color: "#111111", fontWeight: "600", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
