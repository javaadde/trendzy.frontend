import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Lookbook() {
  const lookbookImages = [
    { src: "/models/3.avif", span: "col-span-2 row-span-2", label: "LOOK 01" },
    { src: "/models/6.avif", span: "col-span-1 row-span-1", label: "LOOK 02" },
    { src: "/models/7.avif", span: "col-span-1 row-span-1", label: "LOOK 03" },
    { src: "/models/11.avif", span: "col-span-1 row-span-2", label: "LOOK 04" },
    { src: "/models/8.avif", span: "col-span-1 row-span-1", label: "LOOK 05" },
    { src: "/models/9.avif", span: "col-span-1 row-span-1", label: "LOOK 06" },
    { src: "/models/15.avif", span: "col-span-2 row-span-1", label: "LOOK 07" },
    { src: "/models/16.avif", span: "col-span-1 row-span-1", label: "LOOK 08" },
  ];

  return (
    <section className="bg-[#f7f7f4] py-40 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-24 mb-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[9px] tracking-[0.5em] font-medium text-black/30 uppercase">
              Archive / SS24
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter uppercase leading-[0.8]">
              LOOK
              <br />
              <span className="italic">BOOK</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs space-y-6"
          >
            <p className="text-[10px] tracking-widest text-black/40 uppercase leading-relaxed">
              A VISUAL EXPLORATION OF THE SS24 COLLECTION. EACH LOOK REPRESENTS
              A CHAPTER IN OUR ONGOING DIALOGUE WITH MODERN MENSWEAR.
            </p>
            <div className="w-12 h-px bg-black/10" />
            <span className="text-[8px] tracking-[0.4em] text-black/20 uppercase block">
              8 LOOKS / 1 VISION
            </span>
          </motion.div>
        </div>
      </div>

      {/* Lookbook Grid */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[250px] md:auto-rows-[350px]">
          {lookbookImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className={`${img.span} group relative overflow-hidden cursor-crosshair`}
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <span className="text-[8px] tracking-[0.4em] font-bold text-white uppercase">
                    {img.label}
                  </span>
                  <span className="text-[7px] tracking-[0.3em] text-white/50 uppercase">
                    SS24
                  </span>
                </div>
              </div>

              {/* Corner Detail */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/0 group-hover:border-white/40 transition-all duration-500" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/0 group-hover:border-white/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-24 mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-between items-center border-t border-black/5 pt-10"
        >
          <span className="text-[9px] tracking-[0.4em] text-black/30 uppercase font-medium">
            Full archive available in store
          </span>
          <Link to="/products">
            <motion.button
              whileHover={{ x: 5 }}
              className="text-[10px] tracking-[0.4em] font-bold uppercase flex items-center gap-4"
            >
              View All Looks
              <span className="w-8 h-px bg-black inline-block" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Lookbook;
