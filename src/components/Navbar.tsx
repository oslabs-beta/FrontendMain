import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Button from "react-bootstrap/Button";
import '../css/navbar.css';
import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
interface NavProps {
  isSideBarHovered: boolean;
}

const NavBar: React.FC<NavProps> = ({ isSideBarHovered }) => {
  const [bodyBgColor, setBodyBgColor] = useState<string>('#111218');
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [isSmallerThanLg, setIsSmallerThanLg] = useState(
    window.innerWidth < 1600
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const noHamburger = window.innerWidth >= 1000;

  const handleModeToggle = () => {
    setIsToggled(!isToggled);
    setBodyBgColor((bodyBgColor) =>
      bodyBgColor === '#111218' ? '#fff' : '#111218'
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
                  onClick={() =>
                    window.open(
                      'https://github.com/oslabs-beta/FrontendMain/blob/dev/README.md',
                      '_blank'
                    )
                  }
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
                  <img
                    className='logo'
                    src='src/assets/steamForge-logo.png'
                    style={{ height: '50px' }}
                  />
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
                  <Nav.Link
                    as={Link}
                    to={'/'}
                    className='bg-btnPurple me-2 d-flex flex-column justify-content-center'
                  >
                    Logout
                  </Nav.Link>
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
          <Route element={<ProtectedRoute />}>
            <Route path='/about' />
            {/* <Route path='/prod1' /> */}
            <Route path='/readme' />
            <Route path='/config' />
            <Route path='/profile' />
            <Route path='/git' />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default NavBar;
