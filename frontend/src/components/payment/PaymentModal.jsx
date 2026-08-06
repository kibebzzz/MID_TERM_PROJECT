import PaymentForm from "./PaymentForm";
import ProcessingScreen from "./ProcessingScreen";
import StkPushScreen from "./StkPushScreen";
import PaymentSuccess from "./PaymentSuccess";

const PaymentModal = (props) => {

  if (!props.open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-lg p-8">

        {props.success ? (

<PaymentSuccess

    order={props.order}

    paymentMethod={props.paymentMethod}

    paymentReference={props.paymentReference}

    onOrders={props.onOrders}

    onMarketplace={props.onMarketplace}

/>

) : props.stkPush ? (

<StkPushScreen

    phone={props.paymentData.phone}

/>

) : props.processing ? (

<ProcessingScreen

    paymentMethod={props.paymentMethod}

/>

) : (

<PaymentForm {...props} />

)}

      </div>

    </div>

  );

};

export default PaymentModal;