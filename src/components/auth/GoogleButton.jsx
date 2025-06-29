import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAuthStore from "../store/useAuthStore";
import google_logo from "/google-logo.png";
import { doc, setDoc } from "firebase/firestore";
import styles from "../../assets/css/auth.module.css"

export default function GoogleLoginButton(props) {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Signed in user:", user);

      setUser(user, true);

      if (result._tokenResponse?.isNewUser) {
        const userDocRef = doc(db, "userListings", user.uid);
        await setDoc(userDocRef, {
          name: user.displayName,
          photoURL: user.photoURL || null,
          chats:[],
          listings: []
        });
      }



    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button onClick={handleLogin} className={styles["google-button"]}>
      <img
        src={google_logo}
        alt="Google logo"
      />
      {props.mode == "signin" ? "Sign in" : "Sign up"} with Google
    </button>
  );
}
