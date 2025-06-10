import useAuthStore from '../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function LogoutOrLogin() {
    const user = useAuthStore((state) => state.user);
    if (user == null) {
        return (
            <Link to={"/login"}>Login</Link>
        )
    } else {
        return (
            <Link to={"/logout"}>Logout</Link>
        )
    }
}