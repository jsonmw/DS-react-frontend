import { Container, Row, Col, Image, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <Container className="text-center welcome mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
          <h1 className="fw-bold">DEBTSOLVER</h1>
          <Image
            src="/assets/landing-page1.jpg"
            className="mt-3 rounded img-fluid"
            alt="Landing page"
          />
          <h5 className="mt-5 fst-italic">
            Unlock your finances by tracking your debts and planning your
            repayment
          </h5>
          <Image
            src="/assets/landing-page2.jpg"
            className="mt-5 rounded img-fluid"
            alt="Landing page"
          />
          <Nav.Link
            as={Link}
            to="/register"
            className="btn btn-dark border border-light px-4 py-2 mt-5 mb-5 d-inline-block"
            style={{ backgroundColor: "black" }}
          >
            Get Started
          </Nav.Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Welcome;
