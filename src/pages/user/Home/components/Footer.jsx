import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--gray-100)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              Stay Updated
            </span>

            <h2
              className="text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              Join Our World
            </h2>

            <p
              className="text-base lg:text-lg leading-relaxed mb-10"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Be the first to know about new arrivals, exclusive collections,
              and special offers. Subscribe and get 10% off your first order.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 text-base outline-none transition-all duration-300 focus:ring-2"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-secondary)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              />
              <button
                type="submit"
                className="px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300"
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
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer
        className="py-16 lg:py-20"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <h3
                className="text-2xl font-semibold tracking-widest mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                }}
              >
                TRENDZY
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--gray-400)",
                }}
              >
                Curated fashion for the modern individual. Premium quality,
                timeless design.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: "fa-instagram", href: "#" },
                  { icon: "fa-twitter", href: "#" },
                  { icon: "fa-pinterest", href: "#" },
                  { icon: "fa-facebook", href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 text-lg transition-all duration-300 border"
                    style={{
                      color: "var(--gray-400)",
                      borderColor: "var(--gray-700)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-text-inverse)";
                      e.currentTarget.style.borderColor = "var(--color-text-inverse)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--gray-400)";
                      e.currentTarget.style.borderColor = "var(--gray-700)";
                    }}
                  >
                    <i className={`fa-brands ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-medium tracking-widest uppercase mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Shop
              </h4>
              <ul className="space-y-3">
                {["New Arrivals", "Best Sellers", "Sale", "Collections"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="/products"
                        className="text-sm transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--gray-400)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--gray-400)";
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4
                className="text-xs font-medium tracking-widest uppercase mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Help
              </h4>
              <ul className="space-y-3">
                {["Contact Us", "Shipping", "Returns", "Size Guide"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--gray-400)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--gray-400)";
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4
                className="text-xs font-medium tracking-widest uppercase mb-6"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-inverse)",
                }}
              >
                Account
              </h4>
              <ul className="space-y-3">
                {["My Account", "Orders", "Wishlist", "Settings"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        to={item === "My Account" || item === "Settings" ? "/settings" : item === "Orders" ? "/orders" : "#"}
                        className="text-sm transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--gray-400)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--color-text-inverse)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--gray-400)";
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: "1px solid var(--gray-800)" }}
          >
            <p
              className="text-xs tracking-wider"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--gray-500)",
              }}
            >
              © 2025 TRENDZY. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-xs tracking-wider transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--gray-500)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-text-inverse)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--gray-500)";
                  }}
                >
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