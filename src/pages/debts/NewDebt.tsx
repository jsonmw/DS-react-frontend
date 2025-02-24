import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Debt } from "../../model/Debt";
import { getDebtByDebtId, saveOrUpdateDebt } from "../../services/debt-service";
import { useFormik } from "formik";
import debtValidationSchema from "../../validation/debtValidationSchema";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Alert,
  Button,
  Nav,
} from "react-bootstrap";
import { debtTypes } from "../../utils/Constants";

const NewDebt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<Debt>({
    name: "",
    debtType: "",
    apr: 0,
    balance: 0,
    description: "",
  });

  // Check if a debt ID was passed and populate fields with existing data if so
  useEffect(() => {
    if (!id) return;

      setLoader(true);
      const debtId = parseInt(id);

      getDebtByDebtId(debtId)
      .then((response) => {
          if (response && response.data) {
              setInitialValues(response.data);
              formik.setValues(response.data);
            }
        })
        .catch((error: any) => setError(error.message))
        .finally(() => setLoader(false));
    }, [id]);

const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: Debt) => {
        console.log(`Debt ID: ${id} values: ${values} `)
        saveOrUpdateDebt(values)
        .then((response) => {
            if (response && response.status === 201) {
            navigate("/");
        } else if (response && response.status === 200) {
            navigate(`/view/${id}`);
        }
    })
    .catch((error: any) => {
          console.log(error);
          setError(error.message);
        });
    },
    validationSchema: debtValidationSchema,
  });

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card bg="dark" text="white" className="p-4">
            <Card.Body>
              {isLoading && <Alert variant="info">Loading...</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={formik.handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Debt Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter debt name"
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

                {/* Debt Type Drop Down */}
                <Form.Group controlId="debtType">
                  <Form.Label>Debt Type</Form.Label>
                  <Form.Select
                    name="debtType"
                    value={formik.values.debtType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!formik.errors.debtType && formik.touched.debtType
                    }
                  >
                    <option value="">Select Debt Type</option>
                    {debtTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.debtType}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* APR */}
                <Form.Group className="mb-3">
                  <Form.Label>APR</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the APR"
                    name="apr"
                    value={formik.values.apr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.apr && formik.errors.apr)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.apr}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Balance */}
                <Form.Group className="mb-3">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter the remaining balance"
                    name="balance"
                    value={formik.values.balance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!(formik.touched.balance && formik.errors.balance)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.balance}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3} // Adjust the number of visible rows
                    placeholder="Enter a description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      !!(
                        formik.touched.description && formik.errors.description
                      )
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Save"}
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

export default NewDebt;