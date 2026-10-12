import { useState } from "react";

const ROWS = [0, 1, 2, 3, 4];

export default function Inventory() {
  const [selected, setSelected] = useState(() => new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [skuType, setSkuType] = useState("AIR");
  const [skuSeries, setSkuSeries] = useState("IP17P");
  const [toast, setToast] = useState(null);

  const allSelected = selected.size === ROWS.length;
  const sku = `CF-${skuType}-${skuSeries}-BLK`;
  const toggleRow = (i) =>
    setSelected((sel) => {
      const next = new Set(sel);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const batchSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      notify("Stock synchronized with Delhi, Mumbai and Bengaluru 3PL facilities.");
    }, 1000);
  };
  const publish = () => {
    setDrawerOpen(false);
    notify(`${sku} generated and synced with Indian fulfillment centers.`);
  };
  const applyPrices = () => {
    setPriceOpen(false);
    notify("Price modification job queued for all 42 store entries.");
  };

  return (
    <main className="relative pt-16 bg-surface min-h-screen">
      <div className="flex flex-col w-full">
        <div className="px-space-lg py-space-md bg-canvas-bg shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div>
              <nav className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                <span>
                  Console
                </span>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
                <span>
                  Hardware Catalog
                </span>
                <span className="material-symbols-outlined text-[14px]">
                  chevron_right
                </span>
                <span className="text-on-surface font-label-md">
                  All Products
                </span>
              </nav>
              <div className="flex items-center gap-3">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  {"Product Catalog & Hardware Matrix"}
                </h1>
                <span className="px-2 py-0.5 rounded-lg bg-surface-card text-on-surface font-label-sm text-label-sm">
                  42 ACTIVE SKUs
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Manage 42 active SKUs, device model compatibility assignments, stock levels, and real-time pricing across national fulfillment hubs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="h-10 px-3.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all flex items-center gap-2 shadow-sm" onClick={() => setPriceOpen(true)} type="button">
                <span className="material-symbols-outlined text-[18px]">
                  percent
                </span>
                Price Modifier
              </button>
              <button className={`h-10 px-3.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all flex items-center gap-2 shadow-sm ${syncing ? "opacity-75" : ""}`} onClick={batchSync} disabled={syncing} type="button">
                <span className={`material-symbols-outlined text-[18px] ${syncing ? "animate-spin" : ""}`}>
                  autorenew
                </span>
                Batch Stock Sync
              </button>
              <button className="h-10 px-3.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">
                  file_download
                </span>
                CSV Export
              </button>
              <button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all flex items-center gap-2 shadow-md" onClick={() => setDrawerOpen(true)} type="button">
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                + Add New Product
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-space-md pt-space-sm">
            <div className="p-3 rounded-xl bg-surface-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span>
                  Active In-Stock
                </span>
                <span className="w-2 h-2 rounded-full bg-status-verified" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                  18,420
                </span>
                <span className="font-label-sm text-label-sm text-status-verified font-medium">
                  94.2% Health
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span>
                  Critical Low Stock
                </span>
                <span className="w-2 h-2 rounded-full bg-status-sale" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-price-lg text-price-lg text-error font-semibold">
                  3 SKUs
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {"Threshold < 25"}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span>
                  Gross Stock Value
                </span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  account_balance_wallet
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                  ₹1.84 Cr
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  INR (Landing)
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-card flex flex-col justify-between">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                <span>
                  30D Catalog Velocity
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  trending_up
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-price-lg text-price-lg text-on-surface font-semibold">
                  4,890 units
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  +18.4% MoM
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-space-lg py-space-sm bg-surface-card flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              {" "}
              <input className="w-full h-10 pl-9 pr-4 rounded-xl bg-canvas-bg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary transition-all shadow-sm" id="catalogSearchInput" placeholder="Search SKU, Product Name, Barcode (EAN-13), or iPhone Model..." type="text" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm">
                  <option>
                    All Categories
                  </option>
                  <option>
                    {"Cases (MagSafe & Hybrid)"}
                  </option>
                  <option>
                    Tempered Glass (9H Asahi)
                  </option>
                  <option>
                    Armor Tactical Packs
                  </option>
                  <option>
                    {"Titanium & Metal Bumpers"}
                  </option>
                </select>
                {" "}
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <div className="relative">
                <select className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm">
                  <option>
                    All Device Series
                  </option>
                  <option>
                    iPhone 17 Series (New)
                  </option>
                  <option>
                    iPhone 16 Series
                  </option>
                  <option>
                    iPhone 15 Series
                  </option>
                  <option>
                    Legacy Molds (14/13 Series)
                  </option>
                </select>
                {" "}
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <div className="relative">
                <select className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm">
                  <option>
                    All Stock Statuses
                  </option>
                  <option>
                    {"In Stock (>25 units)"}
                  </option>
                  <option>
                    {"Low Stock Alert (<25 units)"}
                  </option>
                  <option>
                    Out of Stock (0 units)
                  </option>
                  <option>
                    Archived / End of Life
                  </option>
                </select>
                {" "}
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <div className="relative">
                <select className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer shadow-sm">
                  <option>
                    All Materials
                  </option>
                  <option>
                    Covestro Polycarbonate
                  </option>
                  <option>
                    Asahi AGC 9H Glass
                  </option>
                  <option>
                    Grade 5 Titanium Alloy
                  </option>
                  <option>
                    Aramid Fiber 1500D
                  </option>
                </select>
                {" "}
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-canvas-bg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shadow-sm" title="Reset Filters">
                <span className="material-symbols-outlined text-[18px]">
                  filter_alt_off
                </span>
              </button>
            </div>
          </div>
          <div className={`${selected.size ? "flex" : "hidden"} items-center justify-between px-4 py-2.5 rounded-xl bg-primary text-on-primary shadow-md`}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                checklist
              </span>
              <span className="font-label-md text-label-md font-semibold">
                <span>
                  {selected.size}
                </span>
                {" items selected"}
              </span>
              <span className="font-label-sm text-label-sm text-surface-dim">
                Select all 42 matching entries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  sell
                </span>
                Adjust Price
              </button>
              <button className="h-8 px-3 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  warehouse
                </span>
                Update Stock
              </button>
              <button className="h-8 px-3 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  sync_alt
                </span>
                Change Compatibility
              </button>
              <div className="w-px h-5 bg-on-primary/20 mx-1" />
              <button className="h-8 px-3 rounded-lg bg-status-sale hover:bg-error text-on-primary font-label-sm text-label-sm flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[16px]">
                  archive
                </span>
                Archive / Delete
              </button>
            </div>
          </div>
        </div>
        <div className="px-space-lg py-space-md">
          <div className="bg-canvas-bg rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-card text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider select-none">
                    <th className="py-3.5 px-4 w-12 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select all rows" type="checkbox" checked={allSelected} onChange={(e) => setSelected(e.target.checked ? new Set(ROWS) : new Set())} />
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      {"Product & SKU Identifier"}
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      Device Compatibility Matrix
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      Inventory (Hubs / Reserved)
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      {"MRP & Selling Price"}
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      Sales Velocity (30D)
                    </th>
                    <th className="py-3.5 px-4 font-label-md">
                      Status
                    </th>
                    <th className="py-3.5 px-4 font-label-md text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-card">
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-4 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select row 1" type="checkbox" checked={selected.has(0)} onChange={() => toggleRow(0)} />
                    </td>
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-surface-card overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 shadow-inner">
                          <img className="w-full h-full object-contain" data-alt="Aerospace-grade ultra clear transparent polycarbonate MagSafe phone case resting on clean off-white studio surface with crisp lighting reflections and magnetic coil detailing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlxXGLHC2j5t1TiokDOLsOY2Bkjo0AbvPdWMlSp2AaO2XHsg0oJQCRnuoDkUBke_5tQ6qbRC53gEN8k4F_ObW1UXy9s854uPNJBI508MhQxPUdx1ca466WslskQBVRd7PMF26ok-QYucQn0zfqt6zzx62RIA6nqfhADyk_I1n7GuP0kfvfWu2B3z01Vgho6wj98BkKstLKu-rApmblcpVgt8zViEJ_1Ac2Fcaemj32VS4K-H9506B56Q" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate group-hover:text-secondary transition-colors cursor-pointer">
                            AeroShield Clear MagSafe Case
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                            CF-AIR-IP17P-NAT
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-card text-on-surface-variant">
                              Optical Clear PC
                            </span>
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed">
                              N52 Magnets
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            iPhone 17 Pro (6.3")
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                            A2890
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[14px] text-status-verified">
                            verified
                          </span>
                          <span>
                            1:1 Mold Calibrated (CNC Verified)
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline">
                          + Assign More Models
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[210px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            412
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            total units
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                          <span className="text-status-verified font-medium">
                            384 Available
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            28 Reserved
                          </span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-status-verified h-full rounded-full" style={{width: "82%"}} />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          BLR Hub Tier-1 (Rack B-14)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-md text-price-md font-semibold text-on-surface">
                            ₹1,499
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            ₹2,199
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-card text-status-verified font-semibold">
                            32% OFF
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Margin: 68%
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          GST 18% Included
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          1,120 units sold
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ₹16,78,880 Rev
                        </span>
                        <div className="flex items-center gap-1 text-status-verified font-label-sm text-label-sm mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            trending_up
                          </span>
                          <span>
                            Top Performer
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card text-status-verified font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-verified animate-pulse" />
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Edit Product">
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Clone SKU">
                          <span className="material-symbols-outlined text-[18px]">
                            content_copy
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Quick Stock Adjustment">
                          <span className="material-symbols-outlined text-[18px]">
                            warehouse
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center transition-colors" title="Archive / Delete">
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-4 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select row 2" type="checkbox" checked={selected.has(1)} onChange={() => toggleRow(1)} />
                    </td>
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-surface-card overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 shadow-inner">
                          <img className="w-full h-full object-contain" data-alt="Tempered glass screen protector kit with precision alignment tray and microfiber cloth placed on minimal neutral table surface with subtle studio illumination" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCceBLNaj4zeqBecin7ybjuq4167G7_2tpQ6ANSoQnSK-kYgAah3xMjZZzP5aaNp0dqQDB0lQieJMzAFVwP2gJkbx06tZKcdDFTU1nb2oUihPtJ2l88UZGoKBpDfwZR2YN9D-fjo95e6xVxmnK5C7V2LLynMp0p2iONsZg6puJ1nnw1ps4WXniINB1b9WMzRYxr54kGAhDQu2sgDTkGgULbd9xTETY-di3elQGYsy1t6WuFouIBKDGj0g" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate group-hover:text-secondary transition-colors cursor-pointer">
                            OptiGlass 9H Edge-to-Edge [2-Pack]
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                            CF-GLS-IP17P-2PK
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-card text-on-surface-variant">
                              Asahi AGC 0.33mm
                            </span>
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface">
                              EZ-Tray Box
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            iPhone 17 Pro (6.3")
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                            Dynamic Island Fit
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            layers
                          </span>
                          <span>
                            Oleophobic AF Coating (115°)
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline">
                          + Cross-Compatible 1 Model
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[210px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            850
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            total units
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                          <span className="text-status-verified font-medium">
                            812 Available
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            38 Reserved
                          </span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-status-verified h-full rounded-full" style={{width: "95%"}} />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          BOM Hub Tier-1 (Rack G-02)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-md text-price-md font-semibold text-on-surface">
                            ₹799
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            ₹1,299
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-card text-status-verified font-semibold">
                            38% OFF
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Margin: 72%
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          GST 18% Included
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          940 units sold
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ₹7,51,060 Rev
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            shopping_cart_checkout
                          </span>
                          <span>
                            High Attach Rate (62%)
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card text-status-verified font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Edit Product">
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Clone SKU">
                          <span className="material-symbols-outlined text-[18px]">
                            content_copy
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Quick Stock Adjustment">
                          <span className="material-symbols-outlined text-[18px]">
                            warehouse
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center transition-colors" title="Archive / Delete">
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-4 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select row 3" type="checkbox" checked={selected.has(2)} onChange={() => toggleRow(2)} />
                    </td>
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-surface-card overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 shadow-inner">
                          <img className="w-full h-full object-contain" data-alt="Matte black heavy duty rugged shockproof smartphone armor case with knurled grip texture and reinforced bumper corners on clean neutral studio backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIZmJpXcYkW8SUstQaFPWfpJAdar0gwn5QYt21AykNwZlbDSZwUehwmUoezgKFKJaxDYrX9DT-wlTSEBZZOWLJCSx5_kRAQ9s4UL7gjWEU3G_OtbMDT9GO3g2Xz0hLuKz7WEc45sDtWzTZZGW0t04VUJpOocWr8ebj80A-4vAxQgrpoHmY9tubutd3fCa-jb3iwFNCnYJelNLf_kQeKCV72KSROxSU8rbvN-vr9kfvq-Be7wcuFc4wSA" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate group-hover:text-secondary transition-colors cursor-pointer">
                            ArmorMatrix Rugged DropGuard
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                            CF-RUG-IP17PM-OBS
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-card text-on-surface-variant">
                              Obsidian Black
                            </span>
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface">
                              MIL-STD-810H
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            iPhone 17 Pro Max (6.9")
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                            Dual Injected
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                            shield
                          </span>
                          <span>
                            16ft Drop Resistance
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Dedicated Camera Island Guard
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[210px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-headline-sm text-headline-sm text-error font-semibold">
                            24
                          </span>
                          <span className="font-body-sm text-body-sm text-error font-medium">
                            units left
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                          <span className="text-error font-semibold">
                            Reorder Alert (PO #8841)
                          </span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-error h-full rounded-full" style={{width: "14%"}} />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          BLR Hub Tier-1 (Re-stock ETA: 3 Days)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-md text-price-md font-semibold text-on-surface">
                            ₹1,799
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            ₹2,499
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-card text-status-verified font-semibold">
                            28% OFF
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Margin: 64%
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          GST 18% Included
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          520 units sold
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ₹9,35,480 Rev
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            local_fire_department
                          </span>
                          <span>
                            Rapid Depletion
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card text-error font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
                        Low Stock
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button className="h-8 px-2.5 rounded-lg bg-surface-card hover:bg-surface-variant text-secondary font-label-sm text-label-sm flex items-center gap-1 transition-colors" title="Restock +500">
                          <span className="material-symbols-outlined text-[16px]">
                            add_box
                          </span>
                          +500
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Edit Product">
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center transition-colors" title="Archive / Delete">
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-4 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select row 4" type="checkbox" checked={selected.has(3)} onChange={() => toggleRow(3)} />
                    </td>
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-surface-card overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 shadow-inner">
                          <span className="material-symbols-outlined text-[28px] text-on-surface-variant">
                            visibility_off
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate group-hover:text-secondary transition-colors cursor-pointer">
                            PrivacyPro 28° Anti-Spy Optical Glass
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                            CF-GLS-IP16P-PVY
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-card text-on-surface-variant">
                              2-Way Micro-Louver
                            </span>
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface">
                              Black Bezel
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            iPhone 16 Pro (6.1")
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                            Legacy Base
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[14px]">
                            lock
                          </span>
                          <span>
                            28° Bilateral Privacy Screen
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline">
                          + Assign Models
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[210px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            280
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            total units
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                          <span className="text-status-verified font-medium">
                            265 Available
                          </span>
                          <span>
                            •
                          </span>
                          <span>
                            15 Reserved
                          </span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-status-verified h-full rounded-full" style={{width: "65%"}} />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          DEL Hub Tier-2 (Rack P-08)
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-md text-price-md font-semibold text-on-surface">
                            ₹999
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            ₹1,499
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-card text-status-verified font-semibold">
                            33% OFF
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Margin: 59%
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          GST 18% Included
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          310 units sold
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ₹3,09,690 Rev
                        </span>
                        <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            sync
                          </span>
                          <span>
                            Steady Cadence
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-card text-status-verified font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Edit Product">
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Clone SKU">
                          <span className="material-symbols-outlined text-[18px]">
                            content_copy
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center transition-colors" title="Archive / Delete">
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-4 text-center">
                      <input className="w-4 h-4 rounded accent-primary cursor-pointer" aria-label="Select row 5" type="checkbox" checked={selected.has(4)} onChange={() => toggleRow(4)} />
                    </td>
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-surface-card overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 shadow-inner">
                          <span className="material-symbols-outlined text-[28px] text-on-surface-variant">
                            precision_manufacturing
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate group-hover:text-secondary transition-colors cursor-pointer">
                            Titanium Edge MagSafe Shield - Grade 5
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider font-mono">
                            CF-TIT-IP17P-SIL
                          </span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-card text-on-surface-variant">
                              Raw Natural Silver
                            </span>
                            <span className="font-label-sm text-label-sm px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface">
                              CNC Machined
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-md text-label-md font-medium text-on-surface">
                            iPhone 17 Pro
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-label-sm text-label-sm">
                            Precision Chamfer
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="material-symbols-outlined text-[14px]">
                            tune
                          </span>
                          <span>
                            Tolerances +/- 0.02mm
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline">
                          1 Model Bound
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[210px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                          <span className="font-headline-sm text-headline-sm text-error font-semibold">
                            0
                          </span>
                          <span className="font-body-sm text-body-sm text-error font-medium">
                            Out of Stock
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mt-0.5">
                          <span>
                            Awaiting CNC Batch #109
                          </span>
                        </div>
                        <div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-surface-variant h-full rounded-full" style={{width: "0%"}} />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                          All Fulfillment Hubs Exhausted
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[170px]">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-price-md text-price-md font-semibold text-on-surface">
                            ₹1,899
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant line-through">
                            ₹2,699
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-card text-on-surface-variant font-semibold">
                            30% OFF
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Margin: 54%
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                          GST 18% Included
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          240 units sold
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          ₹4,55,760 Rev
                        </span>
                        <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">
                            notifications_active
                          </span>
                          <span>
                            142 Waitlisted Users
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error" />
                        Stock Exhausted
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button className="h-8 px-2.5 rounded-lg bg-surface-card hover:bg-surface-variant text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors" title="Notify Waitlist">
                          <span className="material-symbols-outlined text-[16px]">
                            notifications
                          </span>
                          Notify (142)
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors" title="Edit Product">
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-surface-card hover:bg-error-container text-on-surface-variant hover:text-error flex items-center justify-center transition-colors" title="Archive / Delete">
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-surface-card flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span>
                  {"Showing "}
                  <strong className="text-on-surface">
                    1 - 5
                  </strong>
                  {" of "}
                  <strong className="text-on-surface">
                    42
                  </strong>
                  {" Hardware SKUs"}
                </span>
                <span className="hidden md:inline">
                  •
                </span>
                <span className="hidden md:inline text-label-sm font-label-sm text-on-surface-variant">
                  Last automated sync at 14:32 IST via Shiprocket WMS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 px-3 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md opacity-50 cursor-not-allowed shadow-sm">
                  Previous
                </button>
                <button className="h-9 w-9 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm">
                  1
                </button>
                <button className="h-9 w-9 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-sm">
                  2
                </button>
                <button className="h-9 w-9 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-sm">
                  3
                </button>
                <span className="text-on-surface-variant px-1 font-label-sm">
                  ...
                </span>
                <button className="h-9 w-9 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-sm">
                  9
                </button>
                <button className="h-9 px-3 rounded-xl bg-canvas-bg text-on-surface font-label-md text-label-md hover:bg-surface-container shadow-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="mt-space-md p-space-md rounded-2xl bg-surface-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-canvas-bg flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px] text-on-surface">
                  gavel
                </span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {"Zero-Tolerance Fit Validation & Safeguard Policy"}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Deleting an SKU automatically unbinds it from active customer re-orders, prevents checkout in real time, and archives warranty claim references. Ensure stock is zero before permanent purge.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="h-9 px-3.5 rounded-xl bg-canvas-bg hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm">
                Audit Log History
              </button>
              <button className="h-9 px-3.5 rounded-xl bg-canvas-bg hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm">
                Configure Safeguards
              </button>
            </div>
          </div>
        </div>
        <div className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setDrawerOpen(false)}>
          <div className={`fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-canvas-bg shadow-2xl flex flex-col transition-transform duration-300 ease-out ${drawerOpen ? "" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="h-16 px-6 bg-surface-card flex items-center justify-between flex-shrink-0 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md">
                  CF
                </span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                    Add New Hardware Product
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Calibrated SKU Insertion Wizard
                  </span>
                </div>
              </div>
              <button className="w-9 h-9 rounded-xl bg-canvas-bg hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors shadow-sm" onClick={() => setDrawerOpen(false)} aria-label="Close">
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  {"1. Product Identity & Auto-SKU"}
                </span>
                <div className="space-y-3">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      Product Title *
                    </label>
                    {" "}
                    <input className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="e.g., AeroShield Frost MagSafe Matte Case" type="text" defaultValue="AeroShield Frost Armor Case" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                        Product Category *
                      </label>
                      {" "}
                      <select className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer" value={skuType} onChange={(e) => setSkuType(e.target.value)}>
                        <option value="AIR">
                          MagSafe Protective Case
                        </option>
                        <option value="GLS">
                          Tempered Glass (Asahi 9H)
                        </option>
                        <option value="RUG">
                          Rugged Tactical Armor
                        </option>
                        <option value="TIT">
                          Titanium Metal Hybrid
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                        Target Device Series *
                      </label>
                      {" "}
                      <select className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer" value={skuSeries} onChange={(e) => setSkuSeries(e.target.value)}>
                        <option value="IP17P">
                          iPhone 17 Pro (6.3")
                        </option>
                        <option value="IP17PM">
                          iPhone 17 Pro Max (6.9")
                        </option>
                        <option value="IP17">
                          iPhone 17 (Standard 6.3")
                        </option>
                        <option value="IP16P">
                          iPhone 16 Pro (6.1")
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-card flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase">
                        Calculated Catalog SKU
                      </span>
                      {" "}
                      <span className="font-headline-sm text-body-md font-mono font-semibold text-on-surface" aria-live="polite">
                        {sku}
                      </span>
                    </div>
                    <button className="h-8 px-2.5 rounded-lg bg-canvas-bg hover:bg-surface-container text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[14px]">
                        refresh
                      </span>
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  2. Hardware Compatibility Assignments
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-2.5">
                  Select all factory mold variations this SKU shares 100% optical and cut-out parity with:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm flex items-center gap-1.5" type="button">
                    <span>
                      iPhone 17 Pro (6.3")
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      check
                    </span>
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors" type="button">
                    iPhone 17 Pro Max (6.9")
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors" type="button">
                    iPhone 17 (Standard)
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-surface-card hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors" type="button">
                    iPhone 16 Pro (Cross-tested)
                  </button>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  {"3. Engineering & Material Profile"}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      Primary Chassis Material
                    </label>
                    {" "}
                    <select className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer">
                      <option>
                        Bayer Covestro Polycarbonate
                      </option>
                      <option>
                        Japanese Asahi AGC Glass (0.33mm)
                      </option>
                      <option>
                        Aerospace Grade 5 Titanium
                      </option>
                      <option>
                        DuPont Kevlar / Aramid 1500D
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      Finish / Coat
                    </label>
                    {" "}
                    <select className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer">
                      <option>
                        Anti-Yellowing UV Shield (4H Hardness)
                      </option>
                      <option>
                        Oleophobic Plasma Vapor Deposition
                      </option>
                      <option>
                        Matte Micro-Etched Tactile
                      </option>
                      <option>
                        Anodized Satin Matte
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  {"4. Pricing Structure & Fiscal Slabs"}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      Base MRP (₹)
                    </label>
                    {" "}
                    <input className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-price-md text-price-md font-semibold focus:outline-none focus:ring-2 focus:ring-secondary transition-all" type="number" defaultValue="2199" />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      Selling Price (₹)
                    </label>
                    {" "}
                    <input className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-price-md text-price-md font-semibold focus:outline-none focus:ring-2 focus:ring-secondary transition-all" type="number" defaultValue="1499" />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1 font-medium">
                      GST Slab
                    </label>
                    {" "}
                    <select className="w-full h-11 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer">
                      <option>
                        18% GST (Standard)
                      </option>
                      <option>
                        12% GST
                      </option>
                      <option>
                        28% GST (Luxury Metal)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mt-2 text-label-sm font-label-sm text-on-surface-variant">
                  {"Target Unit Contribution Margin: "}
                  <strong className="text-status-verified">
                    68.2%
                  </strong>
                  {" (Landing Cost estimated at ₹478/unit)."}
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  5. Initial Fulfillment Stock Allocation
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface-card">
                    <span className="font-label-md text-label-md text-on-surface block font-medium">
                      BLR Hub Tier-1 (Bengaluru)
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <input className="w-24 h-9 px-2.5 rounded-lg bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" type="number" defaultValue="250" />
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        units
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-card">
                    <span className="font-label-md text-label-md text-on-surface block font-medium">
                      BOM Hub Tier-1 (Mumbai)
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <input className="w-24 h-9 px-2.5 rounded-lg bg-canvas-bg text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" type="number" defaultValue="150" />
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        units
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-2 font-semibold">
                  {"6. Media & Packaging Renders"}
                </span>
                <div className="p-6 rounded-2xl bg-surface-card flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-1">
                    cloud_upload
                  </span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    {"Drag & Drop 4K Studio Product Renders"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    PNG transparent with drop shadow, min 2400x2400px
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 px-6 bg-surface-card flex items-center justify-between flex-shrink-0 shadow-lg">
              <button className="h-10 px-4 rounded-xl bg-canvas-bg hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors shadow-sm" onClick={() => setDrawerOpen(false)} type="button">
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button className="h-10 px-4 rounded-xl bg-surface-container-high hover:bg-surface-dim text-on-surface font-label-md text-label-md transition-colors" type="button">
                  Save as Draft
                </button>
                <button className="h-10 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md transition-all flex items-center gap-1.5" onClick={publish} type="button">
                  <span className="material-symbols-outlined text-[18px]">
                    publish
                  </span>
                  {"Save & Publish SKU"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${priceOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setPriceOpen(false)}>
          <div className="w-full max-w-md bg-canvas-bg rounded-2xl shadow-2xl p-6 flex flex-col gap-4" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  percent
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                  Batch Price Modifier
                </h3>
              </div>
              <button className="w-8 h-8 rounded-lg bg-surface-card text-on-surface-variant hover:text-on-surface flex items-center justify-center" onClick={() => setPriceOpen(false)} aria-label="Close">
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Apply global percentage discount or price adjustment across selected SKUs. All storefront caches will purge instantly.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">
                  Adjustment Action
                </label>
                {" "}
                <select className="w-full h-10 px-3 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md focus:outline-none">
                  <option>
                    Reduce Selling Price by Percentage (%)
                  </option>
                  <option>
                    Increase Selling Price by Percentage (%)
                  </option>
                  <option>
                    Set Fixed Festival Promo Price (₹)
                  </option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">
                  Value (%)
                </label>
                {" "}
                <input className="w-full h-10 px-3 rounded-xl bg-surface-card text-on-surface font-headline-sm text-body-md font-semibold focus:outline-none" type="number" defaultValue="10" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button className="h-9 px-4 rounded-xl bg-surface-card text-on-surface font-label-md text-label-md" onClick={() => setPriceOpen(false)} type="button">
                Cancel
              </button>
              <button className="h-9 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-md" onClick={applyPrices} type="button">
                Apply to Catalog
              </button>
            </div>
          </div>
        </div>
        {toast && (
          <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-xl flex items-center gap-2" role="status">
            <span className="material-symbols-outlined text-[18px] text-status-verified">
              check_circle
            </span>
            {toast}
          </div>
        )}
      </div>
    </main>
  );
}
