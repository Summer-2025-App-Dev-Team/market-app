import { Link } from "react-router-dom";
import userPlaceholder from "../../assets/images/avatar-placeholder.png";
import styles from "../../assets/css/chatroompreview.module.css";

export default function ChatRoomPreview() {
    // This component is used to display a preview of a chat room in the chat sidebar.
    // It shows the room name and the last message sent in the room.

    return (
        <Link to={"/chat/12356789"} className={styles.chatPreview}>
            <img src={userPlaceholder} alt="user" draggable={false} />
            <div>
                <h2>Username</h2>
                <p>Last message sent</p>
            </div>
        </Link>
    );
}