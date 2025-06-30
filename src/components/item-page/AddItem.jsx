import AddItemForm from "./AddItemForm";
import Service from "./Service";
import styles from "../../assets/css/additem.module.css";
import { useState, useEffect, Fragment } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        // undefined => still loading
        if (user === undefined) {
            return;
        }

        const userIsLoggedIn = user === null ? false : true;
        if (!userIsLoggedIn) {
            console.log("You are not logged in!");
            navigate("/login", { replace: true });
        } else if (!user.emailVerified) {
            console.log("You haven't verified your email yet!");
            navigate("/verify-auth?type=confirm", { replace: true });
        }
    }, [user, navigate]);

    const [image, setImage] = useState({
        file: null,
        url: ""
    });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(0);

    return (
        <div className={styles["add-item"]}>
            <h1 className={styles["page-heading"]}>Enter Listing Details</h1>
            <div className={styles.content}>
                <AddItemForm
                    name={name}
                    price={price}
                    description={description}
                    date={date}
                    image={image}
                    setImage={setImage}
                    setName={setName}
                    setDescription={setDescription}
                    setDate={setDate}
                    setPrice={setPrice}
                />
                <div className={styles.preview}>
                    <h2>Preview</h2>
                    <Service image={image.url} name={name} description={description} date={date} price={price} noStars={true} preview={true} />
                </div>
            </div>
        </div>
    )
}