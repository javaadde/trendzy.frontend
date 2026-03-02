import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import axios from "../../../../axios";

function Hero() {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const productData = {
    id: "65e123abc456def789012345",
    title: "ilux.",
    subtitle: "NEW COLLECTION",
    price: "4 890 UAH",
    description:
      "The ilux Raincoat by 11-18 Lounge designer Fleur has a structured body with a hood, removable sleeves, side seam pockets and a two way zipper front. Made from 100% recycled materials.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const res = await axios.get(`/add-to-cart/${productData.id}`, {
        withCredentials: true,
      });
      if (res.data.message === "please signin first") {
        navigate("/login");
      } else {
        setMessage("ADDED!");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden pt-16 flex items-center justify-center">
      {/* Background Large Text - Even smaller and more to the top */}
      <div className="absolute inset-x-0 top-[15%] flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.h1
          initial={{ opacity: 0, scale: 0.98, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 1 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-[18vw] font-[900] leading-none text-[#F2F2F2] tracking-[0.02em]"
          style={{
            fontFamily: "'Olise', ui-sans-serif, system-ui, sans-serif",
          }}
        >
          trendzy
        </motion.h1>
      </div>

      <div className="relative z-10 w-full max-w-[1700px] h-full mx-auto px-10 flex items-end justify-between pb-8">
        {/* Left Column: Product Info (Moved closer to bottom) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="w-full md:w-[400px] space-y-10 z-20"
        >
          <div className="space-y-6">
            <span className="text-[13px] font-black tracking-[0.4em] text-[#A3A3A3] uppercase block">
              {productData.subtitle}
            </span>
            <h2
              className="text-[110px] font-black leading-[0.75] tracking-[0.02em] text-black"
              style={{
                fontFamily: "'Olise', ui-sans-serif, system-ui, sans-serif",
              }}
            >
              ilux.
            </h2>
          </div>

          <p className="text-[16px] leading-[1.8] text-black font-medium max-w-[340px]">
            {productData.description}
          </p>

          {/* <div className="flex items-center gap-6 group cursor-pointer w-fit overflow-hidden pt-4">
            <div className="h-[1px] w-16 bg-black/10 origin-left transition-all duration-500 group-hover:w-24 group-hover:bg-black" />
            <span className="text-[11px] font-black tracking-widest uppercase py-2">
              SCROLL TO EXPLORE
            </span>
          </div> */}
        </motion.div>

        {/* Center: Model Image - STILL BIG */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-auto h-[95%] flex items-end pointer-events-auto z-10"
        >
          <motion.img
            initial={{ opacity: 0, y: 100, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            src="/hero.png"
            alt="ilux model"
            className="h-full w-auto object-contain object-bottom scale-[1.1]"
          />

          {/* Product Callout - High Visibility Connection */}
          <div className="absolute left-[65%] top-[40%] z-30 hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="flex items-center"
            >
              {/* Visible Technical Dot */}
              <div className="relative flex items-center justify-center group">
                <div className="w-3 h-3 bg-white border-2 border-black rounded-full z-10 transition-transform duration-500 group-hover:scale-150" />
                <motion.div
                  animate={{ scale: [1, 3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-3 h-3 bg-black rounded-full"
                />

                {/* Product Reference Label - Reveal on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-[10px] text-black border border-black/40 px-3 py-1.5 tracking-[0.2em] uppercase whitespace-nowrap bg-white/80 backdrop-blur-sm">
                    VIEW DETAILS
                  </span>
                  <div className="w-[1px] h-4 bg-black/40 mt-1" />
                </motion.div>
              </div>

              {/* Architectural Bent Leader Line - Always Visible */}
              <div className="opacity-100">
                <svg
                  width="400"
                  height="120"
                  viewBox="0 0 400 120"
                  fill="none"
                  className="overflow-visible pointer-events-none translate-x-[6px] translate-y-[0.25px]"
                >
                  <motion.path
                    d="M 0 0 L 50 0 L 110 80 L 350 80"
                    stroke="black"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 2.2,
                      duration: 1.5,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Premium Action Panel (Wrapped in Architectural Frame) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          className="hidden md:flex flex-col items-end w-[380px] z-20 pointer-events-auto"
        >
          {/* The Technical Box Frame with Architectural Cut */}
          <div
            className="relative w-full p-10 pt-16 space-y-12 bg-white/60 backdrop-blur-md border border-black/5"
            style={{
              clipPath: "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)",
            }}
          >
            {/* Technical Drafting Mark Corners (SVG for precision) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              style={{ zIndex: 30 }}
            >
              {/* Top-Left Chamfered Accents */}
              <line
                x1="0"
                y1="40"
                x2="40"
                y2="0"
                stroke="black"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <line
                x1="25"
                y1="0"
                x2="70"
                y2="0"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <line
                x1="0"
                y1="25"
                x2="0"
                y2="70"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />

              {/* Top-Right Drafting Mark */}
              <line
                x1="calc(100% - 20px)"
                y1="0"
                x2="calc(100% + 5px)"
                y2="0"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <line
                x1="100%"
                y1="-5"
                x2="100%"
                y2="20"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />

              {/* Bottom-Right Drafting Mark */}
              <line
                x1="100%"
                y1="calc(100% - 20px)"
                x2="100%"
                y2="calc(100% + 5px)"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <line
                x1="calc(100% + 5px)"
                y1="100%"
                x2="calc(100% - 20px)"
                y2="100%"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />

              {/* Bottom-Left Drafting Mark */}
              <line
                x1="-5"
                y1="100%"
                x2="20"
                y2="100%"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
              <line
                x1="0"
                y1="calc(100% - 20px)"
                x2="0"
                y2="calc(100% + 5px)"
                stroke="black"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />
            </svg>

            {/* Branding Detail */}
            <div className="flex flex-col items-end space-y-3 opacity-60">
              <span
                className="text-[50px] font-black text-black/[0.08] leading-none select-none"
                style={{ fontFamily: "'Olise', sans-serif" }}
              >
                01
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[8px] font-black tracking-[0.3em] uppercase text-black/30">
                  LIMITED EDITION
                </span>
                <div className="w-1 h-1 rounded-full bg-black/30" />
                <span className="text-[8px] font-black tracking-[0.3em] uppercase text-black/30">
                  2026
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-5 w-full">
              <div className="flex justify-between items-end">
                <span className="text-[9px] font-black tracking-widest text-[#A3A3A3] uppercase">
                  SELECT SIZE
                </span>
                <span className="text-[12px] font-black text-black">
                  UAH {productData.price.split(" ")[0]}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-[10px] font-black transition-all duration-500 hover:border-black ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-black/5 text-black/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium ADD TO BAG Button */}

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="group relative w-full bg-black text-white py-4 overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-95"
            >
              <div className="absolute inset-0 bg-neutral-800 translate-y-[101%] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <div className="relative z-10 flex items-center justify-center gap-4 px-6">
                <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                  {message || (isAdding ? "ADDING..." : "ADD TO BAG")}
                </span>
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ShoppingBag size={12} className="text-white" />
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
