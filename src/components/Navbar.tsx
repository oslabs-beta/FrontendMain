import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "../css/navbar.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [bodyBgColor, setBodyBgColor] = useState<string>("white");
  const handleModeToggle: () => void = () => {
    setBodyBgColor((bodyBgColor) =>
      bodyBgColor === "white" ? "black" : "white"
    );
  };
  useEffect(() => {
    document.body.style.backgroundColor = bodyBgColor;
  }, [bodyBgColor]);
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-purple">
          <Container>
            <Navbar.Brand as={Link} to={"/home"}>
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to={"/about"}
                  className="bg-btnPurple me-2 d-flex flex-column justify-content-center"
                >
                  About
                </Nav.Link>
                <NavDropdown
                  title="Product"
                  id="basic-nav-dropdown"
                  className="bg-btnPurple me-1 d-flex flex-column justify-content-center"
                >
                  <NavDropdown.Item as={Link} to={"/prod1"}>
                    Product 1
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/prod2"}>
                    Product 2
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/prod3"}>
                    Product 3
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/prod4"}>
                    Product 4
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to={"/readme"}
                  className="bg-btnPurple me-2 d-flex flex-column justify-content-center"
                >
                  Link to readMe
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={"/config"}
                  className="bg-btnPurple me-2 d-flex flex-column justify-content-center"
                >
                  How to configure your kafka cluster for monitoring
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link
                  as={Link}
                  to={"/profile"}
                  className="bg-btnPurple me-2 d-flex flex-column justify-content-center"
                >
                  User Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={"/git"}
                  className="bg-btnPurple me-2 d-flex flex-column justify-content-center"
                >
                  Git
                </Nav.Link>
                <Button
                  onClick={handleModeToggle}
                  className="bg-btnPurple me-2"
                >
                  Switch Mode
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route
            path="/home"
            //  element={<Home/>}
          />
          <Route
            path="/about"
            //  element={<About/>}
          />
          <Route
            path="/prod1"
            //  element={<Prod1/>}
          />
          <Route
            path="/prod2"
            //  element={<Prod2/>}
          />
          <Route
            path="/prod3"
            //  element={<Prod3/>}
          />
          <Route
            path="/prod4"
            //  element={<Prod4/>}
          />
          <Route
            path="/readme"
            //  element={<ReadMe/>}
          />
          <Route
            path="/config"
            //  element={<Config/>}
          />
          <Route
            path="/profile"
            //  element={<Profile/>}
          />
          <Route
            path="/git"
            //  element={<Git/>}
          />
        </Routes>
      </div>
    </>
  );
};
export default NavBar;
