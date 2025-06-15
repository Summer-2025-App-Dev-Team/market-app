import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAuthStore from "../store/useAuthStore";
import google_logo from "../../assets/images/google-logo.png";
import { doc, setDoc } from "firebase/firestore";

export default function GoogleLoginButton(props) {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log("Signed in user:", user);

      setUser(user);

      if (result._tokenResponse?.isNewUser) {
        console.log("New user signed up!");
        
        userDocRef = doc(db, "userListings", user.uid);
        const userListings = [];
        userDoc = setDoc(userDocRef, userListings); 
      }

      

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button onClick={handleLogin} className="google-button">
      <img
        src={google_logo}
        alt="Google logo"
        // Moved this to .css file
        // style={{ width: "18px", height: "18px", marginRight: "10px" }}
      />
      {props.mode=="signin" ? "Sign in" : "Sign up"} with Google
    </button>
  );
}
