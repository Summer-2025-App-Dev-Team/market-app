import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Service from "../item-page/Service";
import UserTextData from "../global/UserTextData";
import UserPhoto from "../global/UserPhoto";
import styles from "../../assets/css/profile.module.css"

export default function Profile() {
    const { uid } = useParams();
    const [userListings, setUserListings] = useState(null);
    const [view, setView] = useState(styles["my-items"]);

    useEffect(() => {
        async function fetchUserListings() {
            const docRef = doc(db, "userListings", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data().listings;
                for (const item of data) {
                    if (
                        item.createdAt &&
                        typeof item.createdAt === "object" &&
                        "seconds" in item.createdAt &&
                        "nanoseconds" in item.createdAt
                    ) {
                        item.createdAt = new Date(
                            item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1e6
                        ).toLocaleString();
                    }
                }

                setUserListings(data);
            } else {
                // The user does not have any listings
                console.log("No such user document!");
            }
        }
        fetchUserListings();

        function handleOnClick(e) {
            if (e.target.classList.contains(styles.active) || e.target.classList.contains(styles.user)) return;

            try {
                document.querySelector(`li.${styles.active}`).classList.remove(styles.active);
            }
            catch { };
            e.target.classList.add(styles.active);

            const targetArticle = e.target.getAttribute("forclass");
            setView(targetArticle);
        }

        document.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", handleOnClick);
        });
        document.querySelectorAll("article").forEach(article => {
            if (!article.classList.contains(view)) {
                article.classList.add(styles.hide);
            } else {
                article.classList.remove(styles.hide);
            }
        })

        return () => {
            document.querySelectorAll("li").forEach(li => {
                li.removeEventListener("click", handleOnClick);
            });
        }
    }, [uid, view]);

    function changeView(className) {

    }

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
                <li className={styles["active"]} forclass={styles["my-items"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13.71 3.29A1 1 0 0 0 13 3H4c-.55 0-1 .45-1 1v9c0 .27.11.52.29.71l8 8c.2.2.45.29.71.29s.51-.1.71-.29l9-9a.996.996 0 0 0 0-1.41zM12 19.58l-7-7V4.99h7.59l7 7z"></path><path d="M9 7c-1.11 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path></svg>
                    <span>My Items</span>
                </li>
                <li forclass={styles["bought-items"]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M10.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M17.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M8.82 15.77c.31.75 1.04 1.23 1.85 1.23h6.18c.79 0 1.51-.47 1.83-1.2l3.24-7.4c.14-.31.11-.67-.08-.95S21.34 7 21 7H7.33L5.92 3.62C5.76 3.25 5.4 3 5 3H2v2h2.33zM19.47 9l-2.62 6h-6.18l-2.5-6z"></path></svg>
                    <span>Bought Items</span>
                </li>
                <li forclass={styles.settings}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m22,12.5v-1h-1.03c-.04-.78-.18-1.54-.41-2.26l.95-.37-.36-.93-.95.37c-.38-.85-.89-1.62-1.5-2.3l.73-.73-.71-.71-.73.73c-.57-.51-1.2-.95-1.89-1.3l.42-.93-.91-.41-.42.94c-.84-.32-1.75-.52-2.69-.57v-1.03h-1v1.03c-.78.04-1.54.18-2.26.41l-.37-.95-.93.36.37.95c-.85.38-1.62.89-2.3,1.5l-.73-.73-.71.71.73.73c-.51.57-.95,1.2-1.3,1.89l-.93-.42-.41.91.94.42c-.32.84-.52,1.75-.57,2.69h-1.03v1h1.03c.04.78.18,1.54.41,2.26l-.95.37.36.93.95-.37c.38.85.89,1.62,1.5,2.3l-.73.73.71.71.73-.73c.57.51,1.2.95,1.89,1.3l-.42.93.91.41.42-.94c.84.32,1.75.52,2.69.57v1.03h1v-1.03c.78-.04,1.54-.18,2.26-.41l.37.95.93-.36-.37-.95c.85-.38,1.62-.89,2.3-1.5l.73.73.71-.71-.73-.73c.51-.57.95-1.2,1.3-1.89l.93.42.41-.91-.94-.42c.32-.84.52-1.75.57-2.69h1.03Zm-10-7.5c3.1,0,5.72,2.02,6.65,4.81l-4.05.71c-.52-.91-1.48-1.53-2.6-1.53-.37,0-.72.08-1.05.2l-2.64-3.14c1.07-.67,2.33-1.06,3.68-1.06Zm1,7c0,.55-.45,1-1,1s-1-.45-1-1,.45-1,1-1,1,.45,1,1Zm-4.31,6.17c-2.2-1.18-3.69-3.5-3.69-6.17,0-1.79.68-3.42,1.79-4.66l2.64,3.14c-.26.45-.42.96-.42,1.51,0,.93.43,1.75,1.1,2.3l-1.41,3.86Zm3.31.83c-.49,0-.97-.05-1.43-.15l1.4-3.85s.02,0,.03,0c1.49,0,2.71-1.08,2.95-2.5l4.04-.71c0,.07.01.14.01.22,0,3.86-3.14,7-7,7Z"></path></svg>
                    <span>Settings</span>
                </li>
            </ul>

            <article className={styles["my-items"]}>
                {
                    userListings ?
                        userListings.map((listing) => {
                            return (
                                <Service
                                    name={listing.name}
                                    price={listing.price}
                                    image={listing.image}
                                    description={listing.description}
                                    availableUntil={listing.availableUntil}
                                    id={listing.id}
                                />
                            )
                        })
                        :
                        <div>
                            <h2>There are 2 reasons why you might see this:</h2>
                            <p>1. Your profile does not have any listings</p>
                            <p>2. The web-page is still loading</p>
                        </div>
                }
            </article>

            <article className={styles["bought-items"]}>
                <h1>Bought items</h1>
                <p>Work in Progress!</p>
            </article>

            <article className={styles.settings}>
                <h1>Settings</h1>
                <p>Work in Progress!</p>
            </article>
        </div>
    )
}