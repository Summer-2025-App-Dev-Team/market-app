import Header from "./Header"
import Footer from "./Footer"
import AuthHeading from "./AuthCardHeading";
import '../assets/css/auth.css';
import GoogleButton from "./GoogleButton"

export default function Login() {
    return (
        <>
            <Header />
            <main>
                <div className="auth-background">
                    <div className="auth-card">
                        <AuthHeading head="Log in" sub="or Sign Up"/>
                        <form className="input-form"> 
                            <input type="email" placeholder={"Email"}></input>
                            <input type="password" placeholder={"Password"}></input>
                            <button>Log in</button>
                        </form>
                        <GoogleButton mode="signin"/>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}