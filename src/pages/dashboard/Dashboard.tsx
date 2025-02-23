import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GetStartedModal from "../../components/GetStartedModal";
import DebtCard from "../../components/DebtCard";
import { Debt } from "../../model/Debt";
import AuthUtil from "../../utils/AuthUtil";
import DashboardStatus from "./DashboardStatus";

const Dashboard = () => {
  // flag to show "Get Started" modal
  const [firstLogin, setFirstLogin] = useState(false);
  const loggedInUser: string | null = AuthUtil.getLoggedInUser();
  
  // Remove when API fetch implemented
  const debts: Debt[] = [
    { name: "Honda Civic lease", debtType: "Loan", description: "", balance: 12000, apr: 7.3 },
    { name: "Chase VISA", debtType: "Card", description: "", balance: 2500, apr: 9.2 },
    { name: "Mortgage", debtType: "Loan", description: "", balance: 375350, apr: 4.4 },
  ];

  const totalDebt = debts.reduce((acc: number, debt: Debt) => acc + debt.balance, 0);
  let error = false;
  let isLoading = false;

  useEffect(() => {
    if (localStorage.getItem("firstLogin") === "true") {
      setFirstLogin(true);
      localStorage.removeItem("firstLogin");
    }
  }, []);


  return (
    <Container className="mt-4">   
      {firstLogin && <GetStartedModal onClose={() => setFirstLogin(false)} />}
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <DashboardStatus loggedInUser={loggedInUser} totalDebt={totalDebt}/>

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
