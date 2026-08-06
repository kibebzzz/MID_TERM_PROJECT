const ProcessingScreen = ({ paymentMethod }) => {

  return (

    <div className="text-center py-10">

      <div className="text-7xl mb-6">
        💳
      </div>

      <h2 className="text-3xl font-black">
        Processing Payment...
      </h2>

      <p className="text-gray-500 mt-4">
        Please wait while we securely process your payment.
      </p>

      <div className="mt-8">

        <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto"></div>

      </div>

      <p className="mt-8 text-cyan-500 font-semibold">

        Contacting{" "}

        {paymentMethod === "MPESA"

          ? "Safaricom M-Pesa..."

          : "Card Network..."}

      </p>

    </div>

  );

};

export default ProcessingScreen;
