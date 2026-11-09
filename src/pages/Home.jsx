import { Link } from "react-router-dom";
import { useStore } from "../store.jsx";
import { PRODUCTS, BEST_SELLERS, fitsText } from "../catalog.js";
import ModelPicker from "../components/ModelPicker.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Promises from "../components/Promises.jsx";

export default function Home() {
  const { devices, setDevices } = useStore();
  const many = devices.length > 1;
  const ids = BEST_SELLERS.filter((id) => PRODUCTS[id]);

  return (
    <main className="se-root se-font" style={{ background: "#FFFFFF" }}>
      <HeroCarousel />

      <section id="bestsellers" style={{ background: "#FFFFFF" }}>
        <div className="wrap" style={{ maxWidth: "1420px", margin: "0 auto", padding: "112px 40px 120px", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", borderBottom: "1px solid #EEEEEE", paddingBottom: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2 className="hx" style={{ margin: "0", fontSize: "56px", lineHeight: "1.05", fontWeight: "800", letterSpacing: "-0.03em", color: "#222222" }}>
                Best Sellers
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px 14px", flexWrap: "wrap" }}>
                <span id="bs-model-label" style={{ fontSize: "14px", fontWeight: "600", color: "#222222" }}>
                  Your iPhone
                </span>
                <div style={{ flex: "0 1 340px", minWidth: "240px" }}>
                  <ModelPicker compact value={devices} onChange={setDevices} labelledBy="bs-model-label" describedBy="bs-model-help" />
                </div>
              </div>
              <p id="bs-model-help" style={{ margin: "0", color: "#666666" }}>
                {"Showing fits for "}
                <strong style={{ color: "#222222", fontWeight: "600" }}>{fitsText(devices)}</strong>
                {devices.length ? "." : ". Choose yours above to add to bag."}
                {many && " Adding an item puts one in your bag for each model."}
              </p>
            </div>
            <Link className="btn-ghost" to="/collection" style={{ height: "48px", padding: "0 24px", borderRadius: "50px", border: "1.5px solid #222222", color: "#222222", display: "inline-flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "14px" }}>
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
            {ids.map((id) => (
              <ProductCard key={id} id={id} />
            ))}
          </div>
          <Promises />
        </div>
      </section>
    </main>
  );
}
