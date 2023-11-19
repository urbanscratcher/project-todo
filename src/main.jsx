import "@unocss/reset/tailwind-compat.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./init-font.css";
import "virtual:uno.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
