import { useEffect, useState } from "react";
import {
  Package,
  Star,
  DollarSign,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getArtistStats } from "../../services/dashboardService";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalProducts: 0,
    revenue: 0,
    featuredProducts: 0,
    inventoryValue: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      const response = await getArtistStats(user.id);

      if (response.success) {
        setStats(response.data);
      }
    };

    loadStats();
  }, [user]);

  const cards = [

  {
    title: "Total Products",
    value: stats.totalProducts,
    icon: <Package size={28} />,
  },

  {
    title: "Revenue Earned",
    value: `KSh ${Number(
      stats.revenue
    ).toLocaleString()}`,
    icon: <DollarSign size={28} />,
  },

  {
    title: "Products Sold",
    value: stats.productsSold,
    icon: <Package size={28} />,
  },

  {
    title: "Available Inventory",
    value: `KSh ${Number(
      stats.inventoryValue
    ).toLocaleString()}`,
    icon: <Star size={28} />,
  },

];

  return (
    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-black">
          Welcome back, {user?.fullName} 👋
        </h1>

        <p className="text-gray-500 mt-3">
          Here's an overview of your creative business.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-sm p-8"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-black mt-3">
                  {card.value}
                </h2>

              </div>

              <div className="bg-cyan-100 text-cyan-600 rounded-2xl p-4">
                {card.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;