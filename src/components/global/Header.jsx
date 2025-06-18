import styles from "../../assets/css/header.module.css";
import logo from "../../assets/images/app-logo.png";
import burger_button from "../../assets/svgs/burger-button.svg";
import LogoutOrLogin from "./LogoutOrLogin";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
    function showBurger() {
        document.querySelector(`.${styles.burger}`).classList.add(styles.show);

        setTimeout(() => {
            document.addEventListener("click", function handelOnClick(e) {
                if (e.target.classList.contains(styles.burger)) return;
                document.querySelector(`.${styles.burger}`).classList.remove(styles.show);
                document.removeEventListener("click", handelOnClick);
            });
        }, 500);
    }

    function handelSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = formData.get("search-box");
        window.location.href = `/?q=${value}`;
    }

    function handelSearchOnChange(e) {
        const value = e.target.value;
        const el = document.querySelector(`.${styles['search-box-border']}`);
        if (value !== "") {
            el.style.setProperty("--after-display", "none");
        } else {
            el.style.setProperty("--after-display", "inline-block");
        }
    }

    useEffect(() => {
        const handelKeyDown = (e) => {
            if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
                return;
            }

            const key = e.key;
            if (key === "/") {
                e.preventDefault();
                const input = document.getElementById("search-box");
                if (input) {
                    input.focus();
                }
            }
        };

        const handelSearchInputFocus = () => {
            const el = document.querySelector(`.${styles['search-box-border']}`);
            el.style.outline = "5px solid rgba(116, 116, 255, 0.5)";
        };

        const handelSearchInputBlur = () => {
            const el = document.querySelector(`.${styles['search-box-border']}`);
            el.style.outline = "5px solid transparent";
        };

        document.addEventListener("keydown", handelKeyDown);
        const input = document.getElementById("search-box");
        input.addEventListener("focus", handelSearchInputFocus);
        input.addEventListener("blur", handelSearchInputBlur);

        return () => {
            document.removeEventListener("keydown", handelKeyDown);
            input.removeEventListener("focus", handelSearchInputFocus);
            input.removeEventListener("blur", handelSearchInputBlur);
        };
    }, []);

    return (
        <header>
            <nav>
                <img
                    src={logo}
                    alt="logo"
                    draggable={false}
                    className={styles.logo}
                    onClick={() => { window.location.href = "/" }}
                />
                <div className={styles["search-wrapper"]}>
                    <form onSubmit={handelSearchSubmit}>
                        <input
                            type="search"
                            placeholder="Search"
                            name="search-box"
                            id="search-box"
                            onChange={handelSearchOnChange}
                        />
                    </form>
                    <div className={styles["search-box-border"]}></div>
                </div>
                <Link to={"#"}>About us</Link>
                <Link to={"#"}>Contact</Link>
                <LogoutOrLogin />
                <img
                    src={burger_button}
                    alt="menu"
                    draggable={false}
                    className={`${styles["show-mobile"]} ${styles["burger-button"]}`}
                    onClick={showBurger}
                />

                <div className={`${styles["show-mobile"]} ${styles.burger}`}>
                    <b>SAS Market App</b>
                    <hr />
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"#"}>About us</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Contact</Link>
                        </li>
                        <li>
                            <Link to={"/item-page"}>Items</Link>
                        </li>
                        <li>
                            <LogoutOrLogin />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
