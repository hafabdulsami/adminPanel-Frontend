import React, { useState } from "react";
import LoginForm from "./loginForm";
import { Route } from "../../../routes/path";
import { login } from "../../../endpoint/postCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import H2 from "../../common/H2";
import Loader from "../../common/loader";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const obj = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    setLoading(true);
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
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <H2 data="Welcome Back 👋" className="mb-6" />
      <LoginForm onSubmit={handleLogin} />
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <a href={Route.SIGNUP} className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
}
