import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuthStore from "../store/useAuthStore";

export default function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      console.log("User logged out");
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
