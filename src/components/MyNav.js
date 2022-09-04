import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav({ user, onLogout }) {
  return (
    <div className="header2">
      <div>
        <Navbar id="navbar" bg="light" expand="lg">
          <Navbar.Toggle className="body" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">
                <h3>Events</h3>
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
              {user ? (
                <Link className="nav-link" to="/" onClick={onLogout}>
                  <h3>Logout</h3>
                </Link>
              ) : (
                <>
                  <div>
                    <Link className="login-links" to="/signin">
                      Login
                    </Link>
                    <Link className="login-links" to="/signup">
                      SignUp
                    </Link>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
export default MyNav;
