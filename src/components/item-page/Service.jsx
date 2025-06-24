import Rating from "./Rating"
import styles from "../../assets/css/service.module.css"
import imagePlaceholder from "../../assets/images/image-placeholder.jpg";

export default function Service(props) {
    return (
        <div className={styles["service-wrapper"]} onClick={() => { window.location.href = `/item/${props.id}` }}>
            <img src={props.image ? props.image : imagePlaceholder} className={props.preview ? styles.preview : ""} draggable={false} />
            <div className={styles["item-info"]}>
                <span className={styles.title}>{props.name ? props.name : "Title here"}</span>
                <span className={styles.date}>{props.availableUntil ? props.availableUntil : "2025-09-10"}</span>
            </div>
            <div className={styles["person-info"]}>
                <img className={styles.profile} src={props.profile ? props.profile : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} />
                <p>User</p>
                {props.noStars ? "" : <Rating />}
            </div>
            <span className={styles.price}>${props.price ? props.price : 0}</span>
        </div>
    )
}