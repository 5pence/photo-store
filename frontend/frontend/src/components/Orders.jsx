import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const retryPayment = async (orderId) => {
    if (!token) return;
    sessionStorage.setItem("checkoutSession", "active");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/retry-payment/",
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.url) {
        window.location.href = response.data.url; // ✅ Redirect to Stripe checkout
      }
    } catch (err) {
      console.error("Error retrying payment:", err);
    }
  };

  const downloadInvoice = async (orderId) => {
    if (!token) return;
  
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId}/invoice/`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Ensure we get a binary file
      });
  
      if (response.status !== 200) {
        throw new Error("Failed to download invoice");
      }
  
      // Create a download link for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
  
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
            className="relative bg-white shadow-lg rounded-lg p-6 transition duration-200 hover:shadow-xl"
          >
            {/* ✅ Show this button only if the order is paid */}
            {order.payment_status === "paid" && (
                <button
                    onClick={() => downloadInvoice(order.id)}
                    className="absolute top-4 right-4 bg-muted-blue text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    View Invoice
                </button>
            )}
            {/* 🟥 "Pay Now" Button in Top-Right Corner */}
            {order.payment_status === "pending" && (
              <button
                onClick={() => retryPayment(order.id)}
                className="absolute top-4 right-4 bg-rust text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Pay Now
              </button>
            )}

            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={
                  order.payment_status === "paid"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
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
