import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { CartContext } from "../../context/CartContext";

const stripePromise = loadStripe("pk_test_51SKBVaLbWih2sxrYTJ54gMIFFxjeFBdV5zEpyh15mYMU9MZdGXu7loTMaQ29fPyoyLJfT9oTRtzMYgv7BM8bjJoz00762z90j1");

const Bill = () => {
  const { cartData, removeItemFromCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState();

  const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
    alert("Order Placed!");
   
  };

  return (
    <div className="p-4">
      <h1 className="text-lg text-white font-semibold mb-2">Your Bill</h1>

      {cartData.length === 0 ? (
        <p className="text-[#ababab]">No items in cart.</p>
      ) : (
        cartData.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-[#1f1f1f] p-3 rounded mb-2">
            <span className="text-white">{item.name} x {item.quantity}</span>
            <span className="text-white font-bold">₹{item.price * item.quantity}</span>
            <button
              onClick={() => removeItemFromCart(item.id)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </div>
        ))
      )}

      <div className="mt-3">
        <p className="text-white">Tax: ₹{tax.toFixed(2)}</p>
        <p className="text-white font-bold">Total: ₹{totalPriceWithTax.toFixed(2)}</p>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-2 rounded ${paymentMethod === "Cash" ? "bg-yellow-500" : "bg-gray-700"}`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-2 rounded ${paymentMethod === "Online" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          Online
        </button>
      </div>

      {paymentMethod === "Online" && (
        <Elements stripe={stripePromise}>
          <StripeForm amount={totalPriceWithTax} onSuccess={handlePlaceOrder} />
        </Elements>
      )}

      {paymentMethod === "Cash" && cartData.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="mt-3 px-4 py-2 w-full bg-green-500 rounded text-white font-bold"
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default Bill;
