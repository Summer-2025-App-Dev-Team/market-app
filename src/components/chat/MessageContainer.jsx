import ChatBubble from "./ChatBubble";
import useAuthStore from "../store/useAuthStore"; 

export default function MessageContainer({ messages }) {
  const user = useAuthStore((state) => state.user);

  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div>
      {sortedMessages.map((message) => (
        <ChatBubble key={message.id} message={message} currentUserId={user.uid}/>
      ))}
    </div>
  );
}
