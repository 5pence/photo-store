import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import useCart from "../context/useCart";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const { addToCart } = useCart();

  // ✅ Detect if redirected from checkout
  const fromCheckout = location.state?.fromCheckout;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData, navigate); // ✅ Pass navigate here

    // ✅ Restore cart item if it was saved before login
    const pendingItem = sessionStorage.getItem("pendingCartItem");
    if (pendingItem) {
      const { product, quantity } = JSON.parse(pendingItem);
      console.log("🛒 Adding pending item to cart:", product);
      addToCart(product, quantity);
      sessionStorage.removeItem("pendingCartItem");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-heading font-extrabold text-center text-[#d64933] mb-6">Login</h2>

        {/* ✅ Friendly notification if redirected from checkout */}
        {fromCheckout && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="bg-orange-100 border-l-4 border-[#d64933] p-4 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-bold text-[#d64933] flex items-center">
              🛍️ <span className="ml-2">Almost there!</span>
            </h3>
            <p className="mt-2 text-gray-700">
              To complete your purchase and access your <strong>digital products</strong>, please log in to your account.
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
              <li>📂 Instant access to your purchases</li>
              <li>🖼️ Re-download your items anytime</li>
              <li>🔒 Keep your downloads secure</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Don't have an account? <Link to="/signup" className="text-[#d64933] font-medium hover:underline">Sign up here</Link>.
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              autoComplete="username"
              onChange={handleChange}
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={handleChange}
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          <button type="submit" className="w-full bg-[#d64933] text-white py-2 rounded-lg hover:bg-[#b53a2a] transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New here?{" "}
          <Link to="/signup" className="text-[#d64933] font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
