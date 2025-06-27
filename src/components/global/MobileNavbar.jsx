import { Link } from "react-router-dom"
import logo from "../../assets/images/app-logo.png"
import useAuthStore from "../store/useAuthStore"
import styles from "../../assets/css/header.module.css"
import LogoutOrLogin from "./LogoutOrLogin"
import { useEffect, useRef } from "react"

export default function MobileNavbar({ showBurger }) {
    const user = useAuthStore((state) => state.user);
    const burgerRef = useRef(null);

    function handleCloseIconOnClick(e) {
        e.stopPropagation();
        // Remove the 'show' class from the burger when the close icon is clicked
        burgerRef.current.classList.remove(styles.show);
    }

    useEffect(() => {
        const burger = burgerRef.current;

        // If the burger element is not found, do nothing
        // This is to prevent errors if the component is unmounted before the effect runs
        // or if the burgerRef is not set correctly
        if (!burger) return;

        burger.querySelectorAll("ul > li > a").forEach((link) => {
            // Add an event listener to each link to remove the 'show' class from the burger
            link.addEventListener("click", () => {
                burger.classList.remove(styles.show);
            });
        });

        if (showBurger) {
            // If showBurger is true, add the 'show' class to the burger
            burger.classList.add(styles.show);
        } else {
            // If showBurger is false, remove the 'show' class from the burger
            burger.classList.remove(styles.show);
        }

        const handleOnClick = (e) => {
            // If the clicked element is the burger or a child of the burger, do nothing
            if (burger.contains(e.target)) return;

            // Otherwise, remove the 'show' class from the burger
            burger.classList.remove(styles.show);
        };

        // Only add the click listener if the burger is shown
        if (showBurger) {
            // Add a small delay to prevent the same click that opened the menu from closing it
            setTimeout(() => {
                document.addEventListener("click", handleOnClick);
            }, 0);
        }

        return () => {
            document.removeEventListener("click", handleOnClick);
        };
    }, [showBurger]);

    return (
        <div ref={burgerRef} className={`${styles["show-mobile"]} ${styles.burger}`}>
            <ul>
                <li>
                    <img
                        src={logo}
                        alt="logo"
                        draggable={false}
                        className={styles.logo}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox="0 0 24 24" onClick={handleCloseIconOnClick}>{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m7.76 14.83-2.83 2.83 1.41 1.41 2.83-2.83 2.12-2.12.71-.71.71.71 1.41 1.42 3.54 3.53 1.41-1.41-3.53-3.54-1.42-1.41-.71-.71 5.66-5.66-1.41-1.41L12 10.59 6.34 4.93 4.93 6.34 10.59 12l-.71.71z"></path></svg>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1c.4 0 .77-.24.92-.62.15-.37.07-.8-.22-1.09l-8.99-9a.996.996 0 0 0-1.41 0l-9.01 9c-.29.29-.37.72-.22 1.09s.52.62.92.62Zm7 7v-5h4v5zm2-15.59 6 6V20h-2v-5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v5H6v-9.59z"></path></svg>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>
                    <Link to={"/add-item"}>Add Item</Link>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M12 6c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4m0 6c-1.18 0-2-.82-2-2s.82-2 2-2 2 .82 2 2-.82 2-2 2"></path><path d="M12 2C6.49 2 2 6.49 2 12c0 3.26 1.58 6.16 4 7.98V20h.03c1.67 1.25 3.73 2 5.97 2s4.31-.75 5.97-2H18v-.02c2.42-1.83 4-4.72 4-7.98 0-5.51-4.49-10-10-10M8.18 19.02C8.59 17.85 9.69 17 11 17h2c1.31 0 2.42.85 2.82 2.02-1.14.62-2.44.98-3.82.98s-2.69-.35-3.82-.98m9.3-1.21c-.81-1.66-2.51-2.82-4.48-2.82h-2c-1.97 0-3.66 1.16-4.48 2.82A7.96 7.96 0 0 1 4 11.99c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.97 4.36-2.52 5.82"></path></svg>
                    <Link to={`/profile/${user ? user.uid : ''}`}>Your Profile</Link>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M14 11h8v2h-8zM4 8c0 2.28 1.72 4 4 4s4-1.72 4-4-1.72-4-4-4-4 1.72-4 4m6 0c0 1.18-.82 2-2 2s-2-.82-2-2 .82-2 2-2 2 .82 2 2M3 20h10c.55 0 1-.45 1-1v-1c0-2.76-2.24-5-5-5H7c-2.76 0-5 2.24-5 5v1c0 .55.45 1 1 1m4-5h2c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3"></path></svg>
                    <LogoutOrLogin />
                </li>
            </ul>
        </div>
    )
}