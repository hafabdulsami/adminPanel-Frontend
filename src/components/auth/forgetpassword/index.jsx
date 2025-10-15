import React from "react";
import ForgetPasswordForm from "./form";
import { sendOTP } from "../../../endpoint/postCall";
import { useNavigate } from "react-router-dom";
import { Route } from "../../../routes/path";
import { toast } from "react-toastify";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const handleForgetPassword = async (data) => {
    console.log("Forget Password Data:", data);
    try {
      const response = await sendOTP(data);
      toast.success("OTP sent successfully! Please check your email.", {
        theme: "colored",
        position: "bottom-left",
      });
      navigate(Route.OTP);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        position: "bottom-left",
      });
      alert(error.response.data.message);
      console.error("Error sending OTP:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        <ForgetPasswordForm onSubmit={handleForgetPassword} />
      </div>
    </div>
  );
};

export default ForgetPassword;
