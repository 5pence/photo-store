import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!user || !token) return;

    axios
      .get("http://127.0.0.1:8000/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, [user, token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">📜 My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
            <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"
            >
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p className="text-gray-600">
                Status: <span className={order.payment_status === "Paid" ? "text-green-600" : "text-red-600"}>
                {order.payment_status}
                </span>
            </p>
            <p className="text-gray-700">Total: £{parseFloat(order.total_price).toFixed(2)}</p>
            <p className="text-sm text-gray-500">
                Placed on: {new Date(order.created_at).toLocaleDateString()}
            </p>

            <div className="mt-3 border-t pt-3">
                <h3 className="text-md font-medium">Order Items:</h3>
                <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                    <li key={item.id} className="text-gray-600 flex justify-between">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        ))}
</div>

    </div>
  );
};

export default Orders;