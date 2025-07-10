import styles from "../../assets/css/itempage.module.css"
import Service from "./Service"

export default function ItemGrid(props) {
    console.log("Results:", props.results);

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