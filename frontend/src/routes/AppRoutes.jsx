import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Marketplace from "../pages/public/Marketplace";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import ArtistProfile from "../pages/public/ArtistProfile";
import WorkDetails from "../pages/public/WorkDetails";
import Wishlist from "../pages/public/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/marketplace" element={<Marketplace />} />
  <Route path="/artists" element={<ArtistProfile />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/work/:id" element={<WorkDetails />}/>
  <Route path="/wishlist" element={<Wishlist />}/>
</Routes>
  );
};

export default AppRoutes;