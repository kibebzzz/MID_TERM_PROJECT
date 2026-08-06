const Receipt = ({ order }) => {

  return (

    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-4xl font-black">

            Palette

          </h1>

          <p className="text-gray-500 mt-2">

            Digital Purchase Receipt

          </p>

        </div>

        <div className="text-right">

          <p className="font-bold">

            Order #

          </p>

          <p>

            {order.id.slice(0,8)}

          </p>

        </div>

      </div>

      <hr className="my-8"/>

      <div className="grid grid-cols-2 gap-8">

        <div>

          <h3 className="font-bold mb-3">

            Shipping Details

          </h3>

          <p>{order.shippingName}</p>

          <p>{order.shippingEmail}</p>

          <p>{order.shippingPhone}</p>

          <p>{order.shippingAddress}</p>

          <p>{order.shippingCity}</p>

          <p>{order.shippingCountry}</p>

        </div>

        <div>

          <h3 className="font-bold mb-3">

            Payment

          </h3>

          <p>

            {order.paymentMethod}

          </p>

          <p>

            {order.paymentReference}

          </p>

          <p>

            {new Date(order.paidAt).toLocaleString()}

          </p>

        </div>

      </div>

      <hr className="my-8"/>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left pb-3">

              Item

            </th>

            <th>

              Qty

            </th>

            <th>

              Price

            </th>

          </tr>

        </thead>

        <tbody>

          {order.items.map(item=>(

            <tr key={item.id}>

              <td className="py-4">

                {item.product.title}

              </td>

              <td className="text-center">

                {item.quantity}

              </td>

              <td className="text-right">

                KSh {(item.quantity*item.price).toLocaleString()}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr className="my-8"/>

      <div className="flex justify-between text-3xl font-black">

        <span>

          Total

        </span>

        <span>

          KSh {Number(order.totalAmount).toLocaleString()}

        </span>

      </div>

    </div>

  );

};

export default Receipt;