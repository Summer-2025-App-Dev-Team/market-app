import Rating from "./Rating"
import Slideshow from "./Slideshow";
import LoadingModal from "../global/LoadingModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/service.module.css";

export default function Service(props) {
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);
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

  return (
    <div className={`${styles["service-wrapper"]} ${props.preview ? styles.preview : ""} ${props.status === "unavailable" ? styles.unavailable : ""}`} onClick={() => { !props.preview && props.status === "available" ? navigate(`/item/${props.id}`) : ""; }}>
      <Slideshow image={props.image} setLoading={setLoading} />
      {loading ? <div className={styles["loading-background"]}>Loading...</div> : <>
        <div className={styles["item-info"]}>
          <span className={styles.name}>{props.name ? props.name : "No name set yet"}</span>
          <span className={styles.date}>{date}</span>
        </div><div className={styles["person-info"]}>
          <img className={styles.profile} src={profilePicture} />
          <p>{username}</p>
          {props.noStars ? "" : <Rating />}
        </div><span className={`${styles.price} ${price.toLowerCase() == "free" ? styles.free : ""}`}>{price}</span>
        {props.status === "unavailable" ? <div className={styles.backdrop}></div> : ""}
      </>}
    </div>
  )
}