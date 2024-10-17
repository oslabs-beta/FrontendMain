import NavBar from './Navbar';
import Form from '../components/Form';
import Dashboard from './Dashboard';
import Metrics from './Metrics';
import System from './System';
import About from './About';
import Config from './Config';
import '../css/navbar.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import ContentPanel from './ContentPanel';
import ProtectedRoute from "./ProtectedRoute";


 
function App(): JSX.Element {
  const location = useLocation();
  const [isSideBarHovered, setIsSideBarHovered] = useState<boolean>(false);
  const handleMouseEnter = (): void => {
    setIsSideBarHovered(true);
  };
  const handleMouseLeave = (): void => {
    setIsSideBarHovered(false);
  };
  return (
    <div>
      {location.pathname !== '/' && (
        <NavBar isSideBarHovered={isSideBarHovered} />
      )}
      {location.pathname !== '/' && (
        <SidebarMenu
          isExpanded={isSideBarHovered}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
      <Routes>
  {/* The / route will be outside of the ContentPanel */}
  <Route path='/' element={<Form />} />

  {/* The rest of the routes will be inside the ContentPanel */}
  <Route 
    path='*' // Catch all other paths
    element={
      <ContentPanel isExpanded={isSideBarHovered}>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/dash' element={<Dashboard />} />
            <Route path='/system' element={<System />} />
            <Route path='/metrics' element={<Metrics />} />
            <Route path='/about' element={<About />} />
            <Route path='/config' element={<Config />} />
          </Route>
        </Routes>
      </ContentPanel>
    } 
  />
</Routes>
      
    </div>
  );
}

export default App;
