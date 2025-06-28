import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/global/Root";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import ForgetPassword from "./components/auth/ForgetPassword";
import SuccessScreen from "./components/auth/SuccessScreen";
import VerifyAuth from "./components/auth/VerifyAuth";
import Profile from "./components/auth/Profile";
import ChatHome from "./components/chat/ChatHome";
import ChatRoom from "./components/chat/ChatRoom";
import ItemPage from "./components/item-page/ItemPage";
import AddItem from "./components/item-page/AddItem";
import ItemDetail from "./components/item-page/ItemDetail";
import Contact from "./components/contact/Contact";
import About from "./components/about/About"
import NotFoundPage from "./components/NotFoundPage";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        path: "/item/:id",
        element: <ItemDetail />
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
        path: "/profile/:uid",
        element: <Profile />
      },
      {
        path: "/chat",
        element: <ChatHome />,
        children: [
          {
            path: ":uid",
            element: <ChatRoom />
          }
        ]
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
      <ToastContainer />
    </>
  );
}
