import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Valid e-mail is required")
    .email("Valid e-mail is required"),
  password: yup
    .string()
    .required("Password is required")
});

export default loginValidationSchema;