import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore"
import { useNavigate, useParams } from "react-router-dom";
import { realtimedb } from "../lib/firebase";
import { ref, set, onValue, off } from "firebase/database";
import MessageContainer from "./MessageContainer"

export default function Chat() {
    const user = useAuthStore((state) => state.user);
    const {uid: chatId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        if (user === undefined) {
            // If the user is still loading, do nothing
            return;
        }

        if (user === null) {
            alert("You must be logged in to view this page.");
            navigate("/login");
            return;
        }

        // Check if the user is trying to access their own chat
        

        // console.log(`User ${user.uid} is trying to chat with user ${targetUID}`);
    }, [user, navigate]);


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const chatRef = ref(realtimedb, `chats/${chatId}/chats`);

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

        return () => off(chatRef);
    }, [chatId])

    async function handleSubmit(e){
        e.preventDefault()
        const messageId = crypto.randomUUID();
        const time = Date.now()
        const messageRef = ref(realtimedb, `chats/${chatId}/chats/${messageId}`);
        
        await set(messageRef, {
        sender: user.uid,
        text: input,
            timestamp: time,
        
        }
        );
        console.log("Message sent:", time);

    }

    return (
        <div>
            <h1>Chat</h1>
            <MessageContainer messages={messages}/>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Send</button>
        </div>
    )
}