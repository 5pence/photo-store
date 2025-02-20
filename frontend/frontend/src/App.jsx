import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import { CartProvider } from "./context/CartContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <CartProvider>
        <Router>
            <Navbar />
            <AnimatedRoutes user={user} />
        </Router>
    </CartProvider>
  );
};

export default App;
