import React from "react";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { RHFControl, FormProvider } from "../../common/form";
import PropTypes from "prop-types";

const ResetPasswordForm = ({ onSubmit }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: validationSchema,
    defaultValues: { password: "", confirmPassword: "" },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFControl
          label="New Password"
          placeHolder="New Password"
          name="password"
        />
      </div>
      <div className="mb-6">
        <RHFControl
          label="Confirm Password"
          placeHolder="Re-enter new password"
          name="confirmPassword"
          type="password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Reset Password
      </button>
    </FormProvider>
  );
};
ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
