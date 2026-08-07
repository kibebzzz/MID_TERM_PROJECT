import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageWrapper from "../../components/common/PageWrapper";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { getOrders } from "../../services/orderService";

const Dashboard = () => {
  const { user } = useAuth();
  const { cart, itemCount } = useCart();
  const { wishlist } = useWishlist();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;

      const response = await getOrders(user.id);

      if (response.success) {
        setOrders(response.data);
      }
    };

    loadOrders();
  }, [user]);

  const totalSpent = useMemo(() => {

  return orders
    .filter((order) => order.status === "PAID")
    .reduce(
      (sum, order) =>
        sum + Number(order.totalAmount),
      0
    );

}, [orders]);

  return (
    <PageWrapper>

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h1 className="text-5xl font-black">
          Welcome back,
          <span className="text-cyan-500"> {user?.fullName}</span> 👋
        </h1>

        <p className="text-gray-500 mt-4">
          Here's an overview of your activity on Palette.
        </p>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Wishlist
            </h3>

            <p className="text-4xl font-black mt-3">
              {wishlist.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Cart Items
            </h3>

            <p className="text-4xl font-black mt-3">
              {itemCount}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Orders
            </h3>

            <p className="text-4xl font-black mt-3">

  {

    orders.filter(

      (order) => order.status === "PAID"

    ).length

  }

</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Total Spent
            </h3>

            <p className="text-3xl font-black mt-3">
              KSh {totalSpent.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-3xl shadow mt-12 p-8">

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Recent Orders
            </h2>

            <Link
              to="/buyer/orders"
              className="text-cyan-500 hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="mt-8 space-y-6">

            {orders.length === 0 ? (

              <p className="text-gray-500">
                You haven't placed any orders yet.
              </p>

            ) : (

              orders.slice(0, 3).map((order) => (

                <div
                  key={order.id}
                  className="flex justify-between items-center border-b pb-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold">
                      {order.status}
                    </p>

                    <p className="text-cyan-500 font-bold">
                      KSh {Number(order.totalAmount).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Quick Actions */}

        <div className="flex flex-wrap gap-5 mt-12">

          <Link
            to="/marketplace"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl transition"
          >
            Browse Marketplace
          </Link>

          <Link
            to="/cart"
            className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-2xl transition"
          >
            View Cart
          </Link>

          <Link
            to="/buyer/orders"
            className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-2xl transition"
          >
            My Orders
          </Link>

        </div>

      </section>

    </PageWrapper>
  );
};

export default Dashboard;