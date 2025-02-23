import { useFormik } from "formik";
import { useState } from "react";
import { UserAccount } from "../../model/UserAccount";
import userValidationSchema from "../../validation/userValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { Container, Form, Button, Card, Alert, Row, Col, InputGroup, Nav } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Register = () => {
  const { error, isLoading, register, toast } = useRegister();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<UserAccount>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: async (userAccount: UserAccount, { resetForm }) => {
      console.log(
        `Account creation attempted for ${userAccount.name} -> ${userAccount.email}`
      );

      const success: boolean = await register(userAccount);

      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

      resetForm();
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card bg="dark" text="white" className="p-4">
            <Card.Body>
              {isLoading && <Alert variant="info">Loading...</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              {toast && <Alert variant="primary">{toast}</Alert>}

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.name && formik.errors.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
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
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!(formik.touched.password && formik.errors.password)}
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

                {/* Confirm Password Field with Toggle */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    />
                    <Button
                      variant="outline-light"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="outline-light" size="sm" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Register"}
                  </Button>
                  <Button variant="outline-light" size="sm" type="reset" onClick={formik.handleReset}>
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

              <Nav.Link as={Link} to="/" className="btn btn-dark border border-light px-4 py-2 mt-3 mb-3">
                Back
              </Nav.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
