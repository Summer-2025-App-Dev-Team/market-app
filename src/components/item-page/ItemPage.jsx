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
    for(const userDoc of querySnapshot.docs){
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
        await updateDoc(docRef, {listings: updatedListings});
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
    let query = searchParams.get('q'); // e.g. ?query=hello

    // there has to be some query, otherwise will return errors
    if (query == null) {
        query = "";
    }

    const exampleResults = [];
    const [results, setResults] = useState(exampleResults);
    const [sortBy, setSortBy] = useState("rating");

    useEffect(() => {
        async function loadListings() {
            const listings = await fetchAllListings();
            const filtered = listings.filter(listing => {
                return query == "" | listing.name?.toLowerCase().includes(query.toLowerCase());
            });
            console.log("Filtered:", filtered);
            setResults(listings.length ? filtered : exampleResults);
        }
        loadListings();
    }, [query]);

    function sortchange(newSort) {
        setSortBy(newSort);

        // Create a shallow copy of results and sort
        const sorted = [...results].sort((a, b) => {
            if (newSort === "price") return a.price - b.price;
            if (newSort === "rating") return b.rating - a.rating;
            if (newSort === "newest") return new Date(b.date) - new Date(a.date);
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
            <SearchHeading searchParam={query} results={results} sortchange={sortchange} />
            <FilterBar />
            <ItemGrid results={results} />
        </div>
    )
}
