import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav(props) {
  const { user, onLogout } = props;
  return (
    <div className="header2">
      <div>
        <Navbar id="navbar" bg="light" expand="lg" className="nav1">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {user ? (
                <button className="logout" onClick={onLogout}>
                  Logout
                </button>
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
      <Link className="events" to="/">
        <h2>Events</h2>
      </Link>
      <span className="own">
        <h6>Create your own session</h6>
        <Link className="create-event" to="/add-event">
          <h2>Start</h2>
        </Link>
      </span>
    </div>
  );
}
export default MyNav;
