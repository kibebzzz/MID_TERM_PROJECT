import { NavLink } from "react-router-dom";
import Logo from "../../assets/logos/logo";
import { Search } from "lucide-react";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-400 ${
      isActive
        ? "text-cyan-500 font-semibold"
        : "text-gray-700"
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

          <NavLink
            to="/marketplace"
            className={navLinkClass}
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/artists"
            className={navLinkClass}
          >
            Artists
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>

        </div>

        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">

  <Search
    size={18}
    className="text-gray-400"
  />

  <input
    type="text"
    placeholder="Search artwork..."
    className="bg-transparent ml-3 outline-none w-full"
  />

</div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="px-5 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 font-medium">
  Login
</button>

          <button className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-300/40 transition-all duration-300 text-white px-6 py-2 rounded-xl font-semibold">
  Sign Up
</button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;