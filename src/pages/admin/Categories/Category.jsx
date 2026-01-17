import axios from "../../../axios";
import { useState, useEffect } from "react";
import showNotification from "../../../notification.mjs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

function Category() {
  const [allCategory, setAllCtegory] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/category")
      .then((res) => {
        setAllCtegory(res.data);
      })
      .catch((err) => console.log(err));

    const productEndpoint = category === "" ? "/products" : `/products/${category}`;
    axios
      .get(productEndpoint)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [category, update]);

  const deleteCategory = (id) => {
    if (confirm("Executing this action will remove the category and all associated products. Proceed?")) {
      axios
        .delete(`/admin/category/delete/${id}`)
        .then((res) => {
          showNotification(res.data.message);
          setUpdate((prev) => prev + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const schema = yup.object().shape({
    name: yup.string().required("Category name is required"),
    discription: yup.string(),
    url: yup.string().required("Preview image URL is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createCategory = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/admin/category/add", data);
      showNotification(res.data.message);
      setUpdate((prev) => prev + 1);
      reset();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 py-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border-light)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <h1
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Category Architecture
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form & List */}
          <div className="space-y-12">
            {/* Create Form */}
            <div
              className="p-10"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h2
                className="text-2xl font-semibold tracking-tight mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Initialize <span className="italic">Category</span>
              </h2>

              <form onSubmit={handleSubmit(createCategory)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                      Category Name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                      style={{ borderBottomColor: "var(--color-border)" }}
                      placeholder="e.g. Winter Essentials"
                    />
                    {errors.name && (
                      <p className="text-[10px] text-red-500 mt-1 uppercase">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                      Short Description
                    </label>
                    <input
                      {...register("discription")}
                      className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                      style={{ borderBottomColor: "var(--color-border)" }}
                      placeholder="e.g. Curated silhouettes"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                    Representative Image URL
                  </label>
                  <input
                    {...register("url")}
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                    style={{ borderBottomColor: "var(--color-border)" }}
                    placeholder="https://images.unsplash.com/..."
                  />
                  {errors.url && (
                    <p className="text-[10px] text-red-500 mt-1 uppercase">{errors.url.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-inverse)",
                  }}
                >
                  Create Category
                </button>
              </form>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allCategory.map((cat, i) => (
                <div
                  key={i}
                  className="group relative h-48 overflow-hidden"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={cat.url}
                      className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                    <h3
                      className="text-xl font-semibold text-white tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.name}
                    </h3>
                    <div className="flex gap-4 mt-3 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="text-[10px] font-bold tracking-widest uppercase text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                      <button className="text-[10px] font-bold tracking-widest uppercase text-white hover:text-gray-300">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Products Preview */}
          <div
            className="p-10"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            <div className="flex items-center justify-between mb-10">
              <h2
                className="text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                In-Category <span className="italic">Inventory</span>
              </h2>

              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase border border-gray-200 outline-none cursor-pointer"
              >
                <option value="">All Category</option>
                {allCategory.map((cat, i) => (
                  <option key={i} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {products.length === 0 ? (
                <p className="text-sm text-gray-400 italic text-center py-20">No products in this sector.</p>
              ) : (
                products.map((pro, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 p-4 border border-gray-50 bg-white"
                  >
                    <div className="w-16 h-20 flex-shrink-0 bg-gray-50 overflow-hidden">
                      <img src={pro.url} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium tracking-wide">{pro.name}</p>
                      <p className="text-[11px] text-gray-400">${pro.price}</p>
                    </div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-gray-300 px-3 py-1 bg-gray-50">
                      Product
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Category;
