
import NavBar from "./Navbar";
import Form from "../components/Form";
import Dashboard from "./Dashboard";
import Metrics from "./Metrics";
import System from "./System";
import "../css/navbar.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


 
function App(): JSX.Element {
  const location = useLocation();


  return (
    <div>
    
      {location.pathname !== "/" && <NavBar />}
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