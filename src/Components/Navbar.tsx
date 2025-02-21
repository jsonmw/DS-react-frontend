import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {
  const isAuthenticated = false;
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div
          className="collapse navbar-collapse bg-dark "
          id="navbarNav"
        >
          <div className="navbar-nav">
            {!isAuthenticated ? ( // TODO: Remove negation once Authentication implemented
              <>
                <NavLink className="nav-link" to="/">
                  Dashboard
                </NavLink>
                <NavLink className="nav-link" to="/new">
                  New Debt
                </NavLink>
                <NavLink className="nav-link" to="/reports">
                  Reports
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
        <div className="d-flex" role="search">
          {!isAuthenticated ? (
            <>
              <NavLink className="btn btn-sm text-white" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-sm text-white" to="/register">
                Register
              </NavLink>
            </>
          ) : null}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
