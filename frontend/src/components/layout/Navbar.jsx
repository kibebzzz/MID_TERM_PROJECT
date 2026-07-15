import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../ui/Button";
import Logo from "../../assets/logos/logo";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 ${
      isActive
        ? "text-cyan-500 font-semibold"
        : "text-gray-700 hover:text-cyan-400"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-white/50 shadow-lg">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

          <NavLink to="/">
            <Logo />
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">

            <NavLink to="/marketplace" className={navLinkClass}>
              Marketplace
            </NavLink>

            <NavLink to="/artists" className={navLinkClass}>
              Artists
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">

            <Search size={18} className="text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search creative works..."
              className="bg-transparent ml-3 outline-none w-full text-sm"
            />

          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">

            <Link to="/wishlist">
              <div className="relative">

                <Heart
                  size={22}
                  className="text-gray-700 hover:text-red-500 transition"
                />

                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}

              </div>
            </Link>

            <Link to="/cart">
              <div className="relative">

                <ShoppingCart
                  size={22}
                  className="text-gray-700 hover:text-cyan-500 transition"
                />

                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                )}

              </div>
            </Link>

            <Link to="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button>
                Sign Up
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>

        </div>

      </nav>

      {/* Mobile Drawer */}

      <AnimatePresence>

        {mobileOpen && (

          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl z-50 p-8"
            >

              <div className="flex justify-between items-center mb-10">

                <h2 className="text-2xl font-bold">
                  Menu
                </h2>

                <button onClick={() => setMobileOpen(false)}>
                  <X />
                </button>

              </div>

              <div className="flex flex-col gap-6">

                <NavLink to="/marketplace" onClick={() => setMobileOpen(false)}>
                  Marketplace
                </NavLink>

                <NavLink to="/artists" onClick={() => setMobileOpen(false)}>
                  Artists
                </NavLink>

                <NavLink to="/about" onClick={() => setMobileOpen(false)}>
                  About
                </NavLink>

                <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
                  Contact
                </NavLink>

                <hr />

                <NavLink to="/wishlist" onClick={() => setMobileOpen(false)}>
                  ❤️ Wishlist
                </NavLink>

                <NavLink to="/cart" onClick={() => setMobileOpen(false)}>
                  🛒 Cart
                </NavLink>

                <hr />

                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>

                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>
    </>
  );
};

export default Navbar;