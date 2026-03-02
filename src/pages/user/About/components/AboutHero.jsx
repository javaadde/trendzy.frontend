import { Link } from "react-router-dom";

function AboutHero() {
  return (
    <section className="pt-32 pb-16 lg:pt-48 lg:pb-24">
      <div className="container-premium">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
          <nav className="flex items-center gap-2 mb-6 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-black">About Us</span>
          </nav>
          <h1
            className="text-5xl lg:text-7xl font-semibold tracking-tight leading-none mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About us
          </h1>
        </div>

        <div className="relative w-full aspect-[21/9] overflow-hidden group animate-scale-in">
          <img
            src="/about/hero.png"
            alt="Trendzy Evolution"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

          {/* Decorative Badge */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full flex items-center justify-center p-2 border border-gray-100 shadow-xl lg:w-40 lg:h-40">
            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-full flex flex-col items-center justify-center rotate-12 transition-transform duration-500 hover:rotate-0">
              <span className="text-[10px] font-bold tracking-widest uppercase">
                EST.
              </span>
              <span className="text-xl font-bold">2026</span>
              <span className="text-[8px] font-bold tracking-widest uppercase text-gray-400">
                TRENDZY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
