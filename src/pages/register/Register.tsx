import { useFormik } from "formik";
import { useState } from "react";
import { UserAccount } from "../../model/UserAccount";
import userValidationSchema from "../../validation/userValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Nav,
  Spinner,
} from "react-bootstrap";
import FormInput from "../../components/FormInput";

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
                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  formik={formik}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  formik={formik}
                />

                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  formik={formik}
                  showPasswordToggle
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  formik={formik}
                  showPasswordToggle
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />

                <div className="d-flex gap-2">
                  <Button variant="outline-light" size="sm" type="submit">
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Save"
                    )}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
