import React from "react";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col from-gray-50 to-gray-100 bg-gradient-to-br">
      <Navbar />
      <main className="flex-1 flex justify-center items-center p-6 pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
