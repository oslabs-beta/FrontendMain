import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
