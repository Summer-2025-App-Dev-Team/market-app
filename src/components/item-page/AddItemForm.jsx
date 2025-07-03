import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import useAuthStore from "../store/useAuthStore";
import upload from "../store/upload";
import styles from "../../assets/css/additem.module.css";
import LoadingModal from "./LoadingModal";

export default function addItemForm(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [itemIsFree, setItemIsFree] = useState(false);
    const fileInputRef = useRef(null);
    const fileInputTextRef = useRef(null);
    const dateInputRef = useRef(null);
    const dropZoneRef = useRef(null);
    const priceInputRef = useRef(null);
    const user = useAuthStore((state) => state.user);

    // Locate useEffect at the top (before any return)
    useEffect(() => {
        const fileInput = fileInputRef.current;
        const dropZone = dropZoneRef.current;
        const dateInput = dateInputRef.current;

        const handleDragOver = (e) => {
            e.preventDefault();
            dropZone.classList.add(styles.dragover);
        };

        const handleDragLeave = () => {
            dropZone.classList.remove(styles.dragover);
        };

        const handleDrop = (e) => {
            e.preventDefault();
            dropZone.classList.remove(styles.dragover);
            const files = e.dataTransfer.files;

            if (files.length > 1) {
                alert("Please drop only one file.");
                return;
            }

            // Get the file
            const file = files[0];

            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed.");
                return;
            }

            // Assign the file to the input
            fileInput.files = files;

            handleFile(files);
        }

        // Set a 14 days future date as the maximum date
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0'); // Days are zero-based
        const todayStr = `${yyyy}-${mm}-${dd}`; // Format as YYYY-MM-DD

        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 14); // Allowing a 14-day future date
        const fyyyy = futureDate.getFullYear();
        const fmm = String(futureDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const fdd = String(futureDate.getDate()).padStart(2, '0'); // Days are zero-based
        const futureStr = `${fyyyy}-${fmm}-${fdd}`;

        dateInput.min = todayStr;
        dateInput.max = futureStr;

        dropZone.addEventListener("dragover", handleDragOver);
        dropZone.addEventListener("dragleave", handleDragLeave);
        dropZone.addEventListener("drop", handleDrop);

        return () => {
            dropZone.removeEventListener("dragover", handleDragOver);
            dropZone.removeEventListener("dragleave", handleDragLeave);
            dropZone.removeEventListener("drop", handleDrop);
        };
    }, []);

    function handleFileInput(e) {
        // Maximum 5 images
        if (e.target.files.length > 5) {
            alert("You may only upload a maximum of 5 files!");
            e.preventDefault();
            return;
        }
        handleFile(e.target.files);
    }

    function handleFile(files) {
        const imageURLs = [];
        for (const file of files) {
            const imageURL = URL.createObjectURL(file);
            imageURLs.push({
                file: file,
                url: imageURL
            });
        }
        props.setImage(imageURLs);

        fileInputTextRef.current.textContent = "Change image";
    }

    function handleToggleItemFree(e) {
        const checked = e.target.checked;
        priceInputRef.current.disabled = checked;
        setItemIsFree(checked);

        if (checked) {
            props.setPrice("Free");
        }
        else {
            props.setPrice(priceInputRef.current.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userDocRef = doc(db, "userStuff", user.uid);

        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { listings: [] });
        }

        console.log("Starting upload...");
        const imageURLs = props.image ? await upload(props.image) : null;
        console.log("Finished upload!")

        const listingId = crypto.randomUUID();

        const listDocRef = doc(db, "allListings", listingId);

        const newListing = {
            id: listingId,
            name: props.name,
            price: itemIsFree ? "Free" : props.price,
            availableUntil: props.date,
            description: props.description,
            createdAt: new Date(),
            status: "available",
            user: user.uid,
            image: imageURLs || null
        };

        await updateDoc(userDocRef, {
            listings: arrayUnion(newListing)
        });
        await setDoc(listDocRef, newListing);
        toast.success("Added Item");
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <LoadingModal />}
            <form onSubmit={handleSubmit}>
                <h3>Basic Info</h3>
                <label htmlFor="name">Item name</label>
                <input type="text" name="name" id="name" aria-label="name" placeholder="Name" maxLength={50} onChange={(e) => { props.setName(e.target.value) }} autoFocus required />
                <label htmlFor="price">Item price</label>
                <input ref={priceInputRef} type="number" name="price" id="price" placeholder="Price (SGD)" min={0.01} max={1000} step={0.01} aria-label="price" onChange={(e) => { props.setPrice(parseFloat(e.target.value)) }} required />
                <label className={styles["toggle-free"]}>
                    Free
                    <input type="checkbox" id="free-item" className={styles["free-checkbox"]} onChange={handleToggleItemFree} />
                    <span></span>
                </label>
                <label htmlFor="date">Available until</label>
                <input ref={dateInputRef} type="date" name="date" id="date" placeholder="Available until" aria-label="date" onChange={(e) => { props.setDate(e.target.value) }} required />
                <label ref={dropZoneRef} className={styles["add-image-button"]}>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} hidden multiple />
                    {/* Changed from img to svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox="0 0 24 24">{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path></svg>
                    <span ref={fileInputTextRef} className={styles["file-upload-label"]}>Add image</span>
                </label>
                <label htmlFor="description">Listing Info</label>
                <textarea name="description" id="description" aria-label="description" maxLength={500} placeholder="Description (max 500 characters)" onChange={(e) => { props.setDescription(e.target.value) }} />

                <button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Submit"}</button>
            </form>
        </>
    )
}