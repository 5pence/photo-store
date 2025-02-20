import { useState, useEffect } from "react";
import useCart from "../context/useCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, hasDigitalProducts } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const validCart = cart.filter(item => item && item.name && item.price);

  // Redirect to login if user tries to buy digital products and is not logged in
  useEffect(() => {
    if (hasDigitalProducts && !user) {
        navigate("/login", { state: { fromCheckout: true } }); 
    }
  }, [hasDigitalProducts, user, navigate]);
        
  const handleCheckout = async () => {
    setLoading(true);
    setError("");
  
    try {
      // Setup headers only if the user is logged in
      const headers = user && token ? { Authorization: `Bearer ${token}` } : {};
  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/checkout/",
        {
          cart: cart.map((item) => ({
            id: item.id, // ✅ Match API expectation (not "product_id")
            quantity: item.quantity,
          })),
        },
        { headers } // ✅ Pass headers here
      );
  
      // Redirect to Stripe checkout
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Checkout Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">💳 Checkout</h1>

      {validCart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {validCart.map((item) => (
              <div key={item.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                <span>{item.name} (x{item.quantity})</span>
                <span>£{item.price ? (item.price * item.quantity).toFixed(2) : "0.00"}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-lg font-bold">Total: £{totalPrice.toFixed(2)}</h2>
            
            {error && (
              <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
                {error}
                <button onClick={() => setError("")} className="ml-2 text-sm underline">Dismiss</button>
              </div>
            )}
            
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full mt-2 bg-rust text-white py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
