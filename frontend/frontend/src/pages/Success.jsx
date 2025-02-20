import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Success = () => {
  const { clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ First, confirm the order with the backend
    if (user && token) {
      axios
        .post("http://127.0.0.1:8000/api/orders/confirm/", {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          clearCart(); // ✅ Only clear cart after backend confirmation
        })
        .catch((error) => console.error("Error confirming order:", error));
    } else {
      clearCart(); // ✅ Clear cart for guest users
    }

    // Auto-redirect after 5 seconds
    const timeout = setTimeout(() => navigate("/store"), 5000);
    return () => clearTimeout(timeout);
  }, [clearCart, navigate, user, token]);

  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-2 text-gray-600">Thank you for your order.</p>

      <div className="mt-6">
        <Link to="/store" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
