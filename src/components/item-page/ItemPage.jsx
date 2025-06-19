import { useEffect , useState} from 'react';
import styles from "../../assets/css/itempage.module.css";
import FilterBar from "./FilterBar";
import { useSearchParams } from 'react-router-dom';
import SearchHeading from './SearchHeading';
import ItemGrid from './ItemGrid';

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
        document.getElementById("scroll-container").addEventListener("scroll", handelElementOnScroll);

        return () => {
            document.removeEventListener("scroll", handelElementOnScroll);
        }
    }, []);

    const [searchParams] = useSearchParams();

    const query = searchParams.get('q'); // e.g. ?query=hello

    var exampleObject = {
        "image": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "title": "Title here",
        "profile": "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        "date": "2010-09-10",
        "price":"100"
    }
    
    
    const exampleResults = [
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
        exampleObject,
    ].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const [results, setResults] = useState(exampleResults);
    const [sortBy, setSortBy] = useState("rating");

    function sortchange(newSort) {
        setSortBy(newSort);

        // Create a shallow copy of results and sort
        const sorted = [...results].sort((a, b) => {
            if (newSort === "price") return a.price - b.price;
            if (newSort === "rating") return b.rating - a.rating;
            if (newSort === "newest") return new Date(b.date) - new Date(a.date);
            return 0;
        });

        setResults(sorted);
    }


    return (
        <>
            <main className={styles["item-page"]}>
                <div className={styles.title}>
                    <h1>Services</h1>
                    <h2>or Goods</h2>
                </div>
                <p className={styles.description}>This platform showcases the talents and entrepreneurial spirit of SAS students, offering high-quality services across a range of fields. Whether you're seeking digital solutions, creative work, or technical support, each listing reflects dedication, skill, and a commitment to excellence.</p>
                <SearchHeading searchParam={query} results={results} sortchange={sortchange}/>
                <FilterBar />
                <ItemGrid results={results} />
            </main>
        </>
    )
}
