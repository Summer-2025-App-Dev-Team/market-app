import { useLocation, useNavigate } from "react-router-dom";
import AuthHeading from "./AuthCardHeading";
import tick_symbol from "/tick-symbol.png";
import styleA from "../../assets/css/successscreen.module.css";
import styleB from "../../assets/css/auth.module.css";

export default function SuccessScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get("type");

    const message = {
        confirm: {
            title: "Email Verified!",
            message: "You are now logged in",
            buttonOnClick: () => {
                navigate("/");
            },
            buttonText: "Return to homepage"
        },
        reset: {
            title: "Password Reset!",
            message: "You can now login again",
            buttonOnClick: () => {
                navigate("/login");
            },
            buttonText: "Return to login"
        }
    }

    const styles = {
        ...styleA,
        ...styleB
    }

    return (
        <div className={styles["success-screen"]} id="success-screen">
            <div className={`${styles["auth-card"]} ${styles["success-card"]}`}>
                <AuthHeading head={message[type].title} />
                <h2>{message[type].message}</h2>
                <img src={tick_symbol} alt="tick-symbol.png" draggable={false} />
                <button onClick={message[type].buttonOnClick}>{message[type].buttonText}</button>
            </div>
        </div>
    )
}