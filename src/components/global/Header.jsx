import "../../assets/css/header.css";
import logo from "../../assets/images/sas-logo.png"
import burger_button from "../../assets/svgs/burger-button.svg";
import LogoutOrLogin from "./LogoutOrLogin";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
    function showBurger() {
        document.querySelector(".burger").classList.add("show");

        // TODO: need to be improved, tbh setTimeout is not a good solution
        setTimeout(() => {
            document.addEventListener("click", function handelOnClick(e) {
                if (e.target.classList.contains("burger")) return;
                document.querySelector(".burger").classList.remove("show");
                document.removeEventListener("click", handelOnClick);
            });
        }, 500);
    }

    function handelSearchOnChange(e) {
        console.log(e.target.value);
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
        }

        document.addEventListener("keydown", handelKeyDown);

        return () => {
            document.removeEventListener("keydown", handelKeyDown);
        };
    }, []);

    return (
        <header>
            <nav>
                <img src={logo} alt="SAS logo" draggable={false} className="sas-logo" onClick={function () { window.location.href = "/" }} />
                <div className="search-wrapper">
                    <input type="search" placeholder="Search" name="search-box" id="search-box" onChange={handelSearchOnChange} />
                    <div className="search-box-border"></div>
                </div>
                {/* Removed the Home Link because there is already the school logo */}
                {/* <Link to={"/"}>Home</Link> */}
                <Link to={"#"}>About us</Link>
                <Link to={"#"}>Contact</Link>
                <LogoutOrLogin />
                <img src={burger_button} alt="menu" draggable={false} className="show-mobile burger-button" onClick={showBurger} />

                <div className="show-mobile burger">
                    <b>SAS Market App</b>
                    <hr />
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"#"}>About us</Link></li>
                        <li><Link to={"#"}>Contact</Link></li>
                        <li><LogoutOrLogin /></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}