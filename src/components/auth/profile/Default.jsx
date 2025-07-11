import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import UserPhoto from "../../global/UserPhoto";
import styles from "../../../assets/css/profile/default.module.css";

export default function Default(props) {
    const uid = props.uid;
    const user = useAuthStore((state) => state.user);
    const [isUser, setIsUser] = useState(true);

    useEffect(() => {
        if (user === undefined) {
            return;
        }

        if (user === null || user.uid !== props.uid) {
            setIsUser(false);
        }
    }, [user]);

    return (
        <article className={styles.container}>
            <UserPhoto uid={uid} />
            {isUser ? <h1>Welcome, {user?.displayName}</h1> : <h1>Welcome to user {uid}'s profile page</h1>}
            {isUser ? <p>You can manage your listed items and bought items by clicking the sidebar.</p> : <p>You can view their listed and bought items by clicking the sidebar.</p>}
        </article>
    )
}