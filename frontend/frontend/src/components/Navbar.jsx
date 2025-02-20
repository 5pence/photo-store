import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useCart from "../context/useCart";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-rust p-4 shadow-md text-warm-white border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-10">
        
        {/* Logo */}
        <NavLink to="/" className="text-lg font-bold text-warm-white">Spencer's Studio</NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/photography" 
            className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
          >
            Photography
          </NavLink>
          <NavLink 
            to="/store" 
            className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
          >
            Store
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/coding" 
            className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
          >
            Coding
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
          >
            Contact
          </NavLink>
          {user && (
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "text-white border-b-2 border-white pb-1" : "hover:text-gray-200 transition"}
            >
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Cart Icon (Only Show if Cart Has Items) */}
        {cart.length > 0 && (
          <NavLink to="/cart" className="relative text-white hover:text-gray-200">
            🛒 <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">{cart.length}</span>
          </NavLink>
        )}


        {/* Login/Signup (Desktop) */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            <>
              <NavLink to="/login" className="btn btn-primary px-4 py-2">Login</NavLink>
              <NavLink to="/signup" className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 px-4 py-2">Signup</NavLink>
            </>
          ) : (
            <button onClick={logout} className="btn btn-accent px-4 py-2">Logout</button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-4 w-64 bg-rust md:hidden flex flex-col gap-2 p-4 shadow-lg rounded-lg">
            <NavLink to="/photography" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Photography</NavLink>
            <NavLink to="/store" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Store</NavLink>
            <NavLink to="/blog" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Blog</NavLink>
            <NavLink to="/coding" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Coding</NavLink>
            <NavLink to="/contact" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            {user && <NavLink to="/dashboard" className="hover:text-gray-200 transition py-2" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>}

            {/* Mobile Login/Signup */}
            {!user ? (
              <>
                <NavLink to="/login" className="btn btn-primary w-full py-2" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/signup" className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600 w-full py-2" onClick={() => setMenuOpen(false)}>Signup</NavLink>
              </>
            ) : (
              <button onClick={logout} className="btn btn-accent w-full py-2">Logout</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
