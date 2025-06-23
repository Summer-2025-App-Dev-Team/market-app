import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../../assets/css/itemdetail.module.css";

export default function Detail() {
  const ID = useParams().id;
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const docRef = doc(db, "allListings", ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (
          data.createdAt &&
          typeof data.createdAt === "object" &&
          "seconds" in data.createdAt &&
          "nanoseconds" in data.createdAt
        ) {
          data.createdAt = new Date(
            data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1e6
          ).toLocaleString();
        }
        setItem(data);
      }
    }
    fetchItem();
  }, [ID]);
    /*item?.name && means that the code will return the rightside component if the item is not null or undefined
    item?.name: “If item is not null or undefined, then give me item.name. Otherwise, give undefined.”*/

  return (
    <div className={styles.container}>
      <div className={styles.mainImageWrapper}> 
        {item?.image && (
          <img className={styles.itemImage} src={item.image} alt={item.name} />
        )}
      </div>
      <div className={styles.infoColumn}>
        {item?.name && <h1 className={styles.productName}>{item.name}</h1>}
        {item?.availableUntil && (
          <p className={styles.availability}>Available until: {item.availableUntil}</p>
        )}
        {item?.price && <p className={styles.priceHighlight}>${item.price}</p>}
        {item?.description && <p className={styles.description}>{item.description}</p>}
        {item?.createdAt && <p className={styles.createdAt}>Created at: {item.createdAt}</p>}
      </div>
    </div>
  );
}
