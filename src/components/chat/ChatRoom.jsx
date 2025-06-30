import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";


export default function Chat() {
  const user = useAuthStore((state) => state.user);
  const { uid: targetUID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (user === undefined) {
      // If the user is still loading, do nothing
      return;
    }

    if (user === null) {
      // If the user is not logged in, redirect to the login page
      alert("You must be logged in to view this page.");
      navigate("/login");
      return;
    }

    // Check if the user is trying to access their own chat
    if (targetUID === user.uid) {
      // If the user is trying to access their own chat, redirect to the profile page
      alert("You cannot chat with yourself.");
      navigate("/");
      return;
    }

    console.log(`User ${user.uid} is trying to chat with user ${targetUID}`);
  }, [user, targetUID, navigate]);

  return (
    <div>
      <h1>Chat</h1>
      <p>This is the chat component.</p>
      {/* Add your chat functionality here */}
    </div>
  );
}
