import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import useAuthStore from "../store/useAuthStore";
import upload from "../store/upload";
import styles from "../../assets/css/additem.module.css";

export default function addItemForm(props) {
    const user = useAuthStore((state) => state.user);
    function handelFileInput(e) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        props.setImage({
            file: file,
            url: imageUrl
        });

        document.querySelector(`.${styles["file-upload-label"]}`).textContent = "Change picture";

    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!");
        const userDocRef = doc(db, "userListings", user.uid);

        const imageUrl = props.image?.file ? await upload(props.image.file) : null;

        const newListing = {
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
    }

    return (
        <form onSubmit={handelSubmit}>
            <h3>Basic Info</h3>
            <label htmlFor="name">Item name</label>
            <input type="text" name="name" id="name" aria-label="name" placeholder="Name" maxLength={50} onChange={(e) => { props.setTitle(e.target.value) }} autoFocus required />
            <label htmlFor="price">Item price</label>
            <input type="number" name="price" id="price" placeholder="Price (SGD)" min={0} max={1000} step={0.01} aria-label="price" onChange={(e) => { props.setPrice(e.target.value) }} required />
            <label htmlFor="date">Available until</label>
            <input type="date" name="date" id="date" placeholder="Available until" aria-label="date" onChange={(e) => { props.setDate(e.target.value) }} />
            <label className={styles["add-image-button"]}>
                <input type="file" hidden onChange={handelFileInput} />
                <span className={styles["plus-icon"]}>＋</span>
                <span className={styles["file-upload-label"]}>Add image</span>
            </label>
             <label htmlFor="description">Listing Info</label>
            <textarea name="description" id="description" aria-label="description" maxLength={500} placeholder="Description (max 500 characters)" onChange={(e) => { props.setDescription(e.target.value) }} />
            
            <button type="submit">Submit</button>
        </form>
    )
}