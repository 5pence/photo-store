import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = "http://127.0.0.1:8000/api/auth/";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
        const storedToken = localStorage.getItem("accessToken"); // ✅ Ensure latest token is used
        if (!storedToken) return;

        const res = await axios.get(`${API_URL}me/`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const login = async (userData, navigate) => {
    try {
      const res = await axios.post(`${API_URL}login/`, userData);
      if (res.data.access && res.data.refresh) {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);
        setToken(res.data.access);
        await fetchUserProfile();
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for `useAuth`
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Define PropTypes from 'children'
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
