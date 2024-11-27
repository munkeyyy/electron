import * as  React from "react"
import  {createRoot} from  'react-dom/client'
import App from "./App.jsx";
import "./index.css"
import { HashRouter } from "react-router-dom";
const root = createRoot(document.body);
root.render(
    <HashRouter>
    <App/>
    </HashRouter>
);