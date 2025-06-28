import styles from "../../assets/css/chathome.module.css";
import { Outlet } from "react-router-dom";

export default function ChatHome() {
    // This is the default chat home component, when there is no specific chat room selected.

    return (
        <div className={styles.container}>
            <ul className={styles.sidebar}>
                <li>
                    <h1>Your chats</h1>
                </li>
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}