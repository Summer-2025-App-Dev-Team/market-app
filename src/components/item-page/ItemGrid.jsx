import Service from "./Service"
import LoadingModal from "../global/LoadingModal";
import { useState } from "react";
import styles from "../../assets/css/itempage.module.css"

export default function ItemGrid(props) {
    const [loadedServices, setLoadedServices] = useState([]);
    const results = props.results.filter(result => result.status === "available");

    const buttons = results.map((result) => {
        return <Service {...result} setLoadedServices={setLoadedServices} />;
    })

    return (
        <div className={styles["service-grid"]}>
            {loadedServices.length < results.length && <LoadingModal />}
            {buttons}
        </div>
    )
}