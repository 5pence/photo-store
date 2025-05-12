import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../context/AuthContext";
import useCart from "../context/useCart";
import CompassMenuIcon from "./CompassMenuIcon";
import { gsap } from "gsap";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, clearCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const siteNameRef = useRef(null);

  const handleLogout = () => {
    clearCart();
    logout();
    navigate("/login");
  };

  useEffect(() => {
  const letters = siteNameRef.current?.querySelectorAll(".studio-letter") || [];

  const wave = () => {
    const tl = gsap.timeline();
    letters.forEach((letter, i) => {
      tl.to(letter, {
        y: -8,
        opacity: 1,
        filter: "blur(1px)",
        duration: 0.3,
        ease: "sine.out",
      }, i * 0.12)
      .to(letter, {
        y: 0,
        opacity: 0.85,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "sine.inOut",
      }, i * 0.12 + 0.3);
    });
  };

  const logo = siteNameRef.current;
  if (logo) logo.addEventListener("mouseenter", wave);
  return () => {
    if (logo) logo.removeEventListener("mouseenter", wave);
  };
}, []);




  return (
    <div className="relative">
      <nav className="relative bg-charcoal2 text-seasalt fixed w-full top-0 z-50 shadow-md pb-2">
        <div className="relative container mx-auto flex justify-between items-center px-6 lg:px-10 py-4 z-20">
          <NavLink to="/" ref={siteNameRef} className="studio-wave text-seasalt text-2xl md:text-3xl font-[cormorant-garamond] italic font-light tracking-wider">
            {"spencers.studio".split("").map((char, i) => (
              <span key={i} className="inline-block studio-letter">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </NavLink>

          <div className="hidden lg:flex space-x-6 text-lg">
            {[
  { label: "About", title: "Who I am, and why this place exists" },
  { label: "Studio", title: "Where I gather what I've made" },
  { label: "Journal", title: "Quiet entries from the road" },
  { label: "Emporium", title: "A small trove of crafted things to own or gift" },
  { label: "Contact", title: "Write to me - your words are welcome" },
  ...(user ? [{ label: "Account", title: "Your personal dashboard" }] : []),
].map(({ label, title }) => (
  <NavLink
    key={label}
    to={`/${label.toLowerCase()}`}
    className="font-proxima font-light tracking-wider hover:text-moss transition"
    title={title}
    aria-label={title}
  >
    {label}
  </NavLink>
))}

          </div>

          {cart.length > 0 && (
            <NavLink to="/cart" className="relative bg-white text-rust px-3 py-2 rounded-full shadow-md">
              🛒
              <span className="absolute -top-2 -right-2 bg-muted-blue text-seasalt text-sm font-bold px-2 py-1 rounded-full">
                {cart.length}
              </span>
            </NavLink>
          )}

          <div className="hidden lg:flex space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-full bg-seasalt/10 text-seasalt font-proxima shadow-[0_0_0.5rem_#f7f7f740] hover:shadow-[0_0_0.75rem_#f7f7f7aa] transition-shadow duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 rounded-full border border-seasalt text-seasalt font-proxima hover:shadow-[0_0_0.65rem_#f7f7f7aa] hover:border-white transition duration-200 ease-in-out"
                >
                  Signup
                </NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="bg-muted-blue text-seasalt px-4 py-2 rounded-md">
                Logout
              </button>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-seasalt rounded-full focus:outline-none focus:ring-2 focus:ring-seasalt/40 focus:ring-offset-2 focus:ring-offset-charcoal2 border-0">
            <CompassMenuIcon
              className={`transform transition-transform duration-700 ease-in-out origin-center ${
                menuOpen ? "rotate-[40deg] scale-110" : "rotate-0 scale-100"
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
              className="absolute top-20 left-0 w-full backdrop-blur-xl bg-charcoal2/50 text-seasalt border-t border-white/10 shadow-inner z-40 rounded-b-xl px-6 pt-12 pb-6 flex flex-col gap-5"
            >
              {[
  { label: "About", title: "Who I am, and why this place exists" },
  { label: "Studio", title: "Where I gather what I've made—photographs, paintings" },
  { label: "Journal", title: "Quiet entries from the road" },
  { label: "Emporium", title: "A small trove of crafted things to own or gift" },
  { label: "Contact", title: "Write to me—your words are welcome" },
  ...(user ? [{ label: "Account", title: "Your personal dashboard" }] : []),
].map(({ label, title }) => (
  <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
    <NavLink
      to={`/${label.toLowerCase()}`}
      onClick={() => setMenuOpen(false)}
      className="text-center font-proxima tracking-wide py-2 transition hover:text-moss"
      title={title}
      aria-label={title}
    >
      {label}
    </NavLink>
  </motion.div>
))}
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3.5 px-6 rounded-full text-center font-proxima tracking-wide bg-seasalt text-charcoal2 hover:bg-moss/50  transition"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-3.5 px-6 rounded-full text-center font-proxima tracking-wide border border-seasalt text-seasalt hover:bg-moss/50 hover:border-none transition"
                  >
                    Signup
                  </NavLink>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div
        className="absolute bottom-0 left-0 w-full h-12"
        style={{
          backgroundImage: "url('/media/tear-edge.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          zIndex: 51,
          top: "71px",
        }}
      />
    </div>
  );
};

export default Navbar;
