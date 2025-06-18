import { useEffect } from 'react';
import styles from "../../assets/css/itempage.module.css";
import FilterBar from "./FilterBar";
import Service from "./Service";

export default function ItemPage() {
    useEffect(() => {
        const handelElementOnScroll = (e) => {
            // idk why but I have to -1 to the scrollwidth to make it work
            const isScrolledToRightEnd = e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth - 1;
            const isScrolledToLeftEnd = e.target.scrollLeft <= 0;

            if (isScrolledToRightEnd) {
                e.target.style.setProperty("--show-after-shadow", "0");
            } else {
                e.target.style.setProperty("--show-after-shadow", "1");
            }
            if (isScrolledToLeftEnd) {
                e.target.style.setProperty("--show-before-shadow", "0");
            } else {
                e.target.style.setProperty("--show-before-shadow", "1");
            }
        }

        document.querySelector(".scroll-container").addEventListener("scroll", handelElementOnScroll);

        return () => {
            document.removeEventListener("scroll", handelElementOnScroll)
        }
    }, []);

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
