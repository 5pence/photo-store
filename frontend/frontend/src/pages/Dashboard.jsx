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
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Profile"
            style={{ borderRadius: "50%", width: "100px" }}
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
