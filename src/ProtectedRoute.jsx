import { useEffect, useState } from "react";
import axios from "./axios.jsx";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }) {
  const [isLogined, setIsLogined] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await axios.get("/", { withCredentials: true });
        setIsLogined(res.data.is);
        setRole(res.data.role);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLogined(false);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader">
          <p className="loader-text">loading</p>
          <span className="load"></span>
        </div>
      </div>
    );
  }

  if (isLogined === true) {
    if (role === "user") {
      return children;
    } else if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return <Navigate to="/unknown" replace />;
}


export default ProtectedRoute;
