import { Outlet } from "react-router-dom";
import ChatRoomPreview from "./ChatRoomPreview";
import styles from "../../assets/css/chathome.module.css";
import { ref, getDatabase, set } from "firebase/database";
import { auth, db, realtimeDB } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

useEffect(() => {
    //runs when the component mounts and in reloads
    function unsubscribe {
    
    
        function getUser() {
            onAuthStateChanged(
                auth,
                /*runs when page loads, user logs in, or user logs out. Used cuz currentUser doesn't wait until the website finishes getting user info*/
                (user) => {
                    /*passed current user object or null if empty. function that will be called whenever the user status changes*/
                    const user = auth.currentUser;
                    if (user) {
                        console.log("current user", user);
                    } else {
                        console.log("No user is loged in");
                    }

                }
            )
    
    
    
        }
    }
}, []);
    



const chatsRef = ref(realtimeDB, "chats/");
set(chatsRef, {});
export default function ChatHome() {
  // This is the default chat home component, when there is no specific chat room selected.

  return (
    <div className={styles.container}>
      <ul className={styles.sidebar}>
        <li>
          <h1>Your chats</h1>
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>
          <ChatRoomPreview />
        </li>
        <li>SAS Market App</li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
