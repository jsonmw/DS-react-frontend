import { FormikProps } from "formik";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  formik: FormikProps<any>;
  options?: string[];
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  loanTermUnitOptions?: string[]; // Special case for loan terms
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  formik,
  options,
  showPasswordToggle,
  showPassword,
  setShowPassword,
  loanTermUnitOptions,
}) => {
  // Extract loan term value and unit separately to ensure consistent formatting
  const isLoanTerm = name === "loanTerms";
  const termValue = isLoanTerm
    ? String(formik.values[name] || "").split(" ")[0] || ""
    : "";
  const termUnit = isLoanTerm
    ? String(formik.values[name] || "").split(" ")[1] || "months"
    : "months";

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      {isLoanTerm ? (
        // Loan Term: numeric input + dropdown handler
        <InputGroup>
          <Form.Control
            type="number"
            name={`${name}-value`}
            value={termValue}
            onChange={(e) =>
              formik.setFieldValue(name, `${e.target.value} ${termUnit}`)
            }
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched[name] && formik.errors[name])}
          />
          <Form.Select
            name={`${name}-unit`}
            value={termUnit}
            onChange={(e) =>
              formik.setFieldValue(name, `${termValue} ${e.target.value}`)
            }
            onBlur={formik.handleBlur}
          >
            {loanTermUnitOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      ) : options ? (
        // Drop down list
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
      ) : showPasswordToggle && setShowPassword ? (
        // Password / confirm passwords with hide/show button
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.touched[name] && formik.errors[name])}
          />
          <Button
            variant="outline-light"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {typeof formik.errors[name] === "string" ? formik.errors[name] : ""}
          </Form.Control.Feedback>
        </InputGroup>
      ) : (
        // All other inputs
        <Form.Control
          type={type}
          name={name}
          placeholder={`Enter ${label.toLowerCase()}`}
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
};

export default FormInput;
