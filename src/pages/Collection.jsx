import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStore } from "../store.jsx";
import DeviceModal from "../components/DeviceModal.jsx";

const PILLS = ["All Products (42)","Clear MagSafe (14)","Shockproof Armor (12)","Everyday Slim (9)","9H Tempered Glass (7)","28° Privacy Glass (4)"];

export default function Collection() {
  const { device, addToCart } = useStore();
  const [pill, setPill] = useState(PILLS[0]);
  const [wish, setWish] = useState(() => new Set());
  const [added, setAdded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sidebarRef = useRef(null);
  const mobileFilterRef = useRef(null);

  const toggleWish = (name) =>
    setWish((w) => {
      const next = new Set(w);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  const quickAdd = (id) => {
    addToCart(id);
    setAdded(id);
    setTimeout(() => setAdded((a) => (a === id ? null : a)), 1500);
  };
  // Filter checkboxes are uncontrolled, so clearing them directly is fine.
  const resetFilters = () => sidebarRef.current.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false));

  return (
    <main className="w-full pt-[106px] bg-canvas-bg min-h-screen">
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
                iPhone 17 Pro
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
                  {"iPhone 17 Pro Cases & Optical Glass"}
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  Precision-engineered aerospace armor, crystal-clear non-yellowing composites, and 9H tempered optical protectors tailored exclusively for Apple iPhone 17 Pro (6.3-inch).
                </p>
              </div>
              <div className="flex items-center bg-surface-card p-3 rounded-xl shadow-sm gap-space-md self-start lg:self-auto shrink-0">
                <div className="w-10 h-10 rounded-lg bg-canvas-bg flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">
                    devices
                  </span>
                </div>
                <div className="space-y-0.5">
                  <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Configured For
                  </div>
                  <div className="font-label-lg text-label-lg text-primary font-semibold flex items-center gap-1.5">
                    <span>
                      {device}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                  </div>
                </div>
                <button className="px-3 py-1.5 text-label-sm font-label-sm font-semibold rounded bg-canvas-bg text-secondary hover:bg-secondary hover:text-on-secondary transition-all shadow-sm" onClick={() => setModalOpen(true)} type="button">
                  Change
                </button>
              </div>
            </div>
            <div className="pt-space-xs flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {PILLS.map((p) => (
                <button key={p} className={`px-4 py-2 rounded-xl font-label-md text-label-md whitespace-nowrap transition-all ${p === pill ? "font-semibold bg-primary text-on-primary shadow-sm" : "font-medium bg-surface-card text-on-surface-variant hover:text-primary hover:bg-surface-container-high"}`} onClick={() => setPill(p)} type="button">
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-space-xs bg-surface-card/60 p-space-sm rounded-xl">
              <div className="flex items-center gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
                <span className="font-semibold text-primary">
                  42 Items
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
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Bestseller
                        </span>
                        <button aria-label="Wishlist AeroShield Clear" aria-pressed={wish.has("AeroShield Clear")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("AeroShield Clear") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("AeroShield Clear")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("AeroShield Clear") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="AeroShield Clear MagSafe Case for iPhone 17 Pro" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqLsrsRhO_OHeZVUsbU31OaZSbIQm3hc8mP20RqBag-Sf3hiAntVuC5vh0XMvvTS3VNd0KKUdu1vJ43Cvo6H98PE2zw_e3Fg8XryuQSIqdPczfU0cVYLnw5KIrazKJQot02VpxvJ_BZ_jJHy3L58eoQo5mCSp38e0QoYvrPuFBQaBpKUaMNxxxEKyyjEtKlpZjNTxHGekzo0WyJBHiGYaAmv8CLzG2qndA8lthPlD_2bpvBwvTYDNvQ" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#E5E5E5] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#8A8886] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#1C1C1E] shadow-sm inline-block" />
                          <span className="font-label-sm text-[11px] text-on-surface-variant ml-1">
                            +3 Finishes
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          <Link to="/product" className="hover:underline">
                            AeroShield Clear MagSafe Case
                          </Link>
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          Integrated N52 Neodymium Ring • Non-Yellowing Bayer
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.9
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (342 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹1,499
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹2,199
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          32% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("aeroshield")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "aeroshield" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Must-Have Bundle
                        </span>
                        <button aria-label="Wishlist OptiGlass 2-Pack" aria-pressed={wish.has("OptiGlass 2-Pack")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("OptiGlass 2-Pack") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("OptiGlass 2-Pack")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("OptiGlass 2-Pack") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="OptiGlass 9H Edge-to-Edge 2-Pack with Alignment Applicator" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqLsrsRhO_OHeZVUsbU31OaZSbIQm3hc8mP20RqBag-Sf3hiAntVuC5vh0XMvvTS3VNd0KKUdu1vJ43Cvo6H98PE2zw_e3Fg8XryuQSIqdPczfU0cVYLnw5KIrazKJQot02VpxvJ_BZ_jJHy3L58eoQo5mCSp38e0QoYvrPuFBQaBpKUaMNxxxEKyyjEtKlpZjNTxHGekzo0WyJBHiGYaAmv8CLzG2qndA8lthPlD_2bpvBwvTYDNvQ" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="px-2 py-0.5 rounded bg-canvas-bg font-label-sm text-[11px] text-secondary font-semibold">
                            Includes EZ-Align Tool
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          OptiGlass 9H Edge-to-Edge [2-Pack]
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          Japanese Asahi AGC • 2.5D Polished Radius Edge
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.8
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (518 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹799
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹1,299
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          38% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("optiglass")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "optiglass" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-surface-card text-on-surface font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Mil-Spec Drop
                        </span>
                        <button aria-label="Wishlist ArmorMatrix DropGuard" aria-pressed={wish.has("ArmorMatrix DropGuard")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("ArmorMatrix DropGuard") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("ArmorMatrix DropGuard")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("ArmorMatrix DropGuard") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="ArmorMatrix Rugged DropGuard Military Protection Case" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB811jWBTFFHLUZr9UA-9aCbZWmU9A-pzAOtrgpneywqEe7HTaHQ2DanuXtLTihuIHMi4SFFcI0NhD-negPtlNwg74s441p-JKlI1qqBeZqUpfYF3ntwHLai2QI3eEnKRywuoglbFJSxGKf8yY5jBSyhI0F0wRQyAWvrTE1E_Bth3M0Hq1EOrjv8prI2h00TeT-nE5Lbv6K2n0BASR8VF0nrqP-yWa3UgdKePUYRjlkq_ajU3IE61HzBw" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#181818] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#3B4252] shadow-sm inline-block" />
                          <span className="font-label-sm text-[11px] text-on-surface-variant ml-1">
                            Tactile Metal Buttons
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          ArmorMatrix Rugged DropGuard
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          14-ft Military Grade • Anodized Aluminum Accents
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.9
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (189 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹1,799
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹2,499
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          28% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("armormatrix")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "armormatrix" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-canvas-bg text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider shadow-sm">
                          2-Way Privacy
                        </span>
                        <button aria-label="Wishlist PrivacyPro Glass" aria-pressed={wish.has("PrivacyPro Glass")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("PrivacyPro Glass") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("PrivacyPro Glass")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("PrivacyPro Glass") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="PrivacyPro 28 Degree Anti Spy Polarized Glass" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqLsrsRhO_OHeZVUsbU31OaZSbIQm3hc8mP20RqBag-Sf3hiAntVuC5vh0XMvvTS3VNd0KKUdu1vJ43Cvo6H98PE2zw_e3Fg8XryuQSIqdPczfU0cVYLnw5KIrazKJQot02VpxvJ_BZ_jJHy3L58eoQo5mCSp38e0QoYvrPuFBQaBpKUaMNxxxEKyyjEtKlpZjNTxHGekzo0WyJBHiGYaAmv8CLzG2qndA8lthPlD_2bpvBwvTYDNvQ" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="px-2 py-0.5 rounded bg-canvas-bg font-label-sm text-[11px] text-on-surface-variant">
                            Micro-Louver Polarized
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          PrivacyPro 28° Anti-Spy Glass
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          28-Degree Blackout Angle • Oleophobic Coating
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.7
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (214 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹999
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹1,499
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          33% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("privacypro")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "privacypro" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <button aria-label="Wishlist Frosted Matte" aria-pressed={wish.has("Frosted Matte")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("Frosted Matte") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("Frosted Matte")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("Frosted Matte") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="AeroShield Frosted Matte Finish iPhone 17 Pro Case" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB811jWBTFFHLUZr9UA-9aCbZWmU9A-pzAOtrgpneywqEe7HTaHQ2DanuXtLTihuIHMi4SFFcI0NhD-negPtlNwg74s441p-JKlI1qqBeZqUpfYF3ntwHLai2QI3eEnKRywuoglbFJSxGKf8yY5jBSyhI0F0wRQyAWvrTE1E_Bth3M0Hq1EOrjv8prI2h00TeT-nE5Lbv6K2n0BASR8VF0nrqP-yWa3UgdKePUYRjlkq_ajU3IE61HzBw" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#E5E5E5] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#27272A] shadow-sm inline-block" />
                          <span className="font-label-sm text-[11px] text-on-surface-variant ml-1">
                            Fingerprint-Resistant
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          AeroShield Frosted Matte Case
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          Silky Oleophobic Anti-Smudge Touch • Qi2 Ready
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.8
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (92 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹1,399
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹1,999
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          30% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("frosted")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "frosted" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Grade 5 Titanium
                        </span>
                        <button aria-label="Wishlist Titanium Edge" aria-pressed={wish.has("Titanium Edge")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("Titanium Edge") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("Titanium Edge")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("Titanium Edge") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="Titanium Edge MagSafe Shield Case with Camera Perimeter" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB811jWBTFFHLUZr9UA-9aCbZWmU9A-pzAOtrgpneywqEe7HTaHQ2DanuXtLTihuIHMi4SFFcI0NhD-negPtlNwg74s441p-JKlI1qqBeZqUpfYF3ntwHLai2QI3eEnKRywuoglbFJSxGKf8yY5jBSyhI0F0wRQyAWvrTE1E_Bth3M0Hq1EOrjv8prI2h00TeT-nE5Lbv6K2n0BASR8VF0nrqP-yWa3UgdKePUYRjlkq_ajU3IE61HzBw" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#8E8B85] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#424244] shadow-sm inline-block" />
                          <span className="font-label-sm text-[11px] text-on-surface-variant ml-1">
                            Precision CNC Ring
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          Titanium Edge MagSafe Shield
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          Grade 5 Titanium Camera Perimeter • Clear Back
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.9
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (112 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹1,899
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹2,699
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          30% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("titanium")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "titanium" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <button aria-label="Wishlist OptiGlass Single Pack" aria-pressed={wish.has("OptiGlass Single Pack")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("OptiGlass Single Pack") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("OptiGlass Single Pack")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("OptiGlass Single Pack") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="OptiGlass Ultra Clear Single Tempered Glass Protector" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbqLsrsRhO_OHeZVUsbU31OaZSbIQm3hc8mP20RqBag-Sf3hiAntVuC5vh0XMvvTS3VNd0KKUdu1vJ43Cvo6H98PE2zw_e3Fg8XryuQSIqdPczfU0cVYLnw5KIrazKJQot02VpxvJ_BZ_jJHy3L58eoQo5mCSp38e0QoYvrPuFBQaBpKUaMNxxxEKyyjEtKlpZjNTxHGekzo0WyJBHiGYaAmv8CLzG2qndA8lthPlD_2bpvBwvTYDNvQ" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="px-2 py-0.5 rounded bg-canvas-bg font-label-sm text-[11px] text-on-surface-variant">
                            Single Replacement
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          OptiGlass Ultra-Clear Single Pack
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          9H Mohs Hardness • 2.5D Polished Oleophobic
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.8
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (310 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹499
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹899
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          44% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("optisingle")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "optisingle" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <article className="group bg-surface-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative bg-surface-container aspect-square overflow-hidden flex items-center justify-center p-space-md">
                        <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-surface-card text-on-surface font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                          Zinc Kickstand
                        </span>
                        <button aria-label="Wishlist Tactical Kickstand" aria-pressed={wish.has("Tactical Kickstand")} className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-canvas-bg/90 backdrop-blur-md flex items-center justify-center ${wish.has("Tactical Kickstand") ? "text-status-sale" : "text-on-surface-variant"} hover:text-status-sale transition-colors shadow-sm`} onClick={() => toggleWish("Tactical Kickstand")} type="button">
                          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: wish.has("Tactical Kickstand") ? "'FILL' 1" : "'FILL' 0" }}>
                            favorite
                          </span>
                        </button>
                        <img alt="ArmorMatrix Tactical Kickstand Case with Zinc Alloy" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB811jWBTFFHLUZr9UA-9aCbZWmU9A-pzAOtrgpneywqEe7HTaHQ2DanuXtLTihuIHMi4SFFcI0NhD-negPtlNwg74s441p-JKlI1qqBeZqUpfYF3ntwHLai2QI3eEnKRywuoglbFJSxGKf8yY5jBSyhI0F0wRQyAWvrTE1E_Bth3M0Hq1EOrjv8prI2h00TeT-nE5Lbv6K2n0BASR8VF0nrqP-yWa3UgdKePUYRjlkq_ajU3IE61HzBw" />
                      </div>
                      <div className="p-space-md space-y-space-xs">
                        <div className="flex items-center gap-1.5 pb-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#1A1A1A] shadow-sm inline-block" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#4F5B66] shadow-sm inline-block" />
                          <span className="font-label-sm text-[11px] text-on-surface-variant ml-1">
                            0°-120° Free Stop
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold leading-snug group-hover:text-secondary transition-colors">
                          ArmorMatrix Tactical Kickstand Case
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                          Integrated Low-Profile Zinc Alloy Stand • 12-ft Drop
                        </p>
                        <div className="flex items-center gap-space-xs text-body-sm font-body-sm pt-0.5">
                          <div className="flex items-center text-primary">
                            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>
                              star
                            </span>
                            <span className="font-semibold ml-1">
                              4.9
                            </span>
                          </div>
                          <span className="text-on-surface-variant">
                            (76 verified reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-space-md pt-0 space-y-space-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          ₹1,999
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                          ₹2,799
                        </span>
                        <span className="font-label-sm text-label-sm font-bold text-status-sale">
                          29% OFF
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onClick={() => quickAdd("kickstandcase")} type="button">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_bag
                        </span>
                        <span>
                          {added === "kickstandcase" ? "Added ✓" : "Quick Add to Bag"}
                        </span>
                      </button>
                    </div>
                  </article>
                  <aside className="bg-primary text-on-primary rounded-xl p-space-lg flex flex-col justify-between shadow-md relative overflow-hidden">
                    <div className="space-y-space-sm relative z-10">
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold uppercase tracking-wider inline-block">
                        Caseform Double Armor Pack
                      </span>
                      <h3 className="font-headline-md text-headline-md font-semibold tracking-tight text-on-primary">
                        AeroShield Case + OptiGlass 2-Pack
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-primary/80 leading-relaxed">
                        Protect both screen and chassis simultaneously. Get an extra 15% automatic cart discount when purchased together.
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
                          ₹1,950
                        </span>
                        <span className="font-body-sm text-body-sm text-on-primary/50 line-through">
                          ₹3,498
                        </span>
                        <span className="font-label-sm text-label-sm text-status-verified font-bold">
                          Bundle Save ₹1,548
                        </span>
                      </div>
                      <button className="w-full h-11 rounded-lg bg-canvas-bg text-primary hover:bg-surface-card font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95" type="button">
                        <span>
                          Add Duo Pack
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </aside>
                </div>
                <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-card p-space-md rounded-xl">
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {"Showing "}
                    <span className="font-semibold text-primary">
                      8
                    </span>
                    {" of "}
                    <span className="font-semibold text-primary">
                      42
                    </span>
                    {" precision-fitted products"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-lg bg-canvas-bg text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors shadow-sm disabled:opacity-40" disabled type="button">
                      Previous
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm" type="button">
                      1
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-canvas-bg text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container transition-colors shadow-sm" type="button">
                      2
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-canvas-bg text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container transition-colors shadow-sm" type="button">
                      3
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-canvas-bg text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors shadow-sm" type="button">
                      Next
                    </button>
                  </div>
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
                  Looking for iPhone 16 Pro, 16, or earlier generations?
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  We mill dedicated bespoke armor and zero-dust applicator glass for every Apple flagship model from iPhone 13 Pro through iPhone 17 Pro Max.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm shrink-0">
                <button className="h-12 px-space-lg bg-canvas-bg text-primary hover:bg-surface-card font-label-lg text-label-lg font-medium rounded-lg shadow-sm transition-colors" type="button">
                  iPhone 17 Pro Max
                </button>
                <button className="h-12 px-space-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium rounded-lg shadow-sm transition-colors" type="button">
                  Browse All iPhone Models
                </button>
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
        {modalOpen && <DeviceModal onClose={() => setModalOpen(false)} />}
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
                Show 42 Products
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </main>
  );
}
