import { Link } from "react-router-dom";

function Hearo() {
  return (
    <>
      {/* Hero Section - Premium Editorial Style */}
      <section
        className="relative min-h-[90vh] lg:min-h-screen overflow-hidden"
        style={{ backgroundColor: "var(--gray-100)" }}
      >
        {/* Background Pattern (Subtle) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[90vh] lg:min-h-screen py-16 lg:py-0">

            {/* Text Content */}
            <div className="order-2 lg:order-1 space-y-8 lg:space-y-10 max-w-xl">
              {/* Eyebrow Text */}
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <span
                  className="inline-block text-xs font-medium tracking-widest uppercase px-4 py-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                    backgroundColor: "var(--color-secondary)",
                  }}
                >
                  New Collection 2025
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h1
                  className="text-5xl lg:text-7xl xl:text-8xl font-semibold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
                >
                  Timeless
                </h1>
                <h1
                  className="text-5xl lg:text-7xl xl:text-8xl font-normal italic leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
                >
                  Elegance
                </h1>
              </div>

              {/* Divider */}
              <div
                className="w-16 h-0.5 animate-fade-in"
                style={{ backgroundColor: "var(--color-primary)", animationDelay: "0.3s" }}
              />

              {/* Description */}
              <p
                className="text-lg lg:text-xl leading-relaxed animate-fade-in"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                  animationDelay: "0.4s"
                }}
              >
                Discover the perfect balance of sophistication and comfort.
                Our curated collection features premium fabrics, impeccable
                tailoring, and designs that transcend seasons.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <Link to="/products">
                  <button
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase overflow-hidden transition-all duration-500"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-inverse)",
                      backgroundColor: "var(--color-primary)",
                    }}
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <i className="fa-solid fa-arrow-right relative z-10 transition-transform duration-300 group-hover:translate-x-1"></i>
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                      style={{ backgroundColor: "var(--gray-800)" }}
                    />
                  </button>
                </Link>

                <button
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 border"
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
                  <span>View Lookbook</span>
                </button>
              </div>

              {/* Stats */}
              <div
                className="flex gap-12 pt-8 animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                {[
                  { number: "500+", label: "Products" },
                  { number: "50K+", label: "Customers" },
                  { number: "4.9", label: "Rating" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div
                      className="text-3xl lg:text-4xl font-semibold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-xs tracking-wider uppercase mt-1"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              {/* Main Image Container */}
              <div
                className="relative overflow-hidden animate-scale-in"
                style={{
                  aspectRatio: "3/4",
                  maxHeight: "85vh",
                }}
              >
                {/* Image Frame */}
                <div
                  className="absolute inset-0 border"
                  style={{ borderColor: "var(--color-border)" }}
                />

                {/* Desktop Image */}
                <img
                  src="https://image.hm.com/assets/hm/de/74/de74869d8c461f1455bb800621bf4a38be9d8030.jpg?imwidth=1260"
                  alt="Fashion Model - Monochrome Style"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Label */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-6"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}
                  >
                    Featured
                  </div>
                  <div
                    className="text-lg font-semibold tracking-wide"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
                  >
                    Premium Collection
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 -z-10 hidden lg:block"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}
          >
            Scroll
          </span>
          <i className="fa-solid fa-chevron-down text-sm" style={{ color: "var(--color-text-muted)" }}></i>
        </div>
      </section>
    </>
  );
}

export default Hearo;