import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useStore } from "../store.jsx";

const btn = { marginTop: "8px", height: "48px", padding: "0 24px", borderRadius: "50px", background: "#000000", color: "#FFFFFF", display: "inline-flex", alignItems: "center", fontWeight: "700", fontSize: "14px" };
const link = { textDecoration: "underline", textUnderlineOffset: "3px" };

// Shiprocket Checkout's redirect_url: it returns the shopper here with ?oid=<order id>&ost=<status>.
export default function OrderConfirmed() {
  const [params] = useSearchParams();
  const orderId = params.get("oid");
  const placed = params.get("ost") === "SUCCESS";
  const { clearCart } = useStore();

  // Only empty the bag when the order actually went through.
  useEffect(() => {
    if (placed) clearCart();
  }, [placed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "96px 40px 120px", display: "grid", gridTemplateColumns: "minmax(0, 760px)", justifyItems: "start", gap: "20px" }}>
        {placed ? (
          <>
            <span aria-hidden="true" style={{ width: "56px", height: "56px", borderRadius: "50px", background: "#000000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h1 style={{ margin: "0", fontSize: "40px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.025em", color: "#222222" }}>Thanks, your order is placed.</h1>
            {orderId && <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: "13px", letterSpacing: "0.08em", color: "#666666" }}>ORDER {orderId}</span>}
            <p style={{ margin: "0", color: "#444444", maxWidth: "560px" }}>
              You'll get a confirmation by SMS and email, then a tracking link once it ships. Questions about your order? See our{" "}
              <Link to="/policies/contact" style={link}>
                contact page
              </Link>
              .
            </p>
            <Link className="btn-solid" to="/" style={btn}>
              Continue shopping
            </Link>
          </>
        ) : (
          <>
            <h1 style={{ margin: "0", fontSize: "40px", lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.025em", color: "#222222" }}>Your order wasn't completed.</h1>
            <p style={{ margin: "0", color: "#444444", maxWidth: "560px" }}>
              Your bag is still saved, so you can try again. If money was deducted for this attempt, it is usually refunded automatically within a few days; otherwise{" "}
              <Link to="/policies/contact" style={link}>
                contact us
              </Link>
              {orderId ? ` with reference ${orderId}.` : "."}
            </p>
            <Link className="btn-solid" to="/cart" style={btn}>
              Back to bag
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
