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
  Spinner,
} from "react-bootstrap";
import { cardTypes, debtTypes } from "../../utils/Constants";
import FormInput from "../../components/FormInput";

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
    cardType: "",
    loanTerms: "",
  });

  // Check if a debt ID was passed and populate fields with existing data if so
  useEffect(() => {
    const fetchDebt = async () => {
      if (!id) return;
      setLoader(true);

      try {
        const debtId = parseInt(id);
        const response = await getDebtByDebtId(debtId);
        if (response?.data) {
          setInitialValues(response.data);
          formik.setValues(response.data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchDebt();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: Debt) => {
      const filteredValues = {
        ...values,
        cardType: values.debtType === "CARD" ? values.cardType : undefined,
        loanTerms: values.debtType === "LOAN" ? values.loanTerms : undefined,
      };

      saveOrUpdateDebt(filteredValues)
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

  const renderDebtSpecificFields = () => {
    if (!formik.values.debtType) return null;

    return (
      <>
        <FormInput label="APR" name="apr" type="number" formik={formik} />
        <FormInput
          label="Balance"
          name="balance"
          type="number"
          formik={formik}
        />
        <FormInput
          label="Description"
          name="description"
          type="textarea"
          formik={formik}
        />

        {formik.values.debtType === "CARD" && (
          <Form.Group className="mb-3">
            <Form.Label>Card Type</Form.Label>
            <Form.Select
              name="cardType"
              value={formik.values.cardType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.cardType && formik.errors.cardType)}
            >
              <option value="">Select a Card Type</option>
              {cardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.cardType}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        {formik.values.debtType === "LOAN" && (
          <FormInput label="Loan Terms" name="loanTerms" formik={formik} />
        )}
      </>
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card bg="dark" text="white" className="p-4">
            <Card.Body>
              {isLoading && <Alert variant="info">Loading...</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form key={formik.values.debtType} onSubmit={formik.handleSubmit}>
                {/* Name */}
                <FormInput
                  label="Name"
                  name="name"
                  type="text"
                  formik={formik}
                />
                <FormInput
                  label="Debt Type"
                  name="debtType"
                  formik={formik}
                  options={debtTypes}
                />
                {renderDebtSpecificFields()}

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
