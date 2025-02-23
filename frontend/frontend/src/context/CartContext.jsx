import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000";

  // Check if cart contains digital products
  const hasDigitalProducts = cart.some(item => item.product_type === "digital");

  // 🛒 **Load cart from localStorage initially**
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const filteredCart = JSON.parse(savedCart).filter(item => item && item.id && item.price);
      setCart(filteredCart);
    }
  }, []);

  // ✅ **Ensure cart fetch only runs when user & token exist**
  useEffect(() => {
    if (user && token) {
        console.log("✅ User & token available, fetching cart...");
        fetchCart();
    } else {
        console.log("❌ User or token missing, skipping fetch.");
    }
  }, [user, token]);

  // 🛒 **Save cart to localStorage when it updates**
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchCart = async () => {
    if (!user || !token) return;

    try {
        const response = await axios.get(`${BASE_URL}/api/cart/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🛒 Raw API Response:", response.data);
        
        if (!response.data || !Array.isArray(response.data.items)) {
            console.warn("⚠️ API returned invalid cart data, resetting cart.");
            setCart([]); 
            return;
        }

        if (response.data.items.length === 0) {
            console.warn("⚠️ API returned an empty cart.");
            setCart([]); 
            return;
        }

        const updatedCart = response.data.items.map(item => ({
            cart_item_id: item.cart_item_id,
            id: item.product,
            name: item.product_name,
            price: item.product_price,
            quantity: item.quantity,
            total_price: item.total_price,
            image: item.image ? `${BASE_URL}${item.image}` : "/placeholder.jpg"
        }));

        console.log("✅ Updated cart state:", updatedCart);
        setCart(updatedCart);

    } catch (error) {
        console.error("❌ Error fetching cart:", error.response ? error.response.data : error);
    }
  };

  // ✅ **Add item to cart**
  const addToCart = async (product, quantity = 1) => {
    console.log("🛒 Attempting to add to cart. User:", user, "Token:", token);

    // 🛑 **Wait for user and token before continuing**
    if (!user || !token) {
        console.warn("🚨 User must be logged in to add items to cart.");
    
        // 🛑 **Do NOT navigate if already logged in but state is still updating**
        if (user === undefined || user === "") {  
            console.log("⏳ Waiting for auth state to update...");
            setTimeout(() => addToCart(product, quantity), 300); // Delay and retry
            return;
        }
    
        // ✅ **Only navigate if user is actually NULL (logged out)**
        if (user === null) {
            console.log("🔄 Redirecting to login page...");
            sessionStorage.setItem("pendingCartItem", JSON.stringify({ product, quantity }));
            navigate("/login", { state: { fromCheckout: true } }); 
        }
        return;
    }
    

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/cart/add/",
            { product_id: product.id, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Item added to cart:", response.data);
        fetchCart(); // ✅ Immediately fetch updated cart

    } catch (error) {
        console.error("❌ Error adding to cart:", error.response ? error.response.data : error);
    }
};


  // ✅ **Remove item from cart**
  const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (user && token) {
      try {
        await axios.delete(`${BASE_URL}/api/cart/remove/`, {
          data: { product_id: productId },
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("❌ Error removing from cart:", error);
      }
    }
  };

  // ✅ **Update item quantity**
  const updateQuantity = async (productId, quantity) => {
    const cartItem = cart.find((item) => item.id === productId);
    if (!cartItem || !cartItem.cart_item_id) {
        console.error("🚨 Missing cart_item_id for product:", cartItem);
        return;
    }

    const cartItemId = cartItem.cart_item_id;

    console.log(`🔄 Updating cart item ${cartItemId} to quantity ${quantity}`);

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    if (user && token) {
      try {
        await axios.put(
          `${BASE_URL}/api/cart/update/${cartItemId}/`,
          { quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        fetchCart();
      } catch (error) {
        console.error("❌ Error updating quantity:", error);
      }
    }
  };

  // ✅ **Clear cart**
  const clearCart = async () => {
    console.log("🚀 Clearing cart...");
    
    // ✅ Clears React state
    setCart([]);
    localStorage.removeItem("cart");

    // ✅ Clears backend cart (only if user is logged in)
    if (user && token) {
        try {
            await axios.delete(`${BASE_URL}/api/cart/clear/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("✅ Backend cart cleared");
        } catch (error) {
            console.error("❌ Error clearing backend cart:", error);
        }
    }
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, hasDigitalProducts }}>
        {children}
    </CartContext.Provider>
  );
};

// ✅ **PropTypes Validation**
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
