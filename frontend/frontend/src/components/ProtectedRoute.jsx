import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// ✅ Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
