import AuthHeading from "./AuthCardHeading";
import styles from '../../assets/css/auth.module.css';
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
        <main className={styles.login}>
            <div className={styles['auth-card']}>
                <AuthHeading head="Log in" sub="or Sign Up" link="/signup" />
                <LoginForm />
                <GoogleButton mode="signin" />
            </div>
        </main>
    )
}