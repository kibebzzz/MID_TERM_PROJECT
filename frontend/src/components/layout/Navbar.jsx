import { Link, NavLink } from "react-router-dom";
import { Search, Heart, ShoppingCart } from "lucide-react";

import Logo from "../../assets/logos/logo";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 ${
      isActive
        ? "text-cyan-500 font-semibold"
        : "text-gray-700 hover:text-cyan-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-white/50 shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <NavLink to="/">
          <Logo />
        </NavLink>

        {/* Navigation */}
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

        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search creative works..."
            className="bg-transparent ml-3 outline-none w-full text-sm"
          />

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Wishlist */}

          <Link to="/wishlist">

            <div className="relative">

              <button className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300">

                <Heart
                  size={22}
                  className="text-gray-700 hover:text-red-500 transition-colors"
                />

              </button>

              {wishlist.length > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                  {wishlist.length}

                </span>

              )}

            </div>

          </Link>

          {/* Cart */}

          <Link to="/cart">

            <div className="relative">

              <button className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300">

                <ShoppingCart
                  size={22}
                  className="text-gray-700 hover:text-cyan-500 transition-colors"
                />

              </button>

              {cart.length > 0 && (

                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                  {cart.reduce((total, item) => total + item.quantity, 0)}

                </span>

              )}

            </div>

          </Link>

          {/* Login */}

          <button className="px-5 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium">

            Login

          </button>

          {/* Sign Up */}

          <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-300/40 transition-all duration-300 text-white px-6 py-2 rounded-xl font-semibold">

            Sign Up

          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;