import { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Service from "../../item-page/Service";
import styles from "../../../assets/css/profile/myitem.module.css";

export default function MyItem(props) {
    const uid = props.uid;
    const navbarRef = useRef(null);
    const infoRef = useRef(null);
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
                            item.createdAt.seconds * 1000 +
                                item.createdAt.nanoseconds / 1e6
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
                newArr = userListings.filter(
                    (listing) => listing.status === "available"
                );
                break;

            case "expired":
                newArr = userListings.filter(
                    (listing) => listing.status === "unavailable"
                );
                break;
        }

        setResults(newArr);
    }, [filter]);

    useEffect(() => {
        if (results) {
            results.forEach((listing) => {
                if (listing.status === "unavailable") {
                    infoRef.current.classList.add(styles["show"]);
                    const hideInfoTimeout = setTimeout(() => {
                        infoRef.current.classList.remove(styles["show"]);
                    }, 2000);

                    return () => {
                        clearTimeout(hideInfoTimeout);
                    };
                }
            });
        }
    }, [results]);

    function handleSelectService(id) {
        const checked = event.target.checked;
        if (checked) {
            // Add the selected service to the array
            setSelectedServices((prev) => [...prev, id]);
        } else {
            // Remove the selected service
            const updatedArr = selectedServices.filter(
                (serviceId) => serviceId !== id
            );
            setSelectedServices(updatedArr);
        }
    }

    function confirmSold() {
        // Return immediately if there is no item selected
        if (selectedServices.length < 1) {
            return;
        }

        selectedServices.forEach((service) => {
            console.log(service);
        });
    }

    return (
        <article className={styles["container"]}>
            <div ref={navbarRef} className={styles["tool-bar"]}>
                <button onClick={confirmSold}>Mark as sold</button>
            </div>
            <div className={styles["filter-bar"]}>
                <span
                    className={filter === "all" ? styles["active"] : ""}
                    onClick={() => {
                        setFilter("all");
                    }}
                >
                    All
                </span>
                <span
                    className={filter === "on-list" ? styles["active"] : ""}
                    onClick={() => {
                        setFilter("on-list");
                    }}
                >
                    On-list
                </span>
                <span
                    className={filter === "expired" ? styles["active"] : ""}
                    onClick={() => {
                        setFilter("expired");
                    }}
                >
                    Expired
                </span>
            </div>
            <div className={styles["grid"]}>
                {results ? (
                    results.length > 0 ? (
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
                                        <input
                                            type="checkbox"
                                            onChange={() => {
                                                handleSelectService(listing.id);
                                            }}
                                        />
                                        <span></span>
                                    </label>
                                </div>
                            );
                        })
                    ) : (
                        <p>No item</p>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div ref={infoRef} className={styles["info"]}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill={"currentColor"}
                    viewBox="0 0 24 24"
                >
                    {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                    <path d="M11 7h2v6h-2zM11 15h2v2h-2z"></path>
                    <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
                </svg>
                <p>
                    All expired items will be removed after 1 week of expiration
                </p>
            </div>
        </article>
    );
}
