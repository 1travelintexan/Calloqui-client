import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../context/allContext";

function MyNav({ onLogout }) {
  const { user } = useContext(AllContext);
  return (
    <div className="header2">
      <div>
        {user ? (
          <Navbar id="navbar" bg="light" expand="lg">
            <Navbar.Toggle className="body" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/">
                  <h3>Events</h3>
                </Link>
                <Link className="nav-link" to="/friends">
                  <h3>Friends</h3>
                </Link>

                <Link className="nav-link" to="/profile">
                  <h3>Profile</h3>
                </Link>
                <Link className="nav-link" to="/avatar">
                  <h3>Avatar</h3>
                </Link>
                <Link className="nav-link" to="/add-event">
                  <h3>Create Event</h3>
                </Link>

                <Link className="nav-link" to="/" onClick={onLogout}>
                  <h3>Logout</h3>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <>
            <Link className="login-links" to="/login">
              Login
            </Link>
            <Link className="login-links" to="/signup">
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default MyNav;
