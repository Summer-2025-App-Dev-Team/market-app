import AuthHeading from "./AuthCardHeading";
import '../../assets/css/auth.css';
import '../../assets/css/signup.css';
import GoogleButton from "./GoogleButton"
import SignUpForm from "./SignUpForm";
import useAuthStore from '../store/useAuthStore';
import { Navigate } from "react-router-dom";

export default function SignUp() {
    const user = useAuthStore((state) => state.user);
    if (!(user == null)) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <main className="signup">
                <div className="auth-background">
                    <div className="auth-card">
                        <AuthHeading head="Sign Up" sub="or Log in" link="/login" />
                        <SignUpForm />
                        <GoogleButton mode="signup" />
                    </div>
                </div>
            </main>
        </>
    )
}


