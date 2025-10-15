import React from "react";
import ResetPasswordForm from "./form";
import { resetPassword } from "../../../endpoint/postCall";
import { useNavigate } from "react-router-dom";
import { Route } from "../../../routes/path";
import { useOTP } from "../../../context/otpContext";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { otpToken, removeOtpToken } = useOTP();
  const handleResetPassword = async (data) => {
    console.log(otpToken);
    const token = otpToken?.token; // Get the token from your auth context or state
    const { confirmPassword, ...safeData } = data;
    try {
      console.log("Reset Password Data:", safeData, token);
      const response = await resetPassword(safeData, "Bearer " + token);
      console.log("Password reset successful:", response);
      toast.success("Password reset successful! Please login.", {
        theme: "colored",
        position: "bottom-left",
      });
      removeOtpToken();
      navigate(Route.LOGIN);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        position: "bottom-left",
      });
      console.error("Password reset failed:", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below
        </p>
        <ResetPasswordForm onSubmit={handleResetPassword} />
      </div>
    </div>
  );
};

export default ResetPassword;
