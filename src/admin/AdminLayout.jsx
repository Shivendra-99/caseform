import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Icon, SHIPROCKET_URL } from "./ui.jsx";
import { supabase } from "./db.js";
import "./admin.css";

const NAV = [
  ["Overview", "/admin", "overview"],
  ["Products", "/admin/products", "products"],
  ["iPhone models", "/admin/models", "phone"],
  ["Orders", "/admin/orders", "orders"],
];

// Admin shell: sign-in first, then a sidebar on desktop / top bar on small screens.
// Signing in only proves who you are; edits are allowed by the database only for emails in the
// `admins` table (supabase/schema.sql), so a stranger with an account still can't change anything.
export default function AdminLayout() {
  const [session, setSession] = useState(); // undefined while checking
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (session) supabase.rpc("is_admin").then(({ data }) => setIsAdmin(data === true));
  }, [session]);

  if (!supabase) return <Gate title="Admin isn't connected yet">Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (see .env.example), then reload.</Gate>;
  if (session === undefined || (session && isAdmin === undefined)) return <div className="se-root se-font adm-gate" aria-busy="true" />;
  if (!session) return <SignIn />;
  if (!isAdmin)
    return (
      <Gate title="This account can't manage the shop">
        {`${session.user.email} is signed in, but it isn't on the admin list. Add it to the admins table in Supabase, or sign in with the admin email.`}
        <button type="button" className="adm-btn" onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </Gate>
    );

  return (
    <div className="se-root se-font adm">
      <aside className="adm-side">
        <Link to="/admin" className="adm-brand" aria-label="SnapEdge admin">
          <span className="adm-logo">SE</span>
          <span className="adm-brand-text">
            SNAP EDGE
            <small>Admin</small>
          </span>
        </Link>
        <nav aria-label="Admin" className="adm-nav">
          {NAV.map(([label, to, icon]) => (
            <NavLink key={to} to={to} end={to === "/admin"}>
              <Icon name={icon} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="adm-side-foot">
          <Link to="/">
            <Icon name="store" />
            View store
          </Link>
          <a href={SHIPROCKET_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="external" />
            Shiprocket
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" onClick={() => supabase.auth.signOut()} title={session.user.email}>
            <Icon name="signout" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="adm-main">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function Gate({ title, children }) {
  return (
    <div className="se-root se-font adm-gate">
      <div className="adm-card adm-gate-card">
        <span className="adm-logo">SE</span>
        <h1>{title}</h1>
        <div className="adm-gate-body">{children}</div>
      </div>
    </div>
  );
}

function SignIn() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email: form.get("email"), password: form.get("password") });
    setBusy(false);
    if (err) setError(err.message === "Invalid login credentials" ? "That email and password don't match. Check both and try again." : err.message);
  };

  return (
    <div className="se-root se-font adm-gate">
      <form className="adm-card adm-gate-card" onSubmit={submit}>
        <span className="adm-logo">SE</span>
        <h1>Sign in to SnapEdge admin</h1>
        <label className="adm-field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="username" className="adm-input" autoFocus />
        </label>
        <label className="adm-field">
          <span>Password</span>
          <input name="password" type="password" required autoComplete="current-password" className="adm-input" aria-describedby="adm-signin-error" />
        </label>
        <p id="adm-signin-error" role={error ? "alert" : undefined} className="adm-miss">
          {error}
        </p>
        <button type="submit" className="adm-btn primary" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="adm-gate-note">First time? Create your user in Supabase › Authentication › Users › Add user, with the admin email and a password.</p>
        <Link to="/" className="adm-link">
          Back to the shop
        </Link>
      </form>
    </div>
  );
}
