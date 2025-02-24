import { FormikProps } from "formik";
import { Form } from "react-bootstrap";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    formik: FormikProps<any>;
  }

const FormInput: React.FC<FormInputProps>  = ({ label, name, type = "text", formik }: any) => (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={!!(formik.touched[name] && formik.errors[name])}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  export default FormInput;