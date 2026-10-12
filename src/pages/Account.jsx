export default function Account() {
  return (
    <main className="w-full pt-[106px] bg-surface">
      <div className="flex flex-col w-full">
        <section className="w-full bg-surface-card py-space-md">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="relative w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm font-headline-sm text-headline-sm">
                AK
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-status-verified border-2 border-surface" />
              </div>
              <div>
                <div className="flex items-center gap-space-xs">
                  <h1 className="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
                    Aditya K.
                  </h1>
                  <span className="inline-flex items-center gap-0.5 bg-secondary-fixed text-on-secondary-fixed px-space-xs py-0.5 rounded font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    <span className="material-symbols-outlined text-[13px]">
                      verified
                    </span>
                    Verified Owner
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  aditya.k@gmail.com • Bengaluru, KA • Priority Member
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm w-full md:w-auto">
              <div className="bg-surface-container-lowest px-space-md py-2 rounded-lg shadow-sm flex items-center justify-between md:justify-start gap-space-md w-full md:w-auto">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    verified_user
                  </span>
                  <span>
                    CASEFORM CARE:
                  </span>
                  <span className="font-semibold text-primary">
                    342 DAYS ACTIVE
                  </span>
                </div>
                <button className="font-label-sm text-label-sm text-secondary hover:underline uppercase font-bold" type="button">
                  Details
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-lg lg:py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <aside className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-card -mx-space-md -mt-space-md p-space-md rounded-t-xl">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">
                      smartphone
                    </span>
                    ACTIVE HARDWARE PROFILE
                  </span>
                  <button className="text-secondary font-label-sm text-label-sm font-semibold hover:underline" type="button">
                    Manage
                  </button>
                </div>
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-lg bg-surface-card flex items-center justify-center p-1.5 shadow-sm">
                    <img className="w-full h-full object-contain" data-alt="High precision Apple iPhone 17 Pro Natural Titanium back profile render on clean architectural grey studio setting with subtle camera module reflections" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJJVsWKURZWuJC0tTj7Vi0x4-8PF421IW9_B3tLHEKJNQYdGzKZHnZdNER5wCT4LVajUZp68WKKcio3oxTsinj3EITZKKJpjmwd9lV47DT8vVMNkJouAyKTm0L--UchX9KuPquwbi37Not1VOg36dGDImFr46_Y04DR0ldNjHJfVqKpmhyy8O8n0nPOO6S_nStJkUVwpRcdzPacimXCT2VqQOFlaX8wAySMNjkGxJpn6W9yANustySZQ" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-label-lg text-label-lg text-primary font-semibold truncate">
                      iPhone 17 Pro (6.3")
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Natural Titanium • 256GB
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 font-label-sm text-label-sm text-status-verified font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-verified animate-pulse" />
                      <span>
                        Fit Guarantee Applied
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="bg-surface-container-lowest rounded-xl p-space-xs shadow-sm flex flex-col gap-0.5">
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg transition-all font-medium" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim">
                      local_shipping
                    </span>
                    <span>
                      {"Orders & Shipments"}
                    </span>
                  </div>
                  <span className="bg-status-sale text-on-error font-label-sm text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    1 LIVE
                  </span>
                </a>
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface hover:bg-surface-card font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      phonelink_setup
                    </span>
                    <span>
                      Registered Devices
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    1 Unit
                  </span>
                </a>
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface hover:bg-surface-card font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      security
                    </span>
                    <span>
                      {"365-Day Warranty & Claims"}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-outline">
                    chevron_right
                  </span>
                </a>
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface hover:bg-surface-card font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      pin_drop
                    </span>
                    <span>
                      Saved Delivery Addresses
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    2 Saved
                  </span>
                </a>
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface hover:bg-surface-card font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      favorite
                    </span>
                    <span>
                      Wishlist Collection
                    </span>
                  </div>
                  <span className="bg-surface-card text-on-surface-variant font-label-sm text-[11px] px-2 py-0.5 rounded-full">
                    3
                  </span>
                </a>
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface hover:bg-surface-card font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                      account_balance_wallet
                    </span>
                    <span>
                      {"Payment Methods & UPI VPA"}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    GPay / HDFC
                  </span>
                </a>
                <div className="my-1 mx-space-sm h-px bg-surface-card" />
                <a className="flex items-center justify-between px-space-md py-3 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/20 font-label-lg text-label-lg transition-colors" href="#">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px]">
                      logout
                    </span>
                    <span>
                      {"Account Settings & Sign Out"}
                    </span>
                  </div>
                </a>
              </nav>
              <div className="bg-surface-card rounded-xl p-space-md shadow-sm">
                <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-1">
                  <span className="material-symbols-outlined text-[16px]">
                    support_agent
                  </span>
                  Priority Assistance
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-sm">
                  Questions on glass application, alignment jig usage, or warranty verification?
                </p>
                <a className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-secondary font-semibold" href="#">
                  Connect with Hardware Techs
                  <span className="material-symbols-outlined text-[14px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </aside>
            <main className="lg:col-span-8 flex flex-col gap-space-lg">
              <article className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md gap-space-xs">
                  <div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                        SHIPMENT DISPATCHED
                      </span>
                      <span className="text-outline">
                        •
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        AWB: BLUEDART-884920194
                      </span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-primary font-semibold mt-0.5">
                      Order #CF-98241
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Placed March 28, 2025 • Express Air Courier
                    </p>
                  </div>
                  <div className="flex items-center gap-space-xs mt-2 md:mt-0">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-status-verified animate-ping" />
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      Out for Delivery Today
                    </span>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl p-space-md my-space-md">
                  <div className="grid grid-cols-4 relative">
                    <div className="absolute top-4 left-0 w-full h-1 bg-surface-container-highest z-0" />
                    <div className="absolute top-4 left-0 w-[95%] h-1 bg-primary z-0" />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-bold mt-2">
                        Confirmed
                      </span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">
                        Mar 28, 09:14
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          inventory_2
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-bold mt-2">
                        CNC Packed
                      </span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">
                        Bengaluru Hub
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          flight_takeoff
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary font-bold mt-2">
                        Shipped (Air)
                      </span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">
                        BlueDart Express
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm ring-4 ring-secondary/20">
                        <span className="material-symbols-outlined text-[16px]">
                          local_shipping
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold mt-2">
                        Out for Delivery
                      </span>
                      <span className="font-label-sm text-[10px] text-status-verified font-semibold">
                        By 6:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-sm bg-surface-container-lowest rounded-lg p-space-sm flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-full bg-surface-card flex items-center justify-center text-primary font-semibold text-xs">
                        BD
                      </div>
                      <div>
                        <div className="font-label-sm text-label-sm font-semibold text-primary">
                          Delivery Partner: Suresh M. (BlueDart Air)
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Assigned route: Whitefield Sector 4 & Prestige Ozone"}
                        </div>
                      </div>
                    </div>
                    <a className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface text-primary font-label-sm text-label-sm font-medium flex items-center gap-1 shadow-xs" href="tel:+91800100200">
                      <span className="material-symbols-outlined text-[14px]">
                        call
                      </span>
                      Call Courier
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-space-sm mb-space-md">
                  <div className="p-space-sm bg-surface rounded-xl flex items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-16 h-16 rounded-lg bg-surface-card flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                        <img className="w-full h-full object-contain p-1" data-alt="CASEFORM AeroShield ultra-clear MagSafe case for iPhone 17 Pro floating on light grey backdrop with aluminum camera ring accent and aerospace grade polycarbonate shell" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3LD11xEgPQW44slkQflxKxNGPlQT8F_My1cOCM0RP9SkKxxvc0WgSgR96vymqJMAOscCYtgaWi0RDBeKa5XLrxKP0JkyVlHYKDPyXNeNj3Na1eoO0sMDz8dfAFZ_u_IOjkAxvSc6yW7KyK9-ssc9CxDhRN_4nW7xHl65TbwrG4fKAIumo3MsLzljqcjKIPTn0uUyO6yieaqTane3jfdBILRE4xg1OoC4Tt9xOjryM5qUzASgwfHytkg" />
                      </div>
                      <div>
                        <div className="font-label-lg text-label-lg text-primary font-semibold">
                          AeroShield Clear MagSafe Case
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          iPhone 17 Pro • Titanium Silver Ring • Anti-Yellowing Polycarbonate
                        </div>
                        <div className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
                          Qty: 1 • ₹1,499
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                      Ready to Fit
                    </span>
                  </div>
                  <div className="p-space-sm bg-surface rounded-xl flex items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-16 h-16 rounded-lg bg-surface-card flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                        <img className="w-full h-full object-contain p-1" data-alt="OptiGlass Japanese tempered glass screen protector hovering over iPhone alignment tray with microfiber cloth on neutral textured tabletop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0-VACimnmFNICjnUajdyJDbIwshDO0QtkfY6Y5fT7Ipt49uykbvFLii0Uk6yPnBYNicI0-ntbqf8v17IK2H_Bg8rwExp-pTXgqoSxdLNClyu7ss0Q2c-0PeMCqjoD1wc54Xpyx0wAwZaT5MiWu2er5fFScQ56I0xJaHCGxiYueAED0TMIDffdQR61zBDlVesfdJWBv2p6FplMuhMI6SIzUePbC_3yOI-GgB62L1kIob-Atv3ctlxNjw" />
                      </div>
                      <div>
                        <div className="font-label-lg text-label-lg text-primary font-semibold">
                          OptiGlass 9H Japanese Tempered Glass [2-Pack]
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          iPhone 17 Pro • Electroplated Oleophobic Coating • Auto-Align Tray Included
                        </div>
                        <div className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
                          Qty: 1 Set • ₹799
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                      Tray Included
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                  <button className="h-11 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg font-medium flex items-center gap-space-xs transition-colors shadow-sm" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      near_me
                    </span>
                    <span>
                      Track Live Location
                    </span>
                  </button>
                  <button className="h-11 px-space-md rounded-lg bg-surface-card hover:bg-surface-container text-primary font-label-lg text-label-lg font-medium flex items-center gap-space-xs transition-colors shadow-xs" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      receipt_long
                    </span>
                    <span>
                      Download Tax Invoice (GST)
                    </span>
                  </button>
                  <button className="h-11 px-space-md rounded-lg bg-surface-card hover:bg-surface-container text-on-surface-variant hover:text-primary font-label-lg text-label-lg font-medium flex items-center gap-space-xs transition-colors shadow-xs" type="button">
                    <span className="material-symbols-outlined text-[18px]">
                      verified
                    </span>
                    <span>
                      Warranty Service
                    </span>
                  </button>
                </div>
              </article>
              <article className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm">
                <div className="flex items-center justify-between pb-space-sm mb-space-sm">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">
                      {"Registered Hardware & Fit Guarantee"}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Calibrated precisely for zero-tolerance alignment.
                    </p>
                  </div>
                  <button className="px-space-sm py-1.5 rounded-lg bg-surface-card hover:bg-surface text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs" type="button">
                    <span className="material-symbols-outlined text-[15px]">
                      add
                    </span>
                    Register New Device
                  </button>
                </div>
                <div className="bg-surface-card rounded-xl p-space-md grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                  <div className="md:col-span-8">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-bold uppercase tracking-wide mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-verified" />
                      Active Calibration
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                      iPhone 17 Pro (6.3") - Natural Titanium
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {"Hardware Serial linked with Caseform Precision Shield ID: "}
                      <span className="font-mono text-primary font-semibold">
                        CF-IP17P-88912A
                      </span>
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-md">
                      <div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Coverage Status
                        </div>
                        <div className="font-label-lg text-label-lg text-status-verified font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">
                            verified
                          </span>
                          365-Day Zero-Yellowing Active
                        </div>
                      </div>
                      <div className="h-8 w-px bg-surface-container" />
                      <div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                          Days Remaining
                        </div>
                        <div className="font-label-lg text-label-lg text-primary font-bold">
                          342 Days
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-4 flex flex-col gap-space-xs">
                    <button className="w-full h-10 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm font-semibold transition-all shadow-sm uppercase tracking-wider flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        shopping_bag
                      </span>
                      Shop Fitted Gear
                    </button>
                    <button className="w-full h-10 px-space-md rounded-lg bg-surface-container hover:bg-surface text-primary font-label-sm text-label-sm font-semibold transition-all shadow-xs uppercase tracking-wider flex items-center justify-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        cached
                      </span>
                      Request Replacement
                    </button>
                  </div>
                </div>
              </article>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-space-xs mb-space-sm">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          location_on
                        </span>
                        SHIPPING ADDRESS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wider">
                        Default
                      </span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-semibold">
                      Aditya K.
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-1">
                      #402 Prestige Ozone, Whitefield Main Road
                      <br />
                      Bengaluru, Karnataka - 560066
                      <br />
                      India
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-primary font-body-sm text-body-sm font-medium">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        call
                      </span>
                      +91 98450 12345
                    </div>
                  </div>
                  <div className="pt-space-md flex items-center gap-space-xs">
                    <button className="h-9 px-space-md rounded bg-surface-card hover:bg-surface text-primary font-label-sm text-label-sm font-medium shadow-xs" type="button">
                      Edit Address
                    </button>
                    <button className="h-9 px-space-md rounded bg-surface-card hover:bg-surface text-on-surface-variant hover:text-primary font-label-sm text-label-sm font-medium shadow-xs" type="button">
                      Manage (2)
                    </button>
                  </div>
                </article>
                <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-space-xs mb-space-sm">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          history
                        </span>
                        RECENT ORDERS
                      </span>
                      <span className="font-label-sm text-label-sm text-status-verified font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          done_all
                        </span>
                        Delivered
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-label-lg text-label-lg text-primary font-semibold">
                          Order #CF-84192
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">
                          November 14, 2024 • ₹1,699
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded bg-surface-card flex items-center justify-center p-1 shadow-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                          shield
                        </span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                      1x iPhone 16 Pro ArmorMatrix Matte Case (Obsidian Black)
                    </p>
                  </div>
                  <div className="pt-space-md flex items-center gap-space-xs">
                    <button className="h-9 px-space-md rounded bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm font-medium shadow-xs flex items-center gap-1" type="button">
                      <span className="material-symbols-outlined text-[14px]">
                        refresh
                      </span>
                      Re-order
                    </button>
                    <button className="h-9 px-space-md rounded bg-surface-card hover:bg-surface text-primary font-label-sm text-label-sm font-medium shadow-xs" type="button">
                      View Receipt
                    </button>
                  </div>
                </article>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
