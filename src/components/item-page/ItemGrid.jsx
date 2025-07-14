import Service from "./Service"
import LoadingModel from "../global/LoadingModal";
import styles from "../../assets/css/itempage.module.css"
import { useRef, useState } from "react";

export default function ItemGrid(props) {
    const [loading, setLoading] = useState([]);
    let totalResults = props.results.length;

    const buttons = props.results.map((result) => {
        // If the item is not available, don't render it
        if (result.status !== "available") {
            totalResults--;

            // If there is no service getting returned, say no item added yet
            if (totalResults < 1) {
                return <h1>No item added yet!</h1>;
            }

            return null;
        }

        return <Service {...result} />;
    })

    return (
        <div className={styles["service-grid"]}>
            {buttons}
        </div>
    )
}