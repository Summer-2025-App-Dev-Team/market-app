import Header from "../global/Header"
import Footer from "../global/Footer"
import AddItemForm from "./AddItemForm"
import "../../assets/css/additem.css"

export default function AddItem() {
    return (
        <>
            <Header />
            <main>
                <div className="preview">
                    <p>Title</p>
                    <p>Picture</p>
                    <p>Price</p>
                    <p>Discription</p>
                </div>
                <AddItemForm />
            </main>
            <Footer />
        </>
    )
}