import { useEffect, useState, Fragment } from 'react';
import styles from "../../assets/css/itempage.module.css";
import FilterBar from "./FilterBar";
import { useSearchParams } from 'react-router-dom';
import SearchHeading from './SearchHeading';
import ItemGrid from './ItemGrid';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function fetchAllListings() {
    try {
        const querySnapshot = await getDocs(collection(db, "allListings"));
        const listings = querySnapshot.docs.map(doc => doc.data());
        console.log(listings);
        return listings;
    } catch (err) {
        console.error("Error fetching listings:", err);
        return [];
    }
}

async function updateAllListingsToNewFormat() {
    const querySnapshot = await getDocs(collection(db, "userStuff"));
    for (const userDoc of querySnapshot.docs) {
        const data = userDoc.data();
        const listings = data.listings;

        const now = Date.now();

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
    //updateAllListingsToNewFormat();
    useEffect(() => {
        const handleElementOnScroll = (e) => {
            // idk why but I have to -1 to the scrollWidth to make it work
            const isScrolledToRightEnd = e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth - 1;
            const isScrolledToLeftEnd = e.target.scrollLeft <= 0;

            if (isScrolledToRightEnd) {
                e.target.style.setProperty("--show-after-shadow", "0");
            } else {
                e.target.style.setProperty("--show-after-shadow", "1");
            }
            if (isScrolledToLeftEnd) {
                e.target.style.setProperty("--show-before-shadow", "0");
            } else {
                e.target.style.setProperty("--show-before-shadow", "1");
            }
        }
        document.getElementById("scroll-container").addEventListener("scroll", handleElementOnScroll);

        return () => {
            document.removeEventListener("scroll", handleElementOnScroll);
        }
    }, []);

    const [searchParams] = useSearchParams();
    // e.g. ?query=hello
    // When there is no query, automatically sets it to empty
    const query = searchParams.get('q') || "";

    const exampleResults = [];
    const [results, setResults] = useState(exampleResults);
    const [sortBy, setSortBy] = useState("rating");

    useEffect(() => {
        async function loadListings() {
            const listings = await fetchAllListings();
            const filtered = listings.filter(listing => {
                return query == "" | listing.name?.toLowerCase().includes(query.toLowerCase());
            });
            setResults(listings.length ? filtered : exampleResults);
        }
        loadListings();
    }, [query]);

    function sortChange(newSort) {
        setSortBy(newSort);

        // Create a shallow copy of results and sort
        const sorted = [...results].sort((a, b) => {
            if (newSort === "price") {
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
            else if (newSort === "rating") {
                return b.rating - a.rating;
            }
            else if (newSort === "newest") {
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
    }

    return (
        <div className={styles["item-page"]}>
            <div className={styles.title}>
                <h1>Items</h1>
            </div>
            <p className={styles.description}></p>
            <SearchHeading searchParam={query} results={results} sortchange={sortChange} />
            <FilterBar />
            <ItemGrid results={results} />
        </div>
    )
}
