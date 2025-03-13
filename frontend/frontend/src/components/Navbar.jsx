import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useCart from "../context/useCart";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-rust text-warm-white fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-10 py-4">
        
        <NavLink 
          to="/" 
          className="font-proxima font-bold tracking-wider"
          style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
        >
          spencers.studio
        </NavLink>

        <div className="hidden lg:flex space-x-6 text-lg">
          <NavLink to="/photography" className="hover:text-gray-200 transition">Photos</NavLink>
          <NavLink to="/about" className="hover:text-gray-200 transition">About</NavLink>
          <NavLink to="/store" className="hover:text-gray-200 transition">Shop</NavLink>
          <NavLink to="/blog" className="hover:text-gray-200 transition">Blog</NavLink>
          {user && <NavLink to="/dashboard" className="hover:text-gray-200 transition">Account</NavLink>}
          <NavLink to="/contact" className="hover:text-gray-200 transition">Contact</NavLink>
        </div>

        {cart.length > 0 && (
          <NavLink to="/cart" className="relative bg-white text-rust px-3 py-2 rounded-full shadow-md">
            🛒
            <span className="absolute -top-2 -right-2 bg-muted-blue text-white text-sm font-bold px-2 py-1 rounded-full">
              {cart.length}
            </span>
          </NavLink>
        )}

        <div className="hidden lg:flex space-x-4">
          {!user ? (
            <>
              <NavLink to="/login" className="bg-light-gray text-dark px-4 py-2 rounded-md">Login</NavLink>
              <NavLink to="/signup" className="border border-white text-white px-4 py-2 rounded-md hover:bg-warm-white hover:text-rust">Signup</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-muted-blue text-white px-4 py-2 rounded-md">Logout</button>
          )}
        </div>

        <button className="lg:hidden focus:outline-none text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-rust flex flex-col gap-2 p-4 shadow-lg">
          <NavLink to="/photography" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>Photos</NavLink>
          <NavLink to="/about" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/store" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/blog" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {user && <NavLink to="/dashboard" className="hover:text-gray-200 py-2" onClick={() => setMenuOpen(false)}>Account</NavLink>}
          <NavLink to="/login" className="bg-light-gray text-dark py-2 text-center rounded-md" onClick={() => setMenuOpen(false)}>Login</NavLink>
          <NavLink to="/signup" className="border border-white text-white py-2 text-center rounded-md hover:bg-warm-white hover:text-rust" onClick={() => setMenuOpen(false)}>Signup</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
