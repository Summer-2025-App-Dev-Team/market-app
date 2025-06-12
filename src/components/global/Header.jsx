import "../../assets/css/header.css";
import logo from "../../assets/images/sas-logo.png"
import burger_button from "../../assets/svgs/burger-button.svg";
import LogoutOrLogin from "./LogoutOrLogin";

export default function Header() {
    function showBurger() {
        document.querySelector(".burger").classList.add("show");
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
                <a href="#">Home</a>
                <a href="#">About us</a>
                <a href="#">Contact</a>
                <LogoutOrLogin />
                <img src={burger_button} alt="menu" draggable={false} className="show-mobile burger-button" onClick={showBurger} />

                <div className="show-mobile burger">
                    <b>SAS Market App</b>
                    <hr />
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><LogoutOrLogin /></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}