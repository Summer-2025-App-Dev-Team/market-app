import { Outlet } from "react-router-dom";
import ChatRoomPreview from "./ChatRoomPreview";
import styles from "../../assets/css/chathome.module.css";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useChatStore from "../global/chatStore";

export default function ChatHome() {
  const chatStore = useChatStore((state) => state.rtdb); //zustand chat storage

  // This is the default chat home component, when there is no specific chat room selected.

  return (
    <div className={styles.container}>
      <ul className={styles.sidebar}>
        <li>
          <h1>Your chats</h1>
        </li>

        {chatStore !== undefined && chatStore != null && chatStore != [] ? (
          Object.entries(chatStore).map(([chatid, chatdata]) => {
            return (
              <li key={chatid}>
                {/*//chatid is the chatID*/}
                <ChatRoomPreview chatId={chatid} />
              </li>
            );
          })
        ) : (
          <li>You have no chats!</li>
        )}

        <li>SAS Market App</li>
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
