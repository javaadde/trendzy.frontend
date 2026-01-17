import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../../axios";
import { useState, useEffect } from "react";
import showNotification from "../../../notification.mjs";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/order/${id}`)
      .then((res) => {
        setOrder(res.data);
        setItems(res.data.items);
        setStatus(res.data.status);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const updateStatus = () => {
    const updtValue = { status: status };
    axios
      .put(`/admin/order/update/${id}`, updtValue)
      .then((res) => {
        showNotification("Status updated to " + res.data.Status);
      })
      .catch((err) => console.log(err));
  };

  const deleteOrder = () => {
    if (confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`/admin/order/delete/${id}`)
        .then((res) => {
          showNotification(res.data.msg);
          navigate("/admin/orders");
        })
        .catch((err) => console.log(err));
    }
  };

  function getStatusStyle(orderStatus) {
    const baseStyle = "text-xs font-semibold tracking-widest uppercase px-4 py-2 ";
    switch (orderStatus?.toLowerCase()) {
      case "delivered":
        return baseStyle + "bg-green-100 text-green-700";
      case "shipped":
        return baseStyle + "bg-blue-100 text-blue-700";
      case "processing":
        return baseStyle + "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return baseStyle + "bg-red-100 text-red-700";
      default:
        return baseStyle + "bg-gray-100 text-gray-700";
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="loader">
          <p className="loader-text">Loading</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border-light)",
        }}
      >
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link
                to="/admin/orders"
                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <h1
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div
              className="p-8"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 block">
                    Reference
                  </span>
                  <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                    #{order._id.toUpperCase()}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 block">
                    Customer
                  </span>
                  <p className="text-sm font-medium">{order.user_id}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-gray-50">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date Placed</p>
                  <p className="text-sm">{new Date(order.date).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">Items Purchased</h3>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div className="w-20 h-28 flex-shrink-0 bg-gray-50 overflow-hidden">
                    <img
                      src={item.url}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium tracking-wide mb-1">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs text-gray-400">${item.price} per unit</p>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Management */}
          <div className="space-y-6">
            {/* Status Tool */}
            <div
              className="p-6"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Management</h3>

              <div className="space-y-4">
                <label className="text-xs text-gray-400 block">Fulfillment Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  className={`w-full ${getStatusStyle(status)} border-none outline-none cursor-pointer`}
                >
                  <option value="placed">Placed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={updateStatus}
                  className="w-full py-4 bg-black text-white text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all"
                >
                  Update Fulfillment
                </button>
              </div>
            </div>

            {/* Address Summary */}
            <div
              className="p-6"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Delivery Address</h3>
              {order?.address && (
                <div className="text-xs space-y-2 leading-relaxed text-gray-600">
                  <p className="font-bold text-black">{order.address.fullName}</p>
                  <p>{order.address.streetAddress}</p>
                  <p>{order.address.city}, {order.address.state} {order.address.pinCode}</p>
                  <p className="pt-2 border-t border-gray-50">{order.address.phoneNumber}</p>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div
              className="p-6"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Financials</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${(order.total - 5.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Shipping</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-50">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
              </div>
            </div>

            {/* Destructive Actions */}
            <button
              onClick={deleteOrder}
              className="w-full py-4 text-[10px] font-bold tracking-widest uppercase border border-red-100 text-red-600 hover:bg-red-50 transition-all"
            >
              Delete Record
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderDetails;