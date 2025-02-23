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
  InputGroup,
  Nav,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

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
          {/* Email Field */}
          <Form.Group className="mb-3">
            <Form.Label className="text-white">E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your e-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.email && formik.errors.email)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Field with Toggle */}
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  !!(formik.touched.password && formik.errors.password)
                }
              />
              <Button
                variant="outline-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <Button
              variant="outline-light"
              size="sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
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

          {/* Links */}
          <p className="mt-3 text-center small text-white fst-italic">
            Already have an account? Click{" "}
            <Link to="/login" className="text-primary">
              here
            </Link>
          </p>
        </Form>
        <Nav.Link as={Link} to="/" className="btn btn-dark border border-light px-4 py-2 mt-3 mb-3">
          Back
        </Nav.Link>
      </div>
    </Container>
  );
}

export default Login;
