import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) {
      console.log("User is logged in, redirecting...");
      navigate("/dashboard");
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData, navigate);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            name="username" 
            placeholder="Username"
            autoComplete="username"
            onChange={handleChange} 
            required 
        />
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            autoComplete="current-password"
            onChange={handleChange} 
            required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
