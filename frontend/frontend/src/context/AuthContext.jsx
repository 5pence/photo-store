import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = "http://127.0.0.1:8000/api/auth/";
const CART_API_URL = "http://127.0.0.1:8000/api/cart/add/";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      console.log("🔄 Token found, verifying user...");
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      console.warn("⚠️ No token found. User is logged out.");
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken = token) => {
    if (!authToken) {
      console.warn("🚨 No token available for fetching user profile.");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}me/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log("✅ User fetched successfully:", res.data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setLoading(false);

      // ✅ Now that user is fetched, process pending cart items
      await processPendingCartItem(authToken);

    } catch (error) {
      console.error("❌ Failed to fetch user profile:", error.response ? error.response.data : error);
      handleLogout();
    }
  };

  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      console.warn("🚨 No refresh token found. Logging out.");
      handleLogout();
      return;
    }

    try {
      const res = await axios.post(`${API_URL}refresh/`, { refresh: storedRefreshToken });

      if (res.data.access) {
        console.log("✅ Token refreshed successfully.");
        localStorage.setItem("accessToken", res.data.access);
        setToken(res.data.access);
        fetchUserProfile(res.data.access);
      }
    } catch (error) {
      console.error("❌ Failed to refresh token:", error);
      handleLogout();
    }
  };

  const processPendingCartItem = async (authToken) => {
    const pendingItem = sessionStorage.getItem("pendingCartItem");

    if (pendingItem) {
      console.log("🛒 Found pending cart item. Adding to cart...");
      const { product, quantity } = JSON.parse(pendingItem);

      if (!product || !product.id) {
        console.error("🚨 Invalid cart item detected. Skipping.");
        sessionStorage.removeItem("pendingCartItem");
        return;
      }

      try {
        const res = await axios.post(
          CART_API_URL,
          { product_id: product.id, quantity },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        console.log("✅ Item added to cart after login:", res.data);
        sessionStorage.removeItem("pendingCartItem"); // ✅ Prevents duplicate adds
      } catch (error) {
        console.error("❌ Error adding pending cart item:", error);
      }
    }
  };

  const login = async (userData, navigate) => {
    try {
      const res = await axios.post(`${API_URL}login/`, userData);

      if (res.data.access && res.data.refresh) {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        setToken(res.data.access);

        console.log("🔑 Logging in. Fetching user profile...");
        await fetchUserProfile(res.data.access);

        console.log("✅ Redirecting to the store...");
        navigate("/store", { replace: true });
      }
    } catch (error) {
      console.error("❌ Login failed:", error.response ? error.response.data : error);
    }
  };

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("pendingCartItem"); // ✅ Clear pending item on logout
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout: handleLogout, loading, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
