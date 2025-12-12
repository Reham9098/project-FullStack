import * as yup from "yup";

export const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.number().required("Phone number is required"),
  address: yup.string().required("Delivery address is required"),
  cardName: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Cardholder name is required"),
  }),
  cardNumber: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Card number is required"),
  }),
  expiryDate: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Expiry date is required"),
  }),
  cvv: yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("CVV is required"),
  }),
});
