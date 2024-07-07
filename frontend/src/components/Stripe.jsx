import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51PObsyRrE4qmG8gz3yzS5BjY6391yU7JJtTWh43qM4jcB6y3mF4wOgWJEAUpKg75xk0hBiUYid5hQ8olQ0wHJvve00Dnz9HAKE"
);
const Stripe = ({ orderID, price }) => {
  const [clientSecret, setClientSecret] = useState("");
  const apperance = {
    theme: "stripe",
  };

  const options = {
    apperance,
    clientSecret,
  };
  const createPayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment",
        { price },
        {
          withCredentials: true,
        }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderID={orderID} />
        </Elements>
      ) : (
        <button
          onClick={createPayment}
          className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
        >
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
