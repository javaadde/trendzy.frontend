import { motion } from "framer-motion";

function Marquee() {
  const items = [
    "SPRING SUMMER 2024",
    "—",
    "MENSWEAR",
    "—",
    "RAIMENT STUDIO",
    "—",
    "OUTERWEAR",
    "—",
    "TAILORING",
    "—",
    "ESSENTIALS",
    "—",
    "ARCHIVE",
    "—",
    "LIMITED EDITION",
    "—",
  ];

  // Double the items for seamless loop
  const marqueeText = [...items, ...items];

  return (
    <div className="bg-black py-6 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex items-center gap-12 whitespace-nowrap"
      >
        {marqueeText.map((item, idx) => (
          <span
            key={idx}
            className={`text-[11px] tracking-[0.5em] font-medium uppercase flex-shrink-0 ${
              item === "—" ? "text-white/20" : "text-white/60"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
