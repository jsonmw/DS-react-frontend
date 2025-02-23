import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GetStartedModal from "../../components/GetStartedModal";
import DebtCard from "../../components/DebtCard";
import { Debt } from "../../model/Debt";

const Dashboard = () => {
  // flag to show "Get Started" modal
  const [firstLogin, setFirstLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("firstLogin") === "true") {
      setFirstLogin(true);
      localStorage.removeItem("firstLogin");
    }
  }, []);

  // Remove when API fetch implemented
  const debts: Debt[] = [
    { name: "Car Loan", debtType: "Bank Loan", description: "", balance: 12000, apr: 7.3 },
    { name: "Credit Card", debtType: "Card", description: "", balance: 2500, apr: 9.2 },
  ];

  return (
    <Container className="mt-4">   
      {firstLogin && <GetStartedModal onClose={() => setFirstLogin(false)} />}
      
      <h2 className="mt-4">Debts</h2>
      <Row>
        {debts.map((debt) => (
          <Col key={debt.name} md={6} lg={4}>
            <DebtCard debt ={debt} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
