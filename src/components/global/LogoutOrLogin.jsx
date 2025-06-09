import useAuthStore from '../store/useAuthStore';


export default function LogoutOrLogin(){
    const user = useAuthStore((state) => state.user);
    if (user==null){
        return (
            <a href="/login">Login</a>
        )
    } else{
        return (
            <a href="/logout">Logout</a>
        )
    }
}