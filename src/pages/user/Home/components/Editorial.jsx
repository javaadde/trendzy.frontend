import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Editorial() {
  return (
    <section className="bg-white py-0 overflow-hidden">
      {/* Full-Bleed Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left: Big Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden"
        >
          <img
            src="/models/17.avif"
            alt="Editorial Feature"
            className="w-full h-full object-cover min-h-[50vh]"
          />
          {/* Floating Index */}
          <div className="absolute top-8 left-8 text-[8px] tracking-[0.5em] text-white mix-blend-difference font-bold uppercase">
            (02)
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex items-center justify-center p-12 md:p-24 bg-[#f9f9f7]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md space-y-10"
          >
            <span className="text-[9px] tracking-[0.5em] font-medium text-black/30 uppercase">
              Studio Notes
            </span>

            <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-[0.9]">
              THE ART OF
              <br />
              <span className="italic">MODERN</span>
              <br />
              DRESSING
            </h2>

            <div className="w-16 h-px bg-black/10" />

            <p className="text-[11px] tracking-wider text-black/50 uppercase leading-[2]">
              We believe that clothing is more than just fabric — it's an
              extension of identity. Each piece in our collection is designed
              with intention, crafted with precision, and built to last beyond
              seasons.
            </p>

            <Link to="/products">
              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-6 pt-4 group cursor-pointer"
              >
                <span className="text-[10px] tracking-[0.4em] font-bold uppercase">
                  Explore Collection
                </span>
                <motion.span className="w-12 h-px bg-black/20 group-hover:bg-black group-hover:w-20 transition-all duration-500 inline-block" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Stats Strip */}
      <div className="border-y border-black/5 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0">
            {[
              { number: "200+", label: "Unique Pieces" },
              { number: "12", label: "Countries" },
              { number: "SS24", label: "Current Season" },
              { number: "01", label: "Vision" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center md:border-r last:border-r-0 border-black/5"
              >
                <div className="text-4xl md:text-5xl font-light tracking-tighter mb-2">
                  {stat.number}
                </div>
                <span className="text-[8px] tracking-[0.4em] text-black/30 uppercase font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Width Parallax Image */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src="/models/18.avif"
          alt="Full bleed editorial"
          className="w-full h-full object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter uppercase text-white mix-blend-difference">
              RAIMENT
            </h2>
            <p className="text-[10px] tracking-[0.6em] text-white/50 uppercase">
              Spring Summer 2024
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Editorial;
