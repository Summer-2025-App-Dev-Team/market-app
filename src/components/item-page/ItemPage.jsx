import styles from "../../assets/css/itempage.module.css";
import FilterBar from "./FilterBar";
import Service from "./Service";

export default function ItemPage() {
    return (
        <>
            <main className={styles["item-page"]}>
                <div className={styles.title}>
                    <h1>Services</h1>
                    <h2>or Goods</h2>
                </div>
                <p className={styles.description}>This platform showcases the talents and entrepreneurial spirit of SAS students, offering high-quality services across a range of fields. Whether you're seeking digital solutions, creative work, or technical support, each listing reflects dedication, skill, and a commitment to excellence.</p>
                <FilterBar />
                <div className={styles["service-grid"]}>
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
            </main>
        </>
    )
}
