import styles from "../../assets/css/chatroompreview.module.css";

export default function ChatRoomPreview({ room }) {
    // This component is used to display a preview of a chat room in the chat sidebar.
    // It shows the room name and the last message sent in the room.

    if (!room) {
        return null; // If no room data is provided, return null to avoid rendering.
    }

    return (
        <li>
            <img src={room.avatar} alt={room.name} />
            <div>
                <h2>{room.name}</h2>
                <p>{room.lastMessage}</p>
            </div>
        </li>
    );
}