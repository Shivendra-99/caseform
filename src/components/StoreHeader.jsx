import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store.jsx";
import { lockScroll } from "../motion/smoothScroll.js";
import { closeWithExit, cancelExit, useDragDismiss } from "../motion/sheet.js";
import ModelPicker from "./ModelPicker.jsx";
import SocialLinks from "./SocialLinks.jsx";
import Logo from "./Logo.jsx";

// Primary nav; links point at homepage sections. `active` marks the link for the current page.
const NAV = [
  { label: "Select iPhone Model", to: "/collection", caret: true },
  { label: "Best Sellers", to: "/#bestsellers", active: "/product" },
  { label: "MagSafe Covers", to: "/collection?f=magsafe" },
];

// Menu drawer links (below 1360px). The "Your iPhone" row above them opens the model sub-view.
const MENU = [
  { label: "Home", to: "/" },
  { label: "Shop all", to: "/collection" },
  { label: "Best Sellers", to: "/#bestsellers" },
  { label: "MagSafe Covers", to: "/collection?f=magsafe" },
];
const roundBtn = { width: "56px", height: "56px", border: "1px solid #E6E6E6", borderRadius: "50px", background: "#FFFFFF", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: "0" };

const iconBtn = { width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50px", color: "#222222" };
const underline = { textDecoration: "underline", textUnderlineOffset: "7px", textDecorationThickness: "1.5px" };

export default function StoreHeader() {
  const { count, devices, setDevices } = useStore();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawer = useRef(null);
  const menuBtn = useRef(null);
  const header = useRef(null);
  const [view, setView] = useState("main"); // "main" | "models"
  // Every way out (X, backdrop, Esc, a link, a swipe) starts here; the drawer slides back out the
  // way it came, and once it's really closed (onClose → closed) focus goes back to the menu button.
  const close = () => setMenuOpen(false);
  const closed = () => {
    setMenuOpen(false);
    setView("main");
    menuBtn.current?.focus();
  };

  // The drawer is a native modal <dialog>: focus stays inside, Esc closes it, the page behind is
  // inert. The page behind stops scrolling.
  useEffect(() => {
    const d = drawer.current;
    if (menuOpen) {
      cancelExit(d); // reopened while it was still sliding out: just come back
      if (!d.open) d.showModal();
    } else closeWithExit(d);
    lockScroll(menuOpen);
    return () => lockScroll(false);
  }, [menuOpen]);

  // Swipe the drawer back to the left to dismiss it (touch only; it slides in from the left).
  useDragDismiss(drawer, { axis: "x", dir: -1, touchOnly: true, onDismiss: () => drawer.current?.close() });

  // The header is a translucent layer; its hairline only appears once content scrolls beneath it.
  useEffect(() => {
    const onScroll = () => header.current?.toggleAttribute("data-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bump the bag badge when something is added (not on page load), so the cause is obvious.
  const [bump, setBump] = useState(0);
  const lastCount = useRef(count);
  useEffect(() => {
    if (count > lastCount.current) setBump((b) => b + 1);
    lastCount.current = count;
  }, [count]);

  return (
    <>
      {/* PROMO BAR */}
      <div className="se-root se-font" style={{ background: "#000000", color: "#FFFFFF", fontSize: "13px", letterSpacing: "0.02em" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "10px 40px", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px 14px", flexWrap: "wrap", textAlign: "center" }}>
          <span style={{ fontWeight: "600" }}>Covers for iPhone 17 Pro & iPhone 18 Pro</span>
          <span className="promo-x" aria-hidden="true" style={{ color: "#666666" }}>
            |
          </span>
          <span style={{ fontWeight: "400" }}>Free Shipping ₹499+</span>
        </div>
      </div>

      {/* STICKY HEADER */}
      <header ref={header} className="se-root se-font se-header" style={{ position: "sticky", top: "0", zIndex: "30" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "0 40px", height: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <Link to="/" aria-label="SnapEdge home" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#000000", flexShrink: "0" }}>
            <Logo height={38} />
          </Link>
          <nav className="nav" aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>
            {NAV.map((n) => (
              <Link
                key={n.label}
                className="nav-a"
                to={n.to}
                aria-current={n.active === pathname ? "page" : undefined}
                style={{ display: "flex", alignItems: "center", gap: "6px", height: "44px", color: n.caret ? "#000000" : undefined, ...(n.active === pathname ? underline : null) }}
              >
                {n.label}
                {n.caret && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: "0" }}>
            <div className="search" style={{ display: "flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 16px", marginRight: "8px", borderRadius: "50px", background: "rgba(118, 118, 128, 0.1)", border: "1px solid rgba(0, 0, 0, 0.04)", color: "#666666" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <label htmlFor="se-q" className="sr">
                Search
              </label>
              <input id="se-q" type="search" placeholder="Search covers…" style={{ border: "0", background: "transparent", outline: "none", fontFamily: "inherit", fontSize: "13px", width: "124px", color: "#222222" }} />
            </div>
            <Link to="/signin" aria-label="Account" className="icon-btn" style={iconBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
            </Link>
            <Link to="/account" aria-label="Wishlist" className="icon-btn" style={iconBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20s-7-4.4-9-9.2C1.8 7.6 4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.2 0 5.4 3.1 4.2 6.3C19 15.6 12 20 12 20z" />
              </svg>
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`} className="icon-btn" style={{ ...iconBtn, position: "relative" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8h14l-1 12H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span key={bump} className={bump ? "cart-badge bump" : "cart-badge"} style={{ position: "absolute", top: "4px", right: "1px", minWidth: "18px", height: "18px", padding: "0 5px", borderRadius: "50px", background: "#EB0000", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", lineHeight: "18px", textAlign: "center" }}>
                  {count}
                </span>
              )}
            </Link>
            <button ref={menuBtn} type="button" className="menu-btn" aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="se-menu" onClick={() => setMenuOpen(true)} style={{ width: "44px", height: "44px", alignItems: "center", justifyContent: "center", border: "0", borderRadius: "50px", background: "transparent", color: "#222222", cursor: "pointer" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Below 1360px the nav moves into this drawer. Clicks on the dimmed backdrop land on the
          <dialog> itself (the panel content fills it), so those close the drawer. */}
      <dialog ref={drawer} id="se-menu" aria-label="Menu" className="se-root menu-drawer" data-lenis-prevent onClose={closed} onCancel={(e) => (view === "models" || e.cancelable) && (e.preventDefault(), view === "models" ? setView("main") : close())} onClick={(e) => e.target === e.currentTarget && close()}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: view === "main" ? "flex-end" : "space-between", gap: "12px", padding: "28px 28px 0" }}>
            {view === "models" && (
              <button type="button" onClick={() => setView("main")} className="menu-back" style={{ height: "48px", padding: "0 6px", border: "0", background: "transparent", color: "#111111", display: "flex", alignItems: "center", gap: "8px", fontFamily: "inherit", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
                Menu
              </button>
            )}
            <button type="button" aria-label="Close menu" onClick={close} style={roundBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {view === "main" ? (
            <nav aria-label="Menu" style={{ flex: "1 1 auto", overflowY: "auto", padding: "56px 32px 32px" }}>
              <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
                <li className="menu-link" style={{ "--i": 0 }}>
                  <button type="button" onClick={() => setView("models")} className="menu-row" style={{ width: "100%", border: "0", background: "transparent", textAlign: "left", cursor: "pointer" }}>
                    <span>Your iPhone</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0" }}>
                      <span className="menu-value">{devices.length > 1 ? `${devices.length} models` : devices[0] ?? "All models"}</span>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: "0" }}>
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </li>
                {MENU.map((m, i) => (
                  <li key={m.label} className="menu-link" style={{ "--i": i + 1 }}>
                    <Link to={m.to} onClick={close} className="menu-row">
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <div style={{ flex: "1 1 auto", overflowY: "auto", padding: "32px 22px 24px" }}>
              <h2 id="menu-model-h" style={{ margin: "0 10px 6px", fontFamily: "'Geist', 'Sora', system-ui, sans-serif", fontSize: "30px", fontWeight: "600", letterSpacing: "-0.02em", color: "#111111" }}>
                Your iPhone
              </h2>
              <p style={{ margin: "0 10px 16px", fontSize: "14px", color: "#666666" }}>Tick every model you're buying for.</p>
              <ModelPicker inline value={devices} onChange={setDevices} labelledBy="menu-model-h" onDone={() => setView("main")} />
            </div>
          )}

          <div style={{ padding: "22px 28px", background: "#F6F6F6", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <Link to="/signin" onClick={close} className="btn-solid" style={{ height: "52px", padding: "0 22px", borderRadius: "50px", background: "#111111", color: "#FFFFFF", display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "15px", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
              My account
            </Link>
            <SocialLinks />
          </div>
        </div>
      </dialog>
    </>
  );
}
