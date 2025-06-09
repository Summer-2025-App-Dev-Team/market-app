import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/Login.css";
import GoogleButton from "./GoogleSignInButton";

export default function () {
    return (
        <>
            <Header />
            <main>
                <div className="login-card">
                    <h1>Log in</h1>
                    {/* TODO: update url instead of "#" */}
                    <h2>or <a href="#">Sign Up</a></h2>
                    <form className="input-form">
                        <input type="email" placeholder="Email"></input>
                        <input type="password" placeholder="Password"></input>
                        <button>Log in</button>
                    </form>
                    <GoogleButton />
                </div>
            </main>
            <Footer />
        </>
    )
}