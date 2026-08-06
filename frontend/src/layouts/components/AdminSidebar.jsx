import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BadgeCheck,
  Package,
  Users,
  BarChart3,
  LogOut,
  HandHelping,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-cyan-500 text-white"
        : "hover:bg-gray-100"
    }`;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <aside className="w-72 bg-white border-r p-6">

      <h1 className="text-3xl font-black mb-10">
        Palette Admin
      </h1>

      <nav className="space-y-2">

        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/verification"
          className={linkClass}
        >
          <BadgeCheck size={20} />
          Verification Requests
        </NavLink>

        <NavLink 
          to="/admin/support"
            className={linkClass}>
          <HandHelping size={20} />
          Support Tickets

        </NavLink>

        <NavLink
          to="/admin/products"
          className={linkClass}
        >
          <Package size={20} />
          Product Management
        </NavLink>

        <NavLink
          to="/admin/users"
          className={linkClass}
        >
          <Users size={20} />
          User Management
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={linkClass}
        >
          <BarChart3 size={20} />
          Platform Analytics
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50 text-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </aside>
  );
};

export default AdminSidebar;