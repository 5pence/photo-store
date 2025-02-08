import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    login({ username: userData.username, password: userData.password });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" 
        onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" 
        onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" 
        onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
