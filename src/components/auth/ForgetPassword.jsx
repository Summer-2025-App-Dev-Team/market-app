import ForgetPasswordForm from "./ForgetPasswordForm"
import AuthHeading from "./AuthCardHeading"
import SuccessScreen from "./SuccessScreen"
import styles from "../../assets/css/auth.module.css"
import { useNavigate } from "react-router-dom"

// const styles = {
//     ...styleA,
//     ...styleB
// }

export default function ForgetPassword() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("/login");
    }

    return (
        <>
            <main className={styles["forget-password"]} id="forget-password">
                <div className={styles["auth-card"]}>
                    <AuthHeading head="Reset Password" sub="or Go Back" link="/login/" />
                    <ForgetPasswordForm />
                </div>
            </main>
        </>
    )
}