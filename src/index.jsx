import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
    <App />
)