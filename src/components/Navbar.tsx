import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "../css/navbar.css";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Form from "./Form";

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
      <div className="containermain">
        <Navbar expand="lg" className="bg-purple">
          <Container>
            <Navbar.Brand as={Link} to={"/home"} className="me-2">
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
            path="/"
             element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
             element={
              <ProtectedRoute>
                {/* <About/> */}
              </ProtectedRoute>
             }
          />
          <Route
            path="/prod1"
             element={
              <ProtectedRoute>
               {/* <Prod1/> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/prod2"
             element={
              <ProtectedRoute>
               {/* <Prod2/> */}
              </ProtectedRoute> 
            }
          />
          <Route
            path="/prod3"
             element={
              <ProtectedRoute>
               {/* <Prod3/> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/prod4"
             element={
             <ProtectedRoute>
              {/* <Prod4/> */}
             </ProtectedRoute>
            }
          />
          <Route
            path="/readme"
             element={
              <ProtectedRoute>
               {/* <ReadMe/> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/config"
             element={
              <ProtectedRoute>
               {/* <Config/> */}
              </ProtectedRoute>
             }
          />
          <Route
            path="/profile"
             element={
              <ProtectedRoute>
               {/* <Profile/> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/git"
             element={
              <ProtectedRoute>
               {/* <Git/> */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};
export default NavBar;
