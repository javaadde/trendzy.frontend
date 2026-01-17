import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../axios";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/order/${id}`)
      .then((res) => {
        setOrder(res.data);
        setItems(res.data.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [status, id]);

  const cancellOreder = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      axios
        .patch(`/order/cancell/${id}`)
        .then((res) => {
          setStatus(res.data.updated);
        })
        .catch((err) => console.log(err));
    }
  };

  function getStatusStyle(status) {
    const baseStyle = {
      fontFamily: "var(--font-body)",
      fontSize: "0.75rem",
      fontWeight: "500",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      padding: "0.5rem 1rem",
      display: "inline-block",
    };

    switch (status?.toLowerCase()) {
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
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--gray-50)" }}
      >
        <div className="loader">
          <p className="loader-text">Loading</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--gray-50)" }}
      >
        <p style={{ color: "var(--color-text-muted)" }}>Order not found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--gray-50)" }}
    >
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
                to="/orders"
                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--color-text-primary)" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <div>
                <h1
                  className="text-lg lg:text-xl font-semibold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary)",
                  }}
                >
                  Order #{order._id?.slice(-8).toUpperCase()}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 lg:py-12">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          {/* Status Banner */}
          <div
            className="p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            <div>
              <span
                className="text-xs font-medium tracking-wider uppercase block mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                }}
              >
                Order Status
              </span>
              <span style={getStatusStyle(order.status)}>{order.status}</span>
            </div>
            <div className="text-right">
              <span
                className="text-xs font-medium tracking-wider uppercase block mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                }}
              >
                Order Date
              </span>
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-primary)",
                }}
              >
                {new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <h2
                className="text-lg font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                Order Items
              </h2>

              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div
                    className="w-24 h-32 flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: "var(--gray-100)" }}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-base font-medium tracking-wide mb-1"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        ${item.price} each
                      </span>
                      <span
                        className="text-base font-semibold"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Summary & Address */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div
                className="p-6"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  border: "1px solid var(--color-border-light)",
                }}
              >
                <h3
                  className="text-lg font-semibold tracking-tight mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary)",
                  }}
                >
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      ${(order.total - 5.99).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Shipping
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      $5.99
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      Tax
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      $0.00
                    </span>
                  </div>
                </div>

                <div
                  className="flex justify-between pt-4 mt-4"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <span
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Total
                  </span>
                  <span
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ${order.total}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div
                className="p-6"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  border: "1px solid var(--color-border-light)",
                }}
              >
                <h3
                  className="text-lg font-semibold tracking-tight mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary)",
                  }}
                >
                  Shipping Address
                </h3>

                {order?.address && (
                  <div className="space-y-2">
                    {order.address.fullName && (
                      <p
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {order.address.fullName}
                      </p>
                    )}
                    {order.address.streetAddress && (
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {order.address.streetAddress}
                        {order.address.apartment && `, ${order.address.apartment}`}
                      </p>
                    )}
                    <p
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {order.address.city && `${order.address.city}, `}
                      {order.address.state && `${order.address.state} `}
                      {order.address.pinCode}
                    </p>
                    {order.address.phoneNumber && (
                      <p
                        className="text-sm mt-2"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--color-text-secondary)",
                        }}
                      >
                        {order.address.phoneNumber}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  className="w-full py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300"
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
                  Track Order
                </button>

                {order.status !== "cancelled" && order.status !== "delivered" && (
                  <button
                    onClick={cancellOreder}
                    className="w-full py-4 text-sm font-medium tracking-wide transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      color: "var(--color-text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#dc2626";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderDetails;
