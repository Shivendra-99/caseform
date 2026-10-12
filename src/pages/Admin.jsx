export default function Admin() {
  return (
    <main className="relative pt-16 bg-surface min-h-screen">
      <div className="flex flex-col w-full p-space-md lg:p-space-lg gap-space-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pb-space-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                Telemetry Node BLR-01
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-low text-status-verified">
                <span className="w-2 h-2 rounded-full bg-status-verified animate-ping" />
                <span className="font-label-sm text-label-sm font-semibold">
                  {"Active Dispatch Hub: Mumbai & Bengaluru (Bluedart Air)"}
                </span>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Executive Operations Console
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Real-time order throughput, direct SKU allocation, and reverse-logistics reconciliation.
            </p>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap w-full lg:w-auto justify-start lg:justify-end">
            <div className="flex items-center p-1 rounded-xl bg-surface-container-high">
              <button className="px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                Today
              </button>
              <button className="px-2.5 py-1 rounded-lg font-label-sm text-label-sm bg-primary text-on-primary shadow-sm font-semibold">
                7 Days
              </button>
              <button className="px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                MTD
              </button>
              <button className="px-2.5 py-1 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors">
                FY 24-25
              </button>
            </div>
            <button className="h-9 px-3 rounded-xl bg-surface-card hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">
                receipt_long
              </span>
              GST Ledger
            </button>
            <button className="h-9 px-3 rounded-xl bg-surface-card hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">
                chevron_forward
              </span>
              Batch Restock
            </button>
            <button className="h-9 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all flex items-center gap-1.5 shadow-md">
              <span className="material-symbols-outlined text-[16px]">
                add_box
              </span>
              + Add Product
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          <div className="p-space-md rounded-xl bg-surface-card flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  {"Gross Sales & Revenue"}
                </span>
                <span className="font-display-mobile text-display-mobile text-on-surface mt-1 tracking-tight">
                  ₹48,92,450
                </span>
              </div>
              <span className="flex items-center gap-0.5 text-status-verified font-label-md text-label-md bg-surface px-2 py-0.5 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
                +18.4%
              </span>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface rounded-lg p-2.5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {"Prepaid UPI: "}
                  <span className="font-semibold text-on-surface">
                    74%
                  </span>
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {"COD: "}
                  <span className="font-semibold text-on-surface">
                    26%
                  </span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full flex overflow-hidden">
                <div className="h-full bg-primary" style={{width: "74%"}} />
                <div className="h-full bg-secondary-container" style={{width: "26%"}} />
              </div>
              <div className="flex justify-between items-center mt-2 font-label-sm text-label-sm text-on-surface-variant">
                <span>
                  AOV: ₹2,180
                </span>
                <span className="text-on-surface font-medium">
                  ₹36.2L UPI Verified
                </span>
              </div>
            </div>
          </div>
          <div className="p-space-md rounded-xl bg-surface-card flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Dispatched Units Volume
                </span>
                <span className="font-display-mobile text-display-mobile text-on-surface mt-1 tracking-tight">
                  2,244 Units
                </span>
              </div>
              <span className="flex items-center gap-0.5 text-status-verified font-label-md text-label-md bg-surface px-2 py-0.5 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  trending_up
                </span>
                +12.6%
              </span>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface rounded-lg p-2.5">
              <div className="flex justify-between items-center mb-1.5 font-label-sm text-label-sm">
                <span className="text-on-surface-variant">
                  {"iPhone 17 Matrix: "}
                  <span className="font-semibold text-on-surface">
                    64%
                  </span>
                </span>
                <span className="text-secondary font-semibold">
                  46% Glass Attach
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full flex overflow-hidden">
                <div className="h-full bg-primary" style={{width: "64%"}} />
                <div className="h-full bg-outline" style={{width: "28%"}} />
                <div className="h-full bg-surface-variant" style={{width: "8%"}} />
              </div>
              <div className="flex justify-between items-center mt-2 font-label-sm text-label-sm text-on-surface-variant">
                <span>
                  iPhone 16 Series: 28%
                </span>
                <span>
                  Legacy / Other: 8%
                </span>
              </div>
            </div>
          </div>
          <div className="p-space-md rounded-xl bg-surface-card flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Air Transit SLA (On-Time)
                </span>
                <span className="font-display-mobile text-display-mobile text-on-surface mt-1 tracking-tight">
                  1,892 Del.
                </span>
              </div>
              <span className="flex items-center gap-0.5 text-status-verified font-label-md text-label-md bg-surface px-2 py-0.5 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  verified
                </span>
                94.2% SLA
              </span>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface rounded-lg p-2.5">
              <div className="grid grid-cols-3 gap-1 text-center font-label-sm text-label-sm py-0.5">
                <div className="flex flex-col">
                  <span className="text-on-surface-variant text-[10px]">
                    OUT TODAY
                  </span>
                  <span className="font-semibold text-on-surface text-label-md">
                    142
                  </span>
                </div>
                <div className="flex flex-col border-x border-surface-border">
                  <span className="text-on-surface-variant text-[10px]">
                    AIR BLUE DART
                  </span>
                  <span className="font-semibold text-secondary text-label-md">
                    210
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-on-surface-variant text-[10px]">
                    DISPATCH QUEUE
                  </span>
                  <span className="font-semibold text-status-verified text-label-md">
                    48
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-status-verified h-full" style={{width: "94.2%"}} />
              </div>
            </div>
          </div>
          <div className="p-space-md rounded-xl bg-surface-card flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  {"RTO & Reverse Pipeline"}
                </span>
                <span className="font-display-mobile text-display-mobile text-on-surface mt-1 tracking-tight">
                  38 Claims
                </span>
              </div>
              <span className="flex items-center gap-0.5 text-on-surface-variant font-label-md text-label-md bg-surface px-2 py-0.5 rounded-lg shadow-sm">
                1.69% Return Rt.
              </span>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface rounded-lg p-2.5">
              <div className="flex justify-between items-center mb-1 font-label-sm text-label-sm">
                <span className="text-on-surface-variant">
                  {"Size/Fit Swap: "}
                  <span className="font-semibold text-on-surface">
                    14
                  </span>
                </span>
                <span className="text-status-sale font-semibold">
                  Defect Claim: 8
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full flex overflow-hidden">
                <div className="h-full bg-outline" style={{width: "37%"}} />
                <div className="h-full bg-status-sale" style={{width: "21%"}} />
                <div className="h-full bg-primary" style={{width: "42%"}} />
              </div>
              <div className="flex justify-between items-center mt-2 font-label-sm text-label-sm">
                <span className="text-on-surface-variant">
                  Exchanges: 16
                </span>
                <span className="text-status-verified font-medium">
                  Saved: ₹1.40L
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-8 p-space-md lg:p-space-lg rounded-xl bg-surface-card flex flex-col justify-between shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
                  Daily Fulfillment Trajectory
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  {"14-Day Sales & Dispatch Run-Rate"}
                </h2>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface">
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  AeroShield Clear
                </div>
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-2.5 h-2.5 rounded-sm bg-secondary" />
                  OptiGlass 9H
                </div>
                <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-2.5 h-2.5 rounded-sm bg-outline-variant" />
                  ArmorMatrix Rugged
                </div>
              </div>
            </div>
            <div className="w-full bg-surface rounded-xl p-space-md flex flex-col gap-space-sm">
              <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>
                  ₹5.0L Target Ceiling
                </span>
                <span className="text-status-verified font-semibold">
                  Peak: Mar 28 (₹4,22,180)
                </span>
              </div>
              <div className="h-48 w-full flex items-end justify-between gap-1 sm:gap-2 pt-4 px-1">
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-28 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-3" />
                    <div className="bg-secondary w-full h-8" />
                    <div className="bg-primary w-full h-12" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    18
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-32 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-4" />
                    <div className="bg-secondary w-full h-10" />
                    <div className="bg-primary w-full h-14" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    19
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-36 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-5" />
                    <div className="bg-secondary w-full h-12" />
                    <div className="bg-primary w-full h-16" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    20
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-24 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-2" />
                    <div className="bg-secondary w-full h-7" />
                    <div className="bg-primary w-full h-10" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    21
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-30 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-4" />
                    <div className="bg-secondary w-full h-9" />
                    <div className="bg-primary w-full h-13" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    22
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-40 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-6" />
                    <div className="bg-secondary w-full h-14" />
                    <div className="bg-primary w-full h-18" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    23
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-38 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-5" />
                    <div className="bg-secondary w-full h-13" />
                    <div className="bg-primary w-full h-16" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    24
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-34 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-4" />
                    <div className="bg-secondary w-full h-10" />
                    <div className="bg-primary w-full h-15" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    25
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-42 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-6" />
                    <div className="bg-secondary w-full h-15" />
                    <div className="bg-primary w-full h-19" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    26
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-36 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-5" />
                    <div className="bg-secondary w-full h-12" />
                    <div className="bg-primary w-full h-16" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    27
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group relative">
                  <div className="absolute -top-7 px-1.5 py-0.5 bg-primary text-on-primary rounded text-[9px] font-semibold whitespace-nowrap shadow-md">
                    ₹4.2L
                  </div>
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-48 ring-2 ring-primary">
                    <div className="bg-outline-variant w-full h-8" />
                    <div className="bg-secondary w-full h-18" />
                    <div className="bg-primary w-full h-22" />
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold text-[10px]">
                    28
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-40 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-6" />
                    <div className="bg-secondary w-full h-13" />
                    <div className="bg-primary w-full h-18" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    29
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-42 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-6" />
                    <div className="bg-secondary w-full h-14" />
                    <div className="bg-primary w-full h-19" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface text-[10px]">
                    30
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="w-full bg-surface-container-high rounded-t flex flex-col justify-end gap-0.5 overflow-hidden h-44 group-hover:bg-surface-variant transition-colors">
                    <div className="bg-outline-variant w-full h-7" />
                    <div className="bg-secondary w-full h-15" />
                    <div className="bg-primary w-full h-20" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold text-[10px]">
                    Today
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-border text-on-surface-variant font-label-sm text-label-sm">
                <span>
                  {"Production Hub: CNC Cell-4 & Precision Oven 02"}
                </span>
                <span>
                  {"Rolling 7-day Avg: "}
                  <strong className="text-on-surface font-semibold">
                    ₹3,49,460 / day
                  </strong>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 p-space-md lg:p-space-lg rounded-xl bg-surface-card flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
                Chassis Compatibility
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Model Share
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 mb-space-md">
                Real-time volume split across tooling batches.
              </p>
              <div className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">
                      iPhone 17 Pro
                    </span>
                    <span className="text-on-surface">
                      {"42% "}
                      <span className="text-on-surface-variant text-label-sm">
                        (942 units)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{width: "42%"}} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">
                      iPhone 17 Pro Max
                    </span>
                    <span className="text-on-surface">
                      {"31% "}
                      <span className="text-on-surface-variant text-label-sm">
                        (695 units)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-85" style={{width: "31%"}} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">
                      iPhone 17 (Base)
                    </span>
                    <span className="text-on-surface">
                      {"14% "}
                      <span className="text-on-surface-variant text-label-sm">
                        (314 units)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-65" style={{width: "14%"}} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">
                      iPhone 16 Pro / Max
                    </span>
                    <span className="text-on-surface">
                      {"9% "}
                      <span className="text-on-surface-variant text-label-sm">
                        (202 units)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-45" style={{width: "9%"}} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center font-label-md text-label-md">
                    <span className="font-semibold text-on-surface">
                      Pixel 9 / S25 Ultra
                    </span>
                    <span className="text-on-surface">
                      {"4% "}
                      <span className="text-on-surface-variant text-label-sm">
                        (91 units)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full opacity-25" style={{width: "4%"}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-space-md p-space-sm bg-surface rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  precision_manufacturing
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Mold Calibrations
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                    CNC Tolerance: ±0.03mm (Japan Standard)
                  </span>
                </div>
              </div>
              <button className="px-2.5 py-1 rounded-lg bg-surface-card hover:bg-surface-container font-label-sm text-label-sm text-on-surface font-medium transition-colors">
                Audit
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Active Dispatch Stream
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {"Air Waybill manifests synchronized with Delhivery & Bluedart Air APIs."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 px-2.5 rounded-lg bg-surface-card hover:bg-surface-container font-label-sm text-label-sm text-on-surface transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    filter_list
                  </span>
                  Filters
                </button>
                <button className="h-8 px-2.5 rounded-lg bg-surface-card hover:bg-surface-container font-label-sm text-label-sm text-on-surface transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    print
                  </span>
                  Manifests
                </button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl bg-surface-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">
                      Order / Client
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      {"SKU & Mold"}
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      Amount
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      Status / AWB
                    </th>
                    <th className="py-3 px-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border text-body-sm font-body-sm">
                  <tr className="hover:bg-surface/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          #CF-98241
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          Aditya K. • Bengaluru, KA
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-lg object-cover bg-surface-container" data-alt="AeroShield Clear magnetic protective smartphone case with CNC machined natural titanium camera ring and anti-yellowing resin, photographed floating against an ultra-clean warm gray studio background with soft ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJd5E5pjU_pUd-wr7fpVsc5IHacVR_QPe887Cx59YUu2jYCz28UrFue_OOjWQ9qvGO-IvzTzEpkVbEzESn27CFFOekufi1R9aS5D4ZQaTh4avx__h-YO6-yfsplt_Odz9-SKfDtvRcsxktqKLlJAaL11uK18WTGx7mCdAbztC8tY5pNete-ZE5KoWY1l8pKmCHGRxMrKlBNnul8ZMQygyWDnlKsQxT3yG6OBJnWfx68qFDaxSmXj0tmQ" />
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium text-[13px]">
                            AeroShield Clear
                          </span>
                          <span className="text-on-surface-variant text-[11px]">
                            iPhone 17 Pro • Nat. Titanium
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">
                          ₹2,068
                        </span>
                        <span className="font-label-sm text-label-sm text-status-verified">
                          Prepaid UPI
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface text-status-verified shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                        Out for Delivery
                      </span>
                      {" "}
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">
                        BD-9811241BLR
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Download Slip">
                        <span className="material-symbols-outlined text-[18px]">
                          receipt
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          #CF-98240
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          Rohan M. • Mumbai, MH
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-lg object-cover bg-surface-container" data-alt="OptiGlass 9H Japanese AGC tempered glass screen protector hovering above a smartphone in a precise white alignment installation tray with a microfibre wipe beside it on a minimal desk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqy9rANwK3Isk8BZm-5HTKJk58xaqiM_crp6xnkT91z7SdV1VP0uwtMbqezG5XKij9_GdMlBZq0arKItNGig-bMXhtWIwaBrWNxn82UFewJtWMVuPCnT9hJhRw-9x2Kpof2T0fk6TIPxsbucdfcpNIQbAynEXiIQBasrYhUmqj3H5ThGCxdtmmhTtsok3A0dTBuJQvPumF_mJj0cfKICyrBmC95Dv1CkWVmRrp_H2xh-mNKs-UupkmVA" />
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium text-[13px]">
                            OptiGlass 9H (2-Pack)
                          </span>
                          <span className="text-on-surface-variant text-[11px]">
                            iPhone 17 Pro Max • AGC Glass
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">
                          ₹1,499
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          COD Verified (OTP)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface text-secondary shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        Shipped Air Hub
                      </span>
                      {" "}
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">
                        DL-6610023BOM
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Track Air AWB">
                        <span className="material-symbols-outlined text-[18px]">
                          local_shipping
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          #CF-98239
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          Priya S. • Delhi NCR
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-lg object-cover bg-surface-container" data-alt="ArmorMatrix Rugged tactical impact phone case in obsidian matte black with textured geometric grip pattern and reinforced military drop corners displayed upright in a bright industrial studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4IuDNTw6p7uZffj8srzNEAHPQFpeEAUbSDkskyEQG8ZoNi0jPtOlP3_h8QjkLKw063PGmSPHW0M97oyByJZMU2aR-E-BC4wCf1JpCLRJ9vtWSwAdXLvXdZdpS3Gq5LNsuQzuUlqQk3wASOEGs4dSREAaBrYK7_4C1tNaOMvOee3S7u-4HVeQk788ZE3KCx80ssRfg-Pt6QSiNKURs5TSBEWdIR8wzLsH9QIKm425fU8XNJjCVuRouoQ" />
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium text-[13px]">
                            ArmorMatrix Bundle
                          </span>
                          <span className="text-on-surface-variant text-[11px]">
                            Rugged Case + Lens Guard
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">
                          ₹2,849
                        </span>
                        <span className="font-label-sm text-label-sm text-status-verified">
                          Prepaid GPay
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface text-primary shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {"Packing & CNC QC"}
                      </span>
                      {" "}
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">
                        Tray #42 Assigned
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Dispatch Order">
                        <span className="material-symbols-outlined text-[18px]">
                          send
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          #CF-98238
                        </span>
                        <span className="text-on-surface-variant text-[12px]">
                          Karan V. • Hyderabad, TS
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img className="w-8 h-8 rounded-lg object-cover bg-surface-container" data-alt="AeroShield Clear magnetic protective smartphone case with CNC machined natural titanium camera ring and anti-yellowing resin, photographed floating against an ultra-clean warm gray studio background with soft ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWN8rPCjXc_cp3Clb0bodhZFp-IUV4XN1-_HNan9BQaRFqz9KJLf8iQh9kZYGoaKrPEG_hK3lVLX-xyiRpQvDuJ0QzE1OmyToeHA3dYKpsDVIds3vD0VNDSrR4o65kesorC9fQhSnr2_uQ2gMLF8R5hW8hfDy6qrvl36b0ao8918v61q46JviLd3UixHuKur_lnlgo-vgJciGowp89D4XI1QczitQpHVrx04DECJtjA3qAt5I9G-ivuA" />
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium text-[13px]">
                            AeroShield Frosted
                          </span>
                          <span className="text-on-surface-variant text-[11px]">
                            iPhone 17 • Deep Blue Bezel
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">
                          ₹1,999
                        </span>
                        <span className="font-label-sm text-label-sm text-status-verified">
                          Prepaid Card
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface text-status-verified shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                        Delivered 11:24 AM
                      </span>
                      {" "}
                      <span className="block text-[10px] text-on-surface-variant mt-0.5">
                        POD Signed Digitally
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Invoice Summary">
                        <span className="material-symbols-outlined text-[18px]">
                          description
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {"Returns & RTO Exception Desk"}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {"Instant swap authorizations & refund settlement."}
                </p>
              </div>
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-card text-on-surface border border-surface-border">
                3 Actionable
              </span>
            </div>
            <div className="flex flex-col gap-space-sm">
              <div className="p-space-md rounded-xl bg-surface-card flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      #RET-4091
                    </span>
                    <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface text-secondary border border-surface-border">
                      Model Mismatch
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    14 mins ago
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface">
                  {"Customer requested swap: Ordered "}
                  <strong>
                    iPhone 17 Pro
                  </strong>
                  {", handset owned is "}
                  <strong>
                    17 Pro Max
                  </strong>
                  .
                </div>
                <div className="p-2 rounded-lg bg-surface text-on-surface-variant font-label-sm text-label-sm flex items-center justify-between">
                  <span className="truncate">
                    Pickup Booked: Bluedart Reverse Air (Mumbai)
                  </span>
                  <span className="text-status-verified font-semibold">
                    SKU In Stock
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 h-8 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-colors">
                    Dispatch 17 Pro Max
                  </button>
                  <button className="px-3 h-8 rounded-lg bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface border border-surface-border transition-colors">
                    Inspect Unboxing
                  </button>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-card flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      #CLAIM-4089
                    </span>
                    <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface text-status-sale border border-surface-border">
                      Transit Packaging Flaw
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    1 hr ago
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface">
                  OptiGlass 9H outer cardboard seal crushed by courier. Zero product damage, photo proof validated via OCR.
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-sm text-label-sm text-status-verified font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    Instant Replacement Dispatched
                  </span>
                  <button className="px-3 h-8 rounded-lg bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface border border-surface-border transition-colors">
                    Claim Carrier Loss (₹1,499)
                  </button>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-card flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      #RET-4084
                    </span>
                    <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface text-on-surface-variant border border-surface-border">
                      Buyer Change of Mind
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    3 hrs ago
                  </span>
                </div>
                <div className="text-body-sm font-body-sm text-on-surface">
                  ArmorMatrix Rugged iPhone 16 Pro. Item returned factory sealed. VPA verification completed.
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button className="flex-1 h-8 rounded-lg bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface border border-surface-border font-medium transition-colors">
                    Execute UPI Refund (₹1,799)
                  </button>
                  <button className="px-3 h-8 rounded-lg bg-surface hover:bg-surface-container font-label-sm text-label-sm text-on-surface border border-surface-border transition-colors">
                    Restock to Grade-A
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-space-md lg:p-space-lg rounded-xl bg-surface-card shadow-sm flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  inventory_2
                </span>
              </span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {"High-Velocity Inventory & Tooling Buffer Monitor"}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Automatic factory PO generation triggers when stock drops below 72-hour run rate.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 px-3 rounded-xl bg-surface hover:bg-surface-container font-label-md text-label-md text-on-surface border border-surface-border transition-colors">
                Adjust Safety Stock
              </button>
              <button className="h-9 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">
                  precision_manufacturing
                </span>
                Trigger CNC Restock PO
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="p-space-sm bg-surface rounded-xl flex items-center gap-space-md shadow-sm">
              <img className="w-16 h-16 rounded-lg object-cover bg-surface-container flex-shrink-0" data-alt="AeroShield Clear magnetic protective smartphone case with CNC machined natural titanium camera ring and anti-yellowing resin, photographed floating against an ultra-clean warm gray studio background with soft ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv63NraPb97pDogwjrizzl5VlAG7QFzpwuaO59mlOWIUMXtCr00OVO_oqc3f9NIIdfAXMY5kEWcIi3kxjUrN2rtz1tM3w06-DomiNs-ga2qBDWxdnb_Qeh_w_1sUmlskaRDQ9POlJYakdXD8XaNF8b0mwwxfLgIV_HrNhtVYYhvmPWdOGb7LvuaZNFKtvXOYuoPDpVdIR_Nndg4jIdS1dnGnNpfWCoBWYlHhTlXynoiDOi-xyBWX5Ijw" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    AeroShield Clear 17 Pro
                  </span>
                  <span className="font-label-sm text-label-sm text-status-sale bg-error-container/40 px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                    18 Units
                  </span>
                </div>
                <span className="text-[12px] font-body-sm text-on-surface-variant truncate">
                  Natural Titanium Ring • CNC Bezel
                </span>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-status-sale h-full" style={{width: "14%"}} />
                </div>
                <span className="font-label-sm text-label-sm text-status-sale mt-1">
                  Reorder PO #9910 Auto-Generated
                </span>
              </div>
            </div>
            <div className="p-space-sm bg-surface rounded-xl flex items-center gap-space-md shadow-sm">
              <img className="w-16 h-16 rounded-lg object-cover bg-surface-container flex-shrink-0" data-alt="OptiGlass 9H Japanese AGC tempered glass screen protector hovering above a smartphone in a precise white alignment installation tray with a microfibre wipe beside it on a minimal desk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsW1IbH3EZ9ehrsvRFHrPTKHVQTAyC7W3XQ2q5BzDvzvQwBuwnqBJtz41adDFFxjw0c-o56NP7bkBzou4qr_KI6snkO61wp7s6jXaHv2mAVPzuzZ5KvVIV96GhZQ8W5lT5YQg9GZJm6mPcoLLR4XyjWZ6k9ZJGVkCGhdyvmStFFV8cQ1YLNYNyU-oWTBFK2vSKl5lmPb8pRFXq2_YrfNEXIlysYx6FJVb0CKbXn-Tsgkdx-AWdnhUDtA" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    OptiGlass 9H AGC (2-Pack)
                  </span>
                  <span className="font-label-sm text-label-sm text-primary bg-surface-container-high px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                    32 Units
                  </span>
                </div>
                <span className="text-[12px] font-body-sm text-on-surface-variant truncate">
                  iPhone 17 Pro Max • Easy-Install Tray
                </span>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary h-full" style={{width: "28%"}} />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                  Buffer: 48h Runway remaining
                </span>
              </div>
            </div>
            <div className="p-space-sm bg-surface rounded-xl flex items-center gap-space-md shadow-sm">
              <img className="w-16 h-16 rounded-lg object-cover bg-surface-container flex-shrink-0" data-alt="ArmorMatrix Rugged tactical impact phone case in obsidian matte black with textured geometric grip pattern and reinforced military drop corners displayed upright in a bright industrial studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1_lE3yVcA6_H_OVeNSlrdVN0qsQ0qZxU9-Tkso87ieUuRhX-juNMqyGe1OWFnTqfTiy8CCYDXgQpTmx5o5T-9bDfJnxvOz14eR3ne7uuXLmM5MlJ29HB3PcnT3rlVCcuUihyX4rj7xXXv1syX1g3h43EFQNxS7JHuClJZF6jd3JK_gNl8YN5pJiATeYyJgBZQ7Ug5XTg12M5J6BrwBSKpmfUQSY2dkI8C7zvMMHpniNwAuP7FoOJSlQ" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                    ArmorMatrix 16 Pro
                  </span>
                  <span className="font-label-sm text-label-sm text-status-sale bg-error-container/40 px-1.5 py-0.2 rounded font-semibold whitespace-nowrap">
                    8 Units
                  </span>
                </div>
                <span className="text-[12px] font-body-sm text-on-surface-variant truncate">
                  Obsidian Black • Magsafe Hybrid
                </span>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-status-sale h-full" style={{width: "8%"}} />
                </div>
                <span className="font-label-sm text-label-sm text-status-sale mt-1">
                  Critical threshold breach (Min: 25)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
