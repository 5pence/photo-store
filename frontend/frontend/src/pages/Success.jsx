import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import useCart from "../context/useCart";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useAuth();
  const { clearCart } = useCart();
  const clearCartRef = useRef(clearCart);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedOrderId = new URLSearchParams(location.search).get("order_id");
  
    if (!storedOrderId) {
      console.error("🚨 No valid order ID. Skipping request.");
      setErrorMessage("No valid order found.");
      return;
    }
  
    setOrderId(storedOrderId);
  
    if (!user || !token) {
      console.warn("🚨 User not logged in. Clearing cart for guest.");
      clearCart(); // ✅ If guest, still clear cart
      return;
    }
  
    // ✅ Confirm order with API
    axios.post("http://127.0.0.1:8000/api/orders/confirm/", 
      { order_id: Number(storedOrderId) }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      console.log("✅ Order confirmed, clearing cart...");
      clearCart(); // ✅ Ensure the cart clears after successful payment
      sessionStorage.removeItem("checkoutSession"); // ✅ Clean up sessionStorage
      setTimeout(() => navigate("/dashboard"), 5000);
    })
    .catch((error) => {
      console.error("❌ Order confirmation failed:", error);
    });
  
  }, [user, token, location.search]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-warm-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg border border-gray-300">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-rust">Payment Successful!</h1>

        {errorMessage ? (
          <p className="text-lg text-red-600 mt-2">{errorMessage}</p>
        ) : orderId ? (
          <p className="text-lg text-gray-700 mt-2">
            Your order <span className="font-bold text-rust">#{orderId}</span> has been confirmed.
          </p>
        ) : (
          <p className="text-lg text-gray-700 mt-2">Processing your order...</p>
        )}

        <p className="text-gray-600 mt-4">
          Redirecting to your dashboard in <span className="font-semibold">5 seconds...</span>
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-rust text-white font-medium px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
