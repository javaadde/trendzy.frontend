import { useEffect, useState } from "react";
import axios from "../../../../axios";

function Category() {
  const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    axios
      .get("/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* Categories Section - Premium Grid */}
      <section
        className="py-24 lg:py-32"
        id="category"
        style={{ backgroundColor: "var(--color-secondary)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="space-y-4">
              <span
                className="inline-block text-xs font-medium tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                }}
              >
                Curated Selection
              </span>
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                Shop by Category
              </h2>
              <div
                className="w-16 h-0.5 mt-4"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
            </div>

            <p
              className="text-base lg:text-lg max-w-md leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Explore our carefully curated collections, each designed to
              elevate your wardrobe with timeless pieces.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {category.map((cate, index) => (
              <a
                key={index}
                href={`/products?category=${cate.name}`}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  aspectRatio: "3/4",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Image Container */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ backgroundColor: "var(--gray-100)" }}
                >
                  <img
                    src={cate.url}
                    alt={cate.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                      opacity: 0.7,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3
                    className="text-lg lg:text-xl font-semibold tracking-wide transition-transform duration-500 group-hover:-translate-y-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    {cate.name}
                  </h3>
                  <p
                    className="text-sm mt-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {cate.discription || "Explore Collection"}
                  </p>

                  {/* Arrow Icon */}
                  <div
                    className="mt-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ transitionDelay: "0.1s" }}
                  >
                    <span
                      className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-inverse)",
                      }}
                    >
                      Shop Now
                      <i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </span>
                  </div>
                </div>

                {/* Border on hover */}
                <div
                  className="absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover:border-white/30"
                  style={{ pointerEvents: "none" }}
                />
              </a>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-16">
            <a
              href="/products"
              className="group inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 border"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-primary)",
                borderColor: "var(--color-primary)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-text-inverse)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
            >
              <span>View All Categories</span>
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
