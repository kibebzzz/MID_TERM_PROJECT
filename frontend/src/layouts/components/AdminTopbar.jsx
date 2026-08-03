import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminTopbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold">
          Welcome,
        </h2>

        <p className="text-gray-500">
          {user?.fullName}
        </p>

      </div>

      <button className="relative">

        <Bell size={24} />

        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>

      </button>

    </header>
  );
};

export default AdminTopbar;