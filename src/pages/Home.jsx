import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore, PRODUCTS, inr, FREE_SHIPPING } from "../store.jsx";
import DeviceModal, { SERIES } from "../components/DeviceModal.jsx";
import ExplodedStack from "../components/ExplodedStack.jsx";
import StackRule from "../components/StackRule.jsx";

const FAQS = [
  ["How do I choose the exact iPhone model?", <>{"You can verify your exact model in your iPhone settings: go to "}<strong>{"Settings > General > About > Model Name"}</strong>. Once identified, select your specific model from the "Find Your iPhone" selector bar above to display exclusively compatible cases and tempered glass.</>],
  ["Will CASEFORM cases push up or lift my tempered glass?", "No. All CASEFORM tempered glasses are cut with a calibrated 0.4mm perimeter offset specifically designed to accommodate our cases and all official Apple cases without edge-lifting or bubble formation."],
  ["Are your cases compatible with Apple MagSafe chargers and battery packs?", "Yes. Our cases integrate custom-engineered N52 grade neodymium magnet rings delivering up to 1,200g of magnetic holding force. They support full 15W MagSafe wireless charging, car mounts, and magnetic leather wallets."],
  ["How can I check delivery time to my pincode?", "We partner with Bluedart, Delhivery, and Xpressbees for express air dispatches from our Bengaluru and Mumbai hubs. Tier 1 metros receive delivery in 24 to 48 hours; all other Indian pincodes typically take 2-4 business days."],
  ["What is your return and exchange policy?", "We offer a 7-day hassle-free replacement window for fitting discrepancies or transit damages. Furthermore, our clear cases carry a 1-year direct replacement warranty against material yellowing."],
];

export default function Home() {
  const { device, setDevice, addToCart } = useStore();
  const [series, setSeries] = useState("17");
  const [openFaq, setOpenFaq] = useState(null);
  const [drawerItem, setDrawerItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const quickAdd = (id) => {
    addToCart(id);
    setDrawerItem(id);
  };

  return (
    <main className="w-full pt-[106px] bg-canvas-bg min-h-screen">
      <div className="flex flex-col w-full">
        <section className="relative w-full bg-gradient-to-b from-surface-card via-canvas-bg to-canvas-bg overflow-hidden pt-space-md pb-space-xl" id="hero-section">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
              <div className="lg:col-span-6 space-y-space-md z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card shadow-sm border border-surface-border">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest font-semibold">
                    2025 FLAGSHIP ARCHITECTURE • ZERO TOLERANCE CAD FIT
                  </span>
                </div>
                <h1 data-split className="font-display text-display text-primary tracking-tight font-semibold leading-[1.08]">
                  Protection,
                  <br />
                  <span className="text-on-surface-variant">
                    Engineered to Disappear.
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  Aerospace-grade clear polymers and Japanese 9H optical glass calibrated for iPhone 17 Pro.
                </p>
                <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                  <a className="h-12 px-space-lg bg-primary text-on-primary hover:bg-neutral-800 font-label-lg text-label-lg rounded-xl font-medium inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px]" href="#bestsellers">
                    <span>
                      Shop iPhone 17 Pro Series
                    </span>
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </a>
                  <a className="h-12 px-space-lg bg-canvas-bg text-primary hover:bg-surface-card font-label-lg text-label-lg rounded-xl font-medium inline-flex items-center justify-center gap-2 shadow-sm transition-all border border-surface-border" href="#screen-protection">
                    <span>
                      Explore 9H Screen Armor
                    </span>
                  </a>
                </div>
                <div className="pt-space-md flex flex-wrap items-center gap-y-2 gap-x-6 text-on-surface-variant font-label-sm text-label-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-status-verified text-[16px]">
                      verified
                    </span>
                    <span>
                      Zero-Yellowing UV Shield
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      offline_bolt
                    </span>
                    <span>
                      Qi2 15W MagSafe Certified
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      straighten
                    </span>
                    <span>
                      Sub-0.05mm CNC Bezel
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-on-surface text-[16px]">
                      local_shipping
                    </span>
                    <span>
                      Free Air Express across India
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 relative flex items-center justify-center">
                <div className="absolute w-[440px] h-[440px] rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-0" />
                <div className="relative w-full aspect-[4/3] max-w-[620px] rounded-2xl overflow-hidden flex items-center justify-center p-space-sm">
                  <img alt="Cinematic luxury studio showcase of Apple iPhone 17 Pro encased in an ultra-clear AeroShield MagSafe case with raw titanium accents, precision camera ring, floating weightlessly alongside an exploded optical stack of 9H tempered glass screen protector with anti-reflective coating, soft studio rim lighting, subtle volumetric glow, clean warm-gray minimalist Apple-grade background, hyper-detailed, 8k resolution, elegant tech product render" className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)] transition-transform duration-700 hover:scale-[1.02]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1loGa2fHqv_MsxTQfbD0w2MyoLVcEBlhxU3i5Oc8tY8GNqx-yh7gq66vCt6WZuW0iTwuATu3M1oEGW3Grb_0LztA8xzvXL5wDruYRjt6iTdVoSz3TXBAonG39Xcjbt2Y39ebGzy8wi19hqMpxXSq90W1OTAapt2a7-6qFRPNvt-QyFuPGLLhchT0xvwf7gnzJg07HqRGnnr2szDT58_bCXPAztBwD8Xrv_OawsMSqomNSh-pZbJo9nA" />
                  <div className="absolute top-8 right-4 md:right-8 bg-canvas-bg/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-md border border-surface-border flex items-center gap-2.5 pointer-events-auto">
                    <div className="w-7 h-7 rounded-lg bg-surface-card flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">
                        radio_button_checked
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        N52 Neodymium Magnetic Array
                      </p>
                      <p className="font-label-md text-label-md font-semibold text-primary">
                        1.4kg Clamping Force
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 inset-x-4 md:inset-x-6 flex flex-wrap items-end justify-between gap-2 pointer-events-none">
                  <div className="bg-canvas-bg/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-md border border-surface-border flex items-center gap-2.5 pointer-events-auto">
                    <div className="w-7 h-7 rounded-lg bg-surface-card flex items-center justify-center text-status-verified">
                      <span className="material-symbols-outlined text-[18px]">
                        shield
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        Asahi AGC 9H Glass
                      </p>
                      <p className="font-label-md text-label-md font-semibold text-primary">
                        {"99.8% Optical Purity & Anti-Reflection"}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto hidden sm:flex bg-canvas-bg/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-surface-border items-center gap-2 pointer-events-auto">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <div className="text-left">
                      <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                        True 1:1 Precision Mold
                      </p>
                      <p className="font-label-sm text-label-sm font-semibold text-primary">
                        Camera Control Dedicated Bezel
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ExplodedStack />
        <section className="w-full py-space-xl bg-surface-card">
          <StackRule />
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
              <div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold mb-1">
                  Compatibility Guaranteed
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                  Find Your iPhone
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Guaranteed tailored fit. Select your series to display compatible protection.
                </p>
              </div>
              <div className="flex items-center gap-space-sm">
                <div className="bg-canvas-bg px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-verified" />
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Browsing as:
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-primary">
                    {device}
                  </span>
                </div>
                <button className="h-10 px-3.5 bg-canvas-bg hover:bg-neutral-100 text-primary font-label-sm text-label-sm rounded-xl font-medium shadow-sm transition-colors flex items-center gap-1.5" onClick={() => setModalOpen(true)} type="button">
                  <span>
                    All Models
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    tune
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-space-md no-scrollbar">
              {Object.keys(SERIES).map((s) => (
                <button key={s} className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all shadow-sm ${s === series ? "font-semibold bg-primary text-on-primary" : "font-medium bg-canvas-bg text-on-surface-variant hover:text-primary"}`} onClick={() => setSeries(s)} type="button">
                  iPhone {s} Series
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {SERIES[series].map(([name, count]) => {
                const active = name === device;
                return (
                  <div key={name} className={`group cursor-pointer bg-canvas-bg p-space-md rounded-2xl transition-all relative flex flex-col justify-between ${active ? "shadow-md ring-2 ring-secondary" : "shadow-sm hover:shadow-md"}`} onClick={() => setDevice(name)}>
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? "bg-primary text-on-primary" : "bg-surface-card text-primary group-hover:bg-primary group-hover:text-on-primary"}`}>
                        <span className="material-symbols-outlined text-[22px]">
                          smartphone
                        </span>
                      </div>
                      <span className={`transition-opacity w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[11px] ${active ? "" : "opacity-0"}`}>
                        ✓
                      </span>
                    </div>
                    <div className="mt-space-lg">
                      {active && (
                        <div className="inline-flex items-center gap-1 font-label-sm text-[10px] uppercase font-bold text-secondary mb-1">
                          Active Choice
                        </div>
                      )}
                      <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                        {name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        {count} {"Cases & Glass Available"}
                      </p>
                    </div>
                    <Link to="/collection" className="mt-space-sm pt-space-xs flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                      <span>
                        {active ? `Filtered for ${name.replace("iPhone ", "")}` : "View Catalog"}
                      </span>
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-canvas-bg">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
              <div className="group relative rounded-2xl overflow-hidden bg-surface-card p-space-lg md:p-space-xl flex flex-col justify-between min-h-[420px] shadow-sm transition-all hover:shadow-md">
                <div className="z-10 max-w-md space-y-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Architectural Shells
                  </span>
                  <h3 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight leading-snug">
                    Cases That Look as Good as They Protect
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant pt-1 leading-relaxed">
                    From crystal-clear MagSafe shells to tactical shockproof armor. Engineered for zero bulk and pure titanium resonance.
                  </p>
                  <div className="pt-space-md">
                    <a className="inline-flex items-center gap-2 font-label-lg text-label-lg font-semibold text-primary group-hover:text-secondary transition-colors" href="#bestsellers">
                      <span>
                        Explore Cases
                      </span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
                <div className="z-10 mt-space-lg flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Finishes:
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    Natural Titanium
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    Clear Frost
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    Deep Obsidian
                  </span>
                </div>
                <div className="absolute -right-8 -bottom-10 w-72 h-72 md:w-80 md:h-80 pointer-events-none opacity-90 transition-transform duration-500 group-hover:scale-105">
                  <img className="w-full h-full object-contain" data-alt="Photorealistic studio rendering of an ultra-slim frosted clear iPhone 17 Pro phone case resting diagonally on a minimalist grey pedestal with soft directional studio light, subtle titanium rim highlights, sharp minimalist luxury product presentation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxbI7Lab0aWHPJbxL5RBTr60mtzZAx7S8XeqKKqkgaikl0TstGeB0mgmaxkc9S_zCtHI1SueO3KSeNShSka39z9g99iaVynuyPH4RR60mJtouGKtjekauYVDdA4TsWeLTxyLqxzhw36-M4bCCzzKDtPZ4kucIaNaSW7gOW_AsnYwHsjReIP_NnLc0vXfznAuiHVrcrnjtoBwkh-ZdcOXfkwojqXVXKwvpYl6N82jh6SPjUe-fWc-hvBA" />
                </div>
              </div>
              <div className="group relative rounded-2xl overflow-hidden bg-surface-card p-space-lg md:p-space-xl flex flex-col justify-between min-h-[420px] shadow-sm transition-all hover:shadow-md">
                <div className="z-10 max-w-md space-y-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Optical Substrates
                  </span>
                  <h3 className="font-headline-lg text-headline-lg font-semibold text-primary tracking-tight leading-snug">
                    Clarity Without Compromise
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant pt-1 leading-relaxed">
                    {"9H tempered glass screen & privacy guards with 100% touch responsiveness and oleophobic anti-oil coating."}
                  </p>
                  <div className="pt-space-md">
                    <a className="inline-flex items-center gap-2 font-label-lg text-label-lg font-semibold text-primary group-hover:text-secondary transition-colors" href="#screen-protection">
                      <span>
                        Explore Screen Protectors
                      </span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
                <div className="z-10 mt-space-lg flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Specs:
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    2.5D Polished Edges
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    Anti-Microbial
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-canvas-bg font-label-sm text-label-sm text-primary shadow-sm font-medium">
                    EZ-Tray
                  </span>
                </div>
                <div className="absolute -right-6 -bottom-8 w-72 h-72 md:w-80 md:h-80 pointer-events-none opacity-90 transition-transform duration-500 group-hover:scale-105">
                  <img className="w-full h-full object-contain" data-alt="Macro angle product photography of a floating 9H tempered glass screen protector hovering over an iPhone screen, pristine reflective glass surface with rainbow anti-reflective prism light flare, ultra clean studio setup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-lKDYPkqwSwVwuxo26rE1Se2RgeJ-seBCD4Y0YMfgbhAL8rBZYZKQYv4ILagq7m2F9cCx1jvm5QACCd3rl_AvnW5Z1fC-2zZMJxkjB4JNF5Chg1tc0AyxsZbjwQK-9C4FZkGGcwK27X0nLr7i6lhcfZSdsaWdX1Rp61iPZxlW2QGgEp5SBHdwshSwhNA71ElE5iQpcebLNs4IyV9IylEIPthl6zn5maodwDC-nps9WuJjUjw30TGJDw" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-canvas-bg" id="bestsellers">
          <StackRule />
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold mb-1">
                  Curated Daily
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                  Customer Bestsellers
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Our highest-rated armor tuned to absolute millimeter precision.
                </p>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button className="px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-semibold bg-primary text-on-primary shadow-sm" type="button">
                  All
                </button>
                <button className="px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-medium bg-surface-card text-on-surface-variant hover:text-primary transition-colors" type="button">
                  Clear MagSafe
                </button>
                <button className="px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-medium bg-surface-card text-on-surface-variant hover:text-primary transition-colors" type="button">
                  Shockproof Armor
                </button>
                <button className="px-3.5 py-1.5 rounded-full font-label-sm text-label-sm font-medium bg-surface-card text-on-surface-variant hover:text-primary transition-colors" type="button">
                  Privacy Glass
                </button>
              </div>
            </div>
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <div className="group bg-surface-card rounded-2xl p-space-md flex flex-col justify-between shadow-sm transition-all hover:shadow-md relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-canvas-bg font-label-sm text-[11px] font-semibold text-status-sale shadow-sm uppercase tracking-wide">
                    32% OFF
                  </span>
                  <button aria-label="Add to wishlist" className="w-8 h-8 rounded-full bg-canvas-bg text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="relative w-full aspect-square rounded-xl bg-canvas-bg overflow-hidden flex items-center justify-center p-space-sm mb-space-md">
                  <img className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Studio clean packshot of the AeroShield clear MagSafe iPhone 17 Pro phone case with an integrated magnetic charging ring on a pure neutral light grey surface, pristine reflections, ultra modern industrial product aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UwHIR0uIHfliygzaM-UnekALo_zpMUc5AprVugLxIxjZE1Xnn-_s9-3c4sKKQ9cXvlrVnvE527tJFXLfavi9kA_CFHs8QHpJkz5khJETGjeN1gLd21dIv9igNYZScyJ_8oSoLwcu-esWChg9JG-VPAKXjjdbii2oa_LpoYHA2_sst3xaieJ1ytz0-edsPiOZ8qhn-g5sBBUbPpSZZw3Nx4q67NJG3d0cAhjqgg47vNYUmIVpqfJESw" />
                  <span className="absolute bottom-2 left-2 bg-surface-card/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium">
                    For iPhone 17 Pro
                  </span>
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-[16px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                          star
                        </span>
                      </span>
                      <span className="font-semibold text-primary">
                        4.9
                      </span>
                      <span className="text-on-surface-variant/70">
                        (342)
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] leading-snug font-semibold text-primary group-hover:text-secondary transition-colors">
                      <Link to="/product" className="hover:underline">
                        AeroShield Clear MagSafe Case
                      </Link>
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Non-yellowing optical TPU + N52 Ring
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">
                      Frames:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button aria-label="Natural Titanium" className="w-4 h-4 rounded-full bg-[#B8B4AC] ring-2 ring-primary ring-offset-1 transition-all" type="button" />
                      <button aria-label="Black Titanium" className="w-4 h-4 rounded-full bg-[#2B2B2B] hover:scale-110 transition-transform" type="button" />
                      <button aria-label="Desert Titanium" className="w-4 h-4 rounded-full bg-[#D4BA9E] hover:scale-110 transition-transform" type="button" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-price-lg text-price-lg font-bold text-primary">
                        ₹1,499
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant/60 line-through">
                        ₹2,199
                      </span>
                    </div>
                    <button className="w-full h-10 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm" onClick={() => quickAdd("aeroshield")} type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        keyboard_double_arrow_left
                      </span>
                      <span>
                        Quick Add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group bg-surface-card rounded-2xl p-space-md flex flex-col justify-between shadow-sm transition-all hover:shadow-md relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-canvas-bg font-label-sm text-[11px] font-semibold text-status-sale shadow-sm uppercase tracking-wide">
                    38% OFF
                  </span>
                  <button aria-label="Add to wishlist" className="w-8 h-8 rounded-full bg-canvas-bg text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="relative w-full aspect-square rounded-xl bg-canvas-bg overflow-hidden flex items-center justify-center p-space-sm mb-space-md">
                  <img className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Crisp minimalist studio shot of twin pack OptiGlass tempered glass protectors with a neon blue EZ-Align installation tray frame accessory on an off-white architectural background, modern tech product presentation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCANlzz6ImRj3yF4yQP7Xlh0ZQdM4XoK8LZFDvbuC8-iMbsOc2DpWZGiq108dnMUcnyQAM7laFVePMImkn0kqM6wMwGemytvkFMN75IiLlN_OGHf1pjMRNvMGNDmtyA8DnZEykyqH7UkazPzz2lZSyH5ymLa9yn56i3TTjdRVijPOr9cCTD5n2Y8-plpxR2hvAygXE-st7tVBs4z-oeKfso5ncJI-8EbDtHRALpxrBIXpfJeCaBJOIwDQ" />
                  <span className="absolute bottom-2 left-2 bg-surface-card/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium">
                    For iPhone 17 Pro
                  </span>
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-[16px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                          star
                        </span>
                      </span>
                      <span className="font-semibold text-primary">
                        4.8
                      </span>
                      <span className="text-on-surface-variant/70">
                        (518)
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] leading-snug font-semibold text-primary group-hover:text-secondary transition-colors">
                      OptiGlass 9H Edge-to-Edge [2-Pack]
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Includes EZ-Align Tray • Zero Bubbles
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <span className="px-2 py-0.5 rounded bg-canvas-bg font-label-sm text-[10px] font-semibold text-secondary shadow-sm">
                      Includes 2 Protectors + 1 Tray
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-price-lg text-price-lg font-bold text-primary">
                        ₹799
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant/60 line-through">
                        ₹1,299
                      </span>
                    </div>
                    <button className="w-full h-10 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm" onClick={() => quickAdd("optiglass")} type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        keyboard_double_arrow_left
                      </span>
                      <span>
                        Quick Add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group bg-surface-card rounded-2xl p-space-md flex flex-col justify-between shadow-sm transition-all hover:shadow-md relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-canvas-bg font-label-sm text-[11px] font-semibold text-status-sale shadow-sm uppercase tracking-wide">
                    28% OFF
                  </span>
                  <button aria-label="Add to wishlist" className="w-8 h-8 rounded-full bg-canvas-bg text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="relative w-full aspect-square rounded-xl bg-canvas-bg overflow-hidden flex items-center justify-center p-space-sm mb-space-md">
                  <img className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Photorealistic studio rendering of ArmorMatrix tactical rugged iPhone 17 Pro phone case with reinforced matte black corner cushions and textured knurled grip sides on an off-white minimal concrete background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxk9Nzyr7BvASvavm7iU5ObO2qIDbrBHVxrVYj0P-nMvFM5JxjykK_OWA_4P04a8sWUqwrRI8l2do7bPZUWi8JnzfFqC68o1lXJVeICWxgmF_pI4EmowBjWO79AaEiTpGvw_MeShzf0itQqZZf8BKUh-uvIBOG_xDx_n7G7D1xNgJjdGYPtva5kJv86Z9g_KFvg0YPSaW-Fjd8y0QRwD0wSWNtPWMxnHQmuut6ab1e7FQCG6SlL9H7WQ" />
                  <span className="absolute bottom-2 left-2 bg-surface-card/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium">
                    For iPhone 17 Pro
                  </span>
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-[16px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                          star
                        </span>
                      </span>
                      <span className="font-semibold text-primary">
                        4.9
                      </span>
                      <span className="text-on-surface-variant/70">
                        (189)
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] leading-snug font-semibold text-primary group-hover:text-secondary transition-colors">
                      ArmorMatrix Rugged DropGuard
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      14-ft Military Grade Certified • MagSafe
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-wider">
                      Colors:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button aria-label="Matte Black" className="w-4 h-4 rounded-full bg-[#18181B] ring-2 ring-primary ring-offset-1 transition-all" type="button" />
                      <button aria-label="Slate Grey" className="w-4 h-4 rounded-full bg-[#475569] hover:scale-110 transition-transform" type="button" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-price-lg text-price-lg font-bold text-primary">
                        ₹1,799
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant/60 line-through">
                        ₹2,499
                      </span>
                    </div>
                    <button className="w-full h-10 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm" onClick={() => quickAdd("armormatrix")} type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        keyboard_double_arrow_left
                      </span>
                      <span>
                        Quick Add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group bg-surface-card rounded-2xl p-space-md flex flex-col justify-between shadow-sm transition-all hover:shadow-md relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-canvas-bg font-label-sm text-[11px] font-semibold text-status-sale shadow-sm uppercase tracking-wide">
                    33% OFF
                  </span>
                  <button aria-label="Add to wishlist" className="w-8 h-8 rounded-full bg-canvas-bg text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="relative w-full aspect-square rounded-xl bg-canvas-bg overflow-hidden flex items-center justify-center p-space-sm mb-space-md">
                  <img className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" data-alt="Angled macro studio photo of PrivacyPro anti-spy screen protector showing the dark polarising 28 degree privacy filter effect partially concealing an illuminated iPhone display, ultra crisp high end commercial aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBQOjw29uPNzsrDdH3v_bIsl1qGbMSLvcJNIeS2zYHLOezWQ3_RtlC58HdiuHlADGofHkCOsvjbMOmmDWmIzxvMYxRx4VNR8SHe4T0nr6OAv8DDuxpeNuTy_oO79s3iRtMfmMKl9pDvadTuIB7DpZ3QfuUbeuY5ggYIgXgapnt6C-tMT94TjBpNH2gwLkqgE3QSrK8YlloUalbAtS_bIi32n2Wv--zzWgHqyUudj7uSp_TmXQ9xNpvQ" />
                  <span className="absolute bottom-2 left-2 bg-surface-card/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-[10px] text-on-surface-variant font-medium">
                    For iPhone 17 Pro
                  </span>
                </div>
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="flex items-center text-amber-500">
                        <span className="material-symbols-outlined text-[16px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                          star
                        </span>
                      </span>
                      <span className="font-semibold text-primary">
                        4.7
                      </span>
                      <span className="text-on-surface-variant/70">
                        (274)
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] leading-snug font-semibold text-primary group-hover:text-secondary transition-colors">
                      PrivacyPro 28° Anti-Spy Glass
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Micro-Louver Polarized Filter Shield
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 pb-1">
                    <span className="px-2 py-0.5 rounded bg-canvas-bg font-label-sm text-[10px] font-semibold text-primary shadow-sm">
                      28° Side Privacy Angle
                    </span>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-price-lg text-price-lg font-bold text-primary">
                        ₹999
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant/60 line-through">
                        ₹1,499
                      </span>
                    </div>
                    <button className="w-full h-10 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md rounded-xl font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm" onClick={() => quickAdd("privacypro")} type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        keyboard_double_arrow_left
                      </span>
                      <span>
                        Quick Add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-card">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="mb-space-lg text-center max-w-2xl mx-auto">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Form Follows Protection
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mt-1">
                Shop Cases By Style
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Four distinct engineering profiles built for specific everyday carry demands.
              </p>
            </div>
            <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              <a className="group bg-canvas-bg p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]" href="#bestsellers">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      lens_blur
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Crystal Clear
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Anti-yellowing UV-resistant resins preserve original device hue.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                  <span>
                    Browse Clear
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    east
                  </span>
                </div>
              </a>
              <a className="group bg-canvas-bg p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]" href="#bestsellers">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      fit_screen
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Everyday Slim
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Barely-there 0.8mm profile that glides into tight trouser pockets.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                  <span>
                    Browse Slim
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    east
                  </span>
                </div>
              </a>
              <a className="group bg-canvas-bg p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]" href="#bestsellers">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      security
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    Rugged Armor
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Military-grade impact perimeter with air-cushion corner pockets.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                  <span>
                    Browse Armor
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    east
                  </span>
                </div>
              </a>
              <a className="group bg-canvas-bg p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]" href="#bestsellers">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      offline_bolt
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                    MagSafe Compatible
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Seamless pairing with 15W Qi2 wireless chargers, car mounts, and wallets.
                  </p>
                </div>
                <div className="pt-space-md flex items-center justify-between text-secondary font-label-sm text-label-sm font-semibold">
                  <span>
                    Browse MagSafe
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    east
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-canvas-bg" id="screen-protection">
          <StackRule />
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="bg-surface-card rounded-3xl p-space-lg md:p-space-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                <div className="lg:col-span-6 space-y-space-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-bg shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[16px]">
                      visibility
                    </span>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                      Japanese Asahi Glass
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                    Your Display Deserves Better.
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    Precision-fit screen protection engineered specifically for the dynamic island and contoured borders of your iPhone. Invisible shield, pure tactile responsiveness.
                  </p>
                  <div className="space-y-space-md pt-space-xs">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-canvas-bg text-secondary flex items-center justify-center shrink-0 shadow-sm font-bold">
                        01
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                          {"100% Optical Clarity & True Tone Support"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          High-transmission alumina substrate maintains HDR display brightness and ambient white balance without tint shift.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-canvas-bg text-secondary flex items-center justify-center shrink-0 shadow-sm font-bold">
                        02
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                          {"Hydrophobic & Oleophobic Anti-Fingerprint Shield"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Plasma-sprayed fluorocarbon layer repels natural hand oils, cosmetics, and pocket lint for a clean swipe every time.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-canvas-bg text-secondary flex items-center justify-center shrink-0 shadow-sm font-bold">
                        03
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-[16px] font-semibold text-primary">
                          Zero-Bubble EZ-Align Installation Tray Included
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          A custom-molded snap-on jig ensures 100% dust-free, foolproof millimeter alignment within 30 seconds.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-sm">
                    <a className="h-12 px-space-lg bg-primary hover:bg-neutral-800 text-on-primary font-label-lg text-label-lg rounded-xl font-medium inline-flex items-center justify-center gap-2 shadow-sm transition-all" href="#bestsellers">
                      <span>
                        Shop Tempered Glass
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-6 relative">
                  <div className="bg-canvas-bg rounded-2xl p-space-lg shadow-sm">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden relative mb-space-md bg-surface-card flex items-center justify-center">
                      <img className="w-full h-full object-cover" data-alt="Exploded diagram style graphic showing multi layer tempered glass engineering with oleophobic coating, 9H tempered glass layer, shatterproof membrane, and optical silicon adhesive on an ultra minimal white studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBITW9cZBc5IOUTDoaffqHBgJToKulriLV14AoyjtNWUwEdpMxB2cW79kY-9oDxXTu40Z4hNJW0Yjgv_OOwSHlZQ4E0jvc6fh_FiMs6u69K7h-d2j95exxzdICTL6yUIfdcIwJmnfYWxGjfnjiwfinlKs6Hag_P3fY9eqSqYtuXP5BUS6cVjOovZQ1eu7b0OQlnO2rkT3oeGOIFNCtu8KZZSTaRorAZCVcs41EgHkbSe5X8O0VTOYnmHQ" />
                    </div>
                    <div className="grid grid-cols-3 gap-space-sm text-center">
                      <div className="p-space-sm rounded-xl bg-surface-card">
                        <div className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                          Thickness
                        </div>
                        <div className="font-headline-sm text-headline-sm font-bold text-primary mt-0.5">
                          0.33mm
                        </div>
                      </div>
                      <div className="p-space-sm rounded-xl bg-surface-card">
                        <div className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                          Mohs Hardness
                        </div>
                        <div className="font-headline-sm text-headline-sm font-bold text-secondary mt-0.5">
                          9H
                        </div>
                      </div>
                      <div className="p-space-sm rounded-xl bg-surface-card">
                        <div className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                          Edge Contour
                        </div>
                        <div className="font-headline-sm text-headline-sm font-bold text-primary mt-0.5">
                          2.5D
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-card">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="mb-space-lg text-center max-w-xl mx-auto">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Industrial Integrity
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mt-1">
                Engineered Without Shortcuts
              </h2>
            </div>
            <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-canvas-bg p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      architecture
                    </span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Tolerance: ±0.05mm
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                    Precision CNC Fit
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Calibrated to micro-tolerances around the Action Button, Camera Control sapphire sensor, and acoustic speaker ports for frictionless utility.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  Zero acoustic muffling guarantee
                </div>
              </div>
              <div className="bg-canvas-bg p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      science
                    </span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Material Grade
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                    Aerospace Composites
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    German Bayer polycarbonate backplates molecularly bound to impact-dissipating thermoplastic bumpers that survive 14-foot concrete drops.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  MIL-STD-810H Drop Tested
                </div>
              </div>
              <div className="bg-canvas-bg p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-card flex items-center justify-center text-primary mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">
                      touch_app
                    </span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                    Tactile Physics
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-primary mt-1">
                    Seamless Accessibility
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Independent CNC-machined anodized aluminum button covers recreate the exact tactile feedback and haptic click of bare Apple hardware.
                  </p>
                </div>
                <div className="mt-space-lg pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  Independent button articulators
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-canvas-bg">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
              <div>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-status-verified font-semibold mb-1">
                  Authentic Feedback
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold">
                  Backed by iPhone Enthusiasts
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Over 24,000+ iPhones protected across metro cities in India.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  <span className="material-symbols-outlined text-[20px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                    star
                  </span>
                </div>
                <span className="font-label-md text-label-md font-bold text-primary">
                  4.89 / 5
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  (1,480+ Reviews)
                </span>
              </div>
            </div>
            <div data-reveal className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-surface-card p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      2 days ago
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-primary leading-relaxed">
                    “The clarity on the MagSafe case is unbelievable. It doesn’t attract dust and feels just as sleek as the titanium iPhone itself without any bulk.”
                  </p>
                </div>
                <div className="pt-space-md mt-space-md">
                  <div className="flex items-center gap-1.5 font-label-md text-label-md font-semibold text-primary">
                    <span>
                      Siddharth M.
                    </span>
                    <span className="material-symbols-outlined text-status-verified text-[16px]">
                      verified
                    </span>
                    <span className="font-label-sm text-[10px] text-status-verified uppercase font-bold">
                      Verified Buyer
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Bengaluru • iPhone 17 Pro Clear Case
                  </div>
                </div>
              </div>
              <div className="bg-surface-card p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      5 days ago
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-primary leading-relaxed">
                    “Applied the tempered glass in 30 seconds with the alignment tray. Zero dust, zero bubbles, super smooth oleophobic feel. Incredible quality.”
                  </p>
                </div>
                <div className="pt-space-md mt-space-md">
                  <div className="flex items-center gap-1.5 font-label-md text-label-md font-semibold text-primary">
                    <span>
                      Ananya R.
                    </span>
                    <span className="material-symbols-outlined text-status-verified text-[16px]">
                      verified
                    </span>
                    <span className="font-label-sm text-[10px] text-status-verified uppercase font-bold">
                      Verified Buyer
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Mumbai • OptiGlass 2-Pack
                  </div>
                </div>
              </div>
              <div className="bg-surface-card p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500">
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[18px] fill-current" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">
                      1 week ago
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-primary leading-relaxed">
                    “Dropped my phone on concrete stairs. Not a single scratch on the phone body or camera ring. Worth every single rupee. Caseform is legit.”
                  </p>
                </div>
                <div className="pt-space-md mt-space-md">
                  <div className="flex items-center gap-1.5 font-label-md text-label-md font-semibold text-primary">
                    <span>
                      Kunal K.
                    </span>
                    <span className="material-symbols-outlined text-status-verified text-[16px]">
                      verified
                    </span>
                    <span className="font-label-sm text-[10px] text-status-verified uppercase font-bold">
                      Verified Buyer
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Delhi NCR • ArmorMatrix Case
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl bg-surface-card">
          <div className="max-w-[860px] mx-auto px-margin md:px-margin-desktop">
            <div className="text-center mb-space-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Got Questions?
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mt-1">
                Frequently Asked Questions
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Everything you need to know about precision tolerances, shipping, and MagSafe.
              </p>
            </div>
            <div className="space-y-3">
              {FAQS.map(([q, a], i) => (
                <div key={q} className="bg-canvas-bg rounded-xl shadow-sm overflow-hidden">
                  <button className="w-full p-space-md text-left flex items-center justify-between font-headline-sm text-[16px] font-semibold text-primary focus:outline-none" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} type="button">
                    <span>
                      {q}
                    </span>
                    <span className={`material-symbols-outlined text-[20px] transition-transform text-on-surface-variant ${openFaq === i ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-space-md pb-space-md font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <QuickCartDrawer productId={drawerItem} onClose={() => setDrawerItem(null)} />
        {modalOpen && <DeviceModal onClose={() => setModalOpen(false)} />}
      </div>
    </main>
  );
}

function QuickCartDrawer({ productId, onClose }) {
  const { device, count, subtotal } = useStore();
  const open = productId !== null;
  const p = open ? PRODUCTS[productId] : null;
  return (
    <div aria-modal="true" data-lenis-prevent className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} role="dialog" aria-hidden={!open}>
      <div className={`fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-house ease-house ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md bg-canvas-bg shadow-2xl transform transition-transform duration-house ease-house flex flex-col justify-between ${open ? "" : "translate-x-full"}`}>
          <div className="p-space-lg bg-surface-card flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                shopping_bag
              </span>
              <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
                Your Bag
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] font-bold">
                {count} {count === 1 ? "Item" : "Items"}
              </span>
            </div>
            <button className="w-8 h-8 rounded-full bg-canvas-bg text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors shadow-sm" onClick={onClose} aria-label="Close bag" type="button">
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <div className="p-space-lg flex-1 overflow-y-auto space-y-space-md">
            {p && (
              <div className="p-space-md rounded-2xl bg-surface-card flex items-center gap-space-md shadow-sm">
                <div className="w-16 h-16 rounded-xl bg-canvas-bg flex items-center justify-center p-1 shrink-0">
                  <img alt={p.name} className="w-full h-full object-contain" src={p.img} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-label-lg text-label-lg font-semibold text-primary truncate">
                    {p.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Compatible: {device}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-price-md text-price-md font-bold text-primary">
                      {inr(p.price)}
                    </span>
                    <span className="font-label-sm text-[11px] text-status-verified font-medium">
                      Added ✓
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="p-space-md rounded-xl bg-surface-card space-y-2">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant font-medium">
                  Free Express Air Shipping
                </span>
                <span className="text-status-verified font-semibold">
                  {subtotal >= FREE_SHIPPING ? "Unlocked ✓" : `${inr(FREE_SHIPPING - subtotal)} away`}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-status-verified rounded-full" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
              </div>
            </div>
            <div className="p-space-sm rounded-xl bg-secondary/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                payments
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                Extra 10% instant discount applied at UPI checkout
              </span>
            </div>
          </div>
          <div className="p-space-lg bg-surface-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Subtotal
              </span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                {inr(subtotal)}
              </span>
            </div>
            <p className="font-label-sm text-[11px] text-on-surface-variant">
              {"Inclusive of all taxes & express air courier insurance."}
            </p>
            <Link to="/cart" className="w-full h-12 bg-primary hover:bg-neutral-800 text-on-primary font-label-lg text-label-lg rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
              <span>
                Proceed to Checkout
              </span>
              <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
            </Link>
            <div className="text-center font-label-sm text-[11px] text-on-surface-variant flex items-center justify-center gap-2 pt-1">
              <span>UPI</span>•<span>RuPay</span>•<span>Credit/Debit Cards</span>•<span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
