import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AuthListener from "./components/auth/AuthListener";
// Temporarily disabled Bootstrap because we are not really using it
// import 'bootstrap/dist/css/bootstrap.min.module.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <AuthListener />
        <App />
    </StrictMode>
)