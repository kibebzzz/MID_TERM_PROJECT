import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ArtistTopbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b px-8 py-5 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">
          Welcome back,
        </h2>

        <p className="text-gray-500">
          {user?.fullName}
        </p>
      </div>

      <button className="relative p-3 rounded-full hover:bg-gray-100 transition">
        <Bell size={22} />
      </button>

    </header>
  );
};

export default ArtistTopbar;