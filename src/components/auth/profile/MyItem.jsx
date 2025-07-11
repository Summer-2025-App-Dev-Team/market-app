import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingModel from "../../global/LoadingModal";
import Service from "../../item-page/Service";
import styles from "../../../assets/css/profile/myitem.module.css";

export default function MyItem(props) {
    const uid = props.uid;
    const [userListings, setUserListings] = useState(null);

    useEffect(() => {
        async function fetchUserListings() {
            const docRef = doc(db, "userStuff", uid);
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
    }, []);

    return (
        <article className={styles["container"]}>
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
                                status={listing.status}
                                id={listing.id}
                            />
                        )
                    }) :
                    <LoadingModel />
            }
        </article>
    )
}