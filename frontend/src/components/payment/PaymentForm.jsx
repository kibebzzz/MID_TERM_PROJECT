import Input from "../ui/Input";

const PaymentForm = ({
  paymentMethod,
  paymentData,
  setPaymentData,
  onClose,
  onConfirm,
}) => {

  return (

    <>

      <h2 className="text-3xl font-black mb-8">
        Complete Payment
      </h2>

      {paymentMethod === "MPESA" ? (

        <>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">

            <h3 className="font-bold text-xl">
              📱 M-Pesa
            </h3>

            <p className="text-gray-500 mt-2">
              A simulated STK Push will be sent to your phone.
            </p>

          </div>

          <Input
            placeholder="254712345678"
            value={paymentData.phone}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                phone: e.target.value,
              })
            }
          />

          <Input
            type="password"
            placeholder="M-Pesa PIN"
            value={paymentData.pin}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                pin: e.target.value,
              })
            }
          />

        </>

      ) : (

        <>

          <Input
            placeholder="Card Number"
            value={paymentData.cardNumber}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                cardNumber: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-2 gap-4 mt-4">

            <Input
              placeholder="MM/YY"
              value={paymentData.expiry}
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  expiry: e.target.value,
                })
              }
            />

            <Input
              placeholder="CVV"
              value={paymentData.cvv}
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  cvv: e.target.value,
                })
              }
            />

          </div>

          <Input
            className="mt-4"
            placeholder="Card Holder Name"
            value={paymentData.cardName}
            onChange={(e) =>
              setPaymentData({
                ...paymentData,
                cardName: e.target.value,
              })
            }
          />

        </>

      )}

      <div className="flex gap-4 mt-8">

        <button
          onClick={onClose}
          className="flex-1 border rounded-xl py-3"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 bg-cyan-500 text-white rounded-xl py-3 hover:bg-cyan-600"
        >
          {paymentMethod === "MPESA"
            ? "Send STK Push"
            : "Pay Now"}
        </button>

      </div>

    </>

  );

};

export default PaymentForm;