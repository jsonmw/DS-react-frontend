import { Card } from "react-bootstrap";
import { Debt } from "../model/Debt";

const DebtCard: React.FC<{ debt: Debt }> = ({ debt }) => {
  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>{debt.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{debt.debtType}</Card.Subtitle>
        <Card.Text className="fw-bold">${debt.balance.toLocaleString()}</Card.Text>
        <Card.Text className="fw-bold">{debt.apr.toLocaleString()}%</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DebtCard;