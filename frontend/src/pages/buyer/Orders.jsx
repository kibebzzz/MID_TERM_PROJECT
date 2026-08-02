import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getOrders } from "../../services/orderService";

const Orders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const response = await getOrders(user.id);

      if (response.success) {
        setOrders(response.data);
      }
    };

    if (user) {
      loadOrders();
    }
  }, [user]);

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      <h1 className="text-5xl font-black">
        My Orders
      </h1>

      <p className="text-gray-500 mt-3">
        View your purchase history.
      </p>

      <div className="mt-10 space-y-8">

        {orders.length === 0 ? (

          <p>No orders yet.</p>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-3xl shadow p-8"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-xl">
                    Order #{order.id.slice(0, 8)}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {order.status}
                  </p>

                  <h3 className="text-2xl font-bold mt-2">
                    KSh {order.totalAmount.toLocaleString()}
                  </h3>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-4"
                  >

                    <div>

                      <h4 className="font-semibold">
                        {item.product.title}
                      </h4>

                      <p className="text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      KSh {item.price.toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
};

export default Orders;