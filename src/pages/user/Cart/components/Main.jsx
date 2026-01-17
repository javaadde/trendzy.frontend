import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { Link } from "react-router-dom";
import Items from "./Items";
import States from "./States";

function Main() {
  const [isEmpty, setIsEmpty] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      axios.get("/cart").then((res) => {
        const items = res.data.items;
        if (items.length <= 0) {
          setIsEmpty(true);
        }
        setIsLoading(false);
      });
    };

    fetchCart();
  }, []);

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

  return isEmpty ? (
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
            className="fa-solid fa-bag-shopping text-4xl"
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
          Your bag is empty
        </h2>

        <p
          className="text-base leading-relaxed mb-10"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          Looks like you haven't added anything to your bag yet. Explore our
          collection to find something you'll love.
        </p>

        <Link to="/products">
          <button
            className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
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
            <span>Start Shopping</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div style={{ backgroundColor: "var(--gray-50)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Items List */}
          <div className="lg:col-span-2">
            <Items />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <States />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
