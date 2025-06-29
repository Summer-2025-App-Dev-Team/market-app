import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import chatIcon from "/chat-icon.png";
import styles from "../../assets/css/itemdetail.module.css";
import { Link } from "react-router-dom";

export default function ItemDetail() {
  const ID = useParams().id;
  const [item, setItem] = useState(null);
  const largeImageRef = useRef(null);

  useEffect(() => {
    async function fetchItemData() {
      const docRef = doc(db, "allListings", ID);
      const docSnap = await getDoc(docRef);

      const defaultRef = collection(db, "userListings");
      const collecSnap = await getDocs(defaultRef);

      //not running code, but returning objects // Return an object explicitly : () => ({ key: value }) //Run a block of code : () => { let x = 1; return x; }
      collecSnap.docs.map((doc) => {
        //looping inside each user
        const listing = doc.data().listings;
        listing.map((lists) => {
          if (ID == lists["id"]) {
            console.log(doc.id);
            console.log(listing);
          }
        });
      });

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
    fetchItemData();

    function handleKeyDown(e) {
      if (
        e.key === "Escape" &&
        largeImageRef.current.classList.contains(styles.show)
      ) {
        largeImageRef.current.classList.remove(styles.show);
      }
    }

    function handleClick(e) {
      if (
        largeImageRef.current &&
        largeImageRef.current.classList.contains(styles.show)
      ) {
        // Check if the click is outside the large image (not on the image itself)
        if (e.target === largeImageRef.current) {
          largeImageRef.current.classList.remove(styles.show);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [ID]);

  function handleImgOnClick(e) {
    e.stopPropagation(); // Prevent event bubbling
    largeImageRef.current.classList.add(styles.show);
  }

  /*item?.name && means that the code will return the right side component if the item is not null or undefined
  item?.name: “If item is not null or undefined, then give me item.name. Otherwise, give undefined.”*/
  function handleSeller() { }
  return (
    <div className={styles.container}>
      <div className={styles.mainImageWrapper}>
        {item?.image && (
          <img
            className={styles.itemImage}
            src={item.image}
            alt={item.name}
            draggable={false}
            onClick={handleImgOnClick}
          />
        )}
      </div>
      <div className={styles.infoColumn}>
        {item?.name && <h1 className={styles.productName}>{item.name}</h1>}
        {item?.availableUntil && (
          <p className={styles.availability}>
            Available until: {item.availableUntil}
          </p>
        )}
        {item?.price && <p className={styles.priceHighlight}>${item.price}</p>}

        {item?.description && (
          <p className={styles.description}>{item.description}</p>
        )}

        <div className={styles.chatButtonWrapper}>
          <button className={styles.buyButton}>
            <Link to={"/chat"} onClick={handleSeller}>
              <img className={styles.chatButton} src={chatIcon}></img>
            </Link>
          </button>
        </div>

        {item?.createdAt && (
          <p className={styles.createdAt}>Created at: {item.createdAt}</p>
        )}
      </div>

      {/* For the larger image */}
      <div ref={largeImageRef} className={styles.largeImageContainer}>
        {item?.image && (
          <img src={item.image} alt={item.name} draggable={false} />
        )}
      </div>
    </div>
  );
}
