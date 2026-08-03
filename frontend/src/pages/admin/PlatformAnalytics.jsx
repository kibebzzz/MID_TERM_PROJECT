import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAnalytics } from "../../services/adminService";

const PlatformAnalytics = () => {

  const token = localStorage.getItem("token");

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    const response = await getAnalytics(token);

    if (response.success) {

      setAnalytics(response.data);

    } else {

      toast.error(response.message);

    }

  };

  if (!analytics) {
    return (
      <h1 className="text-4xl font-black">
        Loading Analytics...
      </h1>
    );
  }

  const cards = [

    {
      title: "Total Users",
      value: analytics.totalUsers,
    },

    {
      title: "Artists",
      value: analytics.totalArtists,
    },

    {
      title: "Buyers",
      value: analytics.totalBuyers,
    },

    {
      title: "Products",
      value: analytics.totalProducts,
    },

    {
      title: "Available Products",
      value: analytics.availableProducts,
    },

    {
      title: "Removed Products",
      value: analytics.removedProducts,
    },

    {
      title: "Featured Products",
      value: analytics.featuredProducts,
    },

    {
      title: "Verified Artists",
      value: analytics.verifiedArtists,
    },

    {
      title: "Pending Verification",
      value: analytics.pendingRequests,
    },

  ];

  return (

    <section>

      <div>

        <h1 className="text-5xl font-black">
          Platform Analytics
        </h1>

        <p className="text-gray-500 mt-3">
          Monitor activity across the Palette marketplace.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-sm p-8 hover:shadow-xl transition"
          >

            <p className="text-gray-500">
              {card.title}
            </p>

            <h2 className="text-5xl font-black mt-5">
              {card.value}
            </h2>

          </div>

        ))}

      </div>

    </section>

  );

};

export default PlatformAnalytics;