import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../../../endpoint/postCall";
import { Route } from "../../../routes/path";
import { toast } from "react-toastify";
import { useOTP } from "../../../context/otpContext";
// ✅ Validation schema
const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const OtpVerification = () => {
  const { assignOtpToken } = useOTP();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: "" },
  });

  // 🔢 Handle input change (auto focus next)
  const handleOtpChange = (index, value) => {
    const currentOtp = getValues("otp").split("");
    currentOtp[index] = value.slice(-1);
    const newOtp = currentOtp.join("");
    setValue("otp", newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // 🧭 Handle backspace (move to previous input)
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 🚀 Submit handler
  const onSubmit = async (data) => {
    console.log("Entered OTP:", data.otp);
    const res = await verifyOTP(data);
    assignOtpToken(res.data);
    console.log(res);
    console.log(assignOtpToken);
    toast.success("OTP verified successfully!", {
      theme: "colored",
      position: "bottom-left",
    });
    navigate(Route.RESET_PASSWORD);
    // Example: await axios.post("/api/auth/verify-otp", data);
    //alert("OTP verified successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className="flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center border text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          />

          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="mt-4 text-sm text-gray-600">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => alert("OTP resent!")}
              className="text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
