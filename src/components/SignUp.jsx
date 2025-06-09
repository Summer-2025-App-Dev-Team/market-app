import Header from "./Header"
import Footer from "./Footer"
import AuthHeading from "./AuthCardHeading";
import '../assets/css/auth.css';
import '../assets/css/signup.css';
import GoogleButton from "./GoogleButton"

export default function SignUp() {
    return (
        <>
            <Header/>
            <main>
                <div className="auth-background">
                    <div className="auth-card">
                        <AuthHeading head="Sign Up" sub="or Log in"/>
                        <form className="input-form"> 
                            <input type="text" defaultValue={"Name"}></input>
                            <input type="email" defaultValue={"Email"}></input>
                            <div class="password">
                                <input type="text" defaultValue={"Password"}></input>
                                <input type="text" defaultValue={"Confirm Password"}></input>
                            </div>
                            <button>Log in</button>
                        </form>
                        <GoogleButton mode="signup"/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}