import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import UiProvider from "./context/UiContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <UiProvider>
          <App />
        </UiProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);