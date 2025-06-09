import "../../assets/css/Header.css";
import logo from "../../assets/images/sas-logo.png"
import LogoutOrLogin from "./LogoutOrLogin";

export default function Header() {
    return (
        <header>
            <nav>
                <img src={logo} alt="SAS logo" draggable={false} onClick={function () { window.location.href = "/" }} />
                <a href="#">Home</a>
                <a href="#">About us</a>
                <a href="#">Contact</a>
                <LogoutOrLogin/>
            </nav>
        </header>
    )
}