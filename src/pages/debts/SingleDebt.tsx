import { Card } from "react-bootstrap";
import CurrencyUtil from "../../utils/CurrencyUtil";
import { Debt } from "../../model/Debt";

const SingleDebt: React.FC<{ debt: Debt }> = ({ debt }) => {
  return (
    <Card className="shadow-sm p-3 bg-secondary bg-opacity-50">
      <Card.Body>
        <Card.Title>{debt.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {debt.debtType}
        </Card.Subtitle>
        <Card.Text>
          <strong>Balance:</strong> {CurrencyUtil.formatToUSD(debt.balance)}
        </Card.Text>
        <Card.Text>
          <strong>APR:</strong> {debt.apr.toLocaleString()}%
        </Card.Text>
        <Card.Text>
          <strong>Description:</strong>{" "}
          {debt.description || "No description available."}
        </Card.Text>
        <hr />
        {debt.createdAt && (
          <Card.Text>
            <small>
              Created At: {new Date(debt.createdAt).toLocaleDateString()}
            </small>
          </Card.Text>
        )}
        {debt.updatedAt && (
          <Card.Text>
            <small>
              Last Modified: {new Date(debt.updatedAt).toLocaleDateString()}
            </small>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default SingleDebt;
