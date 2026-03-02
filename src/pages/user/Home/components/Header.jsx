import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Menu, ShoppingBag, User, Heart } from "lucide-react";
import axios from "../../../../axios";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    axios
      .get("/", { withCredentials: true })
      .then((res) => {
        if (res.data.is) setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="flex items-start justify-between">
          {/* ── LEFT PANEL: nav links, right edge cuts diagonally inward ── */}
          <div
            className="pointer-events-auto hidden md:flex items-center gap-8 bg-white/80 backdrop-blur-md px-10 py-5 pr-20"
            style={{
              clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
            }}
          >
            <button
              onClick={() => setIsNavOpen(true)}
              className="text-[11px] font-bold tracking-[0.1em] uppercase hover:opacity-50 transition-opacity"
            >
              <Menu size={16} strokeWidth={2.5} />
            </button>
            <Link
              to="/products"
              className="text-[11px] font-bold tracking-[0.1em] uppercase hover:opacity-50 transition-opacity"
            >
              COLLECTIONS
            </Link>
            <Link
              to="/"
              className="text-[11px] font-bold tracking-[0.1em] uppercase hover:opacity-50 transition-opacity"
            >
              ABOUT
            </Link>
          </div>

          {/* Mobile hamburger (small screens) */}
          <button
            onClick={() => setIsNavOpen(true)}
            className="pointer-events-auto md:hidden bg-white/80 backdrop-blur-md p-4"
          >
            <Menu size={20} strokeWidth={2} />
          </button>

          {/* ── CENTER: fully transparent, no content ── */}
          <div className="flex-1" />

          {/* ── RIGHT PANEL: icons, left edge cuts diagonally (opposite angle) ── */}
          <div
            className="pointer-events-auto hidden md:flex items-center gap-7 bg-white/80 backdrop-blur-md px-10 py-5 pl-20"
            style={{
              clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <button className="hover:opacity-50 transition-opacity">
              <Search size={18} strokeWidth={2} />
            </button>
            <Link
              to={isLoggedIn ? "/settings" : "/login"}
              className="hover:opacity-50 transition-opacity"
            >
              <User size={18} strokeWidth={2} />
            </Link>
            <button className="hover:opacity-50 transition-opacity">
              <Heart size={18} strokeWidth={2} />
            </button>
            <Link
              to="/cart"
              className="relative hover:opacity-50 transition-opacity"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile cart icon */}
          <Link
            to="/cart"
            className="pointer-events-auto md:hidden bg-white/80 backdrop-blur-md p-4 relative"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-black text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[100] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-[14px] font-black tracking-tighter uppercase">
                MENU
              </span>
              <button onClick={() => setIsNavOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {["COLLECTIONS", "SHOP", "ABOUT", "LOG IN"].map((item) => (
                <Link
                  key={item}
                  to="/"
                  onClick={() => setIsNavOpen(false)}
                  className="text-4xl font-black tracking-tighter uppercase"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
