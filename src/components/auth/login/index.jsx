import React from "react";
import LoginForm from "./loginForm";
import { Route } from "../../../routes/path";
import { login } from "../../../endpoint/postCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
export default function Login() {
  const obj = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    console.log("Form Submitted ✅", data);
    try {
      const response = await login(data);
      console.log("Login successful:", response);
      toast.success("Login successful:", {
        theme: "colored",
        position: "bottom-left",
      });
      obj.login(response.data);
      navigate(Route.DASHBOARD);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        position: "bottom-left",
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <LoginForm onSubmit={handleLogin} />
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href={Route.SIGNUP} className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
