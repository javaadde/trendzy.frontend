import { Link } from "react-router-dom";
import axios from "../../../../axios";
import { useEffect, useState } from "react";

function OrdersBody() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/order")
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  function getStatusStyle(status) {
    const baseStyle = {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      padding: "0.375rem 0.75rem",
    };

    switch (status.toLowerCase()) {
      case "delivered":
        return { ...baseStyle, backgroundColor: "#dcfce7", color: "#166534" };
      case "shipped":
        return { ...baseStyle, backgroundColor: "#dbeafe", color: "#1e40af" };
      case "processing":
        return { ...baseStyle, backgroundColor: "#fef3c7", color: "#92400e" };
      case "cancelled":
        return { ...baseStyle, backgroundColor: "#fee2e2", color: "#991b1b" };
      default:
        return { ...baseStyle, backgroundColor: "var(--gray-100)", color: "var(--color-text-secondary)" };
    }
  }

  if (isLoading) {
    return (
      <div
        className="min-h-[60vh] flex items-center justify-center"
        style={{ backgroundColor: "var(--gray-50)" }}
      >
        <div className="loader">
          <p className="loader-text">Loading</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        className="py-24"
        style={{ backgroundColor: "var(--gray-50)" }}
      >
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div
            className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
            style={{ backgroundColor: "var(--gray-100)" }}
          >
            <i
              className="fa-solid fa-box text-4xl"
              style={{ color: "var(--color-text-muted)" }}
            ></i>
          </div>

          <h2
            className="text-3xl font-semibold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-primary)",
            }}
          >
            No orders yet
          </h2>

          <p
            className="text-base leading-relaxed mb-10"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Once you place an order, it will appear here. Start exploring our
            collection to find something you'll love.
          </p>

          <Link to="/products">
            <button
              className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-text-inverse)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--gray-800)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
              }}
            >
              <span>Start Shopping</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--gray-50)" }}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Orders Count */}
        <div className="mb-8">
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
            }}
          >
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <Link to={`/order/details/${order._id}`} key={index}>
              <div
                className="p-6 lg:p-8 transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  border: "1px solid var(--color-border-light)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Order Images */}
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 4).map((item, i) => (
                      <div
                        key={i}
                        className="w-14 h-14 lg:w-16 lg:h-16 overflow-hidden"
                        style={{
                          backgroundColor: "var(--gray-100)",
                          border: "2px solid var(--color-secondary)",
                        }}
                      >
                        <img
                          src={item.url}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div
                        className="w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--gray-200)",
                          border: "2px solid var(--color-secondary)",
                        }}
                      >
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          +{order.items.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3
                        className="text-sm font-medium tracking-wide"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <span style={getStatusStyle(order.status)}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>

                  {/* Total & Arrow */}
                  <div className="flex items-center gap-4">
                    <span
                      className="text-lg font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--color-primary)",
                      }}
                    >
                      ${order.total}
                    </span>
                    <i
                      className="fa-solid fa-chevron-right text-sm transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: "var(--color-text-muted)" }}
                    ></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersBody;
