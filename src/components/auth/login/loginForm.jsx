import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { RHFControl, FormProvider } from "../../common/form";
import { Route } from "../../../routes/path";
const LoginForm = ({ onSubmit }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: validationSchema,
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFControl label="Email" placeHolder="Email" name="email" />
      </div>

      <div>
        <RHFControl
          label="Password"
          placeHolder="Password"
          name="password"
          type="password"
        />
      </div>

      <div className="text-right">
        <a
          href={Route.FORGOT_PASSWORD}
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Login
      </button>
    </FormProvider>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
