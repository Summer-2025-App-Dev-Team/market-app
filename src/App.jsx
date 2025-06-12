import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import "./App.css";
import useAuthStore from './components/store/useAuthStore';
import { Link } from "react-router-dom";

export default function App() {
  const user = useAuthStore((state) => state.user);

  // TODO: currently not working
  // function updateMainPadding() {
  //   const padding = document.querySelector("header").offsetHeight;
  //   document.querySelector("main").style.paddingTop = padding + "px";
  // }

  // document.addEventListener("DOMContentLoaded", updateMainPadding);
  // window.addEventListener("resize", updateMainPadding);

  return (
    <>
      <Header />

      {user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}</p>
          <p>User ID: {user.uid}</p>
        </div>
      ) : (<></>)}

      {/* TODO: just for testing, should be removed later */}
      <Link to={"/add-item"} className="add-item">Add an item</Link>

      <Footer />
    </>
  );
}
