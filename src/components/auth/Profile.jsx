import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import UserTextData from "../global/UserTextData";
import UserPhoto from "../global/UserPhoto";
import styles from "../../assets/css/profile.module.css"

export default function Profile() {
    const { uid } = useParams();
    const [userListings, setUserListings] = useState(null);

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
            if (e.target.classList.contains(styles.active) || e.target.classList.contains(styles.user || e.target.tagName !== "LI")) return;

            try {
                document.querySelector(`li.${styles.active}`).classList.remove(styles.active);
            }
            catch { };
            e.target.classList.add(styles.active);
        }

        document.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", handleOnClick);
        });

        return () => {
            document.querySelectorAll("li").forEach(li => {
                li.removeEventListener("click", handleOnClick);
            });
        }
    }, [uid]);

    return (
        <main className={styles.profile}>
            <ul className={styles.sidebar}>
                <li className={styles.user}>
                    <UserPhoto />
                    <div>
                        <UserTextData type="displayName" />
                        <UserTextData type="email" />
                    </div>
                </li>
                <li>
                    <i class='bx bx-price-tag'></i>
                    <span>My Items</span>
                </li>
                <li>
                    <i class='bx bx-cart'></i>
                    <span>Bought Items</span>
                </li>
                <li>
                    <i class='bx bx-gear'></i>
                    <span>Settings</span>
                </li>
            </ul>
            <ul>
                {/* {
                    userListings ?
                        userListings.map((listing) => {
                            return (
                                <li>
                                    <h2>{listing.name}</h2>
                                    <ul>
                                        <li>Price: {listing.price}</li>
                                        <li>Description: {listing.description}</li>
                                        <li>Price: {listing.price}</li>
                                        <li>Created at: {listing.createdAt}</li>
                                        <li>Available until: {listing.availableUntil}</li>
                                        <li><Link to={`/item/${listing.id}`}>Link to item</Link></li>
                                    </ul>
                                    <br />
                                </li>
                            )
                        })
                        :
                        <div>
                            <h2>There are 2 reasons why you might see this:</h2>
                            <p>1. Your profile does not have any listings</p>
                            <p>2. The web-page is still loading</p>
                        </div>
                } */}
            </ul>
        </main>
    )
}