import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Header from "../global/Header";
import Footer from "../global/Footer";
import AuthHeading from "./AuthCardHeading";
import "../../assets/css/auth.css"
import "../../assets/css/logout.css"

export default function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      console.log("User logged out");
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
        <Header/>
        <main>
            <div className="auth-background">
                <div className="auth-card">
                    <AuthHeading head="Log out" sub="or Back" link="/"/>
                    <button className="log-out-button" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </main>
        <Footer/>
    </>
  );
}
