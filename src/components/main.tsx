import { createRoot } from 'react-dom/client';
import App from './App';
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from './AuthContext';


createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
);
