import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { RHFControl, FormProvider } from "../../common/form";

const ForgetPasswordForm = ({ onSubmit }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: validationSchema,
    defaultValues: { email: "" },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFControl label="Email" placeHolder="Email" name="email" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Send OTP
      </button>
    </FormProvider>
  );
};
ForgetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ForgetPasswordForm;
