import { useEffect, useState } from "react";
import styles from "../../assets/css/itempage.module.css";

export default function SearchHeading(props) {
    // TODO: idk if we are supposed to do this in React
    const [searchHeading, setSearchHeading] = useState(<span>Loading...</span>);

    useEffect(() => {
        if (props.searchParam) {
            if (props.results.length == 0) {
                setSearchHeading(<h3 className={styles["search-heading"]}><u>No</u> results for {props.searchParam}</h3>);
            } else {
                setSearchHeading(<h3 className={styles["search-heading"]}><u>{props.results.length}</u> results for {props.searchParam}</h3>);
            }
        } else {
            setSearchHeading(<h3 className={styles["search-heading"]}>Showing <u>all</u> items</h3>);
        }
    }, [props.searchParam, props.results]);

    return (
        <div className={styles["search-container"]}>
            {searchHeading}
            <select className={styles.sort} name="sort" onChange={(e) => props.sortchange(e.target.value)}>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="newest">Sort by Newest</option>
            </select>
        </div>
    )
}
