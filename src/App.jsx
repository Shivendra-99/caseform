import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import StoreHeader from "./components/StoreHeader.jsx";
import StoreFooter from "./components/StoreFooter.jsx";
import AdminSidebar from "./components/AdminSidebar.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import PageMotion from "./motion/PageMotion.jsx";
import { startSmoothScroll, scrollToTop } from "./motion/smoothScroll.js";
import Home from "./pages/Home.jsx";

// Home is the landing route and ships in the main bundle; everything else loads on demand.
const Collection = lazy(() => import("./pages/Collection.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const Inventory = lazy(() => import("./pages/Inventory.jsx"));

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

function AdminLayout() {
  return (
    <>
      <AdminSidebar />
      <div className="pl-64">
        <AdminHeader />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="account" element={<Account />} />
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
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
}
