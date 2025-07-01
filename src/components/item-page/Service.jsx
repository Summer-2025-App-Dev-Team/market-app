import Rating from "./Rating"
import styles from "../../assets/css/service.module.css"
import imagePlaceholder from "/image-placeholder.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState, useEffect } from "react";

export default function Service(props) {
  // TODO: someone can probably improves the logic here
  let price;
  if (props.price) {
    price = typeof props.price == "number" ? "$" + props.price : props.price;
  } else {
    price = "No price set yet";
  }
  const [username, setUsername] = useState("User");
  const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");

  useEffect(() => {
    const fetchUsername = async () => {
      if (props.user) {
        try {
          const userDocRef = doc(db, "userStuff", props.user);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUsername(userSnap.data().name || "User");
            console.log(userSnap.data())
            setProfilePicture(userSnap.data().photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
          }
        } catch (error) {
          console.error("Failed to fetch user name:", error);
        }
      }
    };

    fetchUsername();
  }, [props.user]);

  return (
    <div className={styles["service-wrapper"]} onClick={() => { window.location.href = `/item/${props.id}` }}>
      <img src={props.image ? props.image : imagePlaceholder} className={props.preview ? styles.preview : ""} draggable={false} />
      <div className={styles["item-info"]}>
        <span className={styles.name}>{props.name ? props.name : "No name set yet"}</span>
        <span className={styles.date}>{props.availableUntil ? props.availableUntil : "No date yet"}</span>
      </div>
      <div className={styles["person-info"]}>
        <img className={styles.profile} src={profilePicture} />
        <p>{username}</p>
        {props.noStars ? "" : <Rating />}
      </div>
      <span className={`${styles.price} ${price.toLowerCase() == "free" ? styles.free : ""}`}>{price}</span>
    </div>
  )
}