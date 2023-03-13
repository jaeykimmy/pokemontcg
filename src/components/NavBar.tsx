import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./navbar.scss";
import tcglogo from "../images/tcglogo.png";

function MyNavbar() {
  const refreshPage = () => {
    window.location.replace("/");
  };
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <img className="tcglogo" src={tcglogo} alt="" onClick={refreshPage}></img>
      <div className="words">
        <Link to="/pokemontcg">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </Navbar>
  );
}

export default MyNavbar;
