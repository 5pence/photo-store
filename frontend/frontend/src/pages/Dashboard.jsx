import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <img
            src="https://via.placeholder.com/100"  // ✅ Placeholder image
            alt="Profile"
            style={{ borderRadius: "50%" }}
          />
          <p>Welcome, <strong>{user.username}</strong>!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
