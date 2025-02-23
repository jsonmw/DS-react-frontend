import { Card } from "react-bootstrap";
import { Debt } from "../model/Debt";
import CurrencyUtil from "../utils/CurrencyUtil";

const DebtCard: React.FC<{ debt: Debt }> = ({ debt }) => {
    CurrencyUtil
  return (
    <Card className="debt-card shadow-sm mb-3 bg-secondary bg-opacity-50">
      <Card.Body>
        <Card.Title>{debt.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-white">{debt.debtType}</Card.Subtitle>
        <Card.Text className="fw-bold">{CurrencyUtil.formatToUSD(debt.balance)}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted text-white">Balance</Card.Subtitle>
        <Card.Text className="fw-bold">{debt.apr.toLocaleString()}%</Card.Text>
        <Card.Subtitle className="mb-2 text-muted text-white">APR</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default DebtCard;