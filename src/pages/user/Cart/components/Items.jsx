import useCart from "../../hooks/useCart";

function Items() {
  const { cartItems, increaseItemQty, decreaseItemQty, deleteCartItem } = useCart();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Cart Items */}
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex gap-6 py-6"
          style={{ borderBottom: "1px solid var(--color-border-light)" }}
        >
          {/* Product Image */}
          <div
            className="relative w-28 h-36 lg:w-32 lg:h-40 flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: "var(--gray-100)" }}
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <h3
                className="text-base font-medium tracking-wide mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-primary)",
                }}
              >
                {item.name}
              </h3>
              <p
                className="text-lg font-semibold"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-primary)",
                }}
              >
                ${item.price}
              </p>
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-between mt-auto pt-4">
              {/* Quantity Controls */}
              <div
                className="flex items-center"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <button
                  onClick={() => decreaseItemQty(item.product_id)}
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  style={{
                    color: "var(--color-text-secondary)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--gray-100)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>

                <span
                  className="w-12 text-center text-sm font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                    borderLeft: "1px solid var(--color-border)",
                    borderRight: "1px solid var(--color-border)",
                  }}
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseItemQty(item.product_id)}
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  style={{
                    color: "var(--color-text-secondary)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--gray-100)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>

              {/* Subtotal & Remove */}
              <div className="flex items-center gap-6">
                <span
                  className="text-base font-semibold"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => deleteCartItem(item.product_id)}
                  className="text-sm transition-colors duration-300"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#dc2626";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-muted)";
                  }}
                  title="Remove item"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
