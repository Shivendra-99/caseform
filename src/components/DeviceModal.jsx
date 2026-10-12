import { useState } from "react";
import { useStore } from "../store.jsx";

// Device catalogue: [model, number of compatible products]
export const SERIES = {
  17: [["iPhone 17 Pro Max", 38], ["iPhone 17 Pro", 42], ["iPhone 17", 35], ["iPhone 17e", 24]],
  16: [["iPhone 16 Pro Max", 36], ["iPhone 16 Pro", 40], ["iPhone 16 Plus", 28], ["iPhone 16", 33]],
  15: [["iPhone 15 Pro Max", 30], ["iPhone 15 Pro", 31], ["iPhone 15 Plus", 22], ["iPhone 15", 26]],
  14: [["iPhone 14 Pro Max", 21], ["iPhone 14 Pro", 22], ["iPhone 14 Plus", 16], ["iPhone 14", 19]],
  13: [["iPhone 13 Pro Max", 14], ["iPhone 13 Pro", 15], ["iPhone 13", 15], ["iPhone 13 mini", 9]],
};

export default function DeviceModal({ onClose }) {
  const { device, setDevice } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-canvas-bg rounded-2xl max-w-lg w-full p-space-lg shadow-2xl relative max-h-[85vh] overflow-y-auto" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-space-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-semibold text-primary">
              Select Your Device
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Choose your iPhone model for tailored dimensions.
            </p>
          </div>
          <button className="w-8 h-8 rounded-full bg-surface-card text-on-surface-variant hover:text-primary flex items-center justify-center" onClick={onClose} aria-label="Close" type="button">
            <span className="material-symbols-outlined text-[20px]">
              close
            </span>
          </button>
        </div>
        <div className="mt-space-sm relative">
          <span className="material-symbols-outlined absolute left-3 top-3.5 text-on-surface-variant text-[18px]">
            search
          </span>
          <input className="w-full h-11 pl-9 pr-3 rounded-xl bg-surface-card text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Search iPhone model (e.g. 17 Pro, 16 Plus)..." type="text" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
        </div>
        <div className="mt-space-md space-y-space-md">
          {Object.entries(SERIES).map(([s, models]) => {
            const hits = models.filter(([name]) => name.toLowerCase().includes(q));
            if (!hits.length) return null;
            return (
              <div key={s}>
                <div className="font-label-sm text-label-sm uppercase font-semibold text-secondary mb-2">
                  iPhone {s} Series
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {hits.map(([name]) => (
                    <button key={name} className={`p-2.5 rounded-xl text-left font-body-sm text-body-sm font-medium ${name === device ? "bg-primary text-on-primary" : "bg-surface-card hover:bg-neutral-200 text-primary"}`} onClick={() => { setDevice(name); onClose(); }} type="button">
                      {name}{name === device && " ✓"}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
