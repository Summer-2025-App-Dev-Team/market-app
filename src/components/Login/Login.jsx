import { useState } from "react"
import "./Login.css"
import {toast, ToastContainer} from "react-toastify"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import upload from "../lib/upload"

export default function () {
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    });

    const handleLogin = async (e) =>{
        e.preventDefault();
        console.log("logging in");
        setLoading(true);

        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);
        try{
            await signInWithEmailAndPassword(auth, email, password);
        } catch(err){
            console.log(err);
            toast.warn("an error occured: ");
            toast.warn(err.message);
        } finally {
            setLoading(false);
        }

        toast.success("login");
    }
    const handleRegister = async (e) =>{
        e.preventDefault();
        console.log("registering");
        setLoading(true);

        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);
        try{
            if (!email || !password || password.length < 6) {
                toast.error("Please enter a valid email and a password with at least 6 characters.");
                return;
            }
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email, 
                avatar: imgUrl,
                id: res.user.uid,
            });

            await setDoc(doc(db, "userListings", res.user.uid), {
                listings: []
            });
            
            toast.success("account created")
        } catch(err){
            console.log(err);
            toast.warn("an error occured: ");
            toast.warn(err.message);
        } finally {
            setLoading(false);
        }

        toast.success("register");
    }
    const handleAvatar = (e) =>{
        e.preventDefault();
        console.log("handling avatar");
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
        toast.success("avatar handled");
    }
    return (
        <div className="login">
            <ToastContainer position="bottom-right"/>
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="text" placeholder="password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Login"}</button>
                </form>
            </div>
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleAvatar}/>
                    <input type="text" placeholder="username" name="username"/>
                    <input type="text" placeholder="email" name="email"/>
                    <input type="text" placeholder="password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Login"}</button>
                </form>
            </div>
        </div>
    )
}