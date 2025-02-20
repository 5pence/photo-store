import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // Empty cart after successful payment
    setTimeout(() => navigate("/"), 3000); // Redirect home
  }, []);

  return (
    <div className="container mx-auto text-center p-4">
      <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
      <p>Redirecting you back to the home page...</p>
    </div>
  );
};

export default Success;
