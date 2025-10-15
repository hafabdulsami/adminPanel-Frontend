import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  DollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import DashboardTable from "../product/listProduct";
import { useAuth } from "../../context/AuthContext";
import { getDashboardData } from "../../endpoint/getCall";
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboardData ? dashboardData.userCount : "Loading...",
      icon: <Users size={26} />,
      color: "bg-blue-500",
      change: "+4.2%",
    },
    {
      title: "Total Products",
      value: dashboardData ? dashboardData.productCount : "Loading...",
      icon: <Package size={26} />,
      color: "bg-indigo-500",
      change: "+6.5%",
    },
    {
      title: "Monthly Revenue",
      value: "$15,430",
      icon: <DollarSign size={26} />,
      color: "bg-green-500",
      change: "+12.1%",
    },
  ];

  const activities = [
    { text: "New user registered", time: "2 mins ago" },
    { text: "Product 'Vanar NFT Pack' added", time: "10 mins ago" },
    { text: "Product price updated", time: "30 mins ago" },
    { text: "Admin updated dashboard settings", time: "1 hr ago" },
  ];
  const { user } = useAuth();
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getDashboardData(user.token);
        setDashboardData(res.data);
        console.log("Dashboard data:", res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [user.token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col gap-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-extrabold text-gray-800">
          🧭 Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">Welcome back, {user.user.name}!</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {item.title}
              </p>
              <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>
              <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                <ArrowUpRight size={14} /> {item.change}
              </p>
            </div>
            <div
              className={`${item.color} text-white p-3 rounded-xl shadow-md`}
            >
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lower Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              🛍️ Recent Products
            </h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          {/* Reuse your existing product table here */}
          <DashboardTable />
        </motion.div>

        {/* Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" /> Recent Activity
          </h2>

          <div className="space-y-4">
            {activities.map((act, i) => (
              <div
                key={i}
                className="flex justify-between items-start bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                <p className="text-gray-700 text-sm font-medium">{act.text}</p>
                <p className="text-xs text-gray-500">{act.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
