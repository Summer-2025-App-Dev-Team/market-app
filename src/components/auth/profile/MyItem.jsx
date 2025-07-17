import { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingModel from "../../global/LoadingModal";
import Service from "../../item-page/Service";
import styles from "../../../assets/css/profile/myitem.module.css";

export default function MyItem(props) {
    const uid = props.uid;
    const navbarRef = useRef(null);
    const [filter, setFilter] = useState("all");
    const [userListings, setUserListings] = useState(null);
    const [results, setResults] = useState(null);
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
                setResults(data);
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

    useEffect(() => {
        let newArr;
        switch (filter) {
            case "all":
                newArr = userListings ? [...userListings] : null;
                break;

            case "on-list":
                newArr = userListings.filter(listing => listing.status === "available");
                break;

            case "expired":
                newArr = userListings.filter(listing => listing.status === "unavailable");
                break;
        }

        setResults(newArr)
    }, [filter]);

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
            <div ref={navbarRef} className={styles["tool-bar"]}>
                <button onClick={confirmSold}>Mark as sold</button>
            </div>
            <div className={styles["filter-bar"]}>
                <span className={filter === "all" ? styles["active"] : ""} onClick={() => { setFilter("all") }}>All</span>
                <span className={filter === "on-list" ? styles["active"] : ""} onClick={() => { setFilter("on-list") }}>On-list</span>
                <span className={filter === "expired" ? styles["active"] : ""} onClick={() => { setFilter("expired") }}>Expired</span>
            </div>
            <div className={styles["grid"]}>
                {
                    results ?
                        results.map((listing) => {
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
                        }) : <p>Loading...</p>
                }
            </div>
        </article>
    )
}