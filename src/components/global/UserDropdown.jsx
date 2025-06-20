import LogoutOrLogin from "./LogoutOrLogin"
import Username from "./Username"
import useAuthStore from "../store/useAuthStore";
import dropdown_pic from "../../assets/svgs/dropdown.svg";
import styles from "../../assets/css/header.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserDropdown() {
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        if (user === undefined) return;
        try {
            // name = user.displayName;
            console.log(user.displayName);
        }
        catch (err) {
            console.error("Error:", err);
        };
    }, [user])

    // Still loading
    if (user === undefined) {
        return null;
    }

    // If the user is not logged in
    if (user === null) {
        return <LogoutOrLogin />;
    }

    // If the user is logged in
    return (
        <div className={styles["user-dropdown"]}>
            <div className={styles["user"]}>
                <Username />
                <img src={dropdown_pic} alt="dropdown" draggable={false} />
            </div>
            <ul>
                <li><Link to={"#"}>View profile</Link></li>
                <li><Link to={"#"}>Settings</Link></li>
                <li><LogoutOrLogin /></li>
            </ul>
        </div>
    )
}