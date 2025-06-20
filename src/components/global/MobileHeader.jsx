import { Link } from "react-router-dom"
import styles from "../../assets/css/header.module.css"
import LogoutOrLogin from "./LogoutOrLogin"

export default function MobileHeader() {
    return (
        <div className={`${styles["show-mobile"]} ${styles.burger}`}>
            <b>SAS Market App</b>
            <hr />
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"about"}>About us</Link></li>
                <li><Link to={"contact"}>Contact</Link></li>
                <li><LogoutOrLogin /></li>
            </ul>
        </div>
    )
}