import { useState, useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch CSRF token on component mount
    fetch("http://127.0.0.1:8000/api/auth/password-reset/", {
      method: "GET",
      credentials: "include",  // Important for CSRF cookies
    });
  }, []);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const csrfToken = getCookie("csrftoken"); // Get CSRF token
  
    // ✅ Use FormData instead of JSON
    const formData = new FormData();
    formData.append("email", email);
  
    console.log("📤 Sending request with formData:", email); // Debugging
  
    const response = await fetch("http://127.0.0.1:8000/api/auth/password-reset/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken, // Attach CSRF token
      },
      body: formData, // Send as form data
      credentials: "include",
    });
  
    if (response.ok) {
      setMessage("✅ Password reset link sent! Check your email.");
    } else {
      const data = await response.json();
      console.error("❌ Error from server:", data);
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };
  
  
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
      {message && <p className={`mt-3 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#d64933] text-white py-2 rounded-lg mt-3 hover:bg-[#bf3a26] transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
