import { useEffect, useState } from "react";
import axios from "../../../axios";
import { useNavigate, Link } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const logOut = () => {
    const verify = confirm("Are you sure you want to log out?");
    if (verify) {
      axios.delete("/details/logout");
      navigate("/");
    }
  };

  useEffect(() => {
    axios.get("/details").then((res) => {
      const user = res.data.user;
      setName(user.username);
      setEmail(user.email);
      setIsLoading(false);
    });
  }, []);

  const handleSave = () => {
    alert("This feature will be available soon");
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--gray-50)" }}
    >
      {/* Header */}
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
                to="/"
                className="flex items-center justify-center w-10 h-10 transition-opacity duration-300 hover:opacity-60"
                style={{ color: "var(--color-text-primary)" }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
              <h1
                className="text-xl font-semibold tracking-widest"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                }}
              >
                TRENDZY
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <div
              className="w-24 h-24 flex items-center justify-center mb-6"
              style={{ backgroundColor: "var(--gray-200)" }}
            >
              <i
                className="fa-regular fa-user text-4xl"
                style={{ color: "var(--color-text-secondary)" }}
              ></i>
            </div>

            <h1
              className="text-3xl lg:text-4xl font-semibold tracking-tight mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary)",
              }}
            >
              My Profile
            </h1>
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
              }}
            >
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div
            className="p-8 lg:p-10 mb-8"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border-light)",
            }}
          >
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="loader">
                  <p className="loader-text">Loading</p>
                  <span className="load"></span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Username */}
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={name}
                    readOnly
                    className="w-full px-0 py-4 text-base outline-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-primary)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={email}
                    className="w-full px-0 py-4 text-base outline-none transition-all duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-primary)",
                      backgroundColor: "transparent",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottomColor = "var(--color-primary)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottomColor = "var(--color-border)";
                    }}
                  />
                </div>

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                  <button
                    className="text-sm font-medium transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }}
                  >
                    Change Password
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300"
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
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Orders Button */}
          <Link to="/orders">
            <button
              className="w-full flex items-center justify-center gap-3 py-5 text-sm font-medium tracking-widest uppercase transition-all duration-300 mb-6"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <i className="fa-solid fa-bag-shopping"></i>
              <span>View Orders</span>
            </button>
          </Link>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className="w-full flex items-center justify-center gap-3 py-4 text-sm font-medium tracking-wide transition-colors duration-300"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "transparent",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log Out</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Setting;
