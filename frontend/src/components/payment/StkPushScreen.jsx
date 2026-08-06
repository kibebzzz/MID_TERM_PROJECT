const StkPushScreen = ({ phone }) => {

  return (

    <div className="text-center py-10">

      <div className="text-7xl mb-6">
        📱
      </div>

      <h2 className="text-3xl font-black">
        M-Pesa STK Push
      </h2>

      <p className="text-gray-500 mt-4">
        Sending payment request to
      </p>

      <h3 className="text-xl font-bold mt-2">
        {phone}
      </h3>

      <div className="mt-8">

        <div className="animate-pulse text-green-600 text-6xl">
          ✓
        </div>

      </div>

      <p className="mt-8 text-green-600 font-semibold">
        STK Push Sent Successfully
      </p>

      <p className="text-gray-500 mt-2">
        Waiting for customer confirmation...
      </p>

    </div>

  );

};

export default StkPushScreen;