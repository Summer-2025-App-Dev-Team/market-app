import useAuthStore from '../store/useAuthStore';
import styles from "../../assets/css/header.module.css";
import { Link } from 'react-router-dom';

export default function LogoutOrLogin() {
    const user = useAuthStore((state) => state.user);
    if (user == null) {
        return (
            <Link to={"/login"} className={styles["auth-button"]}>Login</Link>
        )
    } else {
        return (
            <Link to={"/logout"} className={styles["auth-button"]}>Logout</Link>
        )
    }
}