import AuthHeading from "./AuthCardHeading";
import GoogleButton from "./GoogleButton";
import SignUpForm from "./SignUpForm";
import { Fragment } from "react";
import stylesA from "../../assets/css/auth.module.css";
import stylesB from "../../assets/css/signup.module.css";

const styles = {
    ...stylesA,
    ...stylesB,
};

export default function SignUp() {
    return (
        <div className={styles["signup"]}>
            <div className={styles["auth-background"]}>
                <div className={styles["auth-card"]}>
                    <AuthHeading head="Sign Up" sub="or Log in" link="/login" />
                    <SignUpForm />
                    <GoogleButton mode="signup" />
                </div>
            </div>
        </div>
    );
}
