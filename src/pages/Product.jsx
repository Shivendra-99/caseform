import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore, PRODUCTS, inr } from "../store.jsx";
import DeviceModal from "../components/DeviceModal.jsx";

const THUMBS = [
  {
    "alt": "Floating multi-angle showcase",
    "cls": "w-full h-full object-contain mix-blend-multiply",
    "src": "https://lh3.googleusercontent.com/aida-public/AB6AXuAzEtG7KN-Ef1Usagz_KxH3idplEFZKBRd_P1_FnUelSmFuNjHrCCr0sgAcC4QFZjfhISAuajtVr_tVy-tf7ABOk699Bo7T_DxhaiT7g97nzVhaqekY3WNx65GGO-brM8_zaigg4Rjj0Y753v11BBZqlg_-D_uA1YIRFQn7HrYgXTFpVflJnTZpCcfiRTXibcQrDc5wrdyZmzG4717LvOXHUWSAsbM72Gw4KP9sXAx2ZaMtros7QBYfmg"
  },
  {
    "alt": "Close up view of the front face of iPhone 17 Pro in clear transparent AeroShield case showing the raised 1.2mm perimeter lip protecting the OLED screen display against flat drops, pure clean high key studio lighting on off-white pedestal",
    "cls": "w-full h-full object-cover rounded",
    "src": "https://lh3.googleusercontent.com/aida-public/AB6AXuBHf02wul_TTAnCBpOGnCPCQ6oH03twlgvGoPbrpGRMrg4Rp096DkhLUsILHb8X0JiSnoYvAKAqR47kQP-E4eVsZMFaaJZamVZeCMoStmZT8s1_iCCWwhzMgP7gW1ZNjZp7J1EYsZgS4Cg4W_XKy_VNaHeFvF-VDn-ZFchk3acZgeFdIIXtbO2msxp-H7VRPTHXGV0ZsneAye4YoDi_JjPolkS6qUBP5EsOGtfvE-Zr3jXCLmlzve0ogA"
  },
  {
    "alt": "Macro photography of precision CNC machined titanium camera island bezel guard on transparent AeroShield case surrounding the triple camera lens cluster on iPhone 17 Pro, metallic brushed finish, premium tech texture",
    "cls": "w-full h-full object-cover rounded",
    "src": "https://lh3.googleusercontent.com/aida-public/AB6AXuD3q9Lsxw8_Bkoay97Qvhy6i2YxrgyhAwWVJCTa4iW6plk0zRP8FyFaZ8MFU6t5bVY3E-i5GdbMXVxyk10sgkLRL_KEYEyjCvC__ql9JpINgcCRHyFZKXhAEGZ2Frba1lHnON8ECB-DE7J12ik6AhPxbG6CnqZ1YtdGDyxT0Ybae1lMwbyMYfi5VlDqyMzQmF3tuAMk2s0uLXImyZbjXuJeulLhNR20WoHHwGVK0j7SE8Z6R7CEo8GmBw"
  },
  {
    "alt": "Side profile exploded view of iPhone 17 Pro AeroShield case highlighting seamless Action Button tactile cover and micro-perforated acoustic speaker ports cut with surgical accuracy",
    "cls": "w-full h-full object-cover rounded",
    "src": "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQQ89nAMQ4YxKO_KBRWiEePiJkU5W4ymO43Rl_Y2wBAN6OQpkgNSbWOH1wpuouUFu2Iziija0Gc_LvifbiSYk8KZObijrDeKRdKXE5HXNHq6eOR72UgQ5WSRQMazpj2NClhaB4HMyypJK4_h5GFkO0Vdu_ASywC-SJz8NeBPv82qK3lGE4O0ZaF3kRfoYhwqU5xGx6QUs8qCblnCyRuM-tr5nBhBYIDrmNs-Rmf8kJEBIB42mMGhzCw"
  },
  {
    "alt": "Minimalist Japanese kraft packaging box for Caseform AeroShield case with holographic anti-counterfeit authenticity seal, clean matte typography and microfiber cloth on grey limestone surface",
    "cls": "w-full h-full object-cover rounded",
    "src": "https://lh3.googleusercontent.com/aida-public/AB6AXuA3SNaXHaQVuzn2u3kU4RCAUhM76Fj5uJHt4prLy6EynUb50F58quL1vGCkyS2lNrlx-2_I5gMJwrUIYW294URikylF9SiP1d2RaFtYX9vrMwVJK4fYvI8H1sy6xCnQrpVtTOhwfp_a_ebxAO829W8DPmHxOv4RwTMRxpXrylqTc5Ek5T-e5W8jWsl17qhQ2C2SGtB15VTAvN0XLb_5EPvIlNT18dpmdvZwyHOSj3VSoWtPXiICoT23Fg"
  }
];

// Quick-pick device pills and their display sizes
const PILLS = {
  "iPhone 17 Pro": '17 Pro (6.3")',
  "iPhone 17 Pro Max": '17 Pro Max (6.9")',
  "iPhone 17": 'iPhone 17 (6.1")',
  "iPhone 16 Pro": '16 Pro (6.3")',
};
const SIZES = { "iPhone 17 Pro": "6.3", "iPhone 17 Pro Max": "6.9", "iPhone 17": "6.1", "iPhone 16 Pro": "6.3" };

// [name, swatch ring colour, swatch fill colour]
const COLORS = [
  ["Natural Titanium Ring", "#d6d3ce", "#d6d3ce"],
  ["Clear Frost Acrylic", "#f1f1f1", "#e8e8e8"],
  ["Deep Obsidian Black", "#1e1e1e", "#1b1c1c"],
  ["Desert Titanium Tint", "#c5b59e", "#c8b79d"],
];

const SPECS = [
  { title: "Detailed Compatibility & Dimensions", body: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                Apple iPhone 17 Pro (Screen size: 6.3 inches diagonally)
              </li>
              <li>
                Full compatibility with Camera Control sapphire sensor (precise edge bevel)
              </li>
              <li>
                Accommodates large third-party USB-C 240W braided charging plugs
              </li>
            </ul>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                {"Compatible with MagSafe Battery Packs, Wallets & Qi2 charging pads"}
              </li>
              <li>
                Camera island lip elevation: 1.5mm above sapphire lenses
              </li>
              <li>
                Front display bezel elevation: 1.2mm above glass screen
              </li>
            </ul>
          </div>
  ) },
  { title: "365-Day Zero Yellowing Replacement Guarantee", body: (
          <p>
            We stand behind our materials unconditionally. If your AeroShield clear casing shows perceptible yellowing or discoloration within 365 days of invoice date, submit a quick photo to support@caseform.in for an immediate no-questions-asked replacement dispatch.
          </p>
  ) },
  { title: "India Shipping, COD & 7-Day Returns", body: (
          <p>
            All orders placed before 3:00 PM IST dispatch the same business day from our Bengaluru fulfillment center. Tier 1 metros receive delivery within 24-48 hours. If the fit does not meet your expectations, schedule an easy 7-day pickup through your account dashboard.
          </p>
  ) },
];

export default function Product() {
  const { device, setDevice, addToCart } = useStore();
  const navigate = useNavigate();
  const product = PRODUCTS.aeroshield;
  const [thumb, setThumb] = useState(0);
  const [color, setColor] = useState(COLORS[0][0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(null); // null | "adding" | "added"
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState(null); // null | "invalid" | pincode
  const [withGlass, setWithGlass] = useState(true);
  const [kitAdded, setKitAdded] = useState(false);
  const [openSpec, setOpenSpec] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const addToBag = () => {
    setAdded("adding");
    setTimeout(() => {
      addToCart("aeroshield", qty);
      setAdded("added");
      setTimeout(() => setAdded(null), 2000);
    }, 500);
  };
  const buyNow = () => {
    addToCart("aeroshield", qty);
    navigate("/cart");
  };
  const addKit = () => {
    addToCart("aeroshield");
    if (withGlass) addToCart("optiglass");
    setKitAdded(true);
    setTimeout(() => setKitAdded(false), 2000);
  };
  const checkPincode = (e) => {
    e.preventDefault();
    setPinResult(/^\d{6}$/.test(pin.trim()) ? pin.trim() : "invalid");
  };

  return (
    <main className="w-full pt-[106px] bg-canvas-bg min-h-screen">
      <div className="flex flex-col w-full">
        <section className="w-full bg-surface-card py-2.5 px-margin md:px-margin-desktop">
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-label-md text-label-md">
              <a className="hover:text-primary transition-colors" href="#">
                Home
              </a>
              <span className="text-outline">
                /
              </span>
              <a className="hover:text-primary transition-colors" href="#">
                Cases
              </a>
              <span className="text-outline">
                /
              </span>
              <a className="hover:text-primary transition-colors" href="#">
                iPhone 17 Pro
              </a>
              <span className="text-outline">
                /
              </span>
              <span className="text-primary font-medium">
                AeroShield Clear MagSafe
              </span>
            </nav>
            <div className="hidden sm:flex items-center gap-space-md font-label-sm text-label-sm">
              <span className="flex items-center gap-1 text-status-verified font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                Certified Lab Tested 10ft Drop
              </span>
              <span className="text-outline">
                |
              </span>
              <span className="text-on-surface-variant">
                Model ID: CFM-17P-AS-CLR
              </span>
            </div>
          </div>
        </section>
        <section className="w-full py-space-lg md:py-space-xl px-margin md:px-margin-desktop bg-canvas-bg">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="relative bg-surface-card rounded-xl overflow-hidden aspect-[4/3] md:aspect-[5/4] flex items-center justify-center p-6 shadow-sm">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-canvas-bg/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow-sm font-semibold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Ultra-Clear Non-Yellowing Optical TPU
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-canvas-bg/85 backdrop-blur-md text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[13px] text-secondary">
                      bolt
                    </span>
                    N52 Neodymium MagSafe Array
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <button aria-label="Expand view" className="w-9 h-9 rounded-lg bg-canvas-bg/90 backdrop-blur-md hover:bg-canvas-bg flex items-center justify-center text-on-surface hover:text-primary transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      zoom_in
                    </span>
                  </button>
                </div>
                <img alt="AeroShield Clear MagSafe Case for iPhone 17 Pro multi-angle render" className="w-full h-full object-contain max-h-[500px] transition-transform duration-500 ease-out hover:scale-105" src={THUMBS[thumb].src} />
                <div className="absolute bottom-4 left-4 z-10 px-2 py-1 rounded bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">
                    view_in_ar
                  </span>
                  <span>
                    True 1:1 CNC Geometry • 0.33mm Bezel Float
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {THUMBS.map((t, i) => (
                  <button key={t.src} aria-label={`Angle ${i + 1}`} className={`group relative aspect-square rounded-lg overflow-hidden p-1 shadow-sm transition-all focus:outline-none ${i === thumb ? "bg-surface-container-high" : "bg-surface-card"}`} onClick={() => setThumb(i)} type="button">
                    <img alt={t.alt} className={t.cls} src={t.src} />
                    <span className={`absolute bottom-1 right-1 text-[9px] font-label-sm px-1 rounded bg-canvas-bg/80 ${i === thumb ? "text-primary" : "text-on-surface"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-2">
                <div className="p-4 rounded-xl bg-surface-card flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      lens_blur
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                      N52 Neodymium
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      15W Qi2 rapid alignment with 1.4kg magnetic grip.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-card flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      shield
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                      Bayer Optical Resin
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      365-day molecular resistance against UV oxidation.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-card flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      vibration
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                      AirShield Cavities
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Hexagonal micro-chambers dissipate 10ft corner impacts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-card space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                    AeroStructure Spec Matrix
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Tolerance: ±0.04mm
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-canvas-bg p-3 rounded-lg">
                    <div className="font-price-md text-price-md text-primary font-semibold">
                      18.4g
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Ultralight Mass
                    </div>
                  </div>
                  <div className="bg-canvas-bg p-3 rounded-lg">
                    <div className="font-price-md text-price-md text-primary font-semibold">
                      1.15mm
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Profile Thickness
                    </div>
                  </div>
                  <div className="bg-canvas-bg p-3 rounded-lg">
                    <div className="font-price-md text-price-md text-primary font-semibold">
                      1.40kg
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Magnetic Tension
                    </div>
                  </div>
                  <div className="bg-canvas-bg p-3 rounded-lg">
                    <div className="font-price-md text-price-md text-primary font-semibold">
                      3.0m
                    </div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Drop Certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                    Bestseller
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-card text-status-verified font-label-sm text-label-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-status-verified animate-ping" />
                    {"In Stock & Dispatches Today"}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-semibold mt-1">
                  AeroShield Clear MagSafe Case
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Engineered exclusively for Apple iPhone 17 Pro (6.3-inch Display)
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center text-status-verified">
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-semibold text-primary">
                    4.9
                  </span>
                  <a className="font-label-md text-label-md text-secondary hover:underline" href="#reviews-section">
                    (342 verified reviews)
                  </a>
                  <span className="text-outline">
                    ·
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    1,420+ bought this month
                  </span>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-card space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-display text-primary font-semibold">
                    ₹1,499
                  </span>
                  <span className="font-headline-sm text-headline-sm text-outline line-through">
                    ₹2,199
                  </span>
                  <span className="px-2 py-0.5 rounded bg-status-sale/10 text-status-sale font-label-md text-label-md font-bold">
                    Save ₹700 (32% OFF)
                  </span>
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  All prices inclusive of GST. Free Express Air Shipping applied.
                </div>
                <div className="p-3 rounded-lg bg-canvas-bg flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded bg-secondary text-on-secondary flex items-center justify-center font-bold text-[13px]">
                      ⚡
                    </span>
                    <div>
                      <div className="font-label-md text-label-md font-semibold text-primary">
                        Prepaid UPI Instant Discount
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">
                        Extra 10% off at final payment step
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-price-md text-price-md font-bold text-secondary">
                      Pay ₹1,349
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">
                    1. Confirm Device Model
                  </span>
                  <button className="font-label-sm text-label-sm text-secondary hover:underline font-medium" onClick={() => setModalOpen(true)} type="button">
                    Change Device Model
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-surface-card flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      check_circle
                    </span>
                    <div>
                      <span className="font-label-lg text-label-lg font-semibold text-primary block">
                        {device}{SIZES[device] && ` (${SIZES[device]}" display)`}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {"Precision Cut for Sapphire Camera Control & Action Button"}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-status-verified/10 text-status-verified font-label-sm text-label-sm font-medium">
                    100% Fit Assured
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                  {Object.entries(PILLS).map(([name, label]) => (
                    <button key={name} className={`py-2 px-2 rounded-lg font-label-sm text-label-sm font-medium text-center transition-colors ${name === device ? "bg-primary text-on-primary" : "bg-surface-card text-on-surface-variant hover:text-primary"}`} onClick={() => setDevice(name)} type="button">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="font-semibold uppercase tracking-wider text-primary">
                    2. MagSafe Ring Accent
                  </span>
                  <span className="text-on-surface font-medium">
                    {color}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {COLORS.map(([name, outer, inner]) => (
                    <button key={name} aria-label={name} aria-pressed={name === color} className={`relative w-9 h-9 rounded-full shadow-sm flex items-center justify-center p-0.5 ${name === color ? "" : "opacity-80 hover:opacity-100"}`} style={{ backgroundColor: outer }} onClick={() => setColor(name)} type="button">
                      <span className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: inner }}>
                        {name === color && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-surface-card rounded-lg h-12 px-2 shadow-sm">
                    <button aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary font-bold transition-colors" onClick={() => setQty((q) => Math.max(1, q - 1))} type="button">
                      -
                    </button>
                    <span className="w-10 text-center font-label-lg text-label-lg font-semibold text-primary">
                      {qty}
                    </span>
                    <button aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary font-bold transition-colors" onClick={() => setQty((q) => q + 1)} type="button">
                      +
                    </button>
                  </div>
                  <button className="flex-1 h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]" onClick={addToBag} disabled={added === "adding"} type="button">
                    {added === "adding" ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                        <span>ADDING TO BAG...</span>
                      </>
                    ) : added === "added" ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] text-status-verified">done</span>
                        <span>ADDED TO BAG!</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        <span>ADD TO BAG • {inr(product.price * qty)}</span>
                      </>
                    )}
                  </button>
                  <button aria-label="Save to Wishlist" className="w-12 h-12 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center shadow-sm transition-colors" type="button">
                    <span className="material-symbols-outlined text-[20px]">
                      favorite
                    </span>
                  </button>
                </div>
                <button className="w-full h-12 bg-secondary hover:bg-secondary-container text-on-secondary font-label-lg text-label-lg font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]" onClick={buyNow} type="button">
                  <span>
                    EXPRESS BUY NOW (ONE-CLICK)
                  </span>
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="p-space-md rounded-xl bg-surface-card space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      local_shipping
                    </span>
                    Check India Delivery Timeline
                  </span>
                  <span className="font-label-sm text-label-sm text-status-verified font-medium">
                    Express Dispatch
                  </span>
                </div>
                <form className="flex gap-2" onSubmit={checkPincode}>
                  <input className="flex-1 h-11 px-3 bg-canvas-bg text-on-surface font-body-sm text-body-sm rounded-lg shadow-sm focus:outline-none focus:bg-surface-container-lowest" aria-label="Pincode" inputMode="numeric" maxLength="6" placeholder="Enter 6-digit Pincode (e.g. 560001)" type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
                  <button className="h-11 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg font-medium hover:bg-primary-container transition-colors" type="submit">
                    Verify
                  </button>
                </form>
                <div className="font-body-sm text-body-sm text-on-surface flex items-center gap-1.5 pt-1" aria-live="polite">
                  {pinResult === "invalid" ? (
                    <>
                      <span className="material-symbols-outlined text-status-sale text-[16px]">error</span>
                      <span>Please enter a valid 6-digit Indian postal code.</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-status-verified text-[16px]">check_circle</span>
                      {pinResult ? (
                        <span>
                          {"Verified: Delivery in "}<strong>2-3 Business Days</strong>{" to "}<strong>Pincode {pinResult}</strong>{" • Free Express Air"}
                        </span>
                      ) : (
                        <span>
                          {"Estimated Delivery by "}<strong>Thursday</strong>{" to "}<strong>Bengaluru 560001</strong>{" • Free Express Air"}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="px-2 py-0.5 rounded bg-canvas-bg shadow-sm">
                    COD Available
                  </span>
                  <span className="px-2 py-0.5 rounded bg-canvas-bg shadow-sm">
                    BlueDart Air
                  </span>
                  <span className="px-2 py-0.5 rounded bg-canvas-bg shadow-sm">
                    Delhivery Express
                  </span>
                  <span className="px-2 py-0.5 rounded bg-canvas-bg shadow-sm">
                    7-Day Free Returns
                  </span>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-secondary">
                    Frequently Paired Together
                  </span>
                  <span className="px-2 py-0.5 rounded bg-status-sale/10 text-status-sale font-label-sm text-label-sm font-bold">
                    {"Bundle & Save ₹230"}
                  </span>
                </div>
                <label className="flex items-center gap-3 bg-canvas-bg p-3 rounded-lg shadow-sm cursor-pointer">
                  <div className="w-16 h-16 rounded-md bg-surface-card overflow-hidden shrink-0 p-1 flex items-center justify-center">
                    <img alt="OptiGlass 9H Tempered Glass for iPhone 17 Pro" className="w-full h-full object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqLsrsRhO_OHeZVUsbU31OaZSbIQm3hc8mP20RqBag-Sf3hiAntVuC5vh0XMvvTS3VNd0KKUdu1vJ43Cvo6H98PE2zw_e3Fg8XryuQSIqdPczfU0cVYLnw5KIrazKJQot02VpxvJ_BZ_jJHy3L58eoQo5mCSp38e0QoYvrPuFBQaBpKUaMNxxxEKyyjEtKlpZjNTxHGekzo0WyJBHiGYaAmv8CLzG2qndA8lthPlD_2bpvBwvTYDNvQ" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-label-md text-label-md font-semibold text-primary truncate">
                      OptiGlass™ 9H Tempered Glass (2-Pack)
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      With zero-dust alignment tray
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-price-md text-price-md font-semibold text-primary">
                        ₹799
                      </span>
                      <span className="font-label-sm text-label-sm text-outline line-through">
                        ₹1,199
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <input className="w-5 h-5 accent-primary rounded cursor-pointer" checked={withGlass} onChange={(e) => setWithGlass(e.target.checked)} type="checkbox" />
                  </div>
                </label>
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">
                      Combined Kit Price:
                    </div>
                    <div className="font-price-lg text-price-lg font-bold text-primary">
                      {withGlass ? (
                        <>
                          {"₹2,068 "}
                          <span className="font-body-sm text-body-sm font-normal text-outline line-through">
                            ₹2,298
                          </span>
                        </>
                      ) : (
                        inr(product.price)
                      )}
                    </div>
                  </div>
                  <button className="h-10 px-4 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-medium rounded-lg shadow-sm transition-colors" onClick={addKit} type="button">
                    {kitAdded ? "Added ✓" : "Add Kit to Bag"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl px-margin md:px-margin-desktop bg-surface-card">
          <div className="max-w-[1360px] mx-auto space-y-space-lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  {"Substrate & Physics"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary font-semibold tracking-tight">
                  Precision Technical Architecture
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Every micron calibrated against original CAD geometries supplied directly by Apple component partners.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="bg-canvas-bg p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <span className="font-label-sm text-label-sm font-semibold uppercase text-secondary">
                    01 / Optical Chemistry
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                    Covestro German Polycarbonate
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Standard clear cases discolour within 60 days due to exposure to sebum and ultraviolet rays. Caseform utilizes Japanese antioxidant stabilizers with UV absorbents that remain optical water-clear under 500 hours of continuous xenon arc testing.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Refractive Index: 1.586
                  </span>
                  <span className="text-status-verified font-medium">
                    Zero-Yellow Certified
                  </span>
                </div>
              </div>
              <div className="bg-canvas-bg p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <span className="font-label-sm text-label-sm font-semibold uppercase text-secondary">
                    02 / Magnetic Ring
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                    38-Core Neodymium Ring
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Embedded inside a dedicated laser-cut groove to ensure complete flushness against your iPhone's matte glass back. Tested to withstand up to 1.4kg of shear force on high-speed in-car MagSafe wireless mounts.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Qi2 Wireless Support: 15W Full Speed
                  </span>
                  <span className="text-secondary font-medium">
                    Active Lock
                  </span>
                </div>
              </div>
              <div className="bg-canvas-bg p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div className="space-y-space-sm">
                  <span className="font-label-sm text-label-sm font-semibold uppercase text-secondary">
                    03 / Button Tactility
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                    Anodized Aluminum Actuators
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Say goodbye to mushy TPU button feel. Independent CNC machined buttons mirror Apple's original tactile feedback click with 0.05mm key travel and responsive haptic transmission.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>
                    Independent Action Button
                  </span>
                  <span className="text-primary font-medium">
                    Haptic-Match
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-canvas-bg rounded-xl shadow-sm overflow-hidden p-space-md md:p-space-lg space-y-4">
              {SPECS.map(({ title, body }, i) => (
                <div key={title}>
                  <button className="w-full flex items-center justify-between py-3 text-left font-headline-sm text-headline-sm text-primary font-semibold focus:outline-none" onClick={() => setOpenSpec(openSpec === i ? null : i)} aria-expanded={openSpec === i} type="button">
                    <span>
                      {title}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant transition-transform">
                      {openSpec === i ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {openSpec === i && (
                    <div className="pt-2 pb-4 text-body-sm text-body-sm text-on-surface-variant space-y-2">
                      {body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-space-xl px-margin md:px-margin-desktop bg-canvas-bg" id="reviews-section">
          <div className="max-w-[1360px] mx-auto space-y-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">
                    4.9
                  </span>
                  <div className="flex text-status-verified">
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                      star
                    </span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                    (342 Verified Ratings)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  94% of customers rated 5 stars • Ranked #1 Clear MagSafe Case in India
                </p>
              </div>
              <button className="h-11 px-5 bg-surface-card hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg font-semibold shadow-sm transition-colors">
                Write a Verified Review
              </button>
            </div>
            <div className="p-space-md rounded-xl bg-surface-card grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-1.5 md:col-span-2">
                <div className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-on-surface-variant">
                    5 Stars
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-status-verified w-[92%] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium text-primary">
                    92%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-on-surface-variant">
                    4 Stars
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-status-verified w-[6%] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium text-primary">
                    6%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-on-surface-variant">
                    3 Stars
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-outline w-[1%] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium text-primary">
                    1%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-on-surface-variant">
                    2 Stars
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-outline w-[0.5%] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium text-primary">
                    0.5%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm">
                  <span className="w-12 text-on-surface-variant">
                    1 Star
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-surface-container overflow-hidden">
                    <div className="h-full bg-outline w-[0.5%] rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium text-primary">
                    0.5%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pl-0 md:pl-6">
                <div className="flex items-center gap-2 text-status-verified font-label-md text-label-md font-semibold">
                  <span className="material-symbols-outlined text-[18px]">
                    verified
                  </span>
                  <span>
                    100% Genuine Buyer Feedback
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Reviews authenticated via automated post-delivery OTP verification across Indian pin codes.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="p-space-lg rounded-xl bg-surface-card shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-status-verified">
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      2 days ago
                    </span>
                  </div>
                  <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                    Apple-level tolerances for real
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    "The magnet lock on my ESR car charger is noticeably stronger than the OEM clear case. The titanium tone on the MagSafe ring perfectly complements the Natural Titanium colorway on the 17 Pro."
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-[11px] flex items-center justify-center">
                    AK
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm font-semibold text-primary flex items-center gap-1">
                      Aditya K.
                      <span className="material-symbols-outlined text-[14px] text-status-verified">
                        verified
                      </span>
                    </div>
                    <div className="font-label-sm text-[11px] text-on-surface-variant">
                      Bengaluru • Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-card shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-status-verified">
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      1 week ago
                    </span>
                  </div>
                  <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                    Zero yellowing is actually true
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    "Been using Caseform since my iPhone 15 Pro. This new 17 Pro version is even slimmer. The action button click feels genuinely metallic, not like cheap flexible plastic that sticks."
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary font-bold text-[11px] flex items-center justify-center">
                    RM
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm font-semibold text-primary flex items-center gap-1">
                      Rohan M.
                      <span className="material-symbols-outlined text-[14px] text-status-verified">
                        verified
                      </span>
                    </div>
                    <div className="font-label-sm text-[11px] text-on-surface-variant">
                      Mumbai • Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-card shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-status-verified">
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                      <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>
                        star
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      2 weeks ago
                    </span>
                  </div>
                  <h4 className="font-label-lg text-label-lg font-semibold text-primary">
                    Paired with OptiGlass screen kit
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    "The bundle installation tray made the glass apply with literally zero bubbles in 10 seconds. The case lip doesn't lift the edge of the glass at all. Flawless combo."
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-[11px] flex items-center justify-center">
                    PS
                  </div>
                  <div>
                    <div className="font-label-sm text-label-sm font-semibold text-primary flex items-center gap-1">
                      Priya S.
                      <span className="material-symbols-outlined text-[14px] text-status-verified">
                        verified
                      </span>
                    </div>
                    <div className="font-label-sm text-[11px] text-on-surface-variant">
                      New Delhi • Verified Buyer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-canvas-bg/95 backdrop-blur-xl p-3 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
          <div>
            <div className="font-price-md text-price-md font-bold text-primary">
              ₹1,499
            </div>
            <div className="font-label-sm text-label-sm text-status-verified font-medium">
              Free Express Air
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <button className="w-full h-11 bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform" onClick={addToBag} type="button">
              <span className="material-symbols-outlined text-[18px]">
                shopping_bag
              </span>
              <span>
                Add to Bag
              </span>
            </button>
          </div>
        </div>
        {modalOpen && <DeviceModal onClose={() => setModalOpen(false)} />}
      </div>
    </main>
  );
}
