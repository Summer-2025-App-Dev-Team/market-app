import { Link } from "react-router-dom"
import LogoutOrLogin from "./LogoutOrLogin"

export default function MobileHeader() {
    return (
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
    )
}