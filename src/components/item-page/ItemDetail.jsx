import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db, realtimedb } from "../lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, update } from "firebase/database";
import Slideshow from "./Slideshow";
import chatIcon from "/chat-icon.png";
import styles from "../../assets/css/itemdetail.module.css";
import useAuthStore from "../store/useAuthStore";

export default function ItemDetail() {
  const ID = useParams().id; //item id
  const [item, setItem] = useState(null); //the item variable which is set variable with setItem function
  const [loading, setLoading] = useState(true);
  const zoomImageBgRef = useRef(null);
  const zoomImageRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItemData() {
      setLoading(true);
      const docRef = doc(db, "allListings", ID);
      const docSnap = await getDoc(docRef);

      const defaultRef = collection(db, "userStuff");
      const collectSnap = await getDocs(defaultRef);

      // not running code, but returning objects // Return an object explicitly : () => ({ key: value }) // Run a block of code : () => { let x = 1; return x; }
      collectSnap.docs.map((doc) => {
        // looping inside each user
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
        if (data.status === "available") {
          let currentStatus = "n/a"
          const endTime = data.availableUntil;
          const normalizedEndTime = endTime.replace(" at ", " ");
          const endTimeObj = new Date(normalizedEndTime);

          if (!isNaN(endTimeObj.getTime())) {
            if (endTimeObj.getTime() < Date.now()) {
              currentStatus = "unavailable";
            } else {
              currentStatus = "available";
            }
          }
          data.status = currentStatus;
        }

        console.log(data.status);
        setItem(data);
        setLoading(false);
      }
    }
    fetchItemData();
  }, [ID]);

  useEffect(() => {
    try {
      selectedImg.src;
    }
    catch {
      return;
    }

    selectedImg?.src ? zoomImageRef.current.src = selectedImg.src : "";
    zoomImageBgRef.current.classList.add(styles.show);

    function handleClick(e) {
      if (e.target !== zoomImageRef.current) {
        zoomImageBgRef.current.classList.remove(styles.show);
        document.removeEventListener("click", handleClick);
        zoomImageRef.current.src = "";
        setSelectedImg(null);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [selectedImg]);

  /*item?.name && means that the code will return the right side component if the item is not null or undefined
  item?.name: “If item is not null or undefined, then give me item.name. Otherwise, give undefined.”*/

  // handles the chat system
  async function handleSeller() {
    setLoading(true);
    console.log("user", user);
    const buyUserDocRef = doc(db, "userStuff", user.uid);
    const buyUserSnap = await getDoc(buyUserDocRef);

    const sellUserDocRef = doc(db, "userStuff", item.user);
    const sellUserSnap = await getDoc(sellUserDocRef);

    const buyerChats = buyUserSnap.data()?.chats || []; // Safety for undefined or null
    const sellerChats = sellUserSnap.data()?.chats || [];
    console.log("buyerChats", buyerChats);
    console.log("sellerChats", sellerChats);

    const expectedChatId = `${item.id}_${user.uid}_${item.user}`;

    const existingChatId = buyerChats.includes(expectedChatId) && sellerChats.includes(expectedChatId) // Conditional operator to check if the chat ID already exists in both buyer and seller chats
      ? expectedChatId // Check if the chat ID already exists in both buyer and seller chats. value for true
      : undefined; // Check if the chat ID already exists in both buyer and seller chats. value for false
    console.log("existingChatId", existingChatId);
    var chatId;
    if (existingChatId) {
      chatId = existingChatId;
    } else {
      chatId = item.id + "_" + user.uid + "_" + item.user; // changed the chat ID to be more related to the item and users
      console.log("Creating new chat with ID:", chatId);

      await updateDoc(buyUserDocRef, {
        chats: arrayUnion(chatId), // adding the chat ID to the buyer's chats in firestore
      });

      await updateDoc(sellUserDocRef, {
        chats: arrayUnion(chatId), // adding the chat ID to the seller's chats in firestore
      });

      const chatRef = ref(realtimedb, `chats/${chatId}`);

      if (user.uid != item.user) {
        await update(chatRef, {
          user1: user.uid,
          user2: item.user,
          chats: {},
        });
      }
    }
    setLoading(false);
    navigate("/chat/" + chatId);
  }

  return (
    loading ? <div className={styles.loadingWrapper}><div className={styles.loadingText}>Loading</div></div> :
      <div className={styles.container}>
        {item?.image && <Slideshow image={item.image} setSelectedImg={setSelectedImg} />}
        <div className={styles.infoColumn}>
          {item?.name && <h1 className={styles.productName}>{item.name}</h1>}
          {item?.availableUntil && (
            <div className={styles.status}>
              {item.status === "available"
                ? <div className={styles.available}>Available until: {item.availableUntil}</div>
                : item.status === "reserved"
                  ? <div className={styles.reserved}>Reserved</div>
                  : <div className={styles.unavailable}>Unavailable</div>}
            </div>
          )}
          {item?.price && <p className={styles.priceHighlight}>{typeof item.price == "number" ? `$${item.price}` : item.price}</p>}

          {item?.description && (
            <p className={styles.description}>{item.description}</p>
          )}

          {/* <div className={styles.chatButtonWrapper}> */}
          {/* <button className={styles.buyButton}> */}
          {/* when the buyers clicks the contact button*/}
          {/* conditional rendering to check if the user is not the seller */}
          {user?.uid && item?.user && user?.uid !== item.user && (
            <button onClick={handleSeller} className={styles.chatLink}>
              <img className={styles.chatIcon} src={chatIcon}></img>
            </button>
          )}

          {item?.createdAt && (
            <p className={styles.createdAt}>Created at: {item.createdAt}</p>
          )}
        </div>

        <div ref={zoomImageBgRef} className={styles.zoomImage}>
          <img ref={zoomImageRef} src={null} alt="zoom-in picture" draggable={false} />
        </div>
      </div>
  );
}
