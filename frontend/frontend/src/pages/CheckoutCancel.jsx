import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CheckoutCancel = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { token } = useAuth();
  const [isClearing, setIsClearing] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const sessionActive = sessionStorage.getItem("checkoutSession");
    const handleCancel = async () => {
      if (!sessionStorage.getItem("checkoutSession")) {
        console.warn("⚠️ No active checkout session found. Skipping cart clear.");
        setIsClearing(false);
        return;
      }

      try {
        console.log("🚀 Clearing cart...");

        // ✅ Clears React state
        clearCart();

        // ✅ Clears LocalStorage
        localStorage.removeItem("cart");

        // ✅ Clears backend cart (only if token exists)
        if (token) {
          await axios.delete(`${API_BASE_URL}/api/cart/clear/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("✅ Backend cart cleared");
        }

        sessionStorage.removeItem("checkoutSession"); // ✅ Cleanup sessionStorage

      } catch (error) {
        console.error("❌ Error clearing backend cart:", error);
      }

      setIsClearing(false); // ✅ Mark process as done

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    };

    handleCancel();

  }, [navigate, clearCart, token]);

  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-2xl font-bold text-red-600">🚫 Payment Cancelled</h1>
      {isClearing ? (
        <p className="text-gray-700">Clearing your cart...</p>
      ) : (
        <p className="text-gray-700">Your cart has been cleared. Redirecting...</p>
      )}
    </div>
  );
};

export default CheckoutCancel;
