import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import validationSchema from "./validation";
import { RHFControl, FormProvider } from "../common/form";

const ProductForm = ({ onSubmit, isEdit = false, initialData = {} }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: validationSchema,
    defaultValues: { name: "", price: "", category: "" },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isEdit && initialData) {
      reset(initialData);
    }
  }, [isEdit, initialData, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RHFControl label="Name" placeholder="Name" name="name" />
      </div>
      <div>
        <RHFControl label="Price" placeholder="Price" name="price" />
      </div>
      <div>
        <RHFControl label="Category" placeholder="Category" name="category" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {isEdit ? "Update Product" : "Add Product"}
      </button>
    </FormProvider>
  );
};

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  initialData: PropTypes.object,
};

export default ProductForm;
