import "../../assets/css/header.css";
import logo from "../../assets/images/sas-logo.png"
import burger_button from "../../assets/icons/burger-button.svg";
import LogoutOrLogin from "./LogoutOrLogin";
import { Link } from "react-router-dom";

export default function Header() {
    function showBurger() {
        document.querySelector(".burger").classList.add("show");

        // TODO: not a really good solution tbh, the setTimeOut can be improved
        setTimeout(() => {
            document.addEventListener("click", function handelOnClick(e) {
                if (e.target.classList.contains("burger")) return;
                document.querySelector(".burger").classList.remove("show");
                document.removeEventListener("click", handelOnClick);
            });
        }, 500);
    }

    return (
        <header>
            <nav>
                <img src={logo} alt="SAS logo" draggable={false} className="sas-logo" onClick={function () { window.location.href = "/" }} />
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About us</Link>
                <Link to={"/contact"}>Contact</Link>
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