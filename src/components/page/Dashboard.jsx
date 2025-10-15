import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import DashboardTable from "../product/listProduct";
import { smoothScrollTo } from "../../utils";
const WelcomeDashboard = () => {
  const location = useLocation();
  const tableRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  // Trigger scroll after animation completes
  const handleAnimationComplete = () => {
    if (location.state?.from === "productPage") {
      setShouldScroll(true);
    }
  };

  useEffect(() => {
    if (location.state?.from === "productPage" && tableRef.current) {
      const y =
        tableRef.current.getBoundingClientRect().top + window.scrollY - 50;
      smoothScrollTo(y, 1000); // 1000ms duration, adjust as needed
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 space-y-8 scroll-smooth">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={handleAnimationComplete}
        className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-2xl w-full border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          🎉 Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          You’ve successfully logged in! Explore your stats, manage your
          products, and enjoy your personalized experience.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="w-full max-w-6xl flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          📦 Product Overview
        </h2>
        <div className="h-[1px] flex-1 bg-gray-200 ml-4"></div>
      </div>

      {/* Dashboard Table Section */}
      <motion.div
        ref={tableRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-100 p-4"
      >
        <DashboardTable />
      </motion.div>
    </div>
  );
};

export default WelcomeDashboard;
