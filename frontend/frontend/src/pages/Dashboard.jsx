import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Orders from "../components/Orders";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      {user ? (
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#d64933]">Welcome back, {user?.username}!</h1>
      </div>
      ) : (
        <p>Loading your details...</p>
      )}
      <Orders />
    </div>
  );
};

export default Dashboard;
