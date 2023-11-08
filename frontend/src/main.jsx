import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalStateProvider } from "./Hooks/useGlobalState.jsx";
import { AuthProvider } from "./Hooks/useAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> // Commented out to stop running twice of useEffects
  <BrowserRouter>
    <AuthProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
