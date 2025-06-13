import Header from "../global/Header"
import Footer from "../global/Footer"
import AddItemForm from "./AddItemForm"
import Service from "./Service"
import "../../assets/css/additem.css"
import { useState } from "react"

export default function AddItem() {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("Title here");
    const [description, setDescription] = useState("Description here");
    const [date, setDate] = useState("2010-01-01");
    const [price, setPrice] = useState(0);

    return (
        <>
            <Header />
            <h1 className="page-heading">Enter Listing Details</h1>
            <main className="add-item">
                <div className="preview">
                    <h2>Preview</h2>
                    <Service image={image} title={title} description={description} date={date} price={price} noStars={true} />
                </div>
                <AddItemForm setImage={setImage} setTitle={setTitle} setDescription={setDescription} setDate={setDate} setPrice={setPrice} />
            </main>
            <Footer />
        </>
    )
}