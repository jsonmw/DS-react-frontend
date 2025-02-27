import { Modal, Row, Col, Button } from "react-bootstrap";
import SingleDebt from "./SingleDebt";
import DebtActions from "./DebtActions";
import { Debt } from "../../model/Debt";

interface DebtDetailsProps {
  debt: Debt;
  onClose: () => void;
  refresh: () => void;
}

const DebtDetails: React.FC<DebtDetailsProps> = ({ debt, onClose, refresh }) => {
  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{debt.name} details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Row>
          <Col md={7}>
            <SingleDebt debt={debt} />
          </Col>
          <Col md={5}>
            <DebtActions debt={debt} refresh={refresh} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DebtDetails;
