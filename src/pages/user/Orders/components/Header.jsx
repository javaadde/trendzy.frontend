import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left - Back & Title */}
          <div className="flex items-center gap-6">
            <Link
              to="/settings"
              className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--color-text-primary)" }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
            <div>
              <h1
                className="text-2xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                My Orders
              </h1>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden sm:flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--color-text-primary)" }}
            >
              <i className="fa-solid fa-house"></i>
            </Link>

            <Link
              to="/settings"
              className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
              style={{ color: "var(--color-text-primary)" }}
            >
              <i className="fa-regular fa-user text-xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
