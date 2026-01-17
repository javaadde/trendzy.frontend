import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      {/* Premium Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm"
            : "bg-white"
          }`}
        style={{ borderBottom: "1px solid var(--color-border-light)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <h1
                className="text-2xl lg:text-3xl font-semibold tracking-widest"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                TRENDZY
              </h1>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-10">
              {[
                { label: "Shop", href: "/products" },
                { label: "Collections", href: "#category" },
                { label: "Support", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="relative py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-300 group"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"
                  />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">
              {/* Search Icon */}
              <button
                className="hidden md:flex items-center justify-center w-10 h-10 transition-colors duration-300 hover:opacity-60"
                style={{ color: "var(--color-text-primary)" }}
              >
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </button>

              {/* Cart */}
              <Link to="/cart">
                <button
                  className="relative flex items-center justify-center w-10 h-10 transition-all duration-300 hover:opacity-60"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <i className="fa-solid fa-bag-shopping text-xl"></i>
                </button>
              </Link>

              {/* Account */}
              <Link to="/settings" className="hidden md:block">
                <button
                  className="flex items-center justify-center w-10 h-10 transition-colors duration-300 hover:opacity-60"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  <i className="fa-regular fa-user text-xl"></i>
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={openNav}
                className="md:hidden flex items-center justify-center w-10 h-10"
                style={{ color: "var(--color-text-primary)" }}
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-500 ${isNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeNav}
      />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[101] transition-transform duration-500 ease-out ${isNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ boxShadow: isNavOpen ? "var(--shadow-2xl)" : "none" }}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: "var(--color-border-light)" }}>
          <span
            className="text-xl font-semibold tracking-widest"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MENU
          </span>
          <button
            onClick={closeNav}
            className="flex items-center justify-center w-10 h-10 transition-colors duration-300"
            style={{ color: "var(--color-text-primary)" }}
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-8">
          {[
            { label: "Home", href: "/", icon: "fa-house" },
            { label: "Shop", href: "/products", icon: "fa-bag-shopping" },
            { label: "Collections", href: "/#category", icon: "fa-layer-group" },
            { label: "Orders", href: "/orders", icon: "fa-box" },
            { label: "Cart", href: "/cart", icon: "fa-cart-shopping" },
            { label: "Account", href: "/settings", icon: "fa-user" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={closeNav}
              className="flex items-center gap-4 px-8 py-4 transition-all duration-300 hover:bg-gray-50"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
              }}
            >
              <i className={`fa-solid ${item.icon} w-6 text-center opacity-60`}></i>
              <span
                className="text-base font-medium tracking-wide uppercase"
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-8 border-t" style={{ borderColor: "var(--color-border-light)" }}>
          <p
            className="text-xs tracking-wider uppercase text-center"
            style={{ color: "var(--color-text-muted)" }}
          >
            © 2025 TRENDZY
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;