import { Button, Card, ListGroup } from "react-bootstrap";
import { Debt } from "../../model/Debt";

const DebtActions: React.FC<{ debt: Debt }> = ({ debt }) => {
  const handlePlanPayments = () => alert(`Plan payments for ${debt.name}`);
  const handleUpdate = () => alert(`Update ${debt.name}`);
  const handleDelete = () => alert(`Delete ${debt.name}`);

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
            <Button variant="dark" onClick={handleUpdate} className="w-100">
              Update debt info
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="dark" onClick={handleDelete} className="w-100 ">
              Delete debt
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default DebtActions;
