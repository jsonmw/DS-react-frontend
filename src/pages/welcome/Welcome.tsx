
function Welcome() {
  return (
    <div className="container welcome">
      <div className="mt-2 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center pt-5">
          <h1>Welcome to DebtSolver</h1>
          <h6>
            <em>Efficiently pay off your debt and unlock your finances</em>
          </h6>
          <img src="/assets/landing-page1.jpg" className="mt-5 img-fluid rounded" alt="Landing page"/>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
