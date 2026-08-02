import { useEffect, useState } from "react";

import PageWrapper from "../../components/common/PageWrapper";

import { getArtistStats } from "../../services/productService";

import { useAuth } from "../../context/AuthContext";

const Analytics = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState(null);

  useEffect(() => {

    const loadStats = async () => {

      const response = await getArtistStats(user.id);

      if (response.success) {
        setStats(response.data);
      }

    };

    loadStats();

  }, []);

  if (!stats) {
    return (
      <PageWrapper>
        <section className="p-20">
          Loading Analytics...
        </section>
      </PageWrapper>
    );
  }

  return (

    <PageWrapper>

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h1 className="text-5xl font-black">
          Analytics
        </h1>

        <p className="text-gray-500 mt-4">
          Overview of your creative portfolio.
        </p>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white rounded-3xl shadow p-8">

            <p className="text-gray-500">
              Products
            </p>

            <h2 className="text-5xl font-black mt-4">
              {stats.totalProducts}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-8">

            <p className="text-gray-500">
              Featured
            </p>

            <h2 className="text-5xl font-black mt-4">
              {stats.featuredProducts}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-8">

            <p className="text-gray-500">
              Inventory Value
            </p>

            <h2 className="text-3xl font-black mt-4">
              KSh {stats.inventoryValue.toLocaleString()}
            </h2>

          </div>

        </div>

        {/* Products */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold">
            Product Inventory
          </h2>

          <div className="overflow-x-auto mt-8">

            <table className="w-full bg-white rounded-3xl shadow">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-5">Title</th>

                  <th>Price</th>

                  <th>Quantity</th>

                  <th>Featured</th>

                  <th>Total Value</th>

                </tr>

              </thead>

              <tbody>

                {stats.products.map((product) => (

                  <tr key={product.id} className="border-b">

                    <td className="p-5">
                      {product.title}
                    </td>

                    <td className="text-center">
                      {Number(product.price).toLocaleString()}
                    </td>

                    <td className="text-center">
                      {product.quantity}
                    </td>

                    <td className="text-center">
                      {product.featured ? "✔" : "—"}
                    </td>

                    <td className="text-center">
                      {(Number(product.price) * product.quantity).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </PageWrapper>

  );

};

export default Analytics;