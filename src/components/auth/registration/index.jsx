import React from "react";
import SignupForm from "./SignupForm";
import { Route } from "../../../routes/path";
import { Signup as SignupCall } from "../../../endpoint/postCall";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import H2 from "../../common/H2";
const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async (data) => {
    console.log("Form Submitted ✅", data);
    try {
      const { confirmPassword, ...safeData } = data;
      const response = await SignupCall(safeData);
      console.log("Signup successful:", response);
      toast.success("Signup successful! Please login.", {
        theme: "colored",
        position: "bottom-left",
      });
      navigate(Route.LOGIN);
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
        position: "bottom-left",
      });
      console.error("Signup failed:", error);
    }
  };
  return (
    <>
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
