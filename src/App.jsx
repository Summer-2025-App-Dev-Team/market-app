import Login from "./components/Login/Login"
import Header from "./components/Header"
import { useEffect } from "react";
import { useUserStore } from "./components/lib/userStore";
import { auth } from "./components/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function() {
    const {currentUser, isLoading, fetchUserInfo} = useUserStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user)=>{
            fetchUserInfo(user?.uid);
        });

        return () =>{
            unSub();
        }
    },[fetchUserInfo]);
  
    console.log("current user:");
    console.log(currentUser);

    return (
        <>
            {currentUser ? (
                <Header />
            ) : (
                <Login/>
            )}
            
        </>
    )
}