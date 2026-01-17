import Pro from "./pro";
import axios from "../../../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Main() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCtegory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      axios
        .get("/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    const fetchAllCategories = () => {
      axios
        .get("/category")
        .then((res) => {
          setAllCtegory(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchProducts();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (!category) {
      axios.get("/products").then((res) => setProducts(res.data));
      return;
    }
    setIsLoading(true);
    axios.get(`/products/${category}`).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  }, [category]);

  const showSearchResult = (value) => {
    setSearchQuery(value);
    axios
      .post(`/products/search?name=${value}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Luxury Search Header */}
      <header
        className="sticky top-0 z-50 py-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border-light)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 gap-8">
            <Link to="/" className="flex-shrink-0 group">
              <h1
                className="text-xl lg:text-2xl font-semibold tracking-[0.2em]"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)" }}
              >
                TRENDZY
              </h1>
            </Link>

            <div className="flex-1 max-w-2xl relative group">
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <i className="fa-solid fa-magnifying-glass text-[10px] text-gray-400 group-focus-within:text-black transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => showSearchResult(e.target.value)}
                placeholder="DISCOVER PIECES..."
                className="w-full pl-8 pr-12 py-3 bg-transparent border-b outline-none text-[11px] font-bold tracking-widest uppercase transition-all duration-500 transition-colors"
                style={{
                  borderBottomColor: "var(--color-border)",
                  fontFamily: "var(--font-body)",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "black")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--color-border)")}
              />
              {searchQuery && (
                <button
                  onClick={() => showSearchResult("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-10">
              <Link to="/cart" className="relative group">
                <i className="fa-solid fa-bag-shopping text-lg" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center font-bold">
                  !
                </span>
              </Link>
              <Link to="/settings">
                <i className="fa-regular fa-user text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h2
                className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10 text-gray-400"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Refine by Sector
              </h2>
              <div className="flex flex-col gap-6">
                <button
                  onClick={() => setCategory("")}
                  className={`text-left text-xs font-bold tracking-widest uppercase transition-all duration-300 ${!category ? "text-black pl-4 border-l-2 border-black" : "text-gray-400 hover:text-black"
                    }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  All Collections
                </button>
                {allCategory.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setCategory(cat.name)}
                    className={`text-left text-xs font-bold tracking-widest uppercase transition-all duration-300 ${category === cat.name
                        ? "text-black pl-4 border-l-2 border-black"
                        : "text-gray-400 hover:text-black"
                      }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Editorial Note */}
              <div className="mt-20 pt-10 border-t border-gray-100">
                <p className="text-[10px] italic leading-relaxed text-gray-400 font-serif">
                  "Curating the finest silhouettes for the modern individual. Our collections are defined by a commitment to timeless elegance and superior craftsmanship."
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-12">
              <h2
                className="text-3xl lg:text-5xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {category || "The Archive"}
              </h2>
              <p
                className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {products.length} Designs
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <div className="loader">
                  <p className="loader-text">Loading</p>
                  <span className="load"></span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((pro, i) => (
                  <Pro
                    key={i}
                    name={pro.name}
                    url={pro.url}
                    price={pro.price}
                    category={pro.category_id}
                    proId={pro._id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
