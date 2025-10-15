import React from "react";
import { motion } from "framer-motion";

const WelcomeDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          You’ve successfully logged in! Explore your stats, manage your
          settings, and enjoy your personalized experience.
        </p>

        <button
          onClick={() => alert("Let’s go!")}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeDashboard;
