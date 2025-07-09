import Rating from "./Rating"
import styles from "../../assets/css/service.module.css"
import Slideshow from "./Slideshow";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";

export default function Service(props) {
  const [username, setUsername] = useState("User");
  const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  const navigate = useNavigate();

  // TODO: someone can probably improves the logic here
  let price;
  if (props.price) {
    price = typeof props.price == "number" ? "$" + props.price : props.price;
  } else {
    price = "No price set yet";
  }

  let date;
  if (props.availableUntil) {
    date = props.availableUntil;
    date = new Date(props.availableUntil.seconds * 1000 + props.availableUntil.nanoseconds / 1e6);
    date = date.toISOString().slice(0, 10);
  } else {
    date = "No date set yet";
  }

  useEffect(() => {
    const fetchUsername = async () => {
      if (props.user) {
        try {
          const userDocRef = doc(db, "userStuff", props.user);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            setUsername(userSnap.data().name || "User");
            setProfilePicture(userSnap.data().photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
          }
        }
        catch (error) {
          console.error("Failed to fetch user name:", error);
        }
      }
    };

    fetchUsername();
  }, [props.user]);

  function redirect(id) {
    navigate(`/item/${id}`);
  }

  return (
    <div className={`${styles["service-wrapper"]} ${props.preview ? styles.preview : ""}`} onClick={() => { !props.preview ? redirect(props.id) : ""; }}>
      <Slideshow image={props.image} preview={true} />
      <div className={styles["item-info"]}>
        <span className={styles.name}>{props.name ? props.name : "No name set yet"}</span>
        <span className={styles.date}>{date}</span>
      </div><div className={styles["person-info"]}>
        <img className={styles.profile} src={profilePicture} />
        <p>{username}</p>
        {props.noStars ? "" : <Rating />}
      </div><span className={`${styles.price} ${price.toLowerCase() == "free" ? styles.free : ""}`}>{price}</span>
    </div>
  )
}