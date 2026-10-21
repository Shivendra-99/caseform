// Starts Shiprocket Checkout for the bag. The server prices the bag and returns an access
// token; Shiprocket's script (loaded on first use) then opens its checkout window.
// Sends only ids, quantities, model and colour/finish — never prices.

let scriptLoad = null;
function loadShiprocket(ui) {
  scriptLoad ??= new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${ui}/assets/styles/shopify.css`;
    document.head.appendChild(css);
    if (!document.getElementById("sellerDomain")) {
      const domain = document.createElement("input");
      domain.type = "hidden";
      domain.id = "sellerDomain";
      domain.value = window.location.host;
      document.body.appendChild(domain);
    }
    const js = document.createElement("script");
    js.src = `${ui}/assets/js/channels/shopify.js`;
    js.onload = resolve;
    js.onerror = () => {
      scriptLoad = null;
      reject(new Error("Couldn't load checkout. Check your connection and try again."));
    };
    document.body.appendChild(js);
  });
  return scriptLoad;
}

export async function startCheckout(lines, event) {
  const items = lines.map(({ id, qty, device, variant }) => ({ id, qty, device, variant }));
  let res;
  try {
    res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  } catch {
    throw new Error("Couldn't reach checkout. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Checkout failed. Please try again.");

  await loadShiprocket(data.ui);
  window.HeadlessCheckout.addToCart(event, data.token, { fallbackUrl: data.fallbackUrl });
}
