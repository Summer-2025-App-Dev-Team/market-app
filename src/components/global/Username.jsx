import useAuthStore from '../store/useAuthStore';

export default function LogoutOrLogin() {
    const user = useAuthStore((state) => state.user);
    let username = "";
    try {
        username = user.displayName
    }
    catch (err) {
        console.log("Error:", err);
    };

    // Still loading
    if (user === undefined || user === null) {
        return null;
    }

    return (
        <span>{username}</span>
    )
}