import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";  
import { CartProvider } from "./context/CartContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "boxicons/css/boxicons.min.css";


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
    const hideChrome = ["/archetype-wheel", "/archetype"].includes(location.pathname);


    return (
        <div className="flex flex-col min-h-screen">
            {!hideChrome && <Navbar />}
            <main className={`flex-grow ${isHomePage || hideChrome ? "pt-0" : "pt-[80px] lg:pt-[100px]"}`}>
                <AnimatedRoutes />
            </main>
            {!hideChrome && <Footer className="mt-auto" />} {/* ✅ Footer stays at the bottom */}
        </div>
    );
};

export default App;
