import { useEffect, useState } from "react";
import axios from "../../../axios";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "./components/Pagination";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    const endpoint = status === "" ? "/admin/orders" : `/admin/orders/${status}`;

    axios
      .get(endpoint)
      .then((res) => {
        const data = status === "" ? res.data.data : res.data;
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [status]);

  const findByUsername = async () => {
    const user_id = document.getElementById("usernameSearch").value;
    if (!user_id) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`/admin/orders/user/${user_id}`);
      setOrders(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  function getStatusStyle(orderStatus) {
    const baseStyle = "text-[10px] font-semibold tracking-widest uppercase px-3 py-1 ";
    switch (orderStatus?.toLowerCase()) {
      case "delivered":
        return baseStyle + "bg-green-100 text-green-700";
      case "shipped":
        return baseStyle + "bg-blue-100 text-blue-700";
      case "processing":
        return baseStyle + "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return baseStyle + "bg-red-100 text-red-700";
      default:
        return baseStyle + "bg-gray-100 text-gray-700";
    }
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOrders = orders.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--gray-50)" }}>
      {/* Header Bar */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border-light)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link
                to="/admin"
                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--color-primary)" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <h1
                className="text-xl font-semibold tracking-tight uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Order Management
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-3 px-4 py-2"
                style={{
                  backgroundColor: "var(--gray-100)",
                  border: "1px solid var(--color-border-light)",
                }}
              >
                <i className="fa-solid fa-magnifying-glass text-[10px] text-gray-400"></i>
                <input
                  type="text"
                  id="usernameSearch"
                  placeholder="Search by User ID"
                  className="bg-transparent outline-none text-xs w-48"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  onClick={findByUsername}
                  className="text-[10px] font-bold tracking-widest uppercase hover:text-black transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Find
                </button>
              </div>

              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="px-4 py-2 text-[10px] font-bold tracking-widest uppercase outline-none cursor-pointer"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                }}
              >
                <option value="">All Statuses</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="mb-8">
          <span
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-2 block"
            style={{ color: "var(--color-text-muted)" }}
          >
            Records
          </span>
          <h2
            className="text-3xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Fulfillment <span className="italic text-gray-400">Tracking</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="loader">
              <p className="loader-text">Fetching</p>
              <span className="load"></span>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-sm italic"
              style={{ color: "var(--color-text-muted)" }}
            >
              No orders found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentOrders.map((order, i) => (
              <div
                key={i}
                onClick={() => navigate(`/admin/orders/${order._id}`)}
                className="p-8 transition-all duration-300 cursor-pointer group"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  border: "1px solid var(--color-border-light)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Order Meta */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3
                        className="text-sm font-semibold tracking-wide"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <span className={getStatusStyle(order.status)}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Placed By</p>
                        <p className="text-xs font-medium truncate max-w-[150px]">{order.user_id}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                        <p className="text-xs font-medium">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-16 border-2 border-white overflow-hidden shadow-sm"
                          style={{ backgroundColor: "var(--gray-100)" }}
                        >
                          <img
                            src={item.url}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            alt=""
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-16 border-2 border-white bg-gray-900 flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                      <p className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                        ${order.total}
                      </p>
                    </div>

                    <i className="fa-solid fa-chevron-right text-gray-300 transition-transform duration-300 group-hover:translate-x-1"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Pagination
            totalPosts={orders.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </main>
    </div>
  );
}

export default AdminOrders;
