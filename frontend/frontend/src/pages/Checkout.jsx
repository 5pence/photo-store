import { useState, useEffect } from "react";
import useCart from "../context/useCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
const { cart, hasDigitalProducts } = useCart();
const { user, token } = useAuth();
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Address state
const [shippingDetails, setShippingDetails] = useState({
full_name: "",
address: "",
city: "",
postcode: "",
country: "",
})

const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
const validCart = cart.filter(item => item && item.name && item.price);

// Redirect to login if user tries to buy digital products and is not logged in
useEffect(() => {
if (hasDigitalProducts && !user) {
navigate("/login", { state: { fromCheckout: true } });
}
}, [hasDigitalProducts, user, navigate]);

const [errors, setErrors] = useState({});

const handleCheckout = async () => {
setLoading(true);
setError("");

let newErrors = {};

if (!shippingDetails.full_name) newErrors.full_name = "Full name is required.";
if (!shippingDetails.address) newErrors.address = "Address is required.";
if (!shippingDetails.city) newErrors.city = "City is required.";
if (!shippingDetails.postcode) newErrors.postcode = "Postcode is required.";
if (!shippingDetails.country) newErrors.country = "Country is required.";

// If there are errors, stop checkout & show messages**
if (Object.keys(newErrors).length > 0) {
setErrors(newErrors);
setLoading(false);
return;
}

try {
const headers = user && token ? { Authorization: `Bearer ${token}` } : {};

const response = await axios.post(
`${API_BASE_URL}/api/checkout/`,
{
cart: cart.map((item) => ({
id: item.id,
quantity: item.quantity,
})),
full_name: shippingDetails.full_name,
address: shippingDetails.address,
city: shippingDetails.city,
postcode: shippingDetails.postcode,
country: shippingDetails.country
},
{ headers }
);

// ✅ Store checkout session ID in sessionStorage (for handling cancel cases)
sessionStorage.setItem("checkoutSession", "active");

// ✅ Redirect to Stripe checkout
window.location.href = response.data.url;
} catch (err) {
console.error("Checkout Error:", err);

if (err.response && err.response.data && err.response.data.error) {
setError(`❌ ${err.response.data.error}`);
} else {
setError("Something went wrong. Please check your details and try again.");
}
} finally {
setLoading(false);
}
};

// Handle input change
const handleInputChange = (e) => {
const { name, value } = e.target;
setShippingDetails(prev => ({ ...prev, [name]: value }));

// **Clear error when user types**
setErrors(prev => ({ ...prev, [name]: "" }));
};


return (
<div className="container mx-auto px-4 py-6">
<title>Checkout | Spencers Studio</title>
<meta name="description" content="Secure your order at Spencers Studio. Review your cart, enter your details, and complete your purchase with secure payment options." />

  <h1 className="text-2xl font-bold mb-4">💳 Checkout</h1>

  {validCart.length === 0 ? (
  <p className="text-gray-600">Your cart is empty.</p>
  ) : (

  <>
    <div className="space-y-4">
      {validCart.map((item) => (
      <div key={item.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
        <span>{item.name} (x{item.quantity})</span>
        <span>£{item.price ? (item.price * item.quantity).toFixed(2) : "0.00"}</span>
      </div>
      ))}
    </div>

    {/* Shipping Address Form */}
    <div className="mt-6 p-4 bg-gray-200 rounded-lg">
      <h2 className="text-lg font-bold">Shipping Details</h2>
      <div className="grid grid-cols-1 gap-4 mt-2">
        <div>
          <input type="text" name="full_name" placeholder="Full Name" aria-label="Full Name" className={`w-full p-2 border rounded ${errors.full_name ? 'border-red-500' : '' }`} onChange={handleInputChange} />
          {errors.full_name && <p className="text-red-600 text-sm">{errors.full_name}</p>}
        </div>

        <div>
          <input type="text" name="address" placeholder="Address" aria-label="Street Address" className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : '' }`} onChange={handleInputChange} />
          {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
        </div>

        <div>
          <input type="text" name="city" placeholder="City" aria-label="City" className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : '' }`} onChange={handleInputChange} />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>

        <div>
          <input type="text" name="postcode" placeholder="Postcode" aria-label="Postal Code" className={`w-full p-2 border rounded ${errors.postcode ? 'border-red-500' : '' }`} onChange={handleInputChange} />
          {errors.postcode && <p className="text-red-600 text-sm">{errors.postcode}</p>}
        </div>

        <div>
          <input type="text" name="country" placeholder="Country" aria-label="Country" className={`w-full p-2 border rounded ${errors.country ? 'border-red-500' : '' }`} onChange={handleInputChange} />
          {errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
        </div>
      </div>

    </div>

    <div className="mt-6 p-4 bg-gray-200 rounded-lg">
      <h2 className="text-lg font-bold">Total: £{totalPrice.toFixed(2)}</h2>

      {error && (
      <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
        {error}
        <button onClick={()=> setError("")} className="ml-2 text-sm underline">Dismiss</button>
      </div>
      )}

      <button onClick={handleCheckout} disabled={loading} className="w-full mt-2 bg-rust text-white py-2 rounded hover:bg-red-700 transition">
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  </>
  )}
</div>
);
};

export default Checkout;