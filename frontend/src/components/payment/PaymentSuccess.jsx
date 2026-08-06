import { CheckCircle } from "lucide-react";
import Receipt from "./Receipt";
import { useState } from "react";

const PaymentSuccess = ({
  order,
  paymentMethod,
  paymentReference,
  onOrders,
  onMarketplace,
}) => {

    const [showReceipt, setShowReceipt] = useState(false);

  return (

    <div className="text-center py-10">

      <CheckCircle
        size={90}
        className="mx-auto text-green-500"
      />

      <h2 className="text-4xl font-black mt-6">
        Payment Successful!
      </h2>

      <p className="text-gray-500 mt-3">
        Thank you for supporting Kenyan creatives.
      </p>

      <div className="bg-gray-50 rounded-2xl mt-10 p-6 text-left space-y-4">

        <div className="flex justify-between">

          <span className="font-semibold">
            Order
          </span>

          <span>
            #{order.id.slice(0,8)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="font-semibold">
            Amount
          </span>

          <span>

            KSh {Number(order.totalAmount).toLocaleString()}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="font-semibold">
            Payment Method
          </span>

          <span>

            {paymentMethod === "MPESA"
              ? "M-Pesa"
              : "Credit / Debit Card"}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="font-semibold">
            Reference
          </span>

          <span className="font-mono">

            {paymentReference}

          </span>

        </div>

        <div className="flex justify-between">

          <span className="font-semibold">
            Estimated Delivery
          </span>

          <span>
            2–5 Business Days
          </span>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">

        <button
          onClick={onMarketplace}
          className="border rounded-xl py-3 hover:bg-gray-100"
        >
          Continue Shopping
        </button>

        <button
  onClick={() => setShowReceipt(true)}
  className="bg-cyan-500 text-white rounded-xl py-3 hover:bg-cyan-600"
>
  View Receipt
</button>

        <button
          onClick={onOrders}
          className="bg-cyan-500 text-white rounded-xl py-3 hover:bg-cyan-600"
        >
          View Orders
        </button>

      </div>

      {showReceipt && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8">

    <Receipt order={order} />

    <div className="flex justify-end gap-4 mt-8">

      <button
        onClick={() => setShowReceipt(false)}
        className="border rounded-xl px-6 py-3"
      >
        Close
      </button>

      <button
        onClick={() => window.print()}
        className="bg-cyan-500 text-white rounded-xl px-6 py-3"
      >
        Print Receipt
      </button>

    </div>

  </div>

</div>

)}

    </div>

  );

};

export default PaymentSuccess;