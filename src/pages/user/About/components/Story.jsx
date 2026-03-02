function Story() {
  return (
    <section className="section-premium bg-white overflow-hidden">
      <div className="container-premium">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
          <div className="lg:w-1/2">
            <h2
              className="text-[12px] font-bold tracking-[0.4em] uppercase text-gray-400 mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Welcome To Our Online Store
            </h2>
            <h3
              className="text-3xl lg:text-5xl font-semibold tracking-tight leading-tight mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Discover Our Journey Redefining Online Shopping.
            </h3>
          </div>
          <div className="lg:w-1/2">
            <p
              className="text-lg text-gray-600 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              At Trendzy, we're passionate about bringing you the best in modern
              and timeless elegance in fashion. Our journey began with a vision
              to redefine the online shopping experience, offering a curated
              selection of high-quality clothing, accessories, and lifestyle
              products that reflect your unique style.
            </p>
            <p
              className="text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              What sets us apart is our dedication to providing exceptional
              customer service and a seamless shopping experience from start to
              finish. We believe in the power of fashion to inspire confidence
              and express individuality.
            </p>

            <div className="mt-12 pt-12 border-t border-gray-100 flex gap-12">
              <div>
                <span className="block text-3xl font-bold mb-2">12k+</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  Happy Customers
                </span>
              </div>
              <div>
                <span className="block text-3xl font-bold mb-2">500+</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  Unique Designs
                </span>
              </div>
              <div>
                <span className="block text-3xl font-bold mb-2">15+</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                  Fashion Awards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
