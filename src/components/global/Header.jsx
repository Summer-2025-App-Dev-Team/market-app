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

    function handelSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = formData.get("search-box");
        window.location.href = `/?q=${value}`;
    }

    function handelSearchOnChange(e) {
        const value = e.target.value;
        if (value !== "") {
            document.querySelector(".search-box-border").style.setProperty("--after-display", "none");
        } else {
            document.querySelector(".search-box-border").style.setProperty("--after-display", "inline-block");
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
        }

        const handelSearchInputFocus = (e) => {
            document.querySelector(".search-box-border").style.outline = "5px solid rgba(116, 116, 255, 0.5)";
        }

        const handelSearchInputBlur = (e) => {
            document.querySelector(".search-box-border").style.outline = "5px solid transparent";
        }

        document.addEventListener("keydown", handelKeyDown);
        document.getElementById("search-box").addEventListener("focus", handelSearchInputFocus);
        document.getElementById("search-box").addEventListener("blur", handelSearchInputBlur);

        return () => {
            document.removeEventListener("keydown", handelKeyDown);
            document.getElementById("search-box").removeEventListener("focus", handelSearchInputFocus);
            document.getElementById("search-box").removeEventListener("blur", handelSearchInputBlur);
        };
    }, []);

    return (
        <header>
            <nav>
                <img src={logo} alt="SAS logo" draggable={false} className="sas-logo" onClick={function () { window.location.href = "/" }} />
                <div className="search-wrapper">
                    <form onSubmit={handelSearchSubmit}>
                        <input type="search" placeholder="Search" name="search-box" id="search-box" onChange={handelSearchOnChange} />
                    </form>
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