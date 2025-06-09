import Header from "../global/Header"
import Footer from "../global/Footer"
import AuthHeading from "./AuthCardHeading";
import '../../assets/css/auth.css';
import GoogleButton from "./GoogleButton"
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <>
            <Header />
            <main>
                <div className="auth-background">
                    <div className="auth-card">
                        <AuthHeading head="Log in" sub="or Sign Up"/>
                        <LoginForm/>
                        <GoogleButton mode="signin"/>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}