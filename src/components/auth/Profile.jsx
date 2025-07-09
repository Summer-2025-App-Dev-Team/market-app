import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import UserTextData from "../global/UserTextData";
import UserPhoto from "../global/UserPhoto";
import MyItem from "./profile/MyItem";
import BoughtItem from "./profile/BoughtItem";
import styles from "../../assets/css/profile.module.css"

export default function Profile() {
    const { uid } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab") || "";
    const navigate = useNavigate();

    useEffect(() => {
        console.log(tab);
    }, [tab]);

    return (
        <div className={styles.profile}>
            <ul className={styles.sidebar}>
                <li className={styles.user}>
                    <UserPhoto />
                    <div>
                        <UserTextData type="displayName" />
                        <UserTextData type="email" />
                    </div>
                </li>
                <li className={tab === "my-item" && styles["active"]} onClick={() => { setSearchParams({ tab: "my-item" }) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13.71 3.29A1 1 0 0 0 13 3H4c-.55 0-1 .45-1 1v9c0 .27.11.52.29.71l8 8c.2.2.45.29.71.29s.51-.1.71-.29l9-9a.996.996 0 0 0 0-1.41zM12 19.58l-7-7V4.99h7.59l7 7z"></path><path d="M9 7c-1.11 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path></svg>
                    <span>My Items</span>
                </li>
                <li className={tab === "bought-item" && styles["active"]} onClick={() => { setSearchParams({ tab: "bought-item" }) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M10.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M17.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M8.82 15.77c.31.75 1.04 1.23 1.85 1.23h6.18c.79 0 1.51-.47 1.83-1.2l3.24-7.4c.14-.31.11-.67-.08-.95S21.34 7 21 7H7.33L5.92 3.62C5.76 3.25 5.4 3 5 3H2v2h2.33zM19.47 9l-2.62 6h-6.18l-2.5-6z"></path></svg>
                    <span>Bought Items</span>
                </li>
            </ul>

            {tab === "my-item" && <MyItem uid={uid} className={styles["my-items"]} />}
            {tab === "bought-item" && <BoughtItem />}
        </div>
    )
}