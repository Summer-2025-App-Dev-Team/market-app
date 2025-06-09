import useAuthStore from '../store/useAuthStore';


export default function ProfileOrLogin(){
    const user = useAuthStore((state) => state.user);
    if (user==null){
        return (
            <a href="login/">Login</a>
        )
    } else{
        return (
            <a href="Profile/">Profile</a>
        )
    }
}