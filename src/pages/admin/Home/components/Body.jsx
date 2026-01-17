import { useEffect, useState } from "react";
import axios from "../../../../axios";
import { Link } from "react-router-dom";

function Body() {
  const [stateData, setStateData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin")
      .then((res) => {
        setStateData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: stateData.total_products || 0,
      icon: "fa-solid fa-box",
      color: "var(--gray-100)",
    },
    {
      label: "Total Orders",
      value: stateData.total_orders || 0,
      icon: "fa-solid fa-bag-shopping",
      color: "var(--gray-100)",
    },
    {
      label: "Registered Users",
      value: stateData.registered_users || 0,
      icon: "fa-solid fa-users",
      color: "var(--gray-100)",
    },
    {
      label: "Total Revenue",
      value: `$${stateData.total_revenew || 0}`,
      icon: "fa-solid fa-dollar-sign",
      color: "var(--gray-100)",
    },
  ];

  const menuItems = [
    {
      title: "Product Catalog",
      desc: "Manage your entire product inventory, including pricing, images, and descriptions.",
      link: "/admin/products",
      icon: "fa-solid fa-layer-group",
      action: "Manage Products",
    },
    {
      title: "Order Management",
      desc: "Track and process customer orders, monitor shipping statuses, and manage fulfillment.",
      link: "/admin/orders",
      icon: "fa-solid fa-truck-fast",
      action: "View Orders",
    },
    {
      title: "User Directory",
      desc: "Access the comprehensive user database to manage profiles, roles, and account status.",
      link: "/admin/users",
      icon: "fa-solid fa-user-gear",
      action: "Manage Users",
    },
    {
      title: "Navigation & Categories",
      desc: "Organize your store structure by managing product categories and collection layouts.",
      link: "/admin/categories",
      icon: "fa-solid fa-list",
      action: "See Categories",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="loader">
          <p className="loader-text">Loading</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-12 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-12">
        <span
          className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          Overview
        </span>
        <h2
          className="text-3xl lg:text-5xl font-semibold tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
          }}
        >
          Store <span className="italic">Performance</span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-8"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: stat.color }}
              >
                <i
                  className={`${stat.icon} text-sm`}
                  style={{ color: "var(--color-primary)" }}
                ></i>
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold tracking-widest uppercase mb-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {stat.label}
                </p>
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary)",
                  }}
                >
                  {stat.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Operations Title */}
      <div className="mb-8 flex items-center gap-4">
        <h3
          className="text-xs font-bold tracking-[0.4em] uppercase whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-primary)",
          }}
        >
          Quick Operations
        </h3>
        <div className="w-full h-px" style={{ backgroundColor: "var(--color-border-light)" }} />
      </div>

      {/* Main Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className="group p-8 transition-all duration-500"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border-light)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "var(--color-border-light)";
            }}
          >
            <div
              className={`w-14 h-14 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:-translate-y-1`}
              style={{ backgroundColor: "var(--gray-900)" }}
            >
              <i className={`${item.icon} text-lg text-white`}></i>
            </div>

            <h3
              className="text-xl font-semibold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              {item.title}
            </h3>

            <p
              className="text-sm leading-relaxed mb-8 h-12 line-clamp-2"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              {item.desc}
            </p>

            <Link to={item.link}>
              <button
                className="w-full py-4 text-[11px] font-bold tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text-inverse)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--gray-800)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-primary)";
                }}
              >
                {item.action}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] tracking-widest uppercase text-gray-400">
        <p>© 2025 Trendzy Systems v2.4.0</p>
        <p>Operational Status: Optimal</p>
      </div>
    </div>
  );
}

export default Body;
