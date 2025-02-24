import * as Yup from "yup";

const debtValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Debt name must be at least 3 characters long.")
    .required("Debt name is required."),
  debtType: Yup.string().required("Debt type is required."),
  apr: Yup.number()
    .required("APR is required")
    .positive("APR must be a positive number"),
  balance: Yup.number()
    .required("Balance is required")
    .positive("Balance must be positive"),
  description: Yup.string(),
  cardType: Yup.string().when("debtType", {
    is: "CARD",
    then: (schema) => schema.required("Card Type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  terms: Yup.string().when("debtType", {
    is: "LOAN",
    then: (schema) => schema.required("Terms are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default debtValidationSchema;
