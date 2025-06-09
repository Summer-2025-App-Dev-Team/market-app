import Header from "../global/Header"
import Footer from "../global/Footer"
import AuthHeading from "./AuthCardHeading";
import '../../assets/css/auth.css';
import '../../assets/css/signup.css';
import GoogleButton from "./GoogleButton"
import SignUpForm from "./SignUpForm";

export default function SignUp() {
    return (
        <>
            <Header/>
            <main>
                <div className="auth-background">
                    <div className="auth-card">
                        <AuthHeading head="Sign Up" sub="or Log in"/>
                        <SignUpForm/>
                        <GoogleButton mode="signup"/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}


