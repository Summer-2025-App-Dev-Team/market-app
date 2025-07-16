import ChatBubble from "./ChatBubble";
import useAuthStore from "../store/useAuthStore";
import styles from "../../assets/css/messageContainer.module.css";

export default function MessageContainer({ messages }) {
  const user = useAuthStore((state) => state.user);
  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className={styles.messagesContainer}>
      {sortedMessages.map((message) => (
        <ChatBubble key={message.id} message={message} currentUserId={user.uid} />
      ))}
    </div>
  );
}
