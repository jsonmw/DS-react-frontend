import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Debt } from "../model/Debt";
import CurrencyUtil from "../utils/CurrencyUtil";
import DebtDetails from "../pages/debts/DebtDetails";


const DebtCard: React.FC<{ debt: Debt; refresh: () => void }> = ({ debt, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Card
        className={`debt-card shadow-sm mb-3 bg-secondary bg-opacity-50 ${
          isModalOpen ? "active-card" : ""
        }`}
        onClick={handleShow}
      >
        <Card.Body>
          <Card.Title>{debt.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-white">{debt.debtType}</Card.Subtitle>
          <Card.Text className="fw-bold">{CurrencyUtil.formatToUSD(debt.balance)}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted text-white">Balance</Card.Subtitle>
          <Card.Text className="fw-bold">{debt.apr.toLocaleString()}%</Card.Text>
          <Card.Subtitle className="mb-2 text-muted text-white">APR</Card.Subtitle>
        </Card.Body>
      </Card>

      {isModalOpen && <DebtDetails debt={debt} onClose={handleClose} refresh = {refresh} />}
    </>
  );
};

export default DebtCard;
