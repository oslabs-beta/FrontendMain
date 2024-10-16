import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Button from "react-bootstrap/Button";
import "../css/navbar.css";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Form from "./Form";
import About from './About';
import Config from './Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../css/navbar.css';
interface NavProps {
  isSideBarHovered: boolean;
}
const NavBar: React.FC<NavProps> = ({ isSideBarHovered }) => {
  const [bodyBgColor, setBodyBgColor] = useState<string>('#1c1c1e');
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [isSmallerThanLg, setIsSmallerThanLg] = useState(
    window.innerWidth < 1600
  );
  const handleModeToggle: () => void = () => {
    setIsToggled(!isToggled);
    setBodyBgColor((bodyBgColor) =>
      bodyBgColor === '#1c1c1e' ? '#fff' : '#1c1c1e'
    );
  };
  useEffect(() => {
    document.body.style.backgroundColor = bodyBgColor;
  }, [bodyBgColor]);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallerThanLg(window.innerWidth < 1600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className='containermain'>
        <Navbar expand='lg' className='bg-purple'>
          <Container
            style={{
              paddingLeft:
                isSideBarHovered && isSmallerThanLg ? '100px' : '0px',
            }}
          >
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link
                  as={Link}
                  to={'/about'}
                  className='bg-btnPurple me-2 ms-5 d-flex flex-column justify-content-center'
                >
                  <span>About</span>
                </Nav.Link>
                {/* <NavDropdown
                  title='Product'
                  id='basic-nav-dropdown'
                  className='bg-btnPurple me-1 d-flex flex-column justify-content-center'
                >
                  <NavDropdown.Item as={Link} to={'dash'}>
                    Kafka
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link
                  as={Link}
                  to={'/readme'}
                  className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                >
                  <span>ReadMe</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={'/config'}
                  className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                >
                  <span>Instruction</span>
                </Nav.Link>
              </Nav>
              <Navbar.Brand
                as={Link}
                to={'/dash'}
                className='me-auto'
                style={{ fontSize: '30px' }}
              >
                StreamForge
              </Navbar.Brand>
              <Nav className='ml-auto'>
                <Nav.Link
                  as={Link}
                  to={'/profile'}
                  className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                >
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: '14px' }} />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={'/git'}
                  className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ fontSize: '18px' }}
                  />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className='form-check form-switch mx-4'>
              <input
                className='form-check-input p-2'
                type='checkbox'
                role='switch'
                id='flexSwitchCheck'
                checked={isToggled}
                onClick={handleModeToggle}
              />
            </div>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Form />}/>
          <Route element={<ProtectedRoute/>}>
            <Route
              path="/about"
              element={
                  {/* <About/> */}
              }
            />
            <Route
              path="/prod1"
              element={
                {/* <Prod1/> */}
              }
            />
            <Route
              path="/prod2"
              element={
                {/* <Prod2/> */}
              }
            />
            <Route
              path="/prod3"
              element={
                {/* <Prod3/> */}
              }
            />
            <Route
              path="/prod4"
              element={
                {/* <Prod4/> */}
              }
            />
            <Route
              path="/readme"
              element={
                {/* <ReadMe/> */}
              }
            />
            <Route
              path="/config"
              element={
                {/* <Config/> */}
              }
            />
            <Route
              path="/profile"
              element={
                {/* <Profile/> */}
              }
            />
            <Route
              path="/git"
              element={
                {/* <Git/> */}
              }
            />
            </Route>
        </Routes>
      </div>
    </>
  );
};
export default NavBar;
