import AddItemForm from "./AddItemForm";
import Service from "./Service";
import styles from "../../assets/css/additem.module.css";
import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        // undefined => still loading
        if (user === undefined) {
            return null;
        }

        const userIsLoggedIn = user === null ? false : true;
        if (!userIsLoggedIn) {
            alert("You are not logged in!");
            navigate("/login", { replace: true });
        } else if (!user.emailverified) {
            // TODO: pls fix this. I have clicked on the link in my inbox, and verified my email, but it is still saying that I did not verify. 
            alert("You haven't verified your email yet!");
            navigate("/verify-auth?type=confirm", { replace: true });
        }
    }, [user, navigate]);

    const [image, setImage] = useState({
        file: null,
        url: ""
    });
    const [title, setTitle] = useState("Title here");
    const [description, setDescription] = useState("Description here");
    const [date, setDate] = useState("2010-01-01");
    const [price, setPrice] = useState(0);

    return (
        <>
            <main className={styles["add-item"]}>
                <h1 className={styles["page-heading"]}>Enter Listing Details</h1>
                <div className={styles.content}>
                    <AddItemForm
                        title={title}
                        price={price}
                        description={description}
                        date={date}
                        image={image}
                        setImage={setImage}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        setDate={setDate}
                        setPrice={setPrice}
                    />
                    <div className={styles.preview}>
                        <h2>Preview</h2>
                        <Service image={image.url} title={title} description={description} date={date} price={price} noStars={true} />
                    </div>
                </div>
            </main>
        </>
    )
}