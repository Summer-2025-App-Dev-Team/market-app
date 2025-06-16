import AddItemForm from "./AddItemForm"
import Service from "./Service"
import "../../assets/css/additem.css"
import { useState, useEffect } from "react"
import useAuthStore from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"

export default function AddItem() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const userIsLoggedIn = user == null ? false : true;

    useEffect(() => {
        if (!userIsLoggedIn) {
            navigate("/login", {replace: true});
        }
    }, [userIsLoggedIn, user, navigate]);

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
            {/* <Header /> */}
            <main className="add-item">
                <h1 className="page-heading">Enter Listing Details</h1>
                <div className="content">
                    <div className="preview">
                        <h2>Preview</h2>
                        <Service image={image.url} title={title} description={description} date={date} price={price} noStars={true} />
                    </div>
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

                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}