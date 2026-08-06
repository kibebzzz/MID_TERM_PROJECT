import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  getOrders,
  deleteOrder
 } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewModal from "../../components/reviews/ReviewModal";

const Orders = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [selectedProduct, setSelectedProduct] =
  useState(null);

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

  <span
    className={`px-3 py-1 rounded-full font-semibold ${
      order.status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : order.status === "PAID"
        ? "bg-green-100 text-green-700"
        : order.status === "DELIVERED"
        ? "bg-cyan-100 text-cyan-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {order.status}
  </span>

  <h3 className="text-2xl font-bold mt-3">
    KSh {order.totalAmount.toLocaleString()}
  </h3>

  {order.status === "PENDING" && (

  <div className="mt-5 flex flex-col gap-3">

    <button
      onClick={() =>
        navigate(`/buyer/checkout/${order.id}`)
      }
      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
    >
      Complete Payment
    </button>

    <button
      onClick={async () => {

        const confirmed = window.confirm(
          "Are you sure you want to delete this pending order?"
        );

        if (!confirmed) return;

        const response = await deleteOrder(
          order.id,
          user.id
        );

        if (response.success) {

          toast.success("Order deleted.");

          setOrders((prev) =>
            prev.filter(
              (o) => o.id !== order.id
            )
          );

        } else {

          toast.error(response.message);

        }

      }}
      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl transition"
    >
      Delete Order
    </button>

  </div>

)}

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

                    {order.status === "PAID" &&
 !item.review && (

<button

  onClick={() =>
    setSelectedProduct(item.product)
  }

  className="text-cyan-500 text-sm mt-2"

>

Leave Review

</button>

)}

                  </div>

                ))}

              </div>

            </div>

          ))

        )}

      </div>

      {selectedProduct && (

<ReviewModal

  product={selectedProduct}

  order={null}

  user={user}

  onClose={() =>
    setSelectedProduct(null)
  }

/>

)}

    </section>
  );
};

export default Orders;