import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import showNotification from "../../../../notification.mjs";
import { serialize } from "object-to-formdata";

function Body() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCtegory] = useState([]);
  const [update, setUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const openEditModal = (proID) => {
    setEditingProductId(proID);
    setShowEditModal(true);
  };

  const closeEditModel = () => {
    setShowEditModal(false);
    setEditingProductId(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      axios
        .get("/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchAllCategories = () => {
      axios
        .get("/category")
        .then((res) => {
          setAllCtegory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchAllCategories();
    fetchProducts();
  }, [update]);

  useEffect(() => {
    if (category) {
      axios.get(`/products/${category}`).then((res) => {
        setProducts(res.data);
      });
    } else {
      setUpdate((prev) => prev + 1);
    }
  }, [category]);

  const schemaAddProduct = yup.object().shape({
    discription: yup.string().required("Description is required"),
    name: yup.string().required("Name is required"),
    price: yup.number().typeError("Price must be a number").required("Price is required").min(0),
    category_id: yup.string().required("Category is required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File too large (max 5MB)", (value) => {
        return value && value[0] && value[0].size <= 5242880;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaAddProduct),
  });

  const addProduct = async (data) => {
    setIsLoading(true);
    const fixedData = { ...data, image: data.image[0] };
    const formData = serialize(fixedData);

    try {
      const res = await axios.post("/admin/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      showNotification(res.data.message);
      setUpdate((prev) => prev + 1);
      reset();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await axios.delete(`/admin/products/delete/${id}`);
      showNotification(res.data.message);
      setUpdate((prev) => prev + 1);
    }
  };

  const schemaEditProduct = yup.object().shape({
    _id: yup.string(),
    name: yup.string(),
    price: yup.number().typeError("Price must be a number"),
    category_id: yup.string(),
    image: yup.mixed(),
  });

  const {
    register: registerEditPro,
    handleSubmit: handleSubmitEditPro,
    formState: { errors: err },
  } = useForm({
    resolver: yupResolver(schemaEditProduct),
  });

  const editProduct = (data) => {
    setIsLoading(true);
    data._id = editingProductId;
    const fixedData = { ...data, image: data.image[0] };
    const formData = serialize(fixedData);

    axios.put("admin/products/update", formData).then((res) => {
      setIsLoading(false);
      showNotification(res.data.message);
      closeEditModel();
      setUpdate((prev) => prev + 1);
    });
  };

  const showSearchResult = (value) => {
    axios
      .post(`/products/search?name=${value}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="loader">
            <p className="loader-text">Processing</p>
            <span className="load"></span>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto p-6 lg:p-12 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <span
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              Management
            </span>
            <h2
              className="text-3xl lg:text-5xl font-semibold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              Inventory <span className="italic">Curating</span>
            </h2>
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-96">
            <div
              className="flex items-center gap-3 px-6 py-3"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass text-xs"
                style={{ color: "var(--color-text-muted)" }}
              ></i>
              <input
                type="text"
                onChange={(e) => showSearchResult(e.target.value)}
                placeholder="Search inventory..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Form Column */}
          <div className="lg:col-span-1">
            <div
              className="p-8 sticky top-24"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h3
                className="text-lg font-semibold tracking-wide mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                Create New Piece
              </h3>

              <form onSubmit={handleSubmit(addProduct)} className="space-y-6">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                    Product Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                    style={{ borderBottomColor: "var(--color-border)" }}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 mt-1 uppercase tracking-wider">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                    Category
                  </label>
                  <select
                    {...register("category_id")}
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm cursor-pointer"
                    style={{ borderBottomColor: "var(--color-border)" }}
                  >
                    <option value="">Select Category</option>
                    {allCategory.map((cat, i) => (
                      <option key={i} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                      Price ($)
                    </label>
                    <input
                      {...register("price")}
                      type="number"
                      step="0.01"
                      className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                      style={{ borderBottomColor: "var(--color-border)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                      Image
                    </label>
                    <input
                      {...register("image")}
                      type="file"
                      className="w-full text-[10px] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                    Description
                  </label>
                  <textarea
                    {...register("discription")}
                    rows="3"
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm resize-none"
                    style={{ borderBottomColor: "var(--color-border)" }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 mt-4"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-inverse)",
                  }}
                >
                  Confirm Addition
                </button>
              </form>
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-2">
            <div
              className="overflow-hidden"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <table className="w-full text-left">
                <thead>
                  <tr
                    className="text-[10px] font-semibold tracking-widest uppercase text-gray-400"
                    style={{ borderBottom: "1px solid var(--color-border-light)" }}
                  >
                    <th className="px-8 py-6">Product Information</th>
                    <th className="px-6 py-6">Category</th>
                    <th className="px-6 py-6">Price</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((pro, i) => (
                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div
                            className="w-16 h-20 flex-shrink-0 overflow-hidden"
                            style={{ backgroundColor: "var(--gray-100)" }}
                          >
                            <img
                              src={pro.url}
                              alt=""
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm font-medium tracking-wide mb-1"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {pro.name}
                            </p>
                            <p
                              className="text-[11px] text-gray-400 line-clamp-1 max-w-[200px]"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              {pro.discription}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 bg-gray-100"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {pro.category_id}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          ${pro.price}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right space-x-4">
                        <button
                          onClick={() => openEditModal(pro._id)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <i className="fa-solid fa-pen-to-square text-sm"></i>
                        </button>
                        <button
                          onClick={() => deleteProduct(pro._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <i className="fa-solid fa-trash-can text-sm"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeEditModel} />
          <div
            className="relative w-full max-w-lg p-10 animate-scale-in"
            style={{ backgroundColor: "var(--color-secondary)" }}
          >
            <h3
              className="text-2xl font-semibold tracking-tight mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Edit Piece
            </h3>

            <form onSubmit={handleSubmitEditPro(editProduct)} className="space-y-6">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                  Name
                </label>
                <input
                  {...registerEditPro("name")}
                  type="text"
                  className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                  style={{ borderBottomColor: "var(--color-border)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                    Price ($)
                  </label>
                  <input
                    {...registerEditPro("price")}
                    type="number"
                    step="0.01"
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm"
                    style={{ borderBottomColor: "var(--color-border)" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                    Category
                  </label>
                  <select
                    {...registerEditPro("category_id")}
                    className="w-full px-0 py-3 bg-transparent border-b outline-none text-sm cursor-pointer"
                    style={{ borderBottomColor: "var(--color-border)" }}
                  >
                    <option value="">Select Category</option>
                    {allCategory.map((cat, i) => (
                      <option key={i} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                  New Image (Optional)
                </label>
                <input
                  {...registerEditPro("image")}
                  type="file"
                  className="w-full text-[10px] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:font-semibold file:bg-black file:text-white"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeEditModel}
                  className="flex-1 py-4 text-[11px] font-bold tracking-widest uppercase border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 text-[11px] font-bold tracking-widest uppercase bg-black text-white hover:bg-gray-800 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Body;
