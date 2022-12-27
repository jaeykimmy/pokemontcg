import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./navbar.scss";

function MyNavbar() {
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </Navbar>
  );
}

export default MyNavbar;
