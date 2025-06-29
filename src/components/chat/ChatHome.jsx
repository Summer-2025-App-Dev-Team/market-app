import { Outlet } from "react-router-dom";
import ChatRoomPreview from "./ChatRoomPreview";
import styles from "../../assets/css/chathome.module.css";
import { db } from "../lib/firebase";
import { doc, getDoc} from "firebase/firestore";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore"

export default function ChatHome() {
    // This is the default chat home component, when there is no specific chat room selected.
    const [chats, setChats] = useState([]);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user) return;
            const userDocRef = doc(db, "userListings", user.uid);
            const userSnap = await getDoc(userDocRef);
            const chats = userSnap.data()?.chats ?? [];
            setChats(chats);
        };
        fetchChats();
    }, [user]);


    return (
        <div className={styles.container}>
            <ul className={styles.sidebar}>
                <li>
                    <h1>Your chats</h1>
                </li>

                {chats.map((chat) => {
                    return (
                        <li key={chat}>
                        <ChatRoomPreview chatId={chat} />
                        </li>
                    );
                })}

                <li>SAS Market App</li>
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}