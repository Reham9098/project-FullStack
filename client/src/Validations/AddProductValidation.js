import * as yup from "yup"; 

export const addProductSchemaValidation = yup.object().shape({
  productCode: yup.string().required("Product code is required"),
  productName: yup.string().required("Product name is required"),
  productPrice: yup
    .number()
    .typeError("Product price must be a number")
    .required("Product price is required"),
  productQuantity: yup
    .number()
    .integer("Product quantity must be an integer")
    .typeError("Product quantity must be a number")
    .required("Product quantity is required"),
  productDiscribtion: yup.string().required("Product description is required").max(200),
  productImage: yup.string().url("Must be a valid URL").required("Product image URL is required"),
  productCategory: yup.string().required("Product category is required"),
});
