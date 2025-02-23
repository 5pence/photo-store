import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";  
import { CartProvider } from "./context/CartContext";

const App = () => {
    return (
        <Router>
            <AuthProvider> {/* ✅ Now AuthProvider has access to Cart */}
                <CartProvider> {/* ✅ CartProvider goes first */}
                    <Navbar />
                    <AnimatedRoutes />
                </CartProvider>
            </AuthProvider>        
        </Router>
    );
};

export default App;
