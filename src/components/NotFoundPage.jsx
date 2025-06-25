import { Link } from "react-router-dom"
import { Fragment } from "react"
import styles from "../assets/css/notfoundpage.module.css"
import page_not_found from "../assets/images/page-not-found.png"

export default function NotFoundPage() {
    return (
        <div className={styles["not-found-page"]}>
            <img src={page_not_found} alt="page-not-found.png" draggable={false} />
            <h1>The page you are looking for does not exist!</h1>
            <Link to={"/"}>
                <button>Go back home</button>
            </Link>
        </div>
    )
}