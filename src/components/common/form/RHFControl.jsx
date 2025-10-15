import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👈 lightweight icons

export const RHFControl = ({
  name,
  label,
  type = "text",
  endAddon,
  startAddon,
  iconOptions,
  selectedIcon,
  setSelectedIcon,
  ...rest
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          {label && (
            <label className="block text-gray-600 text-sm font-medium mb-1">
              {label}
            </label>
          )}

          <div className="relative flex mt-1 rounded-md shadow-sm">
            {startAddon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {startAddon}
              </div>
            )}

            {type === "textarea" ? (
              <textarea
                {...field}
                {...rest}
                className={`w-full border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  startAddon ? "pl-10" : ""
                } ${iconOptions ? "pr-20" : ""}`}
              />
            ) : (
              <input
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                {...field}
                {...rest}
                className={`w-full border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  startAddon ? "pl-10" : ""
                } ${type === "password" ? "pr-10" : ""}`}
              />
            )}

            {/* 👁️ Password eye toggle */}
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            )}

            {endAddon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {endAddon}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

RHFControl.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  endAddon: PropTypes.node,
  startAddon: PropTypes.node,
  selectedIcon: PropTypes.string,
  setSelectedIcon: PropTypes.func,
  iconOptions: PropTypes.arrayOf(PropTypes.string),
};
