import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GetStartedModal from "../../components/GetStartedModal";
import DebtCard from "../../components/DebtCard";
import { Debt } from "../../model/Debt";
import AuthUtil from "../../utils/AuthUtil";
import DashboardStatus from "./DashboardStatus";
import useDebts from "../../hooks/useDebts";

const Dashboard = () => {
  // flag to show "Get Started" modal
  const [firstLogin, setFirstLogin] = useState(false);
  const loggedInUser: string | null = AuthUtil.getLoggedInUser();
  const { debts, error, isLoading, refresh } = useDebts();

  const totalDebt = useMemo(() => {
    return debts.reduce((acc: number, debt: Debt) => acc + debt.balance, 0);
  }, [debts]);

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
      <DashboardStatus loggedInUser={loggedInUser} totalDebt={totalDebt} />

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Debts</h2>
        <Button variant="outline-primary" onClick={refresh}>
          Refresh
        </Button>
      </div>
      <Row>
        {debts.map((debt) => (
          <Col key={debt.name} md={6} lg={4}>
            <DebtCard debt={debt} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
