import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/global/Root";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import SignUp from "./components/auth/SignUp";
import NotFoundPage from "./components/NotFoundPage";
import ItemPage from "./components/item-page/ItemPage";
import AddItem from "./components/item-page/AddItem";
import "./App.css";

import useAuthStore from './components/store/useAuthStore';
import { Link } from "react-router-dom";

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
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/add-item",
        element: <AddItem />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
])

export default function App() {
  // const user = useAuthStore((state) => state.user);

  return (
    // <>
    //   <Header />

    //   {user ? (
    //     <div>
    //       <p>Welcome, {user.displayName || user.email}</p>
    //       <p>User ID: {user.uid}</p>
    //     </div>
    //   ) : (<></>)}

    //   {/* TODO: just for testing, should be removed later */}
    //   <Link to={"/add-item"} className={styles.demo-link}>Add an item</Link>
    //   <Link to={"/item-page"} className={styles.demo-link}>Item page</Link>

    //   <Footer />
    // </>
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
