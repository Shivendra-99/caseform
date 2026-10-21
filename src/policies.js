import { BUSINESS as B } from "./business.js";
import { FREE_SHIPPING, SHIPPING_FEE } from "./catalog.js";

// Store policies. [Bracketed] values are business decisions to fill in before launch;
// have the final text reviewed by someone qualified for your business.
export const POLICIES_UPDATED = "[Date]";
const free = `₹${FREE_SHIPPING}`;
const fee = `₹${SHIPPING_FEE}`;

export const POLICIES = {
  shipping: {
    title: "Shipping Policy",
    sections: [
      ["Where we ship", [`We ship across India through Shiprocket's courier partners. Enter your pincode on a product page or at checkout to check delivery to your area.`]],
      ["Charges", [`Shipping is free on orders over ${free}. Orders below ${free} pay ${fee}. Any cash-on-delivery fee is shown at checkout before you place the order.`]],
      ["Dispatch and delivery", ["Orders are dispatched within [1–2] business days. Delivery usually takes [2–5] business days after dispatch, and can take longer for remote pincodes or during sales and holidays."]],
      ["Tracking", ["Once your order ships you get a tracking link by SMS and email."]],
      ["Cash on delivery", ["Cash on delivery is available on eligible pincodes and order values, as shown at checkout. If a COD order is refused at the door, we may disable COD on future orders from the same number or address."]],
      ["Undelivered orders", [`If a parcel comes back to us because the address was wrong or nobody was available after the courier's attempts, we refund prepaid orders minus the shipping cost, or reship once you confirm the details. Contact ${B.email}.`]],
    ],
  },
  returns: {
    title: "Returns, Refunds & Cancellations",
    sections: [
      ["Cancelling an order", [`You can cancel any order before it is dispatched by writing to ${B.email} with your order number. Prepaid cancellations are refunded in full.`]],
      ["Returns and exchanges", ["You can return or exchange a cover within [7] days of delivery if it is unused and in its original packaging, for example if you ordered the wrong iPhone model.", "Screen glass that has been applied cannot be returned, because it can't be reused. Unopened glass packs can be returned within the same window."]],
      ["Damaged, defective or wrong items", [`If something arrives damaged, defective or isn't what you ordered, write to ${B.email} within [48 hours] of delivery with your order number and photos or an unboxing video. We replace it or refund you at no cost.`]],
      ["How to start a return", [`Email ${B.email} with your order number and the reason. We arrange a pickup where available; otherwise we share an address to send it to.`]],
      ["Refunds", ["Once the returned item reaches us and passes inspection, we refund within [5–7] business days. Prepaid orders are refunded to the original payment method. Cash-on-delivery orders are refunded to a bank account or UPI ID you share with us.", "Shipping and any cash-on-delivery fee are refunded only if the return is because of our mistake (damaged, defective or wrong item)."]],
    ],
  },
  warranty: {
    title: "Warranty & Replacement",
    sections: [
      ["What's covered", ["Covers and glass are covered against manufacturing defects for [warranty period] from delivery: for example peeling, broken button covers, a magnet ring that stops holding, or a defect in the glass that isn't caused by impact."]],
      ["What isn't covered", ["Damage from drops or impact (tempered glass that cracks in a fall has done its job), normal wear and scratches, colour change from dyes or chemicals, and damage from misuse or modification. A cover reduces the risk of damage to your iPhone but can't prevent it in every case, and the warranty covers the SnapEdge product, not the phone."]],
      ["How to claim", [`Email ${B.email} with your order number, a short description and photos. If the claim is approved we send a replacement of the same product, or a similar one if it's out of stock.`]],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["Who we are", [`This store is run by ${B.legalName} (${B.brand}), ${B.address}. This policy explains what personal data we collect when you use this site and buy from us, and how we use it.`]],
      ["What we collect", ["When you order: your name, phone number, email, delivery address and the items you buy. When you subscribe: your email address. When you contact us: what you send us.", "Payments are handled by Shiprocket Checkout and its payment partners. We don't see or store your card, UPI or bank details."]],
      ["Stored on your device", ["Your bag and the iPhone models you selected are saved in your browser's local storage so they're still there when you come back. You can clear them by emptying your bag or clearing site data."]],
      ["How we use it", ["To process and deliver your orders, send order and delivery updates, handle returns and support, prevent fraud and cash-on-delivery abuse, and meet legal and tax obligations. We send marketing emails only if you subscribe, and every email has an unsubscribe link."]],
      ["Who we share it with", ["Only what's needed: Shiprocket (checkout and shipping) and its courier and payment partners to deliver and charge for your order, service providers who help us run the store, and authorities where the law requires it. We don't sell your personal data."]],
      ["How long we keep it", ["Order records are kept as long as tax and accounting law requires. Other data is deleted when it's no longer needed for the purposes above."]],
      ["Your rights", [`Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you can ask to see, correct or delete your personal data, or withdraw consent for marketing. Write to ${B.email}.`]],
      ["Grievance officer", [`${B.grievanceOfficer}, ${B.email}, ${B.address}. We respond within the time the law requires.`]],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      ["About these terms", [`These terms apply to your use of this site and to orders placed with ${B.legalName} (${B.brand}). By placing an order you agree to them.`]],
      ["Choosing your model", ["Each cover and glass is made for a specific iPhone model. Please check your model in Settings › General › About before ordering. Items ordered for the wrong model can be returned as described in our Returns policy."]],
      ["Prices and offers", ["Prices are in Indian rupees and include GST. Offers such as 50% off 9H glass with any cover are applied automatically in your bag. If a price or offer is shown in error, we may cancel the affected order and refund you in full."]],
      ["Orders and payment", ["An order is confirmed when you receive an order confirmation. Payment is taken through Shiprocket Checkout by UPI, card, net banking or, where available, cash on delivery. We may cancel an order if an item is unavailable or the order looks fraudulent; any payment is refunded in full."]],
      ["Shipping, returns and warranty", ["Delivery, returns, refunds and warranty are covered by the Shipping, Returns and Warranty policies on this site, which form part of these terms."]],
      ["Liability", ["Our products reduce the risk of damage but cannot prevent it in every situation. To the extent the law allows, our liability for any claim is limited to the amount you paid for the product concerned."]],
      ["Governing law", [`These terms are governed by the laws of India, and the courts at ${B.courtsCity} have jurisdiction.`]],
    ],
  },
  contact: {
    title: "Contact Us",
    sections: [
      ["Customer support", [`Email: ${B.email}`, `Phone: ${B.phone}`, `Hours: ${B.hours}`]],
      ["Business details", [B.legalName, B.address, `GSTIN: ${B.gstin}`]],
      ["Orders and returns", ["Include your order number when you write, and we'll get back to you within [1] business day."]],
    ],
  },
};
