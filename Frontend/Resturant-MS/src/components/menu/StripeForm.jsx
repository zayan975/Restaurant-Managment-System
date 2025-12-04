import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const StripeForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePay = async () => {
    if (!stripe || !elements) return;

    const res = await axios.post(
      "http://localhost:8000/api/payment/create-payment-intent",
      { amount }
    );

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      alert("Online Payment Successful!");
      onSuccess();
    }
  };

  return (
    <div className="p-4 bg-[#1b1b1b] rounded-lg mt-4">
      <h2 className="text-white text-lg font-semibold mb-3">Pay Online (Stripe)</h2>
      <div className="p-3 bg-white rounded">
        <CardElement />
      </div>
      <button
        onClick={handleStripePay}
        className="bg-[#025cca] px-4 py-3 w-full mt-3 rounded-lg text-white font-semibold"
      >
        Pay ₹{amount.toFixed(2)}
      </button>
    </div>
  );
};

export default StripeForm;
