
import NavBar from "./Navbar";
import Form from "../components/Form";
import Dashboard from "./Dashboard";
import Metrics from "./Metrics";
import System from "./System";
import About from "./About"
import Config from "./Config"
import "../css/navbar.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";


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
      {location.pathname !== "/" && <NavBar isSideBarHovered={isSideBarHovered}/>}
      {location.pathname !== "/" && <SidebarMenu onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>}
      <Routes>
        <Route path="/" element={<Form />} />
        {/* protected routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/dash" element={<Dashboard />} />
          <Route path = "/system" element ={<System/>} />
          <Route path = "/metrics" element={<Metrics/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App