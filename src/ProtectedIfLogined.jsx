import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from './axios';

export const ProtectedIfLogined = ({ children }) => {
  const [isLogined, setIsLogined] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await axios.get("/", { withCredentials: true });
        setIsLogined(res.data.is);
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

  if (isLogined) {
    return <Navigate to="/" replace />;
  }

  return children;
};
