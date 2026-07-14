import { NavLink } from "react-router-dom";
import Logo from "../../assets/logos/logo";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-400 ${
      isActive
        ? "text-cyan-500 font-semibold"
        : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
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

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="font-medium hover:text-cyan-500 transition-colors">
            Login
          </button>

          <button className="bg-cyan-400 hover:bg-cyan-500 transition-all duration-300 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg">
            Sign Up
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;