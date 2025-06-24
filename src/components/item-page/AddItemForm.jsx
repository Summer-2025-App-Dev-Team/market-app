import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useRef } from "react";
import useAuthStore from "../store/useAuthStore";
import upload from "../store/upload";
import plusIcon from "../../assets/svgs/plus-icon.svg";
import styles from "../../assets/css/additem.module.css";

export default function addItemForm(props) {
    const user = useAuthStore((state) => state.user);
    const dateInputRef = useRef(null);
    const fileInputText = useRef(null);
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    useEffect(() => {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        // Get the date 14 days (2 weeks) from today
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 14);
        const fyyyy = futureDate.getFullYear();
        const fmm = String(futureDate.getMonth() + 1).padStart(2, '0');
        const fdd = String(futureDate.getDate()).padStart(2, '0');
        const futureDateStr = `${fyyyy}-${fmm}-${fdd}`;

        dateInputRef.current.min = todayStr; // Set minimum date to today
        dateInputRef.current.max = futureDateStr; // Set maximum date to 14 days

        const fileInput = fileInputRef.current;
        const dropZone = dropZoneRef.current;

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
        handleFile(e.target.files);
    }

    function handleFile(file) {
        file = file[0];

        const imageUrl = URL.createObjectURL(file);
        props.setImage({
            file: file,
            url: imageUrl
        });

        fileInputText.current.textContent = "Change image";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDocRef = doc(db, "userListings", user.uid);

        const docSnap = await getDoc(userDocRef);
        if (!docSnap.exists()) {
            await setDoc(userDocRef, { listings: [] });
        }

        const imageUrl = props.image?.file ? await upload(props.image.file) : null;

        const listingId = crypto.randomUUID();

        const listDocRef = doc(db, "allListings", listingId);

        const newListing = {
            id: listingId,
            name: props.title,
            price: parseFloat(props.price),
            availableUntil: props.date,
            description: props.description,
            createdAt: new Date(),
            image: imageUrl || null
        };

        await updateDoc(userDocRef, {
            listings: arrayUnion(newListing)
        });
        await setDoc(listDocRef, newListing);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Basic Info</h3>
            <label htmlFor="name">Item name</label>
            <input type="text" name="name" id="name" aria-label="name" placeholder="Name" maxLength={50} onChange={(e) => { props.setTitle(e.target.value) }} autoFocus required />
            <label htmlFor="price">Item price</label>
            <input type="number" name="price" id="price" placeholder="Price (SGD)" min={0} max={1000} step={0.01} aria-label="price" onChange={(e) => { props.setPrice(e.target.value) }} required />
            <label htmlFor="date">Available until</label>
            <input ref={dateInputRef} type="date" name="date" id="date" placeholder="Available until" aria-label="date" onChange={(e) => { props.setDate(e.target.value) }} />
            <label ref={dropZoneRef} className={styles["add-image-button"]}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} hidden />
                <img src={plusIcon} alt="plus-icon" />
                <span ref={fileInputText} className={styles["file-upload-label"]}>Add image</span>
            </label>
            <label htmlFor="description">Listing Info</label>
            <textarea name="description" id="description" aria-label="description" maxLength={500} placeholder="Description (max 500 characters)" onChange={(e) => { props.setDescription(e.target.value) }} />

            <button type="submit">Submit</button>
        </form>
    )
}