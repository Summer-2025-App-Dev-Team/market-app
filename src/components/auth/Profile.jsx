import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
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
    }, [uid]);

    return (
        <main className={styles.profile}>
            <h1 className={styles.h1}>Profile Page</h1>
            <ul>
                {
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
                }
            </ul>
        </main>
    )
}