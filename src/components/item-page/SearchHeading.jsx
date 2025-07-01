import { useEffect, useState } from "react";
import styles from "../../assets/css/itempage.module.css";

export default function SearchHeading(props) {
    // TODO: idk if we are supposed to do this in React
    const [text, setText] = useState("");

    useEffect(() => {
        if (props.searchParam) {
            if (props.results.length == 0) {
                setText(`No results for ${props.searchParam}`);
            } else {
                setText(`${props.results.length} results for ${props.searchParam}`);
            }
        } else {
            setText("Showing all items");
        }
    }, [props.searchParam]);

    return (
        <div className={styles.searchContainer}>
            <h3 className={styles.searchheading}>{text}</h3>
            <select className={styles.sort} name="sort" onChange={(e) => props.sortchange(e.target.value)}>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="newest">Sort by Newest</option>
            </select>
        </div>
    )
}