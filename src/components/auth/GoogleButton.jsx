import React from "react";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAuthStore from "../store/useAuthStore";

export default function GoogleLoginButton(props) {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user)
      console.log("Signed in user:", user);

      if (result._tokenResponse?.isNewUser) {
        console.log("New user signed up!");
      }

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        marginTop:"10px",
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        width: "100%",
        color: "#555",
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "Roboto, sans-serif",
        cursor: "pointer",
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
        style={{ width: "18px", height: "18px", marginRight: "10px" }}
      />
      {props.mode=="signin" ? "Sign in" : "Sign up"} in with Google
    </button>
  );
}
