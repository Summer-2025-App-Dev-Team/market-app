import ForgetPasswordForm from "./ForgetPasswordForm"
import AuthHeading from "./AuthCardHeading"
import { Fragment } from "react"
import styles from "../../assets/css/auth.module.css"

export default function ForgetPassword() {
    return (
        <div className={styles["forget-password"]}>
            <div className={styles["auth-card"]}>
                <AuthHeading head="Reset Password" sub="or Go Back" link="/login/" />
                <ForgetPasswordForm />
            </div>
        </div>
    )
}