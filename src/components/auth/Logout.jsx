import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      console.log("User logged out");
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
}
