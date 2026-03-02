import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white text-black pt-32 pb-4 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-x-12 pb-24 border-b border-black/5">
          {/* Newsletter */}
          <div className="md:col-span-1 space-y-10">
            <div className="space-y-4">
              <h4 className="text-[14px] font-black tracking-[-0.05em] uppercase leading-none">
                NEWSLETTER
              </h4>
              <p className="text-[11px] tracking-wider text-black/40 uppercase leading-relaxed max-w-xs">
                Subscribe for exclusive drops, archive access, and studio
                updates.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center group"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b-2 border-black/10 py-5 text-[12px] font-black tracking-[0.1em] font-medium outline-none text-black placeholder:text-black/10 focus:border-black transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[12px] font-black tracking-[0.1em] opacity-0 group-focus-within:opacity-100 transition-opacity"
              >
                JOIN
              </button>
            </form>
          </div>

          {/* Links 1 */}
          <div className="space-y-10">
            <h4 className="text-[14px] font-black tracking-[-0.05em] uppercase leading-none">
              SHOP
            </h4>
            <ul className="space-y-4">
              {["COLLECTIONS", "NEW ARRIVALS", "ARCHIVE", "BESTSELLERS"].map(
                (l) => (
                  <li key={l}>
                    <Link
                      to="/"
                      className="text-[11px] font-bold tracking-[0.1em] text-black/40 hover:text-black hover:tracking-[0.2em] transition-all"
                    >
                      {l}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-10">
            <h4 className="text-[14px] font-black tracking-[-0.05em] uppercase leading-none">
              INFO
            </h4>
            <ul className="space-y-4">
              {["ABOUT US", "STORY", "SUSTAINABILITY", "CAREERS"].map((l) => (
                <li key={l}>
                  <Link
                    to="/"
                    className="text-[11px] font-bold tracking-[0.1em] text-black/40 hover:text-black hover:tracking-[0.2em] transition-all"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Connect */}
          <div className="space-y-10">
            <h4 className="text-[14px] font-black tracking-[-0.05em] uppercase leading-none">
              HELP
            </h4>
            <ul className="space-y-4">
              {["SHIPPING", "RETURNS", "CONTACT", "SIZE GUIDE"].map((l) => (
                <li key={l}>
                  <Link
                    to="/"
                    className="text-[11px] font-bold tracking-[0.1em] text-black/40 hover:text-black hover:tracking-[0.2em] transition-all"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-10 pt-4">
              {["INSTA", "TIKTOK", "PINTEREST"].map((s) => (
                <Link
                  key={s}
                  to="/"
                  className="text-[10px] font-black tracking-[0.2em] text-black/20 hover:text-black transition-all"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Big Large Horizontal Brand Logotype - Gauchere Reference */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-32 w-full text-center select-none"
        >
          <h2
            className="text-[13vw] md:text-[18vw] lg:text-[23vw] font-black tracking-[0.02em] leading-[0.7] uppercase"
            style={{
              fontFamily: "'Olise', ui-sans-serif, system-ui, sans-serif",
            }}
          >
            TRENDZY
          </h2>
        </motion.div>

        {/* Legal Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-6 opacity-30">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
            © 2024 TRENDZY STUDIOS. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-12">
            {["PRIVACY POLICY", "TERMS OF SERVICE", "COOKIES"].map((item) => (
              <Link
                key={item}
                to="/"
                className="text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
