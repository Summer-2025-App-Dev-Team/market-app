import LogoutOrLogin from "./LogoutOrLogin"
import Username from "./Username"
import useAuthStore from "../store/useAuthStore";
import dropdownIcon from "../../assets/svgs/dropdown-icon.svg";
import accountIcon from "../../assets/svgs/account-icon.svg";
import settingsIcon from "../../assets/svgs/settings-icon.svg";
import logoutIcon from "../../assets/svgs/logout-icon.svg";
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function UserDropdown() {
    const [dropdownActived, setDropdownActived] = useState(false);
    const dropdown = useRef(null);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                dropdown.current &&
                !dropdown.current.contains(e.target) &&
                !e.target.closest(`.${styles["user-dropdown"]}`)
            ) {
                dropdown.current.classList.remove(styles.active);
                setDropdownActived(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [])

    // Still loading
    if (user === undefined) {
        return null;
    }

    // If the user is not logged in
    if (user === null) {
        return <LogoutOrLogin />;
    }

    function handleOnClick() {
        if (dropdownActived) {
            dropdown.current.classList.remove(styles.active);
        } else {
            dropdown.current.classList.add(styles.active);
        }
        setDropdownActived(!dropdownActived);
    }

    // If the user is logged in
    return (
        <div className={styles["user-dropdown"]} onClick={handleOnClick}>
            <div className={styles["user"]}>
                <Username />
                <img src={dropdownIcon} alt="dropdown" draggable={false} />
            </div>
            <ul ref={dropdown}>
                <li>
                    <img src={accountIcon} alt="account" draggable={false} />
                    <Link to={`/profile/${user.uid}`}>View profile</Link>
                </li>
                <li>
                    <img src={settingsIcon} alt="settings" draggable={false} />
                    <Link to={"#"}>Settings</Link>
                </li>
                <li>
                    <img src={logoutIcon} alt="logout" draggable={false} />
                    <LogoutOrLogin />
                </li>
            </ul>
        </div>
    )
}