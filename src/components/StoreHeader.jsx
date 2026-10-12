import { Link } from "react-router-dom";
import { useStore } from "../store.jsx";

export default function StoreHeader() {
  const { device, count } = useStore();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas-bg/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-primary text-on-primary py-1.5 px-margin md:px-margin-desktop">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between font-label-sm text-label-sm uppercase tracking-wider">
          <div className="hidden md:flex items-center gap-space-xs text-on-primary/60">
            <span className="w-1.5 h-1.5 rounded-full bg-status-verified inline-block" />
            <span>
              Direct From Lab
            </span>
          </div>
          <div className="flex-1 text-center truncate px-space-sm">
            <span className="font-medium tracking-normal">
              Premium iPhone Protection
            </span>
            <span className="mx-space-xs text-on-primary/40">
              |
            </span>
            <span className="text-on-primary/90">
              Extra 10% Savings on Prepaid UPI
            </span>
            <span className="mx-space-xs text-on-primary/40">
              |
            </span>
            <span className="text-on-primary/80 hidden sm:inline">
              Free Express Shipping ₹999+
            </span>
          </div>
          <div className="hidden md:flex items-center gap-space-md font-label-sm text-label-sm normal-case">
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" data-path="track-order" href="#">
              Track Order
            </a>
            <span className="text-on-primary/30">
              /
            </span>
            <a className="text-on-primary/80 hover:text-on-primary transition-colors" data-path="contact-support" href="#">
              Support
            </a>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-[1360px] mx-auto px-margin md:px-margin-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm focus:outline-none">
            <img alt="SNAP EDGE" className="h-6 w-auto" src="/logo.svg" />
          </Link>
          <div className="hidden lg:flex items-center bg-surface-card py-1.5 px-space-sm rounded-xl gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Shopping For
            </span>
            <Link to="/" className="font-label-sm text-label-sm font-semibold text-primary flex items-center gap-0.5 hover:text-secondary transition-colors">
              <span>
                {device}
              </span>
              <span className="material-symbols-outlined text-[14px]">
                expand_more
              </span>
            </Link>
          </div>
        </div>
        <nav className="hidden xl:flex items-center gap-space-lg" data-active-classes="text-primary font-semibold">
          <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg">
            Cases
          </Link>
          <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg">
            Tempered Glass
          </Link>
          <div className="group relative">
            <Link to="/collection" className="text-on-surface-variant group-hover:text-primary transition-colors font-label-lg text-label-lg flex items-center gap-0.5 py-space-sm">
              <span>
                Shop by iPhone
              </span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:rotate-180">
                keyboard_arrow_down
              </span>
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-canvas-bg rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] p-space-lg grid grid-cols-3 gap-space-md pointer-events-auto">
              <div className="space-y-space-xs">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold pb-space-xs">
                  iPhone 18 Series
                </div>
                <ul className="space-y-1 font-body-sm text-body-sm">
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 18 Pro Max
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 18 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 18 Plus
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 18
                    </Link>
                  </li>
                </ul>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold pt-space-sm pb-space-xs">
                  iPhone 17 Series
                </div>
                <ul className="space-y-1 font-body-sm text-body-sm">
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 17 Pro Max
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 17 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 17
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 17e
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-space-xs">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold pb-space-xs">
                  iPhone 16 Series
                </div>
                <ul className="space-y-1 font-body-sm text-body-sm">
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 16 Pro Max
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 16 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 16 Plus
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 16
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 16e
                    </Link>
                  </li>
                </ul>
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold pt-space-sm pb-space-xs">
                  iPhone 15 Series
                </div>
                <ul className="space-y-1 font-body-sm text-body-sm">
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 15 Pro Max
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 15 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors block py-1">
                      iPhone 15
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="bg-surface-card p-space-md rounded-lg flex flex-col justify-between">
                <div className="space-y-space-xs">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                    Legacy Flagships
                  </div>
                  <ul className="space-y-1 font-body-sm text-body-sm text-on-surface-variant">
                    <li>
                      <Link to="/collection" className="hover:text-primary transition-colors block py-1">
                        iPhone 14 Series
                      </Link>
                    </li>
                    <li>
                      <Link to="/collection" className="hover:text-primary transition-colors block py-1">
                        iPhone 13 Series
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="pt-space-md">
                  <div className="font-label-sm text-label-sm text-secondary font-medium uppercase tracking-wider">
                    Japanese Asahi Glass
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    9H Ion-Exchange Tempered Precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg">
            Bestsellers
          </Link>
          <Link to="/collection" className="text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg">
            New Arrivals
          </Link>
        </nav>
        <div className="flex items-center gap-space-sm">
          <button aria-label="Search Products" className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-card transition-colors" type="button">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </button>
          <Link to="/account" className="relative w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-card transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              favorite
            </span>
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary font-label-sm text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </Link>
          <Link to="/cart" aria-label="Shopping Bag" className="relative w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-card transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-secondary text-on-secondary font-label-sm text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          </Link>
          <Link to="/signin" aria-label="Sign in" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
