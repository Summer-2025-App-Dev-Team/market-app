import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import NotFoundPage from "./components/NotFoundPage";
import AuthListener from "./components/auth/AuthListener";
import ItemPage from "./components/item-page/ItemPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/logout",
        element: <Logout/>
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/item-page",
        element: <ItemPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
]);

root.render(
    <StrictMode>
        <AuthListener/>
        <RouterProvider router={router} />
    </StrictMode>
)