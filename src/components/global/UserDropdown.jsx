import LogoutOrLogin from "./LogoutOrLogin";
import UserTextData from "./UserTextData";
import useAuthStore from "../store/useAuthStore";
import styles from "../../assets/css/header.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function UserDropdown() {
    const [dropdownIsActive, setDropdownIsActive] = useState(false);
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
                setDropdownIsActive(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Still loading
    if (user === undefined) {
        return null;
    }

    // If the user is not logged in
    if (user === null) {
        return <LogoutOrLogin />;
    }

    function handleOnClick() {
        if (dropdownIsActive) {
            dropdown.current.classList.remove(styles.active);
        } else {
            dropdown.current.classList.add(styles.active);
        }
        setDropdownIsActive(!dropdownIsActive);
    }

    // If the user is logged in
    return (
        //the long long svg's are saved things from a free svg library I think -> Boxicons
        <div
            className={`${styles["user-dropdown"]} ${styles["hide-mobile"]}`}
            onClick={handleOnClick}
        >
            <div className={styles["user"]}>
                <UserTextData type="displayName" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill={"currentColor"}
                    viewBox="0 0 24 24"
                >
                    {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                    <path d="M17.35 8H6.65c-.64 0-.99.76-.56 1.24l5.35 6.11c.3.34.83.34 1.13 0l5.35-6.11C18.34 8.76 18 8 17.36 8Z"></path>
                </svg>
            </div>
            <ul ref={dropdown}>
                <li>
                    <Link to={`/profile/${user.uid}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill={"currentColor"}
                            viewBox="0 0 24 24"
                        >
                            {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                            <path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path>
                            <path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path>
                        </svg>
                        <span>View profile</span>
                    </Link>
                </li>
                <li>
                    <Link to={"/chat"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill={"currentColor"}
                            viewBox="0 0 24 24"
                        >
                            {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                            <path d="M4 19h3v2c0 .36.19.69.51.87a1.002 1.002 0 0 0 1-.01L13.27 19h6.72c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2M4 5h16v12h-7c-.18 0-.36.05-.51.14L9 19.23V18c0-.55-.45-1-1-1H4z"></path>
                            <path d="M8 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2M12 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2M16 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2"></path>
                        </svg>
                        <span>Chat</span>
                    </Link>
                </li>

                {/* Set this to /logout because the user must be logged in to see this menu */}
                <li>
                    <Link to={"/logout"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill={"currentColor"}
                            viewBox="0 0 24 24"
                        >
                            {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                            <path d="M14 11h8v2h-8zM4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3"></path>
                        </svg>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
