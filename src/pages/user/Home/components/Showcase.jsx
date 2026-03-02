import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Showcase() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        // Just take a representative set
        setProducts(res.data.slice(0, 10));
      })
      .catch(() => {
        // Fallback to mock if API fails
        setProducts([
          {
            _id: "f1",
            name: "SKIN LONG SLEEVE",
            price: 45,
            url: "/models/10.avif",
          },
          {
            _id: "f2",
            name: "HONGOR UNISEX DRESS",
            price: 125,
            url: "/models/11.avif",
          },
          {
            _id: "f3",
            name: "DOROTA TANK TOP",
            price: 65,
            url: "/models/12.avif",
          },
          { _id: "f4", name: "STEVE BLACK", price: 78, url: "/models/6.avif" },
          {
            _id: "f5",
            name: "KOTTI PANT",
            price: 100.97,
            url: "/models/7.avif",
          },
          { _id: "f6", name: "MESH BLAZER", price: 150, url: "/models/4.avif" },
          {
            _id: "f7",
            name: "URBAN JACKET",
            price: 95,
            url: "/models/13.avif",
          },
          { _id: "f8", name: "SILK SCARF", price: 35, url: "/models/14.avif" },
          {
            _id: "f9",
            name: "LEATHER BELT",
            price: 55,
            url: "/models/15.avif",
          },
          {
            _id: "f10",
            name: "FLORAL MAXI DRESS",
            price: 110,
            url: "/models/8.avif",
          },
        ]);
      });
  }, []);

  return (
    <div className="bg-white">
      {/* 1. Cinematic Split Banner - "FLAVOURS" & "END OF SEASON SALE" */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[80vh] overflow-hidden group">
          <img
            src="/models/18.avif"
            alt="Flavours"
            className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[12vw] md:text-[8vw] font-black text-white/90 tracking-[-0.05em] uppercase mix-blend-difference">
              FLAVOURS
            </h2>
          </div>
        </div>
        <div className="relative h-[80vh] overflow-hidden group">
          <img
            src="/models/17.avif"
            alt="Sale"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-[7vw] md:text-[5vw] font-black text-white/90 tracking-[-0.05em] uppercase text-center leading-[0.8]">
              END OF <br /> SEASON SALE
            </h2>
          </div>
        </div>
      </section> */}

      {/* 3. "NEW COLLECTION" & "ACCESSORIES" Lifestyle Sections */}
      {/* <section className="grid grid-cols-1 md:grid-cols-2 border-t border-black/5">
        <div className="relative aspect-[4/5] md:aspect-auto h-[60vh] md:h-[90vh] overflow-hidden">
          <img
            src="/models/9.avif"
            alt="Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-white text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
                NEW COLLECTION
              </h3>
              <Link
                to="/products"
                className="inline-block border-b-2 border-white text-white text-[11px] font-black px-1 pb-1 uppercase tracking-widest"
              >
                EXPLORE
              </Link>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto h-[60vh] md:h-[90vh] overflow-hidden group">
          <img
            src="/models/16.avif"
            alt="Accessories"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-white text-3xl font-black tracking-tighter uppercase">
                ACCESSORIES
              </h3>
              <Link
                to="/products"
                className="inline-block border-b-2 border-white text-white text-[11px] font-black px-1 pb-1 uppercase tracking-widest"
              >
                BROWSE
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* 4. Large Cinematic "NUDE MESH" Style Visual Reveal */}
      <section className="relative h-screen overflow-hidden  shadow-2xl">
        <div className="grid grid-cols-2 h-full">
          <div className="overflow-hidden border-r border-black/5">
            <motion.img
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 10 }}
              src="/models/4.avif"
              className="w-full h-full object-cover contrast-125 brightness-75"
            />
          </div>
          <div className="overflow-hidden">
            <motion.img
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ repeat: Infinity, duration: 8 }}
              src="/models/3.avif"
              className="w-full h-full object-cover contrast-125 brightness-75"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-[15vw] font-black text-white/50 tracking-[-0.08em] mix-blend-soft-light uppercase leading-none">
            NUDE MESH
          </h2>
        </div>
      </section>
    </div>
  );
}

export default Showcase;
