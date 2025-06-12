import Header from "../global/Header"
import Footer from "../global/Footer"
import AuthHeading from "./AuthCardHeading";
import '../../assets/css/auth.css';
import GoogleButton from "./GoogleButton"
import LoginForm from "./LoginForm";
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Login() {
    const user = useAuthStore((state) => state.user);
    if (!(user == null)) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header />
            <main className="login">
                {/* TODO: Remove the commented lines if not needed */}
                {/* <div className="auth-background"> */}
                <div className="auth-card">
                    <AuthHeading head="Log in" sub="or Sign Up" link="/signup" />
                    <LoginForm />
                    <GoogleButton mode="signin" />
                </div>
                {/* </div> */}
            </main>
            <Footer />
        </>
    )
}