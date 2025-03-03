import { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Debt } from "../../model/Debt";
import { deleteDebt } from "../../services/debt-service";
import { Link } from "react-router-dom";

const DebtActions: React.FC<{ debt: Debt; refresh: () => void }> = ({
  debt,
  refresh,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePlanPayments = () => alert(`Plan payments for ${debt.name}`);
  const handleDelete = async () => {
    if (!debt || !debt?.id) {
      console.error("Error deleting debt.");
      return;
    }
    await deleteDebt(debt);
    refresh();
  };

  return (
    <Card className="shadow-sm p-3">
      <Card.Body>
        <Card.Title>Actions</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Button
              variant="dark"
              onClick={handlePlanPayments}
              className="w-100"
            >
              Payment plan
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link
              to={`/update`}
              state={{ debt }}
              className="btn btn-dark w-100"
            >
              Update debt info
            </Link>
          </ListGroup.Item>

          {/* handle delete confirmation */}
          <ListGroup.Item>
            {showConfirm ? (
              <div className="d-flex justify-content-between">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="flex-grow-1 me-2"
                >
                  Confirm Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowConfirm(false)}
                  className="flex-grow-1"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="dark"
                onClick={() => setShowConfirm(true)}
                className="w-100"
              >
                Delete debt
              </Button>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default DebtActions;
