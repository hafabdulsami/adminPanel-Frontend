import React from "react";
import ForgetPasswordForm from "./form";
import { sendOTP } from "../../../endpoint/postCall";
import { useNavigate } from "react-router-dom";
import { Route } from "../../../routes/path";
import { toast } from "react-toastify";
import H2 from "../../common/H2";
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
    <>
      <H2 data="Forgot Password" />
      <p className="text-gray-500 text-center mb-6 text-sm">
        Enter your registered email address and we’ll send you a password reset
        link.
      </p>
      <ForgetPasswordForm onSubmit={handleForgetPassword} />
    </>
  );
};

export default ForgetPassword;
