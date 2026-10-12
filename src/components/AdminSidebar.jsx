import { NavLink } from "react-router-dom";

const navCls = ({ isActive }) =>
  `flex items-center gap-3 px-space-sm py-2 rounded-xl transition-colors ${isActive ? "bg-primary text-on-primary font-label-md" : "font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`;

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-surface-border z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="h-16 px-space-md border-b border-surface-border flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <img alt="SNAP EDGE" className="h-4 w-auto self-start" src="/logo.svg" />
            <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
              Ops Console
            </span>
          </div>
          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface border border-surface-border text-on-surface-variant">
            v2.4
          </span>
        </div>
        <div className="px-space-md py-space-sm border-b border-surface-border bg-surface-card">
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Active Instance
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-verified animate-pulse" />
              <span className="font-label-sm text-label-sm text-status-verified">
                Live
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-surface-container-lowest border border-surface-border cursor-pointer hover:border-outline-variant transition-colors">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                storefront
              </span>
              <span className="font-label-md text-label-md text-on-surface truncate">
                Flagship India (INR ₹)
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              unfold_more
            </span>
          </div>
        </div>
        <div className="px-space-sm py-space-sm">
          <span className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">
            Operations
          </span>
          <nav className="flex flex-col gap-1" data-active-classes="bg-primary text-on-primary font-label-md rounded-xl">
            <NavLink to="/admin" end className={navCls}>
              <span className="material-symbols-outlined text-[18px]">
                monitoring
              </span>
              {"Overview & Analytics"}
            </NavLink>
            <NavLink to="/admin/inventory" className={navCls}>
              <span className="material-symbols-outlined text-[18px]">
                inventory_2
              </span>
              {"Product Catalog & Stock"}
            </NavLink>
            <a className="flex items-center gap-3 px-space-sm py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="orders-shipments" href="#">
              <span className="material-symbols-outlined text-[18px]">
                local_shipping
              </span>
              {"Orders & Dispatch"}
            </a>
            <a className="flex items-center gap-3 px-space-sm py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="returns-rto-management" href="#">
              <span className="material-symbols-outlined text-[18px]">
                assignment_return
              </span>
              {"Returns & RTO Desk"}
            </a>
            <a className="flex items-center gap-3 px-space-sm py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="hardware-compatibility-matrix" href="#">
              <span className="material-symbols-outlined text-[18px]">
                devices
              </span>
              {"Device Specs & Mold Matrix"}
            </a>
          </nav>
        </div>
        <div className="px-space-sm py-space-xs">
          <span className="px-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-2">
            System Configuration
          </span>
          <nav className="flex flex-col gap-1" data-active-classes="bg-primary text-on-primary font-label-md rounded-xl">
            <a className="flex items-center gap-3 px-space-sm py-2 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="store-settings" href="#">
              <span className="material-symbols-outlined text-[18px]">
                tune
              </span>
              {"Store & Gateway Settings"}
            </a>
          </nav>
        </div>
      </div>
      <div className="p-space-sm border-t border-surface-border bg-surface-container-low">
        <div className="flex items-center justify-between p-2 rounded-xl bg-surface-card border border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface leading-tight">
                Rohit S.
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                Ops Director
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant cursor-pointer hover:text-on-surface">
            logout
          </span>
        </div>
      </div>
    </aside>
  );
}
