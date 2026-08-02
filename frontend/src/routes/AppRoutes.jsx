import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Marketplace from "../pages/public/Marketplace";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import ArtistProfile from "../pages/public/ArtistProfile";
import WorkDetails from "../pages/public/WorkDetails";
import Wishlist from "../pages/public/Wishlist";
import Artists from "../pages/public/Artists";
import Cart from "../pages/public/Cart";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import { AnimatePresence } from "framer-motion";
import NotFound from "../pages/public/NotFound";
import BuyerLayout from "../layouts/BuyerLayout";
import ArtistLayout from "../layouts/ArtistLayout";
import AdminLayout from "../layouts/AdminLayout";
import BuyerDashboard from "../pages/buyer/Dashboard";
import ArtistDashboard from "../pages/artist/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UploadProduct from "../pages/artist/UploadProduct";
import ManageProducts from "../pages/artist/ManageProducts";
import Analytics from "../pages/artist/Analytics";
import Verification from "../pages/artist/Verification";
import ArtistSettings from "../pages/artist/ArtistSettings";
import EditProduct from "../pages/artist/EditProduct";
import Orders from "../pages/buyer/Orders";


const AppRoutes = () => {
  return (

    <AnimatePresence mode="wait">
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/marketplace" element={<Marketplace />} />
  <Route path="/artists/:id" element={<ArtistProfile />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/work/:id" element={<WorkDetails />}/>
  <Route path="/wishlist" element={<Wishlist />}/>
  <Route path="/artists" element={<Artists />}/>

  <Route
  path="/cart"
  element={
    <ProtectedRoute roles={["BUYER"]}>
      <Cart />
    </ProtectedRoute>
  }
/>

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="*" element={<NotFound />} />
  
  <Route path="/buyer"
  element={
    <ProtectedRoute roles={["BUYER"]}>
      <BuyerLayout />
    </ProtectedRoute>
  } >
  <Route index element={<BuyerDashboard />} />
  <Route path="orders" element={<Orders />} />
</Route>

<Route
  path="/artist"
  element={
    <ProtectedRoute roles={["ARTIST"]}>
      <ArtistLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<ArtistDashboard />} />

  <Route path="upload" element={<UploadProduct />} />

  <Route path="products" element={<ManageProducts />} />

  <Route path="analytics" element={<Analytics />} />

  <Route path="verification" element={<Verification />} />

  <Route path="settings" element={<ArtistSettings />} />

  <Route path="products/edit/:id" element={<EditProduct />} />
</Route>

<Route
  path="/admin"
  element={
    <ProtectedRoute roles={["ADMIN"]}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
</Route>

</Routes>
  </AnimatePresence>
  );
};

export default AppRoutes;