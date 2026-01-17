import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateSignIn = () => {
    navigate("/login");
  };

  const navigateSignUp = () => {
    navigate("/signUp");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-elegant py-4"
            : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="relative z-50">
              <h1
                className="text-2xl lg:text-3xl font-semibold tracking-widest transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                TRENDZY
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {["Products", "Categories", "Support"].map((item) => (
                <a
                  key={item}
                  href={item === "Support" ? "#" : `/${item.toLowerCase()}`}
                  className="nav-link text-sm font-medium tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={navigateSignIn}
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-300 hover:opacity-60"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              >
                Sign In
              </button>
              <button
                onClick={navigateSignUp}
                className="px-8 py-3 bg-black text-white text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-gray-800"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Open Account
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              />
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-500 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full pt-32 px-12 pb-12">
          <nav className="flex flex-col gap-8 mb-12">
            {["Products", "Categories", "Customer Support"].map((item, i) => (
              <a
                key={item}
                href={item === "Customer Support" ? "#" : `/${item.toLowerCase()}`}
                className="text-3xl font-semibold tracking-tight transition-all duration-300 hover:pl-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button
              onClick={navigateSignIn}
              className="w-full py-5 border border-black text-sm font-medium tracking-widest uppercase transition-all duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sign In
            </button>
            <button
              onClick={navigateSignUp}
              className="w-full py-5 bg-black text-white text-sm font-medium tracking-widest uppercase transition-all duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 italic text-sm text-gray-500">
            Elevating your style since 2025.
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;