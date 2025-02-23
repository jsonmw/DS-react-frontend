import { Card, Col, Row } from "react-bootstrap";
import CurrencyUtils from "../../utils/CurrencyUtil"
import DateUtils from "../../utils/DateUtil"

interface Props {
    loggedInUser: string | null;
    totalDebt: number;
}

const DashboardStatus: React.FC<Props> = ({ loggedInUser, totalDebt }) => {
    return (
      <Card className="mb-4 shadow-sm border-0 bg-light">
        <Card.Body>
          <Row className="align-items-center text-center text-md-start">
            {/* Total Debt Display */}
            <Col
             md={6}>
              <h5 className="text-muted">Total Balance</h5>
              <h3>
                <span className="badge bg-dark text-white fs-5">
                  {CurrencyUtils.formatToUSD(totalDebt)}
                </span>
              </h3>
            </Col>
  
            {/* User & Date Info */}
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <div className="fw-semibold">Welcome, <span className="text-primary">{loggedInUser}</span></div>
              <div className="text-muted">{DateUtils.getFormattedDate(new Date())}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

export default DashboardStatus