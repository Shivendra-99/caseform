import { useRef, useState } from "react";
import { useStore } from "../store.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ModelPicker from "../components/ModelPicker.jsx";
import { PRODUCTS, MODEL_SERIES, inr } from "../catalog.js";

// The combo has its own promo card below the grid, so the grid lists covers and glass.
const ITEMS = Object.entries(PRODUCTS).map(([id, p]) => ({ id, ...p })).filter((p) => p.kind !== "combo");
const COMBO = { id: "armor-combo", ...PRODUCTS["armor-combo"] };
const PILLS = [
  { id: "all", label: "All Products" },
  { id: "covers", label: "Covers" },
  { id: "glass", label: "Glass" },
].map((c) => ({ ...c, count: ITEMS.filter((p) => c.id === "all" || p.cat === c.id).length }));

export default function Collection() {
  const { devices, setDevices, addForModels } = useStore();
  const n = devices.length;
  const [pill, setPill] = useState("all");
  const [added, setAdded] = useState(false);
  const sidebarRef = useRef(null);
  const mobileFilterRef = useRef(null);

  const shown = ITEMS.filter((p) => pill === "all" || p.cat === pill);
  // The combo promo card adds one combo per selected model.
  const addCombo = () => {
    addForModels(COMBO.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  // Filter checkboxes are uncontrolled, so clearing them directly is fine.
  const resetFilters = () => sidebarRef.current.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false));

  return (
    <main className="w-full bg-canvas-bg min-h-screen">
      <div className="flex flex-col w-full">
        <div className="w-full bg-surface-card py-2 px-margin md:px-margin-desktop">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-status-verified inline-block animate-pulse" />
              <span className="font-medium text-primary">
                Regional Express Hub:
              </span>
              <span className="hidden sm:inline">
                Orders placed before 4:00 PM dispatch same-day with BlueDart Air.
              </span>
              <span className="sm:hidden">
                Same-day dispatch active.
              </span>
            </div>
            <div className="flex items-center gap-space-sm font-label-sm text-label-sm text-primary">
              <span className="hidden md:inline">
                Current Transit SLA:
              </span>
              <span className="font-semibold px-2 py-0.5 rounded bg-canvas-bg shadow-sm">
                24-48h Metro
              </span>
            </div>
          </div>
        </div>
        <section className="w-full bg-canvas-bg pt-space-md pb-space-lg">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop space-y-space-md">
            <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
              <a className="hover:text-primary transition-colors" href="#">
                Home
              </a>
              <span className="text-outline-variant">
                /
              </span>
              <a className="hover:text-primary transition-colors" href="#">
                Protection Catalog
              </a>
              <span className="text-outline-variant">
                /
              </span>
              <span className="text-primary font-semibold">
                {n > 1 ? `${n} models` : devices[0]}
              </span>
            </nav>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pt-space-xs">
              <div className="max-w-3xl space-y-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Engineered for 2025 Flagship
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                    0.05mm CNC Precision
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  {n > 1 ? "Cases & 9H Glass for your iPhones" : `${devices[0]} Cases & 9H Glass`}
                </h1>
                <p id="col-model-help" className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  Every cover and glass here is cut for the models you pick. Buying for the family? Tick several and Quick Add puts one in your bag for each.
                </p>
              </div>
              <div className="w-full lg:w-[360px] shrink-0 space-y-1.5">
                <span id="col-model-label" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Shopping for
                </span>
                <ModelPicker value={devices} onChange={setDevices} labelledBy="col-model-label" describedBy="col-model-help" />
              </div>
            </div>
            <div className="pt-space-xs flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {PILLS.map((p) => (
                <button key={p.id} aria-pressed={p.id === pill} className={`px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all ${p.id === pill ? "font-semibold bg-primary text-on-primary shadow-sm" : "font-medium bg-surface-card text-on-surface-variant hover:text-primary hover:bg-surface-container-high"}`} onClick={() => setPill(p.id)} type="button">
                  {p.label} ({p.count})
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-space-xs bg-surface-card/60 p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
                <span className="font-semibold text-primary">
                  {shown.length} Items
                </span>
                <span className="hidden sm:inline">
                  •
                </span>
                <span className="hidden sm:inline">
                  {"Certified Qi2 & MagSafe Compatible"}
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden md:inline" htmlFor="sortSelect">
                  Sort By
                </label>
                <div className="relative">
                  <select className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-canvas-bg text-on-surface font-label-sm text-label-sm font-medium shadow-sm focus:outline-none cursor-pointer" aria-label="Sort products">
                    <option value="bestselling">
                      Bestselling Popularity
                    </option>
                    <option value="price-asc">
                      Price: Lowest First
                    </option>
                    <option value="price-desc">
                      Price: Highest First
                    </option>
                    <option value="rating">
                      Customer Rating (4.8+)
                    </option>
                    <option value="new">
                      Newly Manufactured Batches
                    </option>
                  </select>
                  {" "}
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[16px]">
                    unfold_more
                  </span>
                </div>
                <button className="lg:hidden h-9 px-3 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium flex items-center gap-1 shadow-sm" onClick={() => mobileFilterRef.current.showModal()} type="button">
                  <span className="material-symbols-outlined text-[16px]">
                    tune
                  </span>
                  <span>
                    Filters
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-canvas-bg pb-space-xl">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              <aside className="hidden lg:block lg:col-span-3 sticky top-24 bg-surface-card p-space-md rounded-xl space-y-space-md shadow-sm" ref={sidebarRef}>
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      tune
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                      Filter Specs
                    </span>
                  </div>
                  <button className="font-label-sm text-label-sm text-secondary hover:underline font-medium" onClick={resetFilters} type="button">
                    Reset All
                  </button>
                </div>
                <div className="bg-canvas-bg p-space-sm rounded-lg flex items-center justify-between shadow-sm">
                  <div className="space-y-0.5">
                    <div className="font-label-sm text-label-sm font-semibold text-primary">
                      Express Dispatch Only
                    </div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant">
                      Hub verified stock
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-canvas-bg after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-canvas-bg after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary" />
                  </label>
                </div>
                <div className="space-y-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Category
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors group">
                      <span className="flex items-center gap-2">
                        <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-primary font-medium">
                          All iPhone Cases
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-primary">
                        35
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors group">
                      <span className="flex items-center gap-2">
                        <input defaultChecked className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-primary">
                          {"Tempered Glass & Optical"}
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-primary">
                        7
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors group">
                      <span className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-primary">
                          MagSafe Charging Wallets
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant group-hover:text-primary">
                        3
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Material Substrate
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors">
                      <span className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Bayer Optical Polymer
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">
                        14
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors">
                      <span className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          9H Asahi AGC Glass
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">
                        7
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors">
                      <span className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Aviation Aluminum Armor
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">
                        12
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center justify-between p-1.5 rounded hover:bg-canvas-bg cursor-pointer transition-colors">
                      <span className="flex items-center gap-2">
                        <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Oleophobic Matte Frosted
                        </span>
                      </span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant">
                        9
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Engineered Features
                  </div>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-canvas-bg cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        MagSafe Qi2 Certified (15W)
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-canvas-bg cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        14-ft Mil-Grade Impact
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-canvas-bg cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        1-Yr Zero-Yellow Guarantee
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-canvas-bg cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        EZ-Align Optical Applicator
                      </span>
                    </label>
                    {" "}
                    <label className="flex items-center gap-2 p-1.5 rounded hover:bg-canvas-bg cursor-pointer">
                      <input className="w-4 h-4 rounded text-primary accent-primary" type="checkbox" />
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        28° Anti-Spy Microlouver
                      </span>
                    </label>
                  </div>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Price Range (INR)
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <button className="py-1.5 px-2 bg-canvas-bg text-on-surface-variant text-label-sm font-label-sm rounded hover:text-primary hover:bg-surface-container transition-colors shadow-sm" type="button">
                      Under ₹999
                    </button>
                    <button className="py-1.5 px-2 bg-primary text-on-primary text-label-sm font-label-sm rounded font-medium shadow-sm" type="button">
                      ₹999 - ₹1,499
                    </button>
                    <button className="py-1.5 px-2 bg-canvas-bg text-on-surface-variant text-label-sm font-label-sm rounded hover:text-primary hover:bg-surface-container transition-colors shadow-sm col-span-2" type="button">
                      ₹1,500 - ₹2,499
                    </button>
                  </div>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    {"Color & Finish"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Natural Titanium" className="w-6 h-6 rounded-full bg-[#A8A49F] shadow-sm hover:scale-110 transition-transform active:scale-95" title="Natural Titanium" />
                    <button aria-label="Clear Frost" className="w-6 h-6 rounded-full bg-[#ECEEEF] shadow-sm hover:scale-110 transition-transform active:scale-95" title="Clear Ultra-Frost" />
                    <button aria-label="Deep Obsidian" className="w-6 h-6 rounded-full bg-[#1F2022] shadow-sm hover:scale-110 transition-transform active:scale-95" title="Deep Obsidian" />
                    <button aria-label="Desert Titanium" className="w-6 h-6 rounded-full bg-[#D5C1AA] shadow-sm hover:scale-110 transition-transform active:scale-95" title="Desert Titanium" />
                  </div>
                </div>
                <div className="pt-space-xs bg-canvas-bg p-space-sm rounded-lg shadow-sm space-y-1 text-on-surface-variant">
                  <div className="flex items-center gap-1.5 font-label-sm text-label-sm font-semibold text-primary">
                    <span className="material-symbols-outlined text-[16px] text-status-verified">
                      verified_user
                    </span>
                    <span>
                      Zero-Hassle Fit Policy
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] leading-snug">
                    Every mold tested directly on Apple production chassis units. Immediate replacement if fit tolerance exceeds 0.05mm.
                  </p>
                </div>
              </aside>
              <main className="lg:col-span-9 space-y-space-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
                  {shown.map((p) => (
                    <ProductCard key={p.id} id={p.id} />
                  ))}
                  {pill === "all" && (
                  <aside className="bg-primary text-on-primary rounded-xl p-space-lg flex flex-col justify-between shadow-md relative overflow-hidden">
                    <div className="space-y-space-sm relative z-10">
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider inline-block">
                        Case + Glass Combo
                      </span>
                      <h3 className="font-headline-md text-headline-md font-semibold tracking-tight text-on-primary">
                        {COMBO.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-primary/80 leading-relaxed">
                        {COMBO.feat}.
                      </p>
                      <div className="pt-space-xs space-y-1 text-on-primary/90 font-label-sm text-label-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-status-verified">
                            check_circle
                          </span>
                          <span>
                            Zero gap fit guaranteed
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-status-verified">
                            check_circle
                          </span>
                          <span>
                            Free express air dispatch
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-space-md relative z-10 space-y-space-xs">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-lg text-price-lg font-bold text-on-primary">
                          {inr(COMBO.price)}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-primary/50 line-through">
                          {inr(COMBO.mrp)}
                        </span>
                        <span className="font-label-sm text-label-sm text-status-verified font-bold">
                          {"Bundle Save "}{inr(COMBO.mrp - COMBO.price)}
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-canvas-bg text-primary hover:bg-surface-card font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95" onClick={addCombo} type="button">
                        <span>
                          {added ? "Added ✓" : "Add Combo"}
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </aside>
                  )}
                </div>
                <div className="pt-space-md bg-surface-card p-space-md rounded-xl font-body-sm text-body-sm text-on-surface-variant">
                  {"Showing "}
                  <span className="font-semibold text-primary">
                    {shown.length}
                  </span>
                  {" products"}
                </div>
              </main>
            </div>
          </div>
        </section>
        <section className="w-full bg-surface-card py-space-xl">
          <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
            <div className="bg-canvas-bg p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
              <div className="space-y-space-xs max-w-xl">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                  Broad Compatibility Ecosystem
                </div>
                <h2 className="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
                  Shopping for a different iPhone?
                </h2>
                <p id="col-compat-help" className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {`Covers and glass for every model from ${MODEL_SERIES.at(-1).name} to ${MODEL_SERIES[0].name}. Search for yours, or tick several to shop for the whole family.`}
                </p>
              </div>
              <div className="w-full md:w-[360px] shrink-0">
                <span id="col-compat-label" className="sr-only">
                  iPhone models
                </span>
                <ModelPicker value={devices} onChange={setDevices} labelledBy="col-compat-label" describedBy="col-compat-help" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-lg">
              <div className="bg-canvas-bg p-space-md rounded-xl shadow-sm flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-card flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    straighten
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-label-lg text-label-lg text-primary font-semibold">
                    0.05mm Precision Guarantee
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Each case and protector undergoes optical laser scanning for millimeter-perfect fitment.
                  </p>
                </div>
              </div>
              <div className="bg-canvas-bg p-space-md rounded-xl shadow-sm flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-card flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    swap_horiz
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-label-lg text-label-lg text-primary font-semibold">
                    Immediate Transit Replacement
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Damaged during transit? Upload an unboxing clip for an instant replacement dispatch.
                  </p>
                </div>
              </div>
              <div className="bg-canvas-bg p-space-md rounded-xl shadow-sm flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-card flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    flight_takeoff
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-label-lg text-label-lg text-primary font-semibold">
                    Free Express Air Across India
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    All orders above ₹999 qualify for express air courier dispatch with live tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <dialog data-lenis-prevent className="p-0 bg-transparent backdrop:bg-primary/40 backdrop:backdrop-blur-sm max-w-sm w-full h-full max-h-screen fixed inset-y-0 right-0 mr-0 ml-auto rounded-none shadow-2xl flex-col" ref={mobileFilterRef}>
          <div className="bg-canvas-bg h-full w-full p-space-md flex flex-col justify-between overflow-y-auto">
            <div className="space-y-space-md">
              <div className="flex items-center justify-between pb-2">
                <div className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Filters
                </div>
                <button className="w-8 h-8 rounded-full bg-surface-card flex items-center justify-center text-on-surface-variant" onClick={() => mobileFilterRef.current.close()} type="button">
                  <span className="material-symbols-outlined text-[20px]">
                    close
                  </span>
                </button>
              </div>
              <div className="space-y-space-xs">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Product Type
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input defaultChecked className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      MagSafe Clear Cases (14)
                    </span>
                  </label>
                  {" "}
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input defaultChecked className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      Rugged Drop Armor (12)
                    </span>
                  </label>
                  {" "}
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input defaultChecked className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      9H Tempered Protectors (7)
                    </span>
                  </label>
                  {" "}
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input defaultChecked className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      28° Privacy Glass (4)
                    </span>
                  </label>
                </div>
              </div>
              <div className="space-y-space-xs pt-space-xs">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Substrate
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      Bayer Optical Polymer
                    </span>
                  </label>
                  {" "}
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      9H Asahi AGC Glass
                    </span>
                  </label>
                  {" "}
                  <label className="flex items-center gap-2 text-body-sm font-body-sm text-primary">
                    <input className="w-4 h-4 text-primary accent-primary" type="checkbox" />
                    <span>
                      Grade 5 Titanium Armor
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="pt-space-md space-y-2">
              <button className="w-full h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-semibold shadow-sm" onClick={() => mobileFilterRef.current.close()} type="button">
                Show {shown.length} Products
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </main>
  );
}
