function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax-like effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
            alt="High Fashion Background"
            className="w-full h-full object-cover scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="container-premium relative z-10 pt-20">
          <div className="max-w-3xl">
            <span
              className="inline-block text-xs font-semibold tracking-[0.3em] uppercase mb-6 animate-fade-in"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Autumn / Winter 2025
            </span>

            <h1
              className="text-5xl lg:text-8xl xl:text-9xl font-semibold tracking-tighter leading-[0.9] mb-8 animate-slide-in"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-secondary)",
              }}
            >
              The Art of <br />
              <span className="italic">Expression</span>
            </h1>

            <p
              className="text-lg lg:text-xl max-w-xl leading-relaxed mb-12 animate-fade-in"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.8)",
                animationDelay: "0.2s",
              }}
            >
              Experience a collection where minimalism meets maximal impact.
              Our curated pieces are designed for those who speak through style.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="/products"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--gray-200)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-secondary)";
                }}
              >
                <span>Shop Collection</span>
                <i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
              </a>

              <button
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 border"
                style={{
                  fontFamily: "var(--font-body)",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "var(--color-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-secondary)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span>View Lookbook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>
    </>
  );
}

export default Hero;