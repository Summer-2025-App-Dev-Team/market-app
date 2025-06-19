import styles from "../../assets/css/itempage.module.css";

export default function SearchHeading(props){
    if (props.searchParam){
        return (
            <div className={styles.searchContainer}>
                <h3 className={styles.searchheading}>Showing {props.results.length==0? "no" : props.results.length} results for {props.searchParam}</h3>
                <select className={styles.sort} name="sort" onChange={(e) => props.sortchange(e.target.value)}>
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="newest">Sort by Newest</option>
                </select>
            </div>
        )
    } else{
        return (<></>)
    }
}