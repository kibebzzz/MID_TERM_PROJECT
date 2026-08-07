import { useEffect, useState } from "react";
import { getArtistOrders } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const ArtistOrders = () => {

  const { token } = useAuth();

  const [data, setData] = useState(null);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    const response =
      await getArtistOrders(token);

    if (response.success) {

      setData(response.data);

    }

  };

  if (!data) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <section className="p-8">

      <h1 className="text-4xl font-black">

        Orders

      </h1>

      <p className="text-gray-500 mt-2">

        Track your sales and revenue.

      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Revenue

          </p>

          <h2 className="text-3xl font-black mt-2">

            KSh {data.totalRevenue.toLocaleString()}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Orders

          </p>

          <h2 className="text-3xl font-black mt-2">

            {data.totalOrders}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Products Sold

          </p>

          <h2 className="text-3xl font-black mt-2">

            {data.totalProductsSold}

          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <p className="text-gray-500">

            Average Order

          </p>

          <h2 className="text-3xl font-black mt-2">

            KSh {Math.round(data.averageOrderValue).toLocaleString()}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow mt-10 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-5">

                Buyer

              </th>

              <th className="text-left">

                Product

              </th>

              <th>

                Qty

              </th>

              <th>

                Amount

              </th>

              <th>

                Date

              </th>

            </tr>

          </thead>

          <tbody>

            {data.orders.flatMap(order =>

              order.items.map(item => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-5">

                    {order.user.fullName}

                  </td>

                  <td>

                    {item.product.title}

                  </td>

                  <td className="text-center">

                    {item.quantity}

                  </td>

                  <td className="text-center">

                    KSh {(item.price * item.quantity).toLocaleString()}

                  </td>

                  <td className="text-center">

                    {new Date(order.paidAt).toLocaleDateString()}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>

  );

};

export default ArtistOrders;