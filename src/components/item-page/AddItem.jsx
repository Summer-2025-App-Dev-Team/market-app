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
    return (
        <>
            <Header />
            <h1 className="page-heading">Enter Listing Details</h1>
            <main className="add-item">
                <div className="preview">
                    <h2>Preview</h2>
                    <Service image={image} title={title} description={description} noStars={true}/>
                </div>
                <AddItemForm setImage={setImage} setTitle={setTitle} setDescription={setDescription}/>
            </main>
            <Footer />
        </>
    )
}