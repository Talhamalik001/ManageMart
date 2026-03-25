import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { api } from "../api";
import "../styles/checkout.css";

// Publishable key (test/demo)
const stripePromise = loadStripe(
  "pk_test_51TCDyS4Hj3S98sLjBq2DsKNLrGyooibMItxz8TDiNH6cd1Lbacm4hT4I0NvEOms9mUrxMsIq32iHM7INkm8p8pQA002VOPGDn5"
);

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // 1️⃣ Create Payment Intent (backend)
      const res = await api.post("/orders/create-payment-intent", { amount: product.price });
      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm Payment with Card
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // 3️⃣ Save Order
        await api.post("/orders/place-order", {
          product_name: product.name,
          product_price: product.price,
          product_image: product.image,
          user_email: localStorage.getItem("userEmail"),
        });

        alert("Payment successful! Order placed.");
        navigate("/orders"); // redirect to Orders page
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>{product.name}</h2>
      <img src={product.image} width={200} alt={product.name} />
      <h3>${product.price}</h3>

      <CardElement className="card-element" />

      <button type="submit" className="pay-btn">
        Pay Now
      </button>
    </form>
  );
};

const Checkout = () => {
  const { state } = useLocation(); // product object passed from Dashboard
  if (!state) return <h2>No product selected</h2>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm product={state} />
    </Elements>
  );
};

export default Checkout;