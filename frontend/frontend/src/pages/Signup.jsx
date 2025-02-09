import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", password: "" });

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
        <h2 className="text-3xl font-extrabold font-heading text-center text-[#d64933] mb-6">Sign Up</h2>

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

          <button type="submit" className="w-full bg-[#d64933] text-white py-2 rounded-lg hover:bg-[#b53a2a] transition">
            Sign Up
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
