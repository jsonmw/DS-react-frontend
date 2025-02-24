import { useState } from "react";
import { useFormik } from "formik";
import { AuthRequest } from "../../model/AuthRequest";
import loginValidationSchema from "../../validation/loginValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import {
  Form,
  Button,
  Container,
  Alert,
  Nav,
  Spinner,
} from "react-bootstrap";
import FormInput from "../../components/FormInput";

function Login() {
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<AuthRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (authRequest: AuthRequest) => {
      console.log("Attempting to login user:", authRequest.email);

      const success = await login(authRequest);
      if (success) {
        setTimeout(() => navigate("/"), 2000);
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4 col-sm-12 bg-dark p-4 rounded">
        {isLoading && <Alert variant="info">Loading...</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formik.handleSubmit}>
          <FormInput label="E-mail" name="email" type="email" formik={formik} />

          <FormInput
            label="Password"
            name="password"
            type="password"
            formik={formik}
            showPasswordToggle
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <div className="d-flex gap-2">
            <Button variant="outline-light" size="sm" type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Save"}
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              type="reset"
              onClick={formik.handleReset}
            >
              Clear
            </Button>
          </div>

          <p className="mt-3 text-center small text-white fst-italic">
            Already have an account? Click{" "}
            <Link to="/login" className="text-primary">
              here
            </Link>
          </p>
        </Form>

        <Nav.Link
          as={Link}
          to="/"
          className="btn btn-dark border border-light px-4 py-2 mt-3 mb-3"
        >
          Back
        </Nav.Link>
      </div>
    </Container>
  );
}

export default Login;
