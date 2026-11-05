import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { StoreProvider } from "./store.jsx";
import { loadProducts } from "./catalog.js";

// The live catalog (edited in /admin) loads before the first render, so every page shows the same
// prices; if Supabase is slow or down, the bundled catalog is used instead.
loadProducts(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
  .catch((e) => console.warn("Using the bundled catalog:", e.message))
  .finally(() =>
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <BrowserRouter>
          <StoreProvider>
            <App />
          </StoreProvider>
        </BrowserRouter>
      </StrictMode>,
    ),
  );
