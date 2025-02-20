import useCart from "../context/useCart";
import { useEffect, useState } from "react";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/checkout/", { cart });
      window.location.href = response.data.url; // Redirect to Stripe
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between p-2 border-b">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <button 
              onClick={handleCheckout} 
              disabled={loading} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
