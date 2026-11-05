import { Routes, Route, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import StoreHeader from "./components/StoreHeader.jsx";
import StoreFooter from "./components/StoreFooter.jsx";
import PageMotion from "./motion/PageMotion.jsx";
import { startSmoothScroll, scrollToTop, scrollToHash } from "./motion/smoothScroll.js";
import Home from "./pages/Home.jsx";

// Home is the landing route and ships in the main bundle; everything else loads on demand.
const Collection = lazy(() => import("./pages/Collection.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const Policy = lazy(() => import("./pages/Policy.jsx"));
const OrderConfirmed = lazy(() => import("./pages/OrderConfirmed.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const AdminLayout = lazy(() => import("./admin/AdminLayout.jsx"));
const AdminOverview = lazy(() => import("./admin/Overview.jsx"));
const AdminProducts = lazy(() => import("./admin/Products.jsx"));
const AdminOrders = lazy(() => import("./admin/Orders.jsx"));
const AdminProductForm = lazy(() => import("./admin/ProductForm.jsx"));
const AdminModels = lazy(() => import("./admin/Models.jsx"));

function StoreLayout() {
  const { pathname } = useLocation();
  useEffect(startSmoothScroll, []);

  return (
    <>
      <StoreHeader />
      <Suspense fallback={null}>
        <Outlet />
        <PageMotion key={pathname} />
        <StoreFooter />
      </Suspense>
    </>
  );
}

export default function App() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();
  const page = pathname + search; // /product?id=a -> ?id=b is a new page too
  const lastPage = useRef(page);
  useEffect(() => {
    const newPage = lastPage.current !== page;
    lastPage.current = page;
    // New page: jump to its #section (e.g. /#lineup from the product page) or the top.
    // Same page: scroll to the #section here (forced), so it also works when the click came from
    // the menu drawer while smooth scroll was paused.
    // A REPLACE (e.g. Collection filters updating ?cat=) stays where the shopper is.
    if (newPage && navType !== "REPLACE") requestAnimationFrame(() => (hash ? scrollToHash(hash) : scrollToTop()));
    else if (hash) scrollToHash(hash, false);
  }, [page, hash, navType]);

  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
        <Route path="policies/:slug" element={<Policy />} />
        <Route path="order/confirmed" element={<OrderConfirmed />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route
        path="signin"
        element={
          <Suspense fallback={null}>
            <SignIn />
          </Suspense>
        }
      />
      <Route
        path="admin"
        element={
          <Suspense fallback={null}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/:id" element={<AdminProductForm />} />
        <Route path="models" element={<AdminModels />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}
