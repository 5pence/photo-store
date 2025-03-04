import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";  
import { CartProvider } from "./context/CartContext";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <MainLayout />
                </CartProvider>
            </AuthProvider>        
        </Router>
    );
};

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/"; // ✅ Detect if on home page

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className={`flex-grow ${isHomePage ? "pt-0" : "pt-[80px] lg:pt-[100px]"}`}>
                <AnimatedRoutes />
            </main>
            <Footer className="mt-auto" /> {/* ✅ Footer stays at the bottom */}
        </div>
    );
};

export default App;
