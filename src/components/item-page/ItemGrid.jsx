import Service from "./Service";
import styles from "../../assets/css/itempage.module.css";

export default function ItemGrid(props) {
    const results = props.results.filter(
        (result) => result.status === "available"
    );

    const buttons = results.map((result) => {
        return <Service {...result} />;
    });

    return <div className={styles["service-grid"]}>{buttons}</div>;
}
