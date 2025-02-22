import * as yup from "yup";

const userValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters long"),
    email: yup
        .string()
        .required("E-mail is required")
        .email("E-mail is not valid"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: yup
        .string()
        .required("Please confirm password")
        .oneOf([yup.ref("password")], "Password does not match"),
});

export default userValidationSchema;