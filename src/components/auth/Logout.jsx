import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import AuthHeading from "./AuthCardHeading";
import stylesA from "../../assets/css/auth.module.css"
import stylesB from "../../assets/css/logout.module.css"
const styles = {
  ...stylesA,
  ...stylesB
}

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
    <div className={styles.login}>
      <div className={styles["auth-background"]}>
        <div className={styles["auth-card"]}>
          <AuthHeading head="Log out" sub="or Back" link="/" />
          <button className={styles["log-out-button"]} onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
