import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import AnimatedPage from "./AnimatedPage"; // ✅ This should now exist
import Home from "../pages/Home";
import Photography from "../pages/Photography";
import Store from "../pages/Store";
import Blog from "../pages/Blog";
import Coding from "../pages/Coding";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";
import CheckoutCancel from "../pages/CheckoutCancel";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";


const AnimatedRoutes = ({ user }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/photography" element={<AnimatedPage><Photography /></AnimatedPage>} />
        <Route path="/store" element={<AnimatedPage><Store /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        <Route path="/coding" element={<AnimatedPage><Coding /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
        <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
        <Route
            path="/dashboard"
            element={
                user === null ? (
                <Navigate to="/login" replace state={{ from: "/dashboard" }} />
                ) : (
                <AnimatedPage><Dashboard /></AnimatedPage>
                )
            }
        />


        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
        <Route path="/cart" element={<AnimatedPage><Cart /></AnimatedPage>} />
        <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
        <Route path="/checkout/success" element={<AnimatedPage><Success /></AnimatedPage>} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
      </Routes>
    </AnimatePresence>
  );
};

// ✅ Add PropTypes
AnimatedRoutes.propTypes = {
  user: PropTypes.object, // User can be an object or null
};

export default AnimatedRoutes;
