import Header from "./Header"
import Footer from "./Footer"
import '../login.css';
import GoogleButton from "./GoogleSignInButton"

export default function () {
    return (
        <>
            <Header/>
            <main>
                <div className="login-background">
                    <div className="login-card">
                        <h1>Log in</h1>
                        <h2>or Sign Up</h2>
                        <form className="input-form"> 
                            <input type="email" defaultValue={"Email"}></input>
                            <input type="password" defaultValue={"Password"}></input>
                            <button>Log in</button>
                        </form>
                        <GoogleButton/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}