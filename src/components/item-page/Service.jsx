import Rating from "./Rating"
import styles from "../../assets/css/itempage.module.css"

export default function Service(props) {
    return (
        <div className={styles["service-wrapper"]}>
            <img src={props.image ? props.image : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} className={styles["preview-image"]} draggable={false} />
            <div className={styles["item-info"]}>
                <span className={styles.title}>{props.title ? props.title : "Title here"}</span>
                <span className={styles.date}>{props.date}</span>
            </div>
            <div className={styles["person-info"]}>
                <img className={styles.profile} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                <p>User</p>
                {props.noStars ? "" : <Rating />}
            </div>
            <span className={styles.price}>${props.price ? props.price : 0}</span>
        </div>
    )
}