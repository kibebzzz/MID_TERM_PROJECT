import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getOrder, completePayment } from "../../services/orderService";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PaymentModal from "../../components/payment/PaymentModal";



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

  const [paymentMethod, setPaymentMethod] =
  useState("MPESA");

  const [showPaymentModal, setShowPaymentModal] =
  useState(false);

const [processing, setProcessing] =
  useState(false);

  const [stkPush, setStkPush] =
  useState(false);

  const [success, setSuccess] =
useState(false);

const [paymentReference, setPaymentReference] =
useState("");

const [paymentData, setPaymentData] =
  useState({

    phone: "",

    pin: "",

    cardNumber: "",

    expiry: "",

    cvv: "",

    cardName: "",

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

  const generateReference = () => {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

  let code = "";

  for (let i = 0; i < 8; i++) {

    code += chars[
      Math.floor(
        Math.random() *
        chars.length
      )
    ];

  }

  return paymentMethod === "MPESA"

    ? `MPESA-${code}`

    : `CARD-${code}`;

};

const handlePayment = async () => {

  if (
    !formData.shippingName ||
    !formData.shippingEmail ||
    !formData.shippingPhone ||
    !formData.shippingAddress ||
    !formData.shippingCity
  ) {

    toast.error(
      "Please complete all shipping information."
    );

    return;

  }

  if (paymentMethod === "MPESA") {

    if (
      !paymentData.phone ||
      !paymentData.pin
    ) {

      toast.error(
        "Please enter your M-Pesa details."
      );

      return;

    }

  }

  if (paymentMethod === "CARD") {

    if (
      !paymentData.cardNumber ||
      !paymentData.expiry ||
      !paymentData.cvv ||
      !paymentData.cardName
    ) {

      toast.error(
        "Please complete your card details."
      );

      return;

    }

  }

  setStkPush(true);

setTimeout(() => {

  setStkPush(false);

  setProcessing(true);

  setTimeout(async () => {

    const reference = generateReference();

setPaymentReference(reference);

const response =
await completePayment(

    orderId,

    {

        ...formData,

        paymentMethod,

        paymentReference: reference,

    }

);

    setProcessing(false);

    if (response.success) {

      const reference =
    generateReference();

setPaymentReference(reference);

setSuccess(true);

    } else {

      toast.error(response.message);

    }

  }, 2500);

}, 2000);

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

          <div className="mt-8">

  <h2 className="text-2xl font-bold mb-5">
    Payment Method
  </h2>

  <div className="space-y-4">

    <label
      className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition ${
        paymentMethod === "MPESA"
          ? "border-cyan-500 bg-cyan-50"
          : "border-gray-200"
      }`}
    >

      <div>

        <h3 className="font-bold text-lg">
          📱 M-Pesa
        </h3>

        <p className="text-gray-500 text-sm">
          Recommended for Kenyan buyers
        </p>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "MPESA"}
        onChange={() =>
          setPaymentMethod("MPESA")
        }
      />

    </label>

    <label
      className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition ${
        paymentMethod === "CARD"
          ? "border-cyan-500 bg-cyan-50"
          : "border-gray-200"
      }`}
    >

      <div>

        <h3 className="font-bold text-lg">
          💳 Credit / Debit Card
        </h3>

        <p className="text-gray-500 text-sm">
          Visa • Mastercard
        </p>

      </div>

      <input
        type="radio"
        checked={paymentMethod === "CARD"}
        onChange={() =>
          setPaymentMethod("CARD")
        }
      />

    </label>

  </div>

</div>

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

onClick={() =>
  setShowPaymentModal(true)
}

>

Complete Payment

</Button>

        </div>

      </div>

      <PaymentModal

open={showPaymentModal}

paymentMethod={paymentMethod}

paymentData={paymentData}

setPaymentData={setPaymentData}

processing={processing}

stkPush={stkPush}

success={success}

paymentReference={paymentReference}

order={order}

onClose={() =>
setShowPaymentModal(false)
}

onConfirm={handlePayment}

onOrders={() => {

setShowPaymentModal(false);

navigate("/buyer/orders");

}}

onMarketplace={() => {

setShowPaymentModal(false);

navigate("/marketplace");

}}

/>

    </section>

  );

};

export default Checkout;