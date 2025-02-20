import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detect where the user came from
  const [userData, setUserData] = useState({ username: "", password: "" });

  // ✅ Check if redirected from checkout
  const fromCheckout = location.state?.fromCheckout;

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-heading font-extrabold text-center text-[#d64933] mb-6">Login</h2>

        {/* ✅ Show message only if redirected from checkout */}
        {fromCheckout && (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="bg-warm-cream border-l-4 border-rust p-4 rounded-lg shadow-md"
        >
      
            <h3 className="text-lg font-bold text-[#d64933] flex items-center">
            🚢 <span className="ml-2">Important Notice</span>
            </h3>
            <p className="mt-2 text-gray-700">
            Your order contains <strong>digital products</strong>. To ensure secure access, we require an account.
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
            <li>📂 Access your purchases anytime</li>
            <li>🖼️ Re-download files whenever needed</li>
            <li>🔒 Keep your downloads safe</li>
            </ul>
            <p className="mt-3 text-gray-700">
            Please log in or <Link to="/signup" className="text-[#d64933] font-medium hover:underline">sign up</Link> to continue.
            </p>
        </motion.div>
      
        )}



        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-sans font-medium text-gray-700 mt-6">Username</label>
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
            <label className="block text-sm font-sans font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={handleChange}
              required
              className="border border-gray-400 shadow-sm input font-sans input-bordered w-full mt-1"
            />
          </div>

          <button type="submit" className="w-full bg-[#d64933] text-white py-2 rounded-lg hover:bg-[#b53a2a] transition">
            Login
          </button>
        </form>

        <p className="font-body text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#d64933] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
