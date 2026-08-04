import { Trash2, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../services/orderService";

const Cart = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    cart,
    total,
    loading,
    emptyCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const handleCheckout = async () => {

  if (!user) {

    toast.error("Please login first.");

    return;

  }

  const response = await createOrder(user.id);

  if (response.success) {

    toast.success("Order created successfully.");

    navigate("/buyer/orders");

  } else {

    toast.error(response.message);

  }

};

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h1 className="text-4xl font-black">
          Loading Cart...
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">

      {/* Header */}

      <div className="mb-10">

        <p className="uppercase tracking-[0.3em] text-cyan-500 font-semibold">
          Palette
        </p>

        <h1 className="text-5xl font-black mt-3">
          My Cart
        </h1>

        <p className="text-gray-500 mt-4">
          Review your selected creative works.
        </p>

      </div>

      {cart.length === 0 ? (

        <div className="text-center py-32">

          <div className="text-7xl">
            🛒
          </div>

          <h2 className="text-3xl font-bold mt-6">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-4">
            Browse the marketplace and discover amazing creative works.
          </p>

          <Link
            to="/marketplace"
            className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl transition"
          >
            Browse Marketplace
          </Link>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-12">

          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex gap-6 bg-white rounded-3xl shadow-sm p-6"
              >

                <img
                  src={
                    item.product.imageUrls?.[0] ||
                    "https://placehold.co/400x400?text=Palette"
                  }
                  alt={item.product.title}
                  className="w-40 h-40 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <p className="text-cyan-500 font-semibold">
                    {item.product.category.replaceAll("_", " ")}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {item.product.title}
                  </h2>

                  <h3 className="text-2xl font-bold mt-5">
                    KSh{" "}
                    {Number(item.product.price).toLocaleString()}
                  </h3>

                </div>

                <div className="flex flex-col justify-between items-end">

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 />
                  </button>

                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item)}
                      className="p-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Summary */}

          <div className="bg-white rounded-3xl shadow-sm p-8 h-fit">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between mt-8">

              <span>Subtotal</span>

              <span>
                KSh {total.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between mt-4">

              <span>Delivery</span>

              <span>FREE</span>

            </div>

            <hr className="my-8" />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>
                KSh {total.toLocaleString()}
              </span>

            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-10 bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-2xl transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={emptyCart}
              className="w-full mt-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-4 rounded-2xl transition"
            >
              Clear Cart
            </button>

          </div>

        </div>

      )}

    </section>
  );
};

export default Cart;