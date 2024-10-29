import NavBar from './Navbar';
import Form from '../components/Form';
import Metrics from './Metrics';
import System from './System';
import About from './About';
import Config from './Config';
import '../css/navbar.css';
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import ContentPanel from './ContentPanel';
import ProtectedRoute from "./ProtectedRoute";
import GoogleRouteCallback from './googleRoute';

 
function App(): JSX.Element {
  const location = useLocation();
  //used in NavBar
  const [isSideBarHovered, setIsSideBarHovered] = useState<boolean>(false);
  //used in ContentPanel
  const [isOpenAiWindow, setIsOpenAiWindow] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [labelText, setLabelText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  //used in Metrics
  const [data, setData] = useState<DataResponse | null>(null);

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
        <Route path='/oauth/google' element={<GoogleRouteCallback/>}/>
        {/* The rest of the routes will be inside the ContentPanel */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ContentPanel isExpanded={isSideBarHovered} isOpenAiWindow={isOpenAiWindow}
              setIsOpenAiWindow={setIsOpenAiWindow}
              isRotated={isRotated}
              setIsRotated={setIsRotated}
              labelText={labelText}
              setLabelText={setLabelText}
              userInput={userInput}
              setUserInput={setUserInput}
              aiResponse={aiResponse}
              setAiResponse={setAiResponse}/>}>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/system" element={<System />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/about" element={<About />} />
            <Route path="/config" element={<Config />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
