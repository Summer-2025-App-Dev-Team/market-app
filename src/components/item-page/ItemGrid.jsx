import styles from "../../assets/css/itempage.module.css"
import Service from "./Service"

export default function ItemGrid(props) {
    const buttons = props.results.map((result) => {
        console.log("Results:", result);
        return <Service {...result} />
    })

    return (
        <div className={styles["service-grid"]}>
            {buttons}
        </div>
    )
}