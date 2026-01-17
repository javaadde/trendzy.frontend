import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCart from "../../hooks/useCart";

function States() {
  const schema = yup.object().shape({});
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = 5.99;
  const finalTotal = total + shippingCost;

  function proceedToCheckout() {
    setShowCheckout(true);
  }

  function cancelPayment() {
    setShowCheckout(false);
  }

  function proceedToPay(data) {
    setIsProcessing(true);
    placeOrder(finalTotal, data);
  }

  async function placeOrder(subtotal, data) {
    const formData = {
      total: subtotal,
      address: data,
    };

    try {
      axios
        .post("/order", formData)
        .then(async (res) => {
          setIsProcessing(false);
          setShowCheckout(false);
          setShowSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setIsProcessing(false);
        });
    } catch (err) {
      console.log(err);
      setIsProcessing(false);
    }
  }

  return (
    <>
      {/* Order Summary Card */}
      <div
        className="sticky top-24 p-8"
        style={{
          backgroundColor: "var(--color-secondary)",
          border: "1px solid var(--color-border-light)",
        }}
      >
        <h2
          className="text-lg font-semibold tracking-wide mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
          }}
        >
          Order Summary
        </h2>

        {/* Summary Lines */}
        <div className="space-y-4 mb-8">
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
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              ${total.toFixed(2)}
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
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              ${shippingCost.toFixed(2)}
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
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              $0.00
            </span>
          </div>
        </div>

        {/* Total */}
        <div
          className="flex justify-between py-6 mb-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span
            className="text-base font-semibold"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-primary)",
            }}
          >
            Total
          </span>
          <span
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-primary)",
            }}
          >
            ${finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={proceedToCheckout}
          className="w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 mb-4"
          style={{
            fontFamily: "var(--font-body)",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-inverse)",
            border: "1px solid var(--color-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--gray-800)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary)";
          }}
        >
          Proceed to Checkout
        </button>

        {/* Continue Shopping */}
        <Link to="/products">
          <button
            className="w-full py-4 text-sm font-medium tracking-wide transition-all duration-300"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "transparent",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            Continue Shopping
          </button>
        </Link>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <i
            className="fa-solid fa-lock text-xs"
            style={{ color: "var(--color-text-muted)" }}
          ></i>
          <span
            className="text-xs"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
            }}
          >
            Secure checkout
          </span>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={cancelPayment}
          />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 lg:p-10 animate-scale-in"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            {/* Close Button */}
            <button
              onClick={cancelPayment}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center transition-colors duration-300"
              style={{ color: "var(--color-text-muted)" }}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* Header */}
            <h2
              className="text-2xl font-semibold tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              Shipping Information
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(proceedToPay)} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-0 py-3 text-base outline-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    required
                    {...register("fullName")}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-0 py-3 text-base outline-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    required
                    {...register("phoneNumber")}
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label
                  className="block text-xs font-medium tracking-wider uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  className="w-full px-0 py-3 text-base outline-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  required
                  {...register("streetAddress")}
                />
              </div>

              {/* Apartment */}
              <div>
                <label
                  className="block text-xs font-medium tracking-wider uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Apartment, Suite (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apt 4B"
                  className="w-full px-0 py-3 text-base outline-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  {...register("apartment")}
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    className="w-full px-0 py-3 text-base outline-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    required
                    {...register("city")}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    State
                  </label>
                  <select
                    className="w-full px-0 py-3 text-base outline-none cursor-pointer"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    required
                    {...register("state")}
                  >
                    <option value="">Select</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Goa">Goa</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="400001"
                    className="w-full px-0 py-3 text-base outline-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    required
                    {...register("pinCode")}
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <label
                  className="block text-xs font-medium tracking-wider uppercase mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  placeholder="Leave at front door..."
                  rows="2"
                  className="w-full px-0 py-3 text-base outline-none resize-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    backgroundColor: "transparent",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                  {...register("instructions")}
                />
              </div>

              {/* Order Total */}
              <div
                className="flex justify-between py-6"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span
                  className="text-base font-semibold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Order Total
                </span>
                <span
                  className="text-xl font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: isProcessing
                    ? "var(--gray-400)"
                    : "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2">
                <i
                  className="fa-solid fa-lock text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                ></i>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Your payment information is encrypted and secure
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-md p-10 text-center animate-scale-in"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            {/* Success Icon */}
            <div
              className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "#dcfce7" }}
            >
              <i className="fa-solid fa-check text-3xl" style={{ color: "#16a34a" }}></i>
            </div>

            <h2
              className="text-2xl font-semibold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              Order Placed!
            </h2>

            <p
              className="text-base leading-relaxed mb-8"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Your order has been successfully placed. You will receive a
              confirmation email shortly.
            </p>

            <Link to="/products">
              <button
                className="w-full py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default States;
