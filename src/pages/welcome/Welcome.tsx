import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="container welcome">
      <div className="mt-2 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <h1><strong>DebtSolver</strong></h1>
          <img
            src="/assets/landing-page1.jpg"
            className="mt-3 img-fluid rounded"
            alt="Landing page"
          />
          <h5 className="mt-5">
            <em>
              Unlock your finances by tracking your debts and planning your repayment
            </em>
          </h5>
          <img
            src="/assets/landing-page2.jpg"
            className="mt-5 img-fluid rounded"
            alt="Landing page"
          />
          <Link to="/login" className="btn btn-dark mt-5 mb-5">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
