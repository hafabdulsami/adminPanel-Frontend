import React from "react";
import { useAuth } from "../context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import Signup from "../components/auth/registration";
import ForgetPassword from "../components/auth/forgetpassword";
import { Route as path } from "../routes/path";
import OtpVerification from "../components/auth/otp/OtpVerification";
import ResetPassword from "../components/auth/resetpassword";
import Dashboard from "../components/page/Dashboard";
import NotFoundPage from "../components/page/NotFound";
import { useOTP } from "../context/otpContext";
import AuthLayout from "./authLayout";
const Layout = () => {
  const { user } = useAuth();
  const { otpToken } = useOTP();
  console.log(user?.user);
  return (
    <>
      <Routes>
        {user?.user && <Route path={path.DASHBOARD} element={<Dashboard />} />}
        <Route element={<AuthLayout />}>
          {otpToken && (
            <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          )}
          <Route path="/" element={<Login />} />
          <Route path={path.SIGNUP} element={<Signup />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgetPassword />} />
          <Route path={path.OTP} element={<OtpVerification />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Layout;
