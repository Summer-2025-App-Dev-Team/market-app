import ForgetPasswordForm from "./ForgetPasswordForm"
import AuthHeading from "./AuthCardHeading"
import { Link } from "react-router-dom"
import tick_symbol from "../../assets/images/tick-symbol.png"
import styleA from "../../assets/css/auth.module.css"
import styleB from "../../assets/css/forgetpassword.module.css"

const styles = {
    ...styleA,
    ...styleB
}

export default function ForgetPassword() {
    return (
        <>
            <main className={styles["forget-password"]} id="forget-password">
                <div className={styles["auth-card"]}>
                    <AuthHeading head="Reset Password" sub="or Go Back" link="/login/" />
                    <ForgetPasswordForm />
                </div>
            </main>
            <main className={styles["success-screen"]} id="success-screen">
                <div className={`${styles["auth-card"]} ${styles["success-card"]}`}>
                    <AuthHeading head="Email Sent!" />
                    <h2>Please check your mailbox</h2>
                    <img src={tick_symbol} alt="tick-symbol.png" />
                    <Link to={"/login"}>
                        <button>Go back to login page</button>
                    </Link>
                </div>
            </main>
        </>
    )
}