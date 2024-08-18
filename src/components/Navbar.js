import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const [user,setUser] = useState(null)

  const navbarHandleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    setExpanded(false); // Stäng Navbaren när en länk klickas
  };

  return (
    <Container className="custom-bg">
      <Navbar sticky="top" className="Navbar" expand="lg" variant="light">
        <Navbar.Brand onClick={handleLinkClick} as={Link} to="/" exact>
          <img src="images/trailer-icon.png" alt="Img of trailer icon" />
        </Navbar.Brand>
        <h1 className="navbar-header">EazyTrailer</h1>
        <Navbar.Toggle className="navbar-toggle" onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse
          in={expanded}
          className="navbar-collapse"
          collapseOnSelect
        >
          <Nav className="ml-auto flex-grow-1 justify-content-evenly">
            <Nav.Link
              onClick={handleLinkClick}
              className="nav-links"
              as={Link}
              to="/CalendarView"
            >
              Kalender
            </Nav.Link>
            <Nav.Link
              onClick={handleLinkClick}
              className="nav-links"
              as={Link}
              to="/Login"
            >
              Logga in
            </Nav.Link>
            <Nav.Link
              onClick={handleLinkClick}
              className="nav-links"
              as={Link}
              to="/Info"
            >
              Uthyrningsinformation
            </Nav.Link>
            {user && (
              <Nav.Link
                className="nav-links"
                onClick={navbarHandleLogout}
                as={Link}
                to="/"
              >
                Logga ut
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
