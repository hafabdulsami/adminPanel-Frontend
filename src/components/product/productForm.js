import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { RHFControl, FormProvider } from "../common/form";

const ProductForm = ({ onSubmit }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: validationSchema,
    defaultValues: { name: "", price: "", category: "" },
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFControl label="Name" placeHolder="Name" name="name" />
      </div>
      <div>
        <RHFControl label="Price" placeHolder="Price" name="price" />
      </div>
      <div>
        <RHFControl label="Category" placeHolder="Category" name="category" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Add product
      </button>
    </FormProvider>
  );
};
ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ProductForm;
