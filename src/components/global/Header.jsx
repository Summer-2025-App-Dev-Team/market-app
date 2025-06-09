import "../../assets/css/Header.css";
import "../../assets/images/sas-logo.png"
import ProfileOrLogin from "./ProfileOrLogin";

export default function Header() {
    return (
        <header>
            <nav>
                <img src="/src/assets/images/sas-logo.png" alt="SAS logo" draggable={false} onClick={function () { window.location.href = "/" }} />
                <a href="#">Home</a>
                <a href="#">About us</a>
                <a href="#">Contact</a>
                <ProfileOrLogin/>
            </nav>
        </header>
    )
}