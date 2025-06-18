import AuthHeading from "./AuthCardHeading";
import GoogleButton from "./GoogleButton"
import SignUpForm from "./SignUpForm";
import useAuthStore from '../store/useAuthStore';
import { Navigate } from "react-router-dom";
import stylesA from "../../assets/css/auth.module.css";
import stylesB from "../../assets/css/signup.module.css";

const styles = {
    ...stylesA,
    ...stylesB
}

export default function SignUp() {
    const user = useAuthStore((state) => state.user);
    if (!(user == null)) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <main className={styles["signup"]}>
                <div className={styles["auth-background"]}>
                    <div className={styles["auth-card"]}>
                        <AuthHeading head="Sign Up" sub="or Log in" link="/login" />
                        <SignUpForm />
                        <GoogleButton mode="signup" />
                    </div>
                </div>
            </main>
        </>
    )
}


