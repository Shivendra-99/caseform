import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore, inr, FREE_SHIPPING } from "../store.jsx";
import { COLORS, FINISHES, shippingFor } from "../catalog.js";
import { startCheckout } from "../checkout.js";
import ProductArt from "../components/ProductArt.jsx";

export default function Cart() {
  const { lines, count, subtotal, mrpTotal, device, addToCart, setQty, clearCart } = useStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Indicative only: the server re-prices the bag and Shiprocket confirms shipping/COD fees.
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const savings = mrpTotal - subtotal;
  const hasLens = lines.some((l) => l.id === "lens-glass");

  const checkout = async (e) => {
    setBusy(true);
    setError("");
    try {
      await startCheckout(lines, e.nativeEvent);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="w-full bg-surface">
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
                      "Free shipping unlocked"
                    ) : (
                      <>
                        {"Add "}
                        <span className="text-secondary">
                          {inr(FREE_SHIPPING - subtotal)}
                        </span>
                        {" more for free shipping"}
                      </>
                    )}
                  </p>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {"Free shipping on orders over "}{inr(FREE_SHIPPING)}
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
                <div key={`${l.id}-${l.device}-${l.variant}`} className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col sm:flex-row gap-space-md relative">
                  <div className="w-full sm:w-36 h-44 sm:h-36 shrink-0 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center relative">
                    {l.img ? (
                      <img alt={l.name} className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300" src={l.img} />
                    ) : (
                      <ProductArt kind={l.kind} color={COLORS[l.def]} finish={FINISHES.find((g) => g.name === l.variant)} />
                    )}
                    {l.price < l.mrp && (
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wider">
                        {Math.round((1 - l.price / l.mrp) * 100)}% OFF
                      </div>
                    )}
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
                          {l.mrp > l.price && (
                            <div className="font-label-sm text-label-sm text-outline line-through">
                              {inr(l.mrp * l.qty)}
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        For Apple {[l.device, l.variant ?? l.note].filter(Boolean).join(" • ")}
                      </p>
                      {(l.spec || l.price < l.listPrice) && (
                        <div className="inline-flex items-center gap-space-xs mt-2 px-space-xs py-1 rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px] text-status-verified">
                            bolt
                          </span>
                          <span>
                            {l.spec ?? "Glass 50% off with your cover"}
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
              {lines.length > 0 && !hasLens && (
                <div className="bg-surface-card rounded-xl p-space-md shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-space-sm">
                    Protect the camera too
                  </h3>
                  <div className="bg-surface-container-lowest rounded-lg p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm w-full sm:w-auto">
                      <div className="w-16 h-16 rounded bg-surface-container-low shrink-0 overflow-hidden flex items-center justify-center p-1">
                        <ProductArt kind="lens" />
                      </div>
                      <div>
                        <p className="font-label-lg text-label-lg text-primary font-semibold">
                          Camera Lens Glass · 2-Pack
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Fits {device} • Case-friendly
                        </p>
                        <span className="font-price-md text-price-md text-primary font-bold">
                          {inr(399)}
                        </span>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto h-10 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md uppercase tracking-wider transition-all whitespace-nowrap flex items-center justify-center gap-1" onClick={() => addToCart("lens-glass", 1, device)} type="button">
                      <span className="material-symbols-outlined text-[16px]">
                        add
                      </span>
                      Add to Bag
                    </button>
                  </div>
                </div>
              )}
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
                <h2 className="font-headline-sm text-headline-sm text-primary font-semibold">
                  Order Summary
                </h2>
                <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex items-center justify-between">
                    <span>
                      Subtotal ({count} {count === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium text-primary">
                      {inr(subtotal)}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-status-verified font-medium">
                      <span>
                        You save on MRP
                      </span>
                      <span>
                        -{inr(savings)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span>
                      Shipping
                    </span>
                    <span className={shipping ? "text-primary" : "text-status-verified font-semibold uppercase"}>
                      {shipping ? inr(shipping) : "Free"}
                    </span>
                  </div>
                  <div className="mt-space-xs bg-surface-card p-space-sm rounded-lg flex items-baseline justify-between">
                    <div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        Total
                      </span>
                      <p className="font-label-sm text-[11px] text-on-surface-variant">
                        Inclusive of GST
                      </p>
                    </div>
                    <div className="font-price-lg text-price-lg text-primary font-bold tracking-tight">
                      {inr(total)}
                    </div>
                  </div>
                </div>
                {error && (
                  <p className="font-label-md text-label-md text-status-sale" role="alert">
                    {error}
                  </p>
                )}
                <button className="w-full h-12 rounded-lg bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99] disabled:opacity-60" disabled={!lines.length || busy} onClick={checkout} type="button">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                  <span>
                    {busy ? "Opening checkout…" : `Proceed to checkout • ${inr(total)}`}
                  </span>
                </button>
                <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
                  Address, delivery, cash on delivery and payment are confirmed on the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
