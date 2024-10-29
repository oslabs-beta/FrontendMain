import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Button from "react-bootstrap/Button";
import "../css/navbar.css";
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
interface NavProps {
  isSideBarHovered: boolean;
}

const NavBar: React.FC<NavProps> = ({ isSideBarHovered }) => {
  const [bodyBgColor, setBodyBgColor] = useState<string>("#111218");
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [isSmallerThanLg, setIsSmallerThanLg] = useState(
    window.innerWidth < 1600
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const noHamburger = window.innerWidth >= 1200;

  const handleModeToggle = () => {
    setIsToggled(!isToggled);
    setBodyBgColor((bodyBgColor) =>
      bodyBgColor === "#111218" ? "#fff" : "#111218"
    );
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='containermain'>
        <Navbar
          expand='lg'
          className='bg-purple'
          onMouseLeave={handleMouseLeave}
        >
          <Container
            style={{
              paddingLeft:
                isSideBarHovered && isSmallerThanLg ? '100px' : '0px',
            }}
          >
            <Navbar.Toggle
              aria-controls='basic-navbar-nav'
              onMouseEnter={handleMouseEnter}
            />
            <Navbar.Collapse
              id='basic-navbar-nav'
              in={isExpanded && !noHamburger}
            >
              <Nav className='me-auto'>
                <Nav.Link
                  as={Link}
                  to={'/about'}
                  className='bg-btnPurple me-2 ms-2 d-flex flex-column justify-content-center'
                >
                  <span>About</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={'/readme'}
                  className='bg-btnPurple me-2 ms-2 d-flex flex-column justify-content-center'
                >
                  <span>ReadMe</span>
                </Nav.Link>
                {/* <Nav.Link
                  as={Link}
                  to={'/config'}
                  className='bg-btnPurple me-2 ms-2 d-flex flex-column justify-content-center'
                >
                  <span>Configuration</span>
                </Nav.Link> */}
              </Nav>

              {noHamburger && (
                <>
                  <Navbar.Brand
                    as={Link}
                    to={'/config'}
                    className='me-auto'
                    style={{ fontSize: '30px', fontWeight: 'bold' }}
                  >
                    StreamForge
                  </Navbar.Brand>
                  <Nav className='ml-auto'>
                    <Nav.Link
                      as={Link}
                      to={'/profile'}
                      className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: '14px' }}
                      />
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
                </>
              )}
            </Navbar.Collapse>
            {!isExpanded && (
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
            )}
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          {/* <Route
            path='/dash'
             element={<Dashboard/>}
          /> */}
            <Route path='/about' />
            <Route path='/readme' />
            <Route path='/config' />
            <Route path='/profile' />
            <Route path='/git' />
        </Routes>
      </div>
    </>
  );
};

export default NavBar;
