import { FormikProps } from "formik";
import { Form } from "react-bootstrap";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  formik: FormikProps<any>;
  options?: string[]; // Optional for select dropdowns
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  formik,
  options,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>

    {options ? (
      // Render a dropdown if options are provided
      <Form.Select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={!!(formik.touched[name] && formik.errors[name])}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    ) : (
      // Default to an input field
      <Form.Control
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={!!(formik.touched[name] && formik.errors[name])}
      />
    )}

    <Form.Control.Feedback type="invalid">
      {typeof formik.errors[name] === "string" ? formik.errors[name] : ""}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormInput;
