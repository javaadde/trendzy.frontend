import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer
        className="pt-24 pb-12"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24 items-center">
            <div>
              <h2
                className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Join the <span className="italic text-gray-400">Trendzy</span> Circle
              </h2>
              <p
                className="text-base lg:text-lg max-w-md leading-relaxed"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--gray-400)",
                }}
              >
                Subscribe to receive early access to new collections, editorial
                stories, and private events.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-0 py-4 text-base bg-transparent border-b outline-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-inverse)",
                  borderBottomColor: "var(--gray-700)",
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = "var(--color-secondary)";
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = "var(--gray-700)";
                }}
              />
              <button
                className="px-10 py-4 bg-white text-black text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-gray-200"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <h3
                className="text-2xl font-semibold tracking-widest mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                }}
              >
                TRENDZY
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--gray-500)",
                }}
              >
                Redefining modern luxury with a commitment to exceptional
                craftsmanship and sustainable elegance.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-2">Shop</h4>
              {["New Arrivals", "Best Sellers", "Editorial", "Collections"].map((item) => (
                <Link key={item} to="/products" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-2">Company</h4>
              {["About Us", "Sustainability", "Careers", "Press"].map((item) => (
                <a key={item} href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-2">Help</h4>
              {["Contact", "Shipping", "Returns", "Size Guide"].map((item) => (
                <a key={item} href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-2">Social</h4>
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map((item) => (
                <a key={item} href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] tracking-widest uppercase text-gray-600">
              © 2025 Trendzy Luxury Group. All rights reserved.
            </p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="text-[10px] tracking-widest uppercase text-gray-600 hover:text-white transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;