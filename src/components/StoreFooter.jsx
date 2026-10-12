import { Link } from "react-router-dom";

export default function StoreFooter() {
  return (
    <footer className="w-full bg-surface-card pt-space-xl pb-space-lg">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-desktop">
        <div className="bg-canvas-bg p-space-lg md:p-space-xl rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] mb-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-7 space-y-space-xs">
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Priority Access Club
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-semibold tracking-tight">
                {"Get First Access. Discover new drops & exclusive releases."}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Zero marketing spam. Receive precise manufacturing batch notifications and private discount keys.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form className="flex flex-col sm:flex-row gap-space-xs" onSubmit={(e) => e.preventDefault()}>
                <input className="flex-1 h-12 px-space-md bg-canvas-bg text-on-surface placeholder:text-outline text-body-md font-body-md rounded-lg shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Enter your email address" type="email" />
                <button className="h-12 px-space-lg bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg rounded-lg font-medium transition-colors shrink-0" type="submit">
                  Subscribe
                </button>
              </form>
              <div className="flex items-center gap-space-xs mt-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px] text-status-verified">
                  verified
                </span>
                <span>
                  Encrypted with 256-bit privacy standards
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-xl">
          <div className="lg:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img alt="SNAP EDGE" className="h-6 w-auto" src="/logo.svg" />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm leading-relaxed">
              Architectural iPhone protection engineered with Japanese tempered substrate and aerospace-precision polymers. Built strictly for minimalists who reject bulk.
            </p>
            <div className="space-y-space-xs font-label-sm text-label-sm">
              <div className="text-on-surface font-semibold uppercase tracking-wider">
                Flagship Dispatch Facility
              </div>
              <div className="text-on-surface-variant">
                {"Bengaluru & Mumbai Express Hubs, India"}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-space-md">
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
              Shop
            </div>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  All iPhone Cases
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  Tempered Glass
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  MagSafe Collection
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  Shop by iPhone
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-primary transition-colors block">
                  Clear Cases
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 space-y-space-md">
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
              Customer Care
            </div>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors block" data-path="track-order" href="#">
                  Track Order
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="pincode-check" href="#">
                  Pincode Delivery Check
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="shipping-policy" href="#">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="returns-exchange" href="#">
                  {"Returns & Exchange"}
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="warranty-claim" href="#">
                  Warranty Claim
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="contact-support" href="#">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 space-y-space-md">
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
              About Caseform
            </div>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors block" data-path="about" href="#">
                  Precision Fit Philosophy
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="material-engineering" href="#">
                  Material Engineering
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="bulk-corporate" href="#">
                  {"Bulk & Corporate Orders"}
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="store-policies" href="#">
                  Store Policies
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors block" data-path="privacy-policy" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
            <span className="text-primary font-medium mr-1">
              Secure Gateways:
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              UPI
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              RuPay
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              Visa
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              Mastercard
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-semibold text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              NetBanking
            </span>
            <span className="px-2 py-0.5 rounded bg-canvas-bg font-medium text-status-verified shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              Cash on Delivery
            </span>
          </div>
          <div className="text-center md:text-right font-label-sm text-label-sm">
            © 2025 CASEFORM India. Exclusively for Apple iPhone.
          </div>
        </div>
      </div>
    </footer>
  );
}
