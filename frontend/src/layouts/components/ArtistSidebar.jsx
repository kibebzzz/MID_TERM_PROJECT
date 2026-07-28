import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Package,
  BarChart3,
  BadgeCheck,
  Settings,
  LogOut,
} from "lucide-react";

const ArtistSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-cyan-500 text-white"
        : "hover:bg-gray-100"
    }`;

  return (
    <aside className="w-72 bg-white border-r p-6">

      <h1 className="text-3xl font-black mb-10">
        Palette
      </h1>

      <nav className="space-y-2">

        <NavLink to="/artist" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/artist/upload" className={linkClass}>
          <Upload size={20} />
          Upload Product
        </NavLink>

        <NavLink to="/artist/products" className={linkClass}>
          <Package size={20} />
          My Products
        </NavLink>

        <NavLink to="/artist/analytics" className={linkClass}>
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink to="/artist/verification" className={linkClass}>
          <BadgeCheck size={20} />
          Verification
        </NavLink>

        <NavLink to="/artist/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50 text-red-500 transition">
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </aside>
  );
};

export default ArtistSidebar;