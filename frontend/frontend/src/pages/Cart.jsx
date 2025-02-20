import useCart from "../context/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <Link to="/store" className="text-rust underline">Continue Shopping</Link></p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">£{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-lg ml-4">❌</button>
              </div>
            ))}
          </div>

          {/* Cart Total & Checkout */}
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-lg font-bold">Total: £{totalPrice.toFixed(2)}</h2>
            <Link to="/checkout" className="block w-full mt-2 bg-rust text-white py-2 rounded text-center">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
