import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";

function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    console.log("Auth State Updated in Navbar:", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="d-flex nav-logo me-5 mt-1">
          {isAuthenticated ? (
            <NavLink to="/">
              {/* TODO: Figure out what I want to be here in logged out/logged in mode -- Full name in logged out? */}
              <h3 className="text-white">DS </h3>
            </NavLink>
          ) : (
            <NavLink to="/">
              <h3 className="text-white">DS </h3>   
            </NavLink>
          )}
        </div>
        <div className="d-flex collapse navbar-collapse bg-dark" id="navbarNav">
          <div className="navbar-nav">
            {isAuthenticated ? (
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
        <div className="d-flex mx-5" role="search">
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

          {isAuthenticated ? (
            <button
              className="btn btn-sm text-white btn-outline-light"
              onClick={logout}
            >
              Logout
            </button>
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
