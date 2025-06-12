import "../../assets/css/header.css";
import logo from "../../assets/images/sas-logo.png"
import burger_button from "../../assets/svgs/burger-button.svg";
import LogoutOrLogin from "./LogoutOrLogin";
import MobileHeader from "./MobileHeader";
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

                {/* For mobile or small screen devices */}
                <MobileHeader />
            </nav>
        </header>
    )
}