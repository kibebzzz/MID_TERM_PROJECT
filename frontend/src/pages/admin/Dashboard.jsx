import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getDashboardStats } from "../../services/adminService";

const Dashboard = () => {

  const token = localStorage.getItem("token");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    const response = await getDashboardStats(token);

    if (response.success) {
      setStats(response.data);
    } else {
      toast.error(response.message);
    }

    setLoading(false);

  };

  if (loading) {
    return (
      <h1 className="text-4xl font-black">
        Loading Dashboard...
      </h1>
    );
  }

  return (

    <section>

      <div>

        <h1 className="text-5xl font-black">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-3">
          Monitor and manage the Palette platform.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

        <div className="bg-white rounded-3xl shadow p-8">

          <h3 className="text-gray-500">
            Total Artists
          </h3>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalArtists}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h3 className="text-gray-500">
            Total Buyers
          </h3>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalBuyers}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h3 className="text-gray-500">
            Total Products
          </h3>

          <h2 className="text-5xl font-black mt-4">
            {stats.totalProducts}
          </h2>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          <h3 className="text-gray-500">
            Pending Requests
          </h3>

          <h2 className="text-5xl font-black mt-4 text-yellow-500">
            {stats.pendingVerificationRequests}
          </h2>

        </div>

      </div>

      {/* Recent Verification Requests */}

      <div className="bg-white rounded-3xl shadow mt-12 p-8">

        <h2 className="text-3xl font-bold mb-6">
          Recent Verification Requests
        </h2>

        {stats.recentVerificationRequests.length === 0 ? (

          <p className="text-gray-500">
            No pending verification requests.
          </p>

        ) : (

          <div className="space-y-5">

            {stats.recentVerificationRequests.map((artist) => (

              <div
                key={artist.id}
                className="flex justify-between items-center border-b pb-4"
              >

                <div>

                  <h3 className="font-bold">
                    {artist.fullName}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {artist.email}
                  </p>

                </div>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
                  Pending
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Recent Products */}

      <div className="bg-white rounded-3xl shadow mt-12 p-8">

        <h2 className="text-3xl font-bold mb-6">
          Recently Added Products
        </h2>

        {stats.recentProducts.length === 0 ? (

          <p className="text-gray-500">
            No products uploaded yet.
          </p>

        ) : (

          <div className="space-y-5">

            {stats.recentProducts.map((product) => (

              <div
                key={product.id}
                className="flex justify-between items-center border-b pb-4"
              >

                <div>

                  <h3 className="font-bold">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {product.artist.fullName}
                  </p>

                </div>

                <span className="font-bold">
                  KSh {Number(product.price).toLocaleString()}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

};

export default Dashboard;