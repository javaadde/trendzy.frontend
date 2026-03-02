import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../../axios";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../hooks/useCart";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Review");
  const [selectedSize, setSelectedSize] = useState("XXL");
  const [quantity, setQuantity] = useState(4);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/get/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback or handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="loader">
          <p className="loader-text">Finding Piece</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="btn-primary">
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const colors = [
    { name: "Brown", hex: "#8B4513" },
    { name: "Off White", hex: "#F5F5DC" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
  ];

  const images = [
    product.url,
    "/models/11.avif",
    "/models/12.avif",
    "/models/13.avif",
  ];

  return (
    <div className="min-h-screen bg-white font-body selection:bg-black selection:text-white">
      {/* Promo Bar */}
      <div className="bg-[#1A1A1A] text-white py-3 text-center text-[10px] tracking-[0.2em] font-medium uppercase relative overflow-hidden">
        <div className="flex justify-center items-center gap-12 animate-pulse">
          <span>
            Sign up and GET 25% OFF for your first order.{" "}
            <Link
              to="/signUp"
              className="underline underline-offset-4 hover:text-gray-300"
            >
              Sign up now
            </Link>
          </span>
          <span className="hidden md:inline">Support: (406) 555-0120</span>
        </div>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
          <i className="fa-solid fa-xmark text-xs" />
        </button>
      </div>

      {/* Modern Global Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-3xl border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="text-2xl font-bold tracking-[0.3em] font-display text-black">
              TRENDZY.
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {[
              "Home",
              "Shop",
              "Women",
              "Men",
              "Accessories",
              "About Us",
              "Contact Us",
              "Blog",
            ].map((link) => (
              <Link
                key={link}
                to={link === "Shop" ? "/products" : "/"}
                className="text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 hover:text-black transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 text-lg">
            <button className="hover:scale-110 transition-transform">
              <i className="fa-solid fa-magnifying-glass text-sm" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <i className="fa-regular fa-heart" />
            </button>
            <Link
              to="/cart"
              className="relative hover:scale-110 transition-transform"
            >
              <i className="fa-solid fa-bag-shopping" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                1
              </span>
            </Link>
            <Link
              to="/settings"
              className="hover:scale-110 transition-transform"
            >
              <i className="fa-regular fa-user" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <div className="bg-[#F9F9F9] py-16 text-center">
        <h2 className="text-4xl font-display font-medium tracking-tight mb-4">
          Product Details
        </h2>
        <div className="flex justify-center items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black">{product.category_id || "Coats"}</span>
          <span>/</span>
          <span className="text-black">Product Details</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Image Showcase */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev > 0 ? prev - 1 : images.length - 1,
                    )
                  }
                  className="w-12 h-12 bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev < images.length - 1 ? prev + 1 : 0,
                    )
                  }
                  className="w-12 h-12 bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`Thumb ${idx}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Interaction */}
          <div className="flex flex-col">
            <div className="pb-8 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">
                {product.category_id || "Coats"}
              </p>
              <h1 className="text-4xl lg:text-5xl font-display font-medium tracking-tight mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1 text-[#FFB800] text-sm">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <span className="ml-2 text-black font-semibold">4.8</span>
                  <span className="text-gray-400 font-normal ml-1">
                    (245 Review)
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-3xl font-display font-semibold text-black">
                  ${product.price}.00
                </span>
                <span className="text-xl font-display text-gray-400 line-through">
                  ${Number(product.price) * 2}.00
                </span>
              </div>

              <p className="text-gray-500 leading-relaxed max-w-lg mb-10 text-[15px]">
                {product.discription ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}
              </p>

              <div className="space-y-8">
                {/* Color Selection */}
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black mb-4 flex items-center gap-2">
                    Color :{" "}
                    <span className="text-gray-400 font-medium">BROWN</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    {colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${idx === 0 ? "border-black p-0.5" : "border-transparent hover:scale-110"}`}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex items-center justify-between max-w-sm mb-4">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">
                      Size :{" "}
                      <span className="text-gray-400 font-medium">
                        {selectedSize}
                      </span>
                    </h3>
                    <button className="text-[10px] font-bold tracking-[0.1em] uppercase underline underline-offset-4 hover:text-gray-500 transition-colors">
                      View Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[56px] h-12 flex items-center justify-center text-[11px] font-bold tracking-widest border transition-all duration-300
                          ${selectedSize === size ? "bg-[#FFB800] border-[#FFB800] text-black" : "border-gray-200 hover:border-black"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-red-500 flex items-center gap-1">
                    <i className="fa-solid fa-xmark" /> Clear
                  </span>
                  <span className="text-[#3ACC8A] flex items-center gap-1 font-bold">
                    <i className="fa-solid fa-check" /> In Stock
                  </span>
                </div>

                {/* Purchase Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center h-14 border border-gray-200">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 flex items-center justify-center hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-minus text-[10px]" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 flex items-center justify-center hover:bg-gray-50"
                    >
                      <i className="fa-solid fa-plus text-[10px]" />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex-1 h-14 bg-[#1A1A1A] text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-all duration-300"
                  >
                    Add to Cart
                  </button>

                  <button className="flex-1 h-14 bg-[#FFB800] text-black text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300">
                    Buy Now
                  </button>

                  <button className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:border-black hover:text-red-500 transition-all duration-300">
                    <i className="fa-regular fa-heart text-xl" />
                  </button>
                </div>

                {/* Metadata */}
                <div className="pt-10 space-y-3 text-[11px] uppercase tracking-widest text-[#404040]">
                  <p>
                    <span className="font-bold text-black border-r border-gray-200 pr-3 mr-3">
                      SKU
                    </span>{" "}
                    GHFT9524Saaa
                  </p>
                  <p>
                    <span className="font-bold text-black border-r border-gray-200 pr-3 mr-3">
                      Tags
                    </span>{" "}
                    Women, Coat, Fashion, Jacket
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="font-bold text-black border-r border-gray-200 pr-3 mr-3">
                      Share
                    </span>
                    <div className="flex gap-4 text-gray-400">
                      <i className="fa-brands fa-facebook-f cursor-pointer hover:text-black" />
                      <i className="fa-brands fa-pinterest-p cursor-pointer hover:text-black" />
                      <i className="fa-brands fa-linkedin-in cursor-pointer hover:text-black" />
                      <i className="fa-brands fa-twitter cursor-pointer hover:text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <div className="mt-32">
          <div className="flex justify-center border-b border-gray-100 gap-16">
            {["Description", "Additional Information", "Review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-sm font-bold tracking-widest uppercase transition-all duration-300 relative
                  ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-16">
            <AnimatePresence mode="wait">
              {activeTab === "Review" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row gap-16 mb-20">
                    <div className="text-center md:text-left">
                      <div className="text-5xl font-display font-bold mb-4">
                        4.8{" "}
                        <span className="text-xl text-gray-300 font-normal">
                          out of 5
                        </span>
                      </div>
                      <div className="flex justify-center md:justify-start items-center gap-1 text-[#FFB800] text-sm mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        (107 Reviews)
                      </p>
                    </div>

                    <div className="flex-1 space-y-3">
                      {[
                        { star: 5, perc: 90 },
                        { star: 4, perc: 60 },
                        { star: 3, perc: 30 },
                        { star: 2, perc: 10 },
                        { star: 1, perc: 5 },
                      ].map((item) => (
                        <div
                          key={item.star}
                          className="flex items-center gap-4 group"
                        >
                          <span className="text-[10px] font-bold w-12">
                            {item.star} Star
                          </span>
                          <div className="flex-1 h-1.5 bg-gray-100 relative">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.perc}%` }}
                              className="absolute inset-0 bg-[#FFB800]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-16">
                    <div className="flex justify-between items-end mb-12">
                      <div>
                        <h3 className="text-xl font-display font-medium mb-2">
                          Review List
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          Showing 1-4 of 24 results
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                        <span>Sort by : </span>
                        <select className="bg-transparent border-none outline-none cursor-pointer">
                          <option>Newest</option>
                          <option>Oldest</option>
                          <option>Highest Rating</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-16">
                      {[
                        {
                          name: "Kristin Watson",
                          date: "1 month ago",
                          rating: 5,
                          title: "Love it! My Recent Clothing Purchase",
                          content:
                            "I recently picked up some new clothes and I have to say, I'm loving them! From the fit to the fabric, everything about these pieces is just perfect. They're comfortable, stylish, and exactly what I was looking for.",
                          imgs: [
                            "/models/10.avif",
                            "/models/11.avif",
                            "/models/12.avif",
                          ],
                        },
                        {
                          name: "Bessie Cooper",
                          date: "2 month ago",
                          rating: 5,
                          title: "Excellent Product, I like it!",
                          content:
                            "I recently treated myself to some new clothes, and I couldn't be happier with my purchase! The fit is spot-on, and the fabric feels amazing against my skin. These pieces are not only comfortable but incredibly stylish as well.",
                          imgs: [],
                        },
                      ].map((review, i) => (
                        <div key={i} className="animate-fade-in">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-bold text-gray-400">
                                {review.name[0]}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold tracking-tight">
                                  {review.name}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                  (Verified)
                                </p>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              {review.date}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold mb-4">
                            {review.title}
                          </h5>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {review.content}
                          </p>
                          <div className="flex items-center gap-1 text-[#FFB800] text-[10px] mb-8">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <i key={s} className="fa-solid fa-star" />
                            ))}
                            <span className="text-black font-bold ml-2">
                              5.0
                            </span>
                          </div>
                          {review.imgs.length > 0 && (
                            <div className="flex gap-4">
                              {review.imgs.map((img, idx) => (
                                <div
                                  key={idx}
                                  className="w-24 aspect-[3/4] overflow-hidden bg-gray-50"
                                >
                                  <img
                                    src={img}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    alt="Review img"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Modern Footer Placeholder */}
      <footer className="bg-white border-t border-gray-100 py-12 text-center">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">
            &copy; 2026 Trendzy Collective. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ProductDetail;
