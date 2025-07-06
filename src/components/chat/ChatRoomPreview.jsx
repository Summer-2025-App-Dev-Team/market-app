import { data, Link, useFetcher, useParams } from "react-router-dom";
import userPlaceholder from "/avatar-placeholder.png";
import styles from "../../assets/css/chatroompreview.module.css";
import { useEffect, useState } from "react";
import { realtimedb, db } from "../lib/firebase";
import { ref, onValue, off, set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";
import { Dropdown } from "bootstrap";
import useChatStore from "../global/chatStore";

const randomIdforConfirmAndOptionBtn = crypto.randomUUID();

export default function ChatRoomPreview({ chatId }) {
  const chatStore = useChatStore((state) => state.rtdb); //current chat store from zustand

  //takes chatId as a property and looks for the chat room in Realtime Database and find out the particpants
  //receives the chatID from firestore
  // This component is used to display a preview of a chat room in the chat sidebar.
  // It shows the room name and the last message sent in the room.
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState("User");
  const [sellerPhotoUrl, setSellerPhotoUrl] = useState(userPlaceholder);
  const [showDropdown, setDropdown] = useState(false);

  const [idForLatestMessage, setIdForLatestMessage] = useState(""); //loop through the chat in rtdb and get the most recent timestamp(biggest number) and set the latest directory for the latest message and get the value of the latest message object
  const [MostrecentTimestamp, setRecentTimestamp] = useState(0);
  const [latestMessage, setLatestMessage] = useState("");
  let oldestId;

  useEffect(() => {
    console.log("current chat data", chatStore[chatId]);
    let oldestTimestamp = 0;
    let otherUserRef;
    if (chatStore[chatId].user1 == user.uid) {
      otherUserRef = doc(db, "userStuff", chatStore[chatId].user2);
    } else {
      otherUserRef = doc(db, "userStuff", chatStore[chatId].user1);
    }
    async function getUsers() {
      const otherUserData = await getDoc(otherUserRef);
      setOtherUser(otherUserData.data().name);
      setSellerPhotoUrl(otherUserData.data().photoURL);
    }
    getUsers();

    Object.entries(chatStore[chatId].chats).map(([key, element]) => {
      if (element.timestamp >= oldestTimestamp) {
        oldestTimestamp = element.timestamp;
        oldestId = key;
      }
    });
    setRecentTimestamp(oldestTimestamp);
    // setIdForLatestMessage(chatStore[chatId].chats);
    console.log(oldestId);
    console.log(oldestTimestamp);
    console.log(chatStore[chatId].chats[oldestId].text);
    setLatestMessage(chatStore[chatId].chats[oldestId].text);
  }, [chatId]);
  {
    //   useEffect(() => {
    //     const chatRef = ref(realtimedb, `chats/${chatId}/chats`); // reference of chat texts in realtime database
    //     const userRef = ref(realtimedb, `chats/${chatId}`); // reference of user in realtime database
    //     const unsubscribe = onValue(chatRef, (snapshot) => {
    //       //gets all the chat messages in the chat room
    //       //onValue is a function that listens for changes in the chat messages and returns a snapshot to callback function and functions that unsubscribe from the listener to the variable
    //       //listens for changes in the chat messages and returns snapshot
    //       const data = snapshot.val(); //gets value of chat snapshot
    //       console.log("chat data:", data);
    //       if (data != null || data != undefined) {
    //         //if there is data of chat texts
    //         const msgs = Object.entries(data).map(([id, msg]) => ({
    //           //turns the object into array of objects
    //           id,
    //           ...msg, //spread operator to spread all the values in msg object and combines with id
    //         }));
    //         setMessages(msgs); //sets the messages state to the array of objects
    //       } else {
    //         setMessages([]);
    //       }
    //     }); //unsubscribe became a cleanup function that removes the listener when the component unmounts when called
    //     const unsubscribe2 = onValue(userRef, (snapshot) => {
    //       const data = snapshot.val();
    //       if (data) {
    //         let userId;
    //         let sellerId;
    //         if (data.user1 !== user.uid) {
    //           //checks the user ID of the current user. Not equal-> the user is the seller
    //           sellerId = data.user1;
    //           userId = data.user2;
    //         } else {
    //           sellerId = data.user2;
    //           userId = data.user1;
    //         }
    //         const fetchUsers = async () => {
    //           try {
    //             const sellerDocRef = doc(db, "userListings", sellerId); //getting the document reference of the seller from firestore
    //             const userDocRef = doc(db, "userListings", userId); //getting the document reference of the user from firestore
    //             const sellerSnap = await getDoc(sellerDocRef);
    //             const userSnap = await getDoc(userDocRef);
    //             setSellerPhotoUrl(sellerSnap.data().photoURL || userPlaceholder); //use placeholder if photoURL is not available
    //             if (sellerSnap.exists()) {
    //               setOtherUser(sellerSnap.data().name);
    //             }
    //           } catch (error) {
    //             console.error("Failed to fetch user name:", error);
    //           }
    //         };
    //         fetchUsers();
    //       }
    //     });
    //     // Cleanup function to remove the listeners when the component unmounts
    //     return () => {
    //       //function with no name
    //       unsubscribe();
    //       unsubscribe2();
    //     };
    //   }, [chatId]);
    //   async function handleRemoveChat() {
    //     //funciton to remove the chatId from both buyer and seller's chats listings in firestore
    //     const buyUserDocRef = doc(db, "userListings", user.uid);
    //     const sellUserDocRef = doc(db, "userListings", otherUser);
    //     await updateDoc(buyUserDocRef, {
    //       chats: arrayRemove(chatId), //removing the chat ID from the buyer's chats in firestore
    //     });
    //     await updateDoc(sellUserDocRef, {
    //       chats: arrayRemove(chatId), //removing the chat ID from the seller's chats in firestore
    //     });
    //   }
    //   async function handleConfirm(event) {
    //     //handling the option button click to toggle the dropdown menu
    //     const confirmBtnId = event.target.id;
    //     if (showDropdown == false) {
    //       setDropdown(true);
    //     } else {
    //       setDropdown(false);
    //     }
    //     const removeChatBtn = document.querySelector("#" + confirmBtnId);
    //     if (showDropdown) {
    //       removeChatBtn.style.visibility = "visible";
    //     } else {
    //       removeChatBtn.style.visibility = "hidden";
    //     }
    //   }
    //   useEffect(() => {
    //     const chatRef = ref(realtimedb, `chats/${chatId}/chats`); // reference of chat texts in realtime database
    //     const unsubscribe = onValue(chatRef, (snapshot) => {
    //       //gets all the chat messages in the chat room
    //       //onValue is a function that listens for changes in the chat messages and returns a snapshot to callback function and functions that unsubscribe from the listener to the variable
    //       //listens for changes in the chat messages and returns snapshot
    //       const data = snapshot.val(); //gets value of chat snapshot
    //       console.log("chat data:", data);
    //       if (data != null || data != undefined) {
    //         //if there is data of chat texts
    //         const msgs = Object.entries(data).map(([id, msg]) => ({
    //           //turns the object into array of objects
    //           id,
    //           ...msg, //spread operator to spread all the values in msg object and combines with id
    //         }));
    //         setMessages(msgs); //sets the messages state to the array of objects
    //       } else {
    //         setMessages([]);
    //       }
    //     });
    //     console.log("messages:", messages);
    //     ////loop through the chat in rtdb and get the most recent timestamp(biggest number) and set the latest directory for the latest message and get the value of the latest message object
    //     messages.map((element) => {
    //       let currentTimeStamp = element.timestamp;
    //       console.log("current timestamp:", currentTimeStamp);
    //       if (currentTimeStamp > MostrecentTimestamp) {
    //         setRecentTimestamp(currentTimeStamp); //sets the oldest timestamp to the current message's timestamp
    //         setLatestMessageRef(
    //           ref(realtimedb, `chats/${chatId}/chats/${element.id}`)
    //         );
    //         console.log("most recent timestamp:", MostrecentTimestamp);
    //         console.log("most recent chat ref:", latestMessageRef);
    //       } else {
    //         console.log("most recent timestamp:", MostrecentTimestamp);
    //         console.log("most recent chat ref:", latestMessageRef);
    //       }
    //     });
    //     if (latestMessageRef) {
    //       const unsubscribe3 = onValue(latestMessageRef, (snapshot) => {
    //         //getting the latest message from the chat room RTDB
    //         const data = snapshot.val();
    //         console.log("latest message:", data.text);
    //         setLatestMessage(data.text); //sets the latest message text to the state
    //         return () => {
    //           data ? data.text : ""; // Display the latest message text or empty string if no messages
    //         };
    //       });
    //     }
    //   }, [messages]);
  }
  return (
    <Link to={"/chat/" + chatId} className={styles.chatPreview}>
      <img src={sellerPhotoUrl} alt="seller" draggable={false} />
      <div>
        <h2>{otherUser}</h2>
        <p>{latestMessage}</p>
      </div>
      <div className={styles.btns}>
        <button
          id={randomIdforConfirmAndOptionBtn}
          onClick={(e) => {
            e.preventDefault();
            {
              // Prevents navigation if inside a Link}
              handleConfirm(e);
            }
          }}
          className={styles.optionBtn}
        >
          <img src={"/option.png"} alt="option" />
        </button>
        <button
          id={randomIdforConfirmAndOptionBtn}
          className={styles.confirm}
          onClick={(e) => {
            e.preventDefault();
            handleRemoveChat();
          }}
        >
          ❌
        </button>
        {/*confirm button*/}
      </div>
    </Link>
  );
}
