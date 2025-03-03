import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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

const DebtForm = () => {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const passedDebt = location.state?.debt;

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

  // Check if a debt was passed and populate fields with existing data if so
  useEffect(() => {
    if (!passedDebt) return;
    setLoader(true);

    setInitialValues({
      ...passedDebt,
      loanTerms: passedDebt.terms || "",
    });

    formik.setValues({
      ...passedDebt,
      loanTerms: passedDebt.terms || "",
    });

    setLoader(false);
  }, [passedDebt]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: Debt) => {
      let loanTermValue = "";
      let loanTermUnit = "";

      if (values.debtType === "LOAN" && values.loanTerms) {
        const splitTerms = values.loanTerms.split(" ");
        loanTermValue = splitTerms[0] || "";
        loanTermUnit = splitTerms[1] || "";
      }

      const filteredValues = {
        ...values,
        cardType:
          values.debtType === "CARD"
            ? values.cardType?.toUpperCase()
            : undefined,
        loanTerms:
          values.debtType === "LOAN"
            ? `${loanTermValue} ${loanTermUnit}`
            : undefined,
      };

      saveOrUpdateDebt(filteredValues)
        .then(() => {
          navigate("/");
        })
        .catch((error: any) => {
          console.log(error);
          setError(error.message);
        });
    },
    validationSchema: debtValidationSchema,
  });

  // Displays conditional options depending on Debt Type
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
          <FormInput
            label="Card Type"
            name="cardType"
            formik={formik}
            options={cardTypes}
          />
        )}

        {formik.values.debtType === "LOAN" && (
          <FormInput
            label="Loan Term"
            name="loanTerms"
            formik={formik}
            loanTermUnitOptions={["months", "years"]}
          />
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
                <FormInput
                  label="Debt Name"
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
                {/* Render conditional options after Debt Type is selected */}
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

export default DebtForm;
