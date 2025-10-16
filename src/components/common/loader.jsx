// src/components/common/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = ({ text = "Loading...", fullScreen = false }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <motion.div
        className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-sm text-gray-600 font-medium">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
