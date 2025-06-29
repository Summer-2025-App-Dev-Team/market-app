import styles from "../../assets/css/chat.module.css";

export default function ChatBubble({ message, currentUserId }) {
  const isOwnMessage = message.sender === currentUserId;

  const containerClass = `${styles.container} ${
    isOwnMessage ? styles.own : styles.other
  }`;

  const bubbleClass = `${styles.bubble} ${
    isOwnMessage ? styles.bubbleOwn : styles.bubbleOther
  }`;

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
