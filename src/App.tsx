import NavBar from "./components/Navbar";
import Form from "./Form";
import Dashboard from "./Dashboard";
import Metrics from "./components/Metrics";
import System from "./components/System";
import { Route, Routes, useLocation } from "react-router-dom";

function App(): JSX.Element {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/system" element={<System />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
