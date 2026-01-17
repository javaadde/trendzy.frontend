function Category() {
  const categories = [
    {
      name: "Outerwear",
      desc: "Impeccable Silhouettes",
      url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Essentials",
      desc: "Core Wardrobe Pieces",
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Evening",
      desc: "After-Hours Elegance",
      url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Tailoring",
      desc: "Sharp and Sophisticated",
      url: "https://images.unsplash.com/photo-1594932224828-b4b059b6f68e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      name: "Accessories",
      desc: "The Finishing Touch",
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <section className="py-24 lg:py-32" id="category" style={{ backgroundColor: "var(--color-secondary)" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                }}
              >
                Collections
              </span>
              <h2
                className="text-4xl lg:text-6xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                Curation & <span className="italic">Craft</span>
              </h2>
            </div>
            <p
              className="text-base lg:text-lg max-w-md leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Explore our collections, where each category represents a unique
              perspective on modern luxury and timeless design.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat, index) => (
              <a
                key={index}
                href="/products"
                className="group relative h-[500px] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.url}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-75"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                      opacity: 0.6,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                  <h3
                    className="text-2xl font-semibold tracking-tight mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-sm opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {cat.desc}
                  </p>
                </div>

                {/* Corner Label */}
                <div className="absolute top-6 left-6 z-10">
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 border border-white/30 backdrop-blur-md"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    Explore
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;