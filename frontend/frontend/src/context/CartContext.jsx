import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅ Ensure user authentication

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth(); // ✅ Get user & auth token

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
  

  // 🛒 **Sync Cart with Backend when user logs in**
  useEffect(() => {
    if (user && token) {
      axios
        .get("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCart(response.data.items); // ✅ Update cart with backend data
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, [user, token]);

  // 🛒 **Save cart to localStorage when it updates**
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ **Add item to cart**
  const addToCart = async (product, quantity = 1) => {

    if (!product || !product.id || !product.price) {
        console.error("Invalid product added to cart:", product);
        return; // Prevent adding empty or incomplete products
    }
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    // ✅ **If logged in, update backend**
    if (user && token) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/cart/add/",
          { product_id: product.id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // ✅ **Remove item from cart**
  const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (user && token) {
      try {
        await axios.delete("http://127.0.0.1:8000/api/cart/remove/", {
          data: { product_id: productId },
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  // ✅ **Update item quantity**
  const updateQuantity = async (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    if (user && token) {
      try {
        await axios.put(
          "http://127.0.0.1:8000/api/cart/update/",
          { product_id: productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // ✅ **Clear cart**
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, hasDigitalProducts }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ **Add PropTypes**
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
