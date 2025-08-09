import useAuthStore from "../store/useAuthStore";
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";

export default function LogoutOrLogin() {
    const user = useAuthStore((state) => state.user);

    // Still loading
    if (user === undefined) {
        return <span>Loading...</span>;
    }

    if (user === null) {
        return (
            <Link to={"/login"} className={styles["auth-button"]}>
                Login
            </Link>
        );
    }

    return (
        <Link to={"/logout"} className={styles["auth-button"]}>
            Logout
        </Link>
    );
}
