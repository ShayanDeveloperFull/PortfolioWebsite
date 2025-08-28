import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import MatrixRainEffect from "./components/MatrixRainEffect.jsx"; // Matrix rain canvas
import MatrixControlPanel from "./components/MatrixControlPanel.jsx"; // Interactive controls
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MatrixRainEffect />
    <MatrixControlPanel />
    <App />
  </BrowserRouter>
);
