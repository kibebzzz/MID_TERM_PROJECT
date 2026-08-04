import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrder, completePayment } from "../../services/orderService";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Checkout = () => {

  const navigate = useNavigate();

  const { orderId } = useParams();

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState(null);

  const [formData, setFormData] = useState({

    shippingName: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "Kenya",

  });

  useEffect(() => {

    loadOrder();

  }, []);

  const loadOrder = async () => {

    const response = await getOrder(orderId);

    if (response.success) {

      setOrder(response.data);

    } else {

      toast.error(response.message);

      navigate("/buyer/orders");

    }

  };

  const handleChange = (e) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  };

  const handlePayment = async () => {

    if (
      !formData.shippingName ||
      !formData.shippingEmail ||
      !formData.shippingPhone ||
      !formData.shippingAddress ||
      !formData.shippingCity
    ) {

      toast.error("Please complete all shipping information.");

      return;

    }

    setLoading(true);

    const response = await completePayment(
      orderId,
      formData
    );

    if (response.success) {

      toast.success("Payment completed successfully!");

      navigate("/buyer/orders");

    } else {

      toast.error(response.message);

    }

    setLoading(false);

  };

  if (!order) {

    return (

      <section className="max-w-6xl mx-auto py-20">

        <h1 className="text-4xl font-bold">

          Loading checkout...

        </h1>

      </section>

    );

  }

  return (

    <section className="max-w-6xl mx-auto py-20 px-8">

      <h1 className="text-5xl font-black">

        Checkout

      </h1>

      <p className="text-gray-500 mt-3">

        Complete payment for your order.

      </p>

      <div className="grid lg:grid-cols-2 gap-10 mt-10">

        {/* Shipping */}

        <div className="space-y-5">

          <Input
            name="shippingName"
            placeholder="Full Name"
            value={formData.shippingName}
            onChange={handleChange}
          />

          <Input
            name="shippingEmail"
            placeholder="Email Address"
            value={formData.shippingEmail}
            onChange={handleChange}
          />

          <Input
            name="shippingPhone"
            placeholder="Phone Number"
            value={formData.shippingPhone}
            onChange={handleChange}
          />

          <Input
            name="shippingAddress"
            placeholder="Shipping Address"
            value={formData.shippingAddress}
            onChange={handleChange}
          />

          <Input
            name="shippingCity"
            placeholder="City"
            value={formData.shippingCity}
            onChange={handleChange}
          />

          <Input
            name="shippingCountry"
            placeholder="Country"
            value={formData.shippingCountry}
            onChange={handleChange}
          />

        </div>

        {/* Summary */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-3xl font-bold">

            Order Summary

          </h2>

          <div className="mt-8 space-y-5">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <h3 className="font-semibold">

                    {item.product.title}

                  </h3>

                  <p className="text-gray-500">

                    Quantity: {item.quantity}

                  </p>

                </div>

                <p className="font-semibold">

                  KSh {(item.price * item.quantity).toLocaleString()}

                </p>

              </div>

            ))}

          </div>

          <div className="flex justify-between mt-8 text-2xl font-bold">

            <span>Total</span>

            <span>

              KSh {order.totalAmount.toLocaleString()}

            </span>

          </div>

          <Button
            className="w-full mt-10"
            onClick={handlePayment}
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Complete Payment"}

          </Button>

        </div>

      </div>

    </section>

  );

};

export default Checkout;