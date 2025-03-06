import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/password-reset-confirm/${uidb64}/${token}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
      {message && <p className="text-green-600 mt-3">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full px-4 py-2 border rounded-lg mt-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#d64933] text-white py-2 rounded-lg mt-3 hover:bg-[#bf3a26]"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
