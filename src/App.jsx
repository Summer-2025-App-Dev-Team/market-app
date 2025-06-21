import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/global/Root";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import ForgetPassword from "./components/auth/ForgetPassword";
import SuccessScreen from "./components/auth/SuccessScreen";
import VerifyAuth from "./components/auth/VerifyAuth";
import NotFoundPage from "./components/NotFoundPage";
import ItemPage from "./components/item-page/ItemPage";
import AddItem from "./components/item-page/AddItem";
import Contact from "./components/contact/Contact";
import About from "./components/about/About"
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ItemPage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/verify-auth",
        element: <VerifyAuth />
      },
      {
        path: "/success-screen",
        element: <SuccessScreen />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />
      },
      {
        path: "/add-item",
        element: <AddItem />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
