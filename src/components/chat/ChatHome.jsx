import { Outlet } from "react-router-dom";
import ChatRoomPreview from "./ChatRoomPreview";
import styles from "../../assets/css/chathome.module.css";

export default function ChatHome() {
    // This is the default chat home component, when there is no specific chat room selected.

    return (
        <div className={styles.container}>
            <ul className={styles.sidebar}>
                <li>
                    <h1>Your chats</h1>
                </li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li><ChatRoomPreview /></li>
                <li>SAS Market App</li>
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}