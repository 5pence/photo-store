import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import useCart from "../context/useCart";

const Signup = () => {
  const { login, user, token } = useContext(AuthContext); // ✅ Ensure we check token too
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartRestored, setCartRestored] = useState(false); // ✅ Prevent infinite loop
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (user && token && !cartRestored) {
      // ✅ Ensure this runs only ONCE when user is logged in
      const pendingItem = sessionStorage.getItem("pendingCartItem");
      if (pendingItem) {
        const { product, quantity } = JSON.parse(pendingItem);
        console.log("🛒 Restoring pending cart item:", product);
        addToCart(product, quantity); // ✅ Add to cart AFTER user logs in
        sessionStorage.removeItem("pendingCartItem"); // ✅ Clear after adding
        setCartRestored(true); // ✅ Prevent infinite loop
      }

      navigate("/store"); // ✅ Move after cart is restored
    }
  }, [user, token, cartRestored, addToCart, navigate]); // ✅ Depend on `cartRestored` to prevent loops

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!minLength) return "Password must be at least 6 characters long.";
    if (!hasLetter || !hasNumber) return "Password must contain at least one letter and one number.";
    
    return ""; // No error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password strength
    const passwordError = validatePassword(userData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(""); // Clear error if validation passes
    setLoading(true);

    try {
      // ✅ Send registration request to Django API
      const res = await axios.post(`${API_BASE_URL}/api/auth/register/`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });

      // ✅ Auto-login after successful signup
      await login({ username: userData.username, password: userData.password });

    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
    <title>Sign Up | Spencers Studio</title>
    <meta name="description" content="Create your Spencers Studio account today. Gain access to exclusive content, manage your orders, and be part of a creative community." />

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold font-sans text-center text-[#d64933] mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-sans font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              autoComplete="username"
              onChange={handleChange}
              required
              className="border border-gray-400 shadow-sm input input-bordered font-sans w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              autoComplete="email"
              onChange={handleChange}
              required
              className="border border-gray-400 shadow-sm input input-bordered font-sans w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="new-password"
              onChange={handleChange}
              required
              className="border border-gray-400 shadow-sm input input-bordered font-sans w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              autoComplete="new-password"
              onChange={handleChange}
              required
              className="border border-gray-400 shadow-sm input input-bordered font-sans w-full mt-1"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-[#d64933] text-white py-2 rounded-lg 
            hover:bg-[#b53a2a] transition" disabled={loading}>
            {loading ? "Signing up..." : " Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#d64933] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
