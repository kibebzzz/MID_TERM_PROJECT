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
  <Route path="/cart" element={<Cart />}/>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="*" element={<NotFound />} />
  <Route path="/buyer" element={<BuyerLayout />}>
  <Route index element={<BuyerDashboard />} />
</Route>

<Route path="/artist" element={<ArtistLayout />}>
  <Route index element={<ArtistDashboard />} />
</Route>

<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
</Route>
</Routes>
  </AnimatePresence>
  );
};

export default AppRoutes;