import { createContext, useState, useContext } from "react";

const OTPContext = createContext();

export const OTPProvider = ({ children }) => {
  const [otpToken, setOtpToken] = useState(
    JSON.parse(localStorage.getItem("OTPToken")) || null
  );

  const assignOtpToken = (data) => {
    setOtpToken(data);
    localStorage.setItem("OTPToken", JSON.stringify(data));
  };

  const removeOtpToken = () => {
    setOtpToken(null);
    localStorage.removeItem("OTPToken");
  };

  return (
    <OTPContext.Provider value={{ otpToken, assignOtpToken, removeOtpToken }}>
      {children}
    </OTPContext.Provider>
  );
};

export const useOTP = () => useContext(OTPContext);
