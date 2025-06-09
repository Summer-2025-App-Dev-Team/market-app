import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import "./App.css";
import useAuthStore from './components/store/useAuthStore';

export default function() {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            <Header />
            <p>Welcome, {user.displayName || user.email}</p>
            <p>User ID: {user.uid}</p>
            <Footer />
        </>
    )
}