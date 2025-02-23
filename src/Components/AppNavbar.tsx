import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function AppNavbar() {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    console.log("Auth State Updated in Navbar:", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
      <Container>
        {isAuthenticated ? (
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            DEBTSOLVER
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={NavLink} to="/" className="fw-bold">
            DS
          </Navbar.Brand>
        )}
        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbarNav">
          <FaBars color="white" />
        </Navbar.Toggle>

        {/* Collapsible Navbar Content */}
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/new">
                  New Debt
                </Nav.Link>
                <Nav.Link as={NavLink} to="/reports">
                  Reports
                </Nav.Link>
              </>
            ) : null}
          </Nav>

          {/* Right-aligned Auth Buttons */}
          <Nav className="ms-3">
            {!isAuthenticated ? (
              <>
                <Button variant="outline-light" size="sm" className="me-2">
                  <NavLink
                    to="/login"
                    className="text-decoration-none text-white"
                  >
                    Login
                  </NavLink>
                </Button>
                <Button variant="outline-light" size="sm">
                  <NavLink
                    to="/register"
                    className="text-decoration-none text-white"
                  >
                    Register
                  </NavLink>
                </Button>
              </>
            ) : (
              <Button variant="outline-light" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
