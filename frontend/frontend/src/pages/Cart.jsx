import useCart from "../context/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // ✅ Filter out invalid items
  const validCart = cart.filter((item) => item && item.id && item.price);

  // ✅ Fix total calculation (parse price to float)
  const totalPrice = validCart.reduce(
    (total, item) => total + (parseFloat(item.price) * item.quantity),
    0
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {validCart.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link to="/store" className="text-rust underline">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {validCart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                
                <img 
                  src={item.images?.[0]?.image || "/placeholder.jpg"} 
                  alt={item.name || "Product"} 
                  className="w-16 h-16 rounded-lg"
                />

                <div className="flex-1 ml-4">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    £{!isNaN(parseFloat(item.price)) ? parseFloat(item.price).toFixed(2) : "0.00"}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item */}
                <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-gray-600 text-lg ml-4 transition-colors duration-200 hover:text-red-500"
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Cart Total & Checkout */}
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-lg font-bold">Total: £{totalPrice.toFixed(2)}</h2>
            <Link 
              to="/checkout" 
              className="block w-full mt-2 bg-rust text-white py-2 rounded text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
