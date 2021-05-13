import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNav() {
  return (
    <Navbar id="navbar" bg="light" expand="lg" className="nav1">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link style={{ marginLeft: "10px" }} to="/signin">
            SignIn
          </Link>
          <Link style={{ marginLeft: "10px" }} to="/signup">
            SignUp
          </Link>
          <Link to="/">Events</Link>
          <Link style={{ marginLeft: "10px" }} to="/add-event">
            Create Event
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default MyNav;
