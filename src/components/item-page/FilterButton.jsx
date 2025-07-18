import { useState } from "react"
import styles from "../../assets/css/itempage.module.css";

export default function FilterButton(props) {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <button className={`${clicked ? styles["active"] : ""}`} onClick={handleClick}>{props.name}</button>
    )
}