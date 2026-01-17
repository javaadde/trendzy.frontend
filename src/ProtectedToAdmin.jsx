import { useEffect, useState } from "react";
import axios from "./axios.jsx";
import { Navigate } from "react-router-dom";

function ProtectedToAdmin({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/admin");
        if (res.status === 200 && res.data.isAdmin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetch();
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

  if (isAdmin === true) {
    return children;
  } else {
    return <Navigate to="/401" replace />;
  }
}

export default ProtectedToAdmin;
