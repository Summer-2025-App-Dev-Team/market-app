import FilterButton from "./FilterButton"
import styles from "../../assets/css/itempage.module.css";

export default function FilterBar() {
    return (
        <div className={styles["scroll-wrapper"]}>
            <div className={styles["scroll-container"]}>
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
                <FilterButton name="Website Design" />
            </div>
        </div>
    )
}