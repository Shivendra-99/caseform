import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore, inr, FREE_SHIPPING } from "../store.jsx";

const PROMO = "PREPAID10";
const SHIPPING_FEE = 99;

export default function Cart() {
  const { lines, count, subtotal, mrpTotal, addToCart, setQty, clearCart } = useStore();
  const [code, setCode] = useState(PROMO);
  const [promo, setPromo] = useState(true);
  const [codeError, setCodeError] = useState("");
  const [timer, setTimer] = useState(9 * 60 + 42);

  useEffect(() => {
    const id = setInterval(() => setTimer((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const discount = promo ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal - discount + shipping;
  const gst = Math.round((total * 18) / 118); // GST is included in prices
  const savings = mrpTotal - subtotal + discount;

  const applyPromo = (e) => {
    e.preventDefault();
    const ok = code.trim().toUpperCase() === PROMO;
    setPromo(ok);
    setCodeError(ok ? "" : "That code isn't valid. Try PREPAID10.");
  };

  return (
    <main className="w-full pt-[106px] bg-surface">
      <div className="flex flex-col w-full">
        <div className="w-full bg-surface-container-low py-space-md">
          <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-sm">
              <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="text-outline-variant">
                  /
                </span>
                <span className="text-primary font-semibold">
                  Shopping Bag
                </span>
                <span className="text-outline-variant">
                  /
                </span>
                <span className="text-secondary font-medium">
                  Order Review ({count} Items)
                </span>
              </nav>
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-status-verified animate-ping" />
                <span>
                  {"SESSION RESERVED: "}
                  <span className="font-bold text-primary">
                    {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
                  </span>
                  {" MINS"}
                </span>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs mb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">
                      local_shipping
                    </span>
                  </div>
                  <p className="font-label-lg text-label-lg text-primary font-semibold">
                    {subtotal >= FREE_SHIPPING ? (
                      "Free Express Air Dispatch unlocked"
                    ) : (
                      <>
                        {"Add "}
                        <span className="text-secondary">
                          {inr(FREE_SHIPPING - subtotal)}
                        </span>
                        {" more for Free Express Air Dispatch"}
                      </>
                    )}
                  </p>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Tier: Priority Air Cargo (Bluedart / Delhivery Air)
                </p>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden relative">
                <div className="bg-secondary h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="flex items-center justify-between pb-space-xs">
                <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-semibold flex items-center gap-space-xs">
                  Bag Hardware Cart
                  <span className="text-on-surface-variant font-normal font-label-lg text-label-lg">
                    ({count})
                  </span>
                </h1>
                <button className="text-on-surface-variant hover:text-status-sale font-label-sm text-label-sm tracking-wider uppercase transition-colors flex items-center gap-1" onClick={clearCart} type="button">
                  <span className="material-symbols-outlined text-[16px]">
                    delete_sweep
                  </span>
                  Clear All
                </button>
              </div>
              {lines.length === 0 && (
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-sm">
                  <span className="material-symbols-outlined text-[40px] text-outline">
                    shopping_bag
                  </span>
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold">
                    Your bag is empty
                  </p>
                  <Link to="/collection" className="h-11 px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider flex items-center">
                    Browse Cases & Glass
                  </Link>
                </div>
              )}
              {lines.map((l) => (
                <div key={`${l.id}-${l.device}`} className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col sm:flex-row gap-space-md relative">
                  <div className="w-full sm:w-36 h-44 sm:h-36 shrink-0 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center relative">
                    <img alt={l.name} className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" src={l.img} />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wider">
                      {Math.round((1 - l.price / l.mrp) * 100)}% OFF
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between gap-space-sm">
                    <div>
                      <div className="flex items-start justify-between gap-space-xs">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                            {l.tag}
                          </span>
                          <h2 className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                            {l.name}
                          </h2>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-price-md text-price-md text-primary font-bold">
                            {inr(l.price * l.qty)}
                          </div>
                          <div className="font-label-sm text-label-sm text-outline line-through">
                            {inr(l.mrp * l.qty)}
                          </div>
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        For Apple {l.device} • {l.note}
                      </p>
                      {l.spec && (
                        <div className="inline-flex items-center gap-space-xs mt-2 px-space-xs py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px] text-status-verified">
                            bolt
                          </span>
                          <span>
                            {l.spec}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-space-xs">
                      <div className="inline-flex items-center bg-surface-container-low rounded-lg p-0.5">
                        <button aria-label="Decrease quantity" className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-lowest transition-colors" onClick={() => setQty(l.item, l.qty - 1)} type="button">
                          <span className="material-symbols-outlined text-[16px]">
                            remove
                          </span>
                        </button>
                        <span className="w-8 text-center font-label-lg text-label-lg font-bold text-primary">
                          {l.qty}
                        </span>
                        <button aria-label="Increase quantity" className="w-7 h-7 flex items-center justify-center rounded text-on-surface hover:bg-surface-container-lowest transition-colors" onClick={() => setQty(l.item, l.qty + 1)} type="button">
                          <span className="material-symbols-outlined text-[16px]">
                            add
                          </span>
                        </button>
                      </div>
                      <div className="flex items-center gap-space-md">
                        <button className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" onClick={() => setQty(l.item, 0)} type="button">
                          <span className="material-symbols-outlined text-[16px]">
                            favorite
                          </span>
                          <span className="hidden sm:inline">
                            Move to Wishlist
                          </span>
                        </button>
                        <button className="flex items-center gap-1 font-label-sm text-label-sm text-status-sale hover:opacity-80 transition-opacity" onClick={() => setQty(l.item, 0)} type="button">
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                          <span>
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-surface-card rounded-xl p-space-md shadow-sm">
                <div className="flex items-center justify-between mb-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      add_shopping_cart
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
                      Frequently Paired Armor
                    </h3>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Bundle Rate
                  </span>
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm w-full sm:w-auto">
                    <div className="w-16 h-16 rounded bg-surface-container-low shrink-0 overflow-hidden flex items-center justify-center p-1">
                      <img className="w-full h-full object-contain" data-alt="Close-up studio photography of a precision machined matte black iPhone 17 Pro tactical kickstand protective case with aircraft grade aluminum hinge resting on soft grey architectural slate surface minimal crisp lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1CS0_mPbswxIb5TvlhkmKc5m7-84A5pqjm6hnTH4NVFzMmUye6VvNpLNzcqwuo1JHSeWG-2KIROM3dElQ4VOT4XgTJb57TwG1UuRZT2ex0SptbXjTk6-mH4Q-XovagAfj0Wt7JI_R0pNqi477fSXlYytqpWwOMMdkd2fKn58DcA4JgMoJvQHkdU3EhEe4hKALe-mxD6-S9221B7GkCKLkBHLfZyRrFJx5zhd5FH0ZmOBKhDlySs2axQ" />
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg text-primary font-semibold">
                        ArmorMatrix Tactical Kickstand Module
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Compatible iPhone 17 Pro • Space Grey Hinge
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-price-md text-price-md text-primary font-bold">
                          +₹699
                        </span>
                        <span className="font-label-sm text-label-sm text-outline line-through">
                          ₹1,499
                        </span>
                        <span className="font-label-sm text-[10px] text-status-verified font-bold uppercase bg-status-verified/10 px-1 rounded">
                          Save ₹800
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto h-10 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1" onClick={() => addToCart("kickstand")} type="button">
                    <span className="material-symbols-outlined text-[16px]">
                      add
                    </span>
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    verified_user
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold">
                      365-Day Guarantee
                    </p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">
                      Zero Yellowing Replacement
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-status-verified text-[24px]">
                    assignment_return
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold">
                      7-Day Free Returns
                    </p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">
                      Hassle-Free Doorstep Pickup
                    </p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[24px]">
                    check_circle
                  </span>
                  <div>
                    <p className="font-label-sm text-label-sm text-primary font-bold">
                      100% Genuine Fit
                    </p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">
                      Apple Tolerance Certified
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-24">
              <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">
                    Order Summary
                  </h2>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-status-verified font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-status-verified" />
                    Inventory Locked
                  </span>
                </div>
                <div>
                  <form className="flex gap-space-xs" onSubmit={applyPromo}>
                    <div className="relative flex-1">
                      <input className="w-full h-12 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-sm font-semibold tracking-wider uppercase focus:outline-none focus:bg-surface-container-lowest" aria-label="Promo code" placeholder="Promo / Referral Code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                      {promo && (
                        <span className="material-symbols-outlined absolute right-3 top-3 text-[20px] text-status-verified">
                          check_circle
                        </span>
                      )}
                    </div>
                    <button className="h-12 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-md text-label-md tracking-wider uppercase transition-colors" type="submit">
                      Apply
                    </button>
                  </form>
                  {promo ? (
                    <div className="mt-2 flex items-center justify-between px-space-sm py-1.5 rounded bg-status-verified/10 text-status-verified font-label-sm text-label-sm">
                      <span className="flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          sell
                        </span>
                        {PROMO} Applied (10% Extra UPI Savings)
                      </span>
                      <button className="hover:underline font-bold" onClick={() => { setPromo(false); setCode(""); }} type="button">
                        Remove
                      </button>
                    </div>
                  ) : codeError && (
                    <p className="mt-2 px-space-sm font-label-sm text-label-sm text-status-sale" role="alert">
                      {codeError}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
                  <div className="flex items-center justify-between">
                    <span>
                      Hardware Subtotal ({count} items)
                    </span>
                    <span className="font-medium text-primary">
                      {inr(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-status-verified font-medium">
                    <span className="flex items-center gap-1">
                      <span>
                        Instant Prepaid UPI Discount
                      </span>
                      <span className="material-symbols-outlined text-[14px]">
                        info
                      </span>
                    </span>
                    <span>
                      -{inr(discount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span>
                        Express Air Shipping
                      </span>
                      <span className="px-1 py-0.2 rounded bg-surface-container-high text-[10px] uppercase font-bold text-primary">
                        Tier 1
                      </span>
                    </span>
                    <span className="text-status-verified font-semibold uppercase">
                      {shipping ? inr(shipping) : "FREE"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-outline">
                    <span>
                      Estimated GST (18% Included)
                    </span>
                    <span>
                      {inr(gst)}
                    </span>
                  </div>
                  <div className="mt-space-xs pt-space-sm bg-surface-card p-space-sm rounded-lg flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          Total Order Value
                        </span>
                        <p className="font-label-sm text-[11px] text-on-surface-variant">
                          All taxes and air freight duties inclusive
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-price-lg text-price-lg text-primary font-bold tracking-tight">
                          {inr(total)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-label-sm text-status-verified font-bold">
                        Total Combined Savings: {inr(savings)} ({mrpTotal ? Math.round((savings / mrpTotal) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full h-12 rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99]" disabled={!lines.length} type="button">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                  <span>
                    PROCEED TO SECURE CHECKOUT • {inr(total)}
                  </span>
                </button>
                <div className="relative flex items-center justify-center">
                  <div className="w-full bg-surface-container h-px" />
                  <span className="absolute bg-surface-container-lowest px-space-xs font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Instant One-Click Pay
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-space-xs">
                  <button className="h-11 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md flex items-center justify-center gap-1.5 transition-colors" type="button">
                    <span className="font-bold text-secondary text-[13px]">
                      UPI
                    </span>
                    <span className="font-medium text-[11px] text-on-surface-variant truncate">
                      GPay / PhonePe
                    </span>
                  </button>
                  <button className="h-11 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center justify-center gap-1 transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">
                      shopping_bag
                    </span>
                    <span className="font-semibold text-[12px]">
                      Apple Pay
                    </span>
                  </button>
                </div>
                <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        distance
                      </span>
                      Transit Time Estimation
                    </span>
                    <span className="font-label-sm text-label-sm text-status-verified font-medium">
                      Express Air
                    </span>
                  </div>
                  <div className="flex gap-space-xs">
                    <input className="w-full h-10 px-space-sm rounded bg-surface-container-lowest text-on-surface font-body-sm focus:outline-none" placeholder="Enter 6-digit Pincode" type="text" defaultValue="560001" />
                    <button className="h-10 px-space-sm rounded bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm uppercase transition-colors shrink-0" type="button">
                      Check
                    </button>
                  </div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm pt-1">
                    <span className="material-symbols-outlined text-[16px] text-status-verified">
                      schedule
                    </span>
                    <span>
                      {"Bengaluru 560001: "}
                      <strong>
                        Express Next-Day
                      </strong>
                      {" by 2:00 PM"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm py-space-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    lock
                  </span>
                  256-Bit Encrypted
                </span>
                <span>
                  •
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    shield
                  </span>
                  Authorized Apple Spec
                </span>
                <span>
                  •
                </span>
                <span>
                  PCI-DSS Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
