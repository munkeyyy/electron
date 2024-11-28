import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { WorkspaceProvider } from "./contexts/WorkspaceContext.js";

// Create a root element in your HTML file (index.html):
// <div id="root"></div>
const rootElement = document.getElementById("root");

// Ensure the `rootElement` exists and is passed to `createRoot`
const root = createRoot(rootElement);

root.render(
  <HashRouter>
    <App/>
  </HashRouter>
);
