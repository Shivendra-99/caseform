export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/85 backdrop-blur-md border-b border-surface-border z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-md flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input className="w-full h-9 pl-9 pr-4 rounded-xl bg-surface-card border border-surface-border font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-secondary transition-colors" placeholder="Search SKU, order ID, IMEI or customer..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-surface-card border border-surface-border">
          <span className="material-symbols-outlined text-[16px] text-status-verified">
            sync
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            WMS Sync: Just now
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-xl bg-canvas-bg border border-surface-border font-label-md text-label-md text-on-surface hover:bg-surface-card transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              ios_share
            </span>
            Export
          </button>
          <button className="h-9 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              add
            </span>
            New Product
          </button>
        </div>
        <div className="h-6 w-px bg-surface-border" />
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl border border-surface-border flex items-center justify-center text-on-surface-variant hover:bg-surface-card transition-colors relative">
            <span className="material-symbols-outlined text-[18px]">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-status-sale rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
