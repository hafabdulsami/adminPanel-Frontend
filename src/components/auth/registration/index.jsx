import React, { useState } from "react";
import SignupForm from "./SignupForm";
import { Route } from "../../../routes/path";
import { Signup as SignupCall } from "../../../endpoint/postCall";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import H2 from "../../common/H2";
import Loader from "../../common/loader";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...safeData } = data;
      const response = await SignupCall(safeData);
      console.log("Signup successful:", response);
      toast.success("Signup successful! Please verify your email.", {
        theme: "colored",
        position: "bottom-left",
      });
      navigate(Route.OTP, { state: { from: "signup" } });
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        position: "bottom-left",
      });
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader fullScreen={true} text="Creating your account..." />}
      <H2 data="Welcome 👋" className="mb-6" />
      <SignupForm onSubmit={handleSignup} />
      <p className="text-center text-sm text-gray-600 mt-4">
        Do you have an account?{" "}
        <a href={Route.LOGIN} className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </>
  );
};

export default Signup;
