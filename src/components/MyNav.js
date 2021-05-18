import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav(props) {
  const { user, onLogout } = props;
  return (
    <div className="header2">
      <div>
        <Navbar id="navbar" bg="light" expand="lg">
          <Navbar.Toggle className="body" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="h3" to="/">
                <h3>Events</h3>
              </Link>
              <Link className="h3" to="/profile">
                <h3>Your Profile</h3>
              </Link>
              <Link className="h3" to="/avatar">
                <h3>Change your Avatar</h3>
              </Link>
              <Link className="h3" to="/add-event">
                <h3>Create an Event</h3>
              </Link>
              {user ? (
                <Link className="h3" to="/" onClick={onLogout}>
                  <h3>Logout</h3>
                </Link>
              ) : (
                <>
                  <Link style={{ marginLeft: "10px" }} to="/signin">
                    SignIn
                  </Link>
                  <Link style={{ marginLeft: "10px" }} to="/signup">
                    SignUp
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <span className="create-sess">
        <h6>Create your own session</h6>
        <Link className="create-event" to="/add-event">
          <h2>Start</h2>
        </Link>
      </span>
    </div>
  );
}
export default MyNav;
