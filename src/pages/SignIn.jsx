import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EMPTY_OTP = ["", "", "", "", "", ""];

// Front-end only: no auth backend exists yet, so successful submits just route to the account page.
export default function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("otp");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(EMPTY_OTP);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const otpRefs = useRef([]);

  const finish = () => {
    setBusy(true);
    setTimeout(() => navigate("/account"), 600);
  };
  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setOtp((o) => o.map((x, j) => (j === i ? d : x)));
    if (d && i < 5) otpRefs.current[i + 1].focus();
  };
  const handleOtp = (e) => {
    e.preventDefault();
    if (!otpSent) {
      if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a valid 10-digit Indian mobile number.");
      setError("");
      setOtpSent(true);
    } else if (otp.join("").length < 6) {
      setError("Enter all 6 digits of the verification code.");
    } else {
      setError("");
      finish();
    }
  };
  const handleEmail = (e) => {
    e.preventDefault();
    finish();
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-space-md sm:p-space-lg bg-surface">
      <div className="flex flex-col w-full">
        <div className="mx-auto w-full max-w-6xl py-6 px-space-md sm:px-gutter-desktop">
          <div className="flex items-center justify-between pb-8">
            <Link to="/" className="flex flex-col gap-1">
              <img alt="SNAP EDGE" className="h-6 w-auto self-start" src="/logo.svg" />
              <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">
                Precision Lab
              </span>
            </Link>
            <div className="hidden sm:flex items-center space-x-4 bg-surface-container-low px-3 py-1.5 rounded-full">
              <span className="inline-block w-2 h-2 rounded-full bg-status-verified animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                AES-256 Encrypted Session
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <div className="hidden lg:flex lg:col-span-5 flex-col space-y-space-md">
              <div className="relative bg-surface-card rounded-xl overflow-hidden shadow-sm p-6 flex flex-col justify-between min-h-[580px]">
                <div className="flex items-center justify-between">
                  <span className="bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase px-2.5 py-1 rounded-full shadow-sm">
                    Ref: CF-AIR-PRO
                  </span>
                  <span className="text-outline font-label-sm text-label-sm tracking-wider">
                    OPTICAL POLYCARBONATE
                  </span>
                </div>
                <div className="relative my-auto flex items-center justify-center py-6">
                  <div className="w-full h-80 rounded-lg overflow-hidden relative shadow-md">
                    <img className="w-full h-full object-cover object-center" data-alt="Photorealistic studio shot of an ultra-thin transparent MagSafe iPhone case and Japanese tempered glass screen protector levitating gracefully on a clean warm off-white minimalist background with soft diffused architectural studio lighting, sharp optics, subtle titanium reflections, and precision geometric alignment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKh4Zq9D3Pbl4Vxysg0xPlxldx9c8pDSbCH8Oadp7w4bnN_x9bPNqyUj_JXze62Rw3jyZa-x37X6ilAWnzDhxXBLBSoOYhPXA1Bq7QazP6hoyn6DQ8-ez75S7S-x86Sa8zC9jqcf09jOaKpBQZpCUiBwCnDPV9lA0vTqSDsCE9pbv_m6_yljayIPnIkYaQQp0yOr88tN1jEEkTJVKep9YJDIT0OJpId9ImaTajvs3SvgtfecUo2QNUNw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-3 bg-surface-container-lowest p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center text-on-surface">
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Optical Clarity
                    </span>
                    <span className="font-label-md text-label-md font-semibold text-primary">
                      99.8% Bayer Polymer
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[99.8%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center space-x-1.5">
                      <span className="material-symbols-outlined text-[14px] text-status-verified">
                        verified
                      </span>
                      <span>
                        365-Day Clarity Guarantee
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        bolt
                      </span>
                      <span>
                        N52 Neodymium Array
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg flex items-center space-x-3">
                <span className="material-symbols-outlined text-outline text-[20px]">
                  local_shipping
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {"Next-day dispatch via Delhivery Express & BlueDart Air across 28,000+ pin codes."}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col space-y-space-md">
              <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-outline font-label-sm text-label-sm tracking-widest uppercase">
                    <span>
                      Client Portal
                    </span>
                    <span>
                      •
                    </span>
                    <span className="text-status-verified font-semibold">
                      Live System
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary">
                    Sign in to your CASEFORM Account
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Access your orders, saved iPhone model preferences, warranties, and priority dispatch benefits.
                  </p>
                </div>
                <div className="p-1 bg-surface-card rounded-lg grid grid-cols-2 gap-1" role="tablist">
                  {[["otp", "Instant OTP Login"], ["email", "Email & Password"]].map(([key, label]) => (
                    <button key={key} role="tab" aria-selected={mode === key} className={`py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-150 text-center ${mode === key ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-primary"}`} onClick={() => setMode(key)} type="button">
                      {label}
                    </button>
                  ))}
                </div>
                {mode === "otp" ? (
                  <form className="space-y-4" onSubmit={handleOtp}>
                    <div className="space-y-1.5">
                      <label className="block font-label-md text-label-md text-on-surface" htmlFor="mobile">
                        Mobile Number (India)
                      </label>
                      <div className="flex items-center rounded-lg bg-surface-card p-1 shadow-inner focus-within:ring-2 focus-within:ring-primary/20 transition">
                        <div className="flex items-center px-3 py-2 space-x-1.5 text-primary font-label-lg text-label-lg">
                          <span className="text-[16px]">
                            🇮🇳
                          </span>
                          <span>
                            +91
                          </span>
                        </div>
                        <div className="h-6 w-px bg-surface-variant mx-1" />
                        <input className="w-full bg-transparent px-3 py-2 text-primary font-body-lg text-body-lg placeholder:text-outline focus:outline-none" id="mobile" inputMode="numeric" autoComplete="tel-national" maxLength="10" placeholder="98765 43210" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} disabled={otpSent} />
                      </div>
                      {error ? (
                        <p className="font-body-sm text-body-sm text-status-sale flex items-center space-x-1" role="alert">
                          <span className="material-symbols-outlined text-[14px]">
                            error
                          </span>
                          <span>
                            {error}
                          </span>
                        </p>
                      ) : (
                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center space-x-1">
                          <span className="material-symbols-outlined text-[14px]">
                            sms
                          </span>
                          <span>
                            A 6-digit verification code will be sent via SMS / WhatsApp.
                          </span>
                        </p>
                      )}
                    </div>
                    {otpSent && (
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-label-md text-label-md text-on-surface">
                            Verification Code
                          </span>
                          <button className="font-label-sm text-label-sm text-secondary hover:underline" onClick={() => { setOtpSent(false); setOtp(EMPTY_OTP); }} type="button">
                            Change number
                          </button>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {otp.map((d, i) => (
                            <input key={i} ref={(el) => (otpRefs.current[i] = el)} aria-label={`Digit ${i + 1}`} className="h-12 text-center text-price-md font-price-md bg-surface-card rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" inputMode="numeric" maxLength="1" placeholder="·" type="text" value={d} onChange={(e) => setDigit(i, e.target.value)} onKeyDown={(e) => e.key === "Backspace" && !d && i > 0 && otpRefs.current[i - 1].focus()} autoFocus={i === 0} />
                          ))}
                        </div>
                      </div>
                    )}
                    <button className="w-full h-12 bg-primary hover:bg-neutral-800 active:scale-[0.99] text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center space-x-2 shadow-sm transition disabled:opacity-60" disabled={busy} type="submit">
                      <span>
                        {busy ? "Authenticating..." : otpSent ? "Verify & Access Account" : "Get One-Time Password (OTP)"}
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                ) : (
                  <form className="space-y-4" onSubmit={handleEmail}>
                    <div className="space-y-1.5">
                      <label className="block font-label-md text-label-md text-on-surface" htmlFor="email">
                        Email Address
                      </label>
                      <input className="w-full h-12 px-4 rounded-lg bg-surface-card text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition" id="email" autoComplete="email" placeholder="name@icloud.com" type="email" required />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">
                          Security Password
                        </label>
                        <a className="font-label-sm text-label-sm text-outline hover:text-primary transition underline-offset-2 hover:underline" href="#forgot">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="relative">
                        <input className="w-full h-12 px-4 rounded-lg bg-surface-card text-primary font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition" id="password" autoComplete="current-password" placeholder="••••••••••••" type={showPwd ? "text" : "password"} required />
                        <button aria-label={showPwd ? "Hide password" : "Show password"} className="absolute right-3.5 top-3 text-outline hover:text-primary" onClick={() => setShowPwd((v) => !v)} type="button">
                          <span className="material-symbols-outlined text-[20px]">
                            {showPwd ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <button className="w-full h-12 bg-primary hover:bg-neutral-800 active:scale-[0.99] text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center space-x-2 shadow-sm transition disabled:opacity-60" disabled={busy} type="submit">
                      <span>
                        {busy ? "Authenticating..." : "Sign In with Email"}
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        lock
                      </span>
                    </button>
                  </form>
                )}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow h-px bg-surface-variant" />
                  <span className="flex-shrink mx-3 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                    Or continue with Apple / Google
                  </span>
                  <div className="flex-grow h-px bg-surface-variant" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="h-12 px-4 rounded-lg bg-surface-card hover:bg-surface-container active:scale-[0.99] text-primary flex items-center justify-center space-x-2 transition font-label-lg text-label-lg" type="button">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6-9.18-10.74-19.8-14.22-31.86-3.48-12.06-5.22-23.75-5.22-35.08 0-14.9 3.84-27.18 11.53-36.85 7.69-9.67 17.2-14.58 28.53-14.74 4.58 0 9.87 1.25 15.87 3.75 6 2.5 10.23 3.8 12.69 3.91 2.01-.11 6.36-1.46 13.06-4.04 6.7-2.58 12.05-3.75 16.05-3.5 12.18.66 21.98 5.23 29.41 13.72-10.89 6.64-16.22 15.84-16 27.6.22 9.4 3.96 17.24 11.22 23.51 7.26 6.27 15.7 9.83 25.32 10.68-2.11 6.55-4.78 13.3-8.01 20.24zM119.22 33.15c0-7.36 2.65-14.3 7.95-20.82 5.3-6.52 11.96-10.84 19.98-12.96.22 1.11.33 2.17.33 3.17 0 7.25-2.83 14.33-8.49 21.24-5.66 6.91-12.37 11.08-20.13 12.51-.44-1.05-.64-2.1-.64-3.14z" />
                    </svg>
                    <span>
                      Continue with Apple
                    </span>
                  </button>
                  <button className="h-12 px-4 rounded-lg bg-surface-card hover:bg-surface-container active:scale-[0.99] text-primary flex items-center justify-center space-x-2 transition font-label-lg text-label-lg" type="button">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
                      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" fill="#34A853" />
                      <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                    </svg>
                    <span>
                      Continue with Google
                    </span>
                  </button>
                </div>
                <div className="text-center pt-2">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {"New to CASEFORM? "}
                    <a className="font-label-lg text-label-lg text-primary hover:underline ml-1" href="#register">
                      Create an Account
                    </a>
                  </p>
                </div>
              </div>
              <div className="bg-surface-card rounded-xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center space-x-2 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">
                    shield
                  </span>
                  <span>
                    Why maintain a verified CASEFORM profile?
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="bg-surface-container-lowest p-3.5 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        smartphone
                      </span>
                      <span className="font-label-md text-label-md font-semibold">
                        Device Sync
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {"Auto-filters cases, lenses & glass for your exact iPhone model with zero fitment errors."}
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-3.5 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        published_with_changes
                      </span>
                      <span className="font-label-md text-label-md font-semibold">
                        1-Click Warranty
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {"Instant replacement approvals under the 365-Day Zero Yellowing & Fracture policy."}
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-3.5 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-primary">
                      <span className="material-symbols-outlined text-[18px]">
                        receipt_long
                      </span>
                      <span className="font-label-md text-label-md font-semibold">
                        Express Logistics
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {"Direct BlueDart & Delhivery API live transit coordinates plus automated GST invoices."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-2 flex flex-col sm:flex-row items-center justify-between text-outline font-label-sm text-label-sm space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px] text-status-verified">
                    lock_outline
                  </span>
                  <span>
                    By signing in, you agree to CASEFORM Terms of Service and Privacy Policy.
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <a className="hover:text-primary transition underline-offset-2 hover:underline" href="#terms">
                    Terms
                  </a>
                  <span>
                    •
                  </span>
                  <a className="hover:text-primary transition underline-offset-2 hover:underline" href="#privacy">
                    Privacy
                  </a>
                  <span>
                    •
                  </span>
                  <a className="hover:text-primary transition underline-offset-2 hover:underline" href="#security">
                    Compliance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
