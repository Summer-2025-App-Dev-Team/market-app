import FilterButton from "./FilterButton"
import styles from "../../assets/css/itempage.module.css";

export default function FilterBar() {
    return (
        <div className={styles["scroll-wrapper"]}>
            <div className={styles["scroll-container"]} style={{ "--show-before-shadow": 0 }}>
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