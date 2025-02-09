import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-rust p-4 shadow-md text-warm-white border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-warm-white">
          Spencer's Photo Store
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-accent">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/signup" className="btn btn-outline text-white border-white hover:bg-white hover:text-red-600">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
