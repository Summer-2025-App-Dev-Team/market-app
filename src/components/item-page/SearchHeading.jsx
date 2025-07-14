import { useEffect, useState } from "react";
import styles from "../../assets/css/itempage.module.css";

export default function SearchHeading(props) {
    const [searchHeading, setSearchHeading] = useState(<span>Loading...</span>);

    useEffect(() => {
        if (props.searchParam) {
            if (props.results.length < 1) {
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
            <select defaultValue={"alphabet"} className={styles.sort} name="sort" onChange={(e) => props.sortchange(e.target.value)}>
                <option value="alphabet">Sort alphabetically</option>
                <option value="manner">Sort by user manner</option>
                <option value="price">Sort by price</option>
                <option value="newest">Sort by time</option>
            </select>
        </div>
    )
}
