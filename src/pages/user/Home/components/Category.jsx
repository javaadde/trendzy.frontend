import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plus, ArrowUpRight } from "lucide-react";

function Category() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Mock featured items based on Gauchere style
  const featuredItems = [
    {
      id: 101,
      img: "/models/11.avif",
      name: "TECHNICAL NYLON WIDE TANK TOP",
      price: "790,00€",
      size: "38",
      offset: "md:mt-20",
    },
    {
      id: 102,
      img: "/models/15.avif",
      name: "OVERSIZED TECHNICAL NYLON PARKA",
      price: "1.490,00€",
      size: "36",
      offset: "md:-mt-10",
    },
    {
      id: 103,
      img: "/models/16.avif",
      name: "SILK TURTLENECK TOP",
      price: "660,00€",
      size: "38",
      offset: "md:mt-40",
    },
  ];

  useEffect(() => {
    axios
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white py-10 md:py-20 relative overflow-hidden">
      {/* Background Graphic - Gauchere Style */}
      <div className="absolute top-[20%] right-[-10%] opacity-[0.03] select-none pointer-events-none hidden md:block">
        <span className="text-[400px] font-black tracking-[-0.05em] leading-none">
          2024
        </span>
      </div>

      <section className="max-w-[1700px] mx-auto px-6 md:px-10 py-20 relative">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-[40px] md:text-[80px] font-black tracking-[-0.05em] leading-[0.8] uppercase flex flex-col">
              <span>NEW</span>
              <span className="italic">ARRIVALS</span>
            </h2>
          </motion.div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-[12px] font-black tracking-[0.1em] uppercase hover:opacity-50 transition-all pb-2 md:pb-6"
          >
            SEE ALL <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-x-20">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group flex flex-col ${item.offset}`}
            >
              <Link to="/products" className="relative block">
                {/* Image Container */}
                <div className="aspect-[3/4] bg-[#f9f9f9] overflow-hidden relative mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Quick Look + Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white w-10 h-10 flex items-center justify-center border border-black shadow-sm">
                      <Plus size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Info Overlay / Label */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[12px] font-black tracking-[-0.01em] uppercase max-w-[200px] leading-tight group-hover:italic transition-all">
                      {item.name}
                    </span>
                    <span className="text-[12px] font-bold text-black/40">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      SIZE {item.size}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Strip - Minimalist UY Studio Style */}
      <section className="bg-black text-white py-12 md:py-20 mt-20">
        <div className="max-w-[1700px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/30">
                SHOP BY BRAND
              </span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                THE SELECTION
              </h3>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {["OUTERWEAR", "KNITWEAR", "TROUSERS", "FOOTWEAR", "ARCHIVE"].map(
                (cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${cat}`}
                    className="text-[13px] font-black tracking-[0.1em] uppercase hover:italic hover:translate-x-1 transition-all"
                  >
                    {cat}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Banner Grid Inspiration */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-10 py-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative aspect-square md:aspect-[4/5] overflow-hidden"
        >
          <img
            src="/models/18.avif"
            alt="Editorial"
            className="w-full h-full object-cover grayscale brightness-110"
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute bottom-10 left-10 text-[10px] font-bold text-white uppercase tracking-[0.4em]">
            RARE / NO.01
          </div>
        </motion.div>

        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-black/20">
              TRENDZY PHILOSOPHY
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-[0.85]">
              CRAFTED
              <br />
              FOR THE
              <br />
              MODERN
              <br />
              <span className="italic">INDIVIDUAL</span>
            </h2>
          </div>
          <p className="text-[13px] font-bold tracking-tight text-black/40 uppercase max-w-sm leading-relaxed">
            Minimalism meets high-impact silhouettes. Each piece in our archive
            is a study of geometry, texture, and the human form.
          </p>
          <Link
            to="/products"
            className="inline-block border-b-2 border-black py-2 text-[12px] font-black uppercase tracking-[0.1em] hover:pb-4 transition-all"
          >
            EXPLORE THE CORE COLLECTION
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Category;
