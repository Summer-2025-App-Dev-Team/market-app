import styles from "../../assets/css/chatbubble.module.css";

export default function ChatBubble({ message, currentUserId }) {
  const isOwnMessage = message.sender === currentUserId;

  const containerClass = `${isOwnMessage ? styles.ownContainer : styles.otherContainer}`;

  // applying both bubble class and one of own or other
  const bubbleClass = `${isOwnMessage ? styles.own : styles.other}`;

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={containerClass}>
      <div className={bubbleClass}>{message.text}</div>
      <div className={styles.timestamp}>{formattedTime}</div>
    </div>
  );
}
