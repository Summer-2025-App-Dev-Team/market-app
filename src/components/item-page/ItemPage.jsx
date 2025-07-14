import { useEffect, useState } from 'react';
import styles from "../../assets/css/itempage.module.css";
import { useSearchParams } from 'react-router-dom';
import SearchHeading from './SearchHeading';
import ItemGrid from './ItemGrid';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function fetchAllListings() {
    try {
        const querySnapshot = await getDocs(collection(db, "allListings"));
        const listings = querySnapshot.docs.map(doc => doc.data());
        return listings;
    }
    catch (err) {
        console.error("Error fetching listings:", err);
        return [];
    }
}

async function updateAllListingsToNewFormat() {
    const querySnapshot = await getDocs(collection(db, "userStuff"));
    for (const userDoc of querySnapshot.docs) {
        const data = userDoc.data();
        const listings = data.listings;

        const updatedListings = await Promise.all(listings.map(async (listing) => {
            let currentStatus = "Unknown";
            const endTime = listing.availableUntil;
            const normalizedEndTime = endTime.replace(" at ", " ");
            const endTimeObj = new Date(normalizedEndTime);

            if (!isNaN(endTimeObj.getTime())) {
                if (endTimeObj.getTime() < Date.now()) {
                    currentStatus = "unavailable";
                } else {
                    currentStatus = "available";
                }
            }

            const updatedListing = {
                ...listing,
                status: currentStatus,
                user: listing.user || userDoc.id,
            };

            const allDocRef = doc(db, "allListings", updatedListing.id);
            await setDoc(allDocRef, updatedListing);

            return updatedListing;
        }));

        const docRef = doc(db, "userStuff", userDoc.id);
        await updateDoc(docRef, { listings: updatedListings });
    };
}

export default function ItemPage() {
    // updateAllListingsToNewFormat();

    // TODO: remove if not needed (filter bar)
    // useEffect(() => {
    //     const handleElementOnScroll = (e) => {
    //         // idk why but I have to -1 to the scrollWidth to make it work
    //         const isScrolledToRightEnd = e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth - 1;
    //         const isScrolledToLeftEnd = e.target.scrollLeft <= 0;

    //         if (isScrolledToRightEnd) {
    //             e.target.style.setProperty("--show-after-shadow", "0");
    //         } else {
    //             e.target.style.setProperty("--show-after-shadow", "1");
    //         }
    //         if (isScrolledToLeftEnd) {
    //             e.target.style.setProperty("--show-before-shadow", "0");
    //         } else {
    //             e.target.style.setProperty("--show-before-shadow", "1");
    //         }
    //     }
    //     document.getElementById("scroll-container").addEventListener("scroll", handleElementOnScroll);

    //     return () => {
    //         document.removeEventListener("scroll", handleElementOnScroll);
    //     }
    // }, []);

    // e.g. ?query=hello
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || ""; // When there is no query, automatically sets it to empty

    const [results, setResults] = useState([]);
    const [sortingMethod, setSortingMethod] = useState("");

    useEffect(() => {
        async function loadListings() {
            const listings = await fetchAllListings();
            const filtered = listings.filter(listing => {
                return query === "" | listing.name?.toLowerCase().includes(query.toLowerCase());
            });
            setResults(listings.length ? filtered : []);

            // Set the sorting method to alphabet (the default) after results are fetched
            setSortingMethod("alphabet");
        }
        loadListings();
    }, [query]);

    useEffect(() => {
        if (results.length < 1) {
            return;
        }

        const sorted = [...results].sort((a, b) => {
            if (sortingMethod === "alphabet") {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1; // a comes before b
                } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1; // a comes after b
                }
                return 0; // a and b are equal
            }
            else if (sortingMethod === "manner") {
                // Sort by user manner score
            }
            else if (sortingMethod === "price") {
                if (typeof a.price == "string" && typeof b.price == "number") {
                    // if a is string and b is number, then a is less than b
                    return 1;
                } else if (typeof a.price == "number" && typeof b.price == "string") {
                    // if a is number and b is string, then a is greater than b
                    return -1;
                } else if (typeof a.price == "string" && typeof b.price == "string") {
                    // if both are strings, then keep the original order
                    return 0;
                }
                // if both are numbers, then sort by price
                return a.price - b.price;
            }
            else if (sortingMethod === "newest") {
                if (b.availableUntil > a.availableUntil) {
                    return 1; // b is newer than a
                }
                else if (a.availableUntil > b.availableUntil) {
                    return -1; // a is newer than b
                }
                else {
                    return 0; // both dates are equal
                }
            }
            return 0;
        });

        setResults(sorted);
    }, [sortingMethod]);

    return (
        <div className={styles["item-page"]}>
            <div className={styles.title}>
                <h1>Items</h1>
            </div>
            <p className={styles.description}></p>
            <SearchHeading searchParam={query} results={results} sortchange={setSortingMethod} />
            {/* <FilterBar /> */}
            <hr />
            <ItemGrid results={results} />
        </div>
    )
}
