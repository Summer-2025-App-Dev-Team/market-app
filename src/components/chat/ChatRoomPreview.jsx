import { Link } from "react-router-dom";
import userPlaceholder from "/avatar-placeholder.png";
import styles from "../../assets/css/chatroompreview.module.css";
import { useEffect, useState } from "react";
import { realtimedb , db} from "../lib/firebase";
import { ref, onValue, off} from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";

export default function ChatRoomPreview({chatId}) {
    // This component is used to display a preview of a chat room in the chat sidebar.
    // It shows the room name and the last message sent in the room.
    const user = useAuthStore((state) => state.user);

    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState("User");

    useEffect(() => {
        const chatRef = ref(realtimedb, `chats/${chatId}/chats`);
        const userRef = ref(realtimedb, `chats/${chatId}`) 

        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const msgs = Object.entries(data).map(([id, msg]) => ({
                id,
                ...msg
                }));
                setMessages(msgs);
            } else {
                setMessages([]);
            }
        });

        const unsubscribe2 = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            let userId;
            if (data.user1 !== user.uid) {
            userId = data.user1;
            } else {
            userId = data.user2;
            }

            const fetchUser = async () => {
            try {
                const userDocRef = doc(db, "userListings", userId);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists()) {
                setOtherUser(userSnap.data().name);
                }
            } catch (error) {
                console.error("Failed to fetch user name:", error);
            }
            };

            fetchUser();
        }
        });


        return () => off(chatRef, userRef);
    }, [chatId])


    return (
        <Link to={"/chat/12356789"} className={styles.chatPreview}>
            <img src={userPlaceholder} alt="user" draggable={false} />
            <div>
                <h2>{otherUser}</h2>
                <p>{messages.length == 0 ? "" :messages[messages.length-1].text}</p>
            </div>
        </Link>
    );
}