import { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingModel from "../../global/LoadingModal";
import Service from "../../item-page/Service";
import styles from "../../../assets/css/profile/myitem.module.css";

export default function MyItem(props) {
    const uid = props.uid;
    const navbarRef = useRef(null);
    const [userListings, setUserListings] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

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

    useEffect(() => {
        // Adjust the navbar
        if (selectedServices.length > 0) {
            navbarRef.current.classList.add(styles["show"]);
        } else {
            navbarRef.current.classList.remove(styles["show"]);
        }
    }, [selectedServices]);

    function handleSelectService(id) {
        const checked = event.target.checked;
        if (checked) {
            // Add the selected service to the array
            setSelectedServices(prev => [...prev, id]);
        } else {
            // Remove the selected service
            const updatedArr = selectedServices.filter(serviceId => serviceId !== id);
            setSelectedServices(updatedArr);
        }
    }

    function confirmSold() {
        // Return immediately if there is no item selected
        if (selectedServices.length < 1) {
            return;
        }

        console.log(selectedServices);
    }

    return (
        <article className={styles["container"]}>
            <div ref={navbarRef} className={styles["navbar"]}>
                <button onClick={confirmSold}>Mark as sold</button>
            </div>
            <div className={styles["grid"]}>
                {
                    userListings ?
                        userListings.map((listing) => {
                            return (
                                <div>
                                    <Service
                                        name={listing.name}
                                        price={listing.price}
                                        image={listing.image}
                                        description={listing.description}
                                        availableUntil={listing.availableUntil}
                                        status={listing.status}
                                        id={listing.id}
                                    />
                                    <label>
                                        <input type="checkbox" onChange={() => { handleSelectService(listing.id) }} />
                                        <span></span>
                                    </label>
                                </div>
                            )
                        }) : <LoadingModel />
                }
            </div>
        </article>
    )
}