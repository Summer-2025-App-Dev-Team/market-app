import MobileNavbar from "./MobileNavbar";
import UserDropdown from "./UserDropdown";
import styles from "../../assets/css/header.module.css";
import logo from "/app-logo.png";
import UserPhoto from "./UserPhoto";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState, useRef } from "react";
import {
    useNavigate,
    Link,
    data,
    useFetcher,
    useSearchParams,
} from "react-router-dom";
import useChatStore from "./chatStore";
import { get, onValue, ref } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, realtimedb } from "../lib/firebase";
// state: built-in object that store value that change over time in a component

export default function Header({ scrollTargetRef }) {
    const user = useAuthStore((state) => state.user);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showBurger, setShowBurger] = useState(false);
    const headerRef = useRef(null);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";
    let userRef = null;
    let userSnap;
    let userData;
    let userchat; //chat ids of user
    const setStore = useChatStore((state) => state.setStore);
    const chatStore = useChatStore((state) => state.rtdb);
    async function getUser() {
        // gets all necessary user datas
        userRef = doc(db, "userStuff", user.uid);
        userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            userData = userSnap.data();
        }
    }
    let unsubscribes = [];
    if (user) {
        getUser().then(() => {
            userchat = userData.chats; //getting all the chat ids

            if (userchat) {
                const chatrooms = userchat.map((id) => {
                    // all different chats with different buyers
                    const chatRef = ref(realtimedb, `chats/${id}`); //accessing each whole chat(contains users, chats)
                    const unsubscribe = onValue(chatRef, (snapshot) => {
                        //checking if there is change in the referenece, if no, just pass.
                        //each chat
                        setStore(id, {
                            user1: snapshot.val().user1,
                            user2: snapshot.val().user2,
                            chats: snapshot.val().chats,
                        });
                    });
                    unsubscribes.push(unsubscribe); //add into unsubscribing functions list
                });
            }
        });
    }

    function handleBurgerIconOnClick(e) {
        e.stopPropagation();
        setShowBurger((prev) => !prev);
    }

    function handleAddItemOnClick(e) {
        const button = e.target;
        const ripple = document.createElement("div");
        const x = e.pageX - button.offsetLeft;
        const y = e.pageY - button.offsetTop;

        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        button.appendChild(ripple);

        const removeRipple = setTimeout(() => {
            ripple.remove();
            clearTimeout(removeRipple);
        }, 300);

        navigate("/add-item");
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = formData.get("search-box");
        window.location.href = `/?q=${value}`;
    }

    function handleSearchOnChange(e) {
        const value = e.target.value;
        const el = document.querySelector(`.${styles["search-box-border"]}`);
        if (value !== "") {
            el.style.setProperty("--after-display", "none");
        } else {
            el.style.setProperty("--after-display", "inline-block");
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                document.activeElement.tagName === "INPUT" ||
                document.activeElement.tagName === "TEXTAREA"
            ) {
                return;
            }

            const key = e.key;
            if (key === "/") {
                e.preventDefault();
                const input = document.getElementById("search-box");
                if (input) {
                    input.focus();
                }
            }
        };

        const handleSearchInputFocus = () => {
            const el = document.querySelector(
                `.${styles["search-box-border"]}`
            );
            el.style.outline = "5px solid rgba(116, 116, 255, 0.5)";
        };

        const handleSearchInputBlur = () => {
            const el = document.querySelector(
                `.${styles["search-box-border"]}`
            );
            el.style.outline = "5px solid transparent";
        };

        const handleScroll = (e) => {
            if (el.scrollTop >= 50) {
                headerRef.current.classList.add(styles.scrolled);
            } else {
                headerRef.current.classList.remove(styles.scrolled);
            }
        };

        const handleResize = () => {
            const paddingTop = headerRef.current.offsetHeight;
            el.style.paddingTop = paddingTop + "px";
        };

        const el = scrollTargetRef?.current;
        if (!el) return;

        const input = document.getElementById("search-box");
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);
        input.addEventListener("focus", handleSearchInputFocus);
        input.addEventListener("blur", handleSearchInputBlur);
        el.addEventListener("scroll", handleScroll);
        handleResize();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            input.removeEventListener("focus", handleSearchInputFocus);
            input.removeEventListener("blur", handleSearchInputBlur);
            unsubscribes.forEach((unsub) => unsub());
        };
    }, []);

    useEffect(() => {
        searchInputRef.current.value = query;
    }, [query]);

    return (
        <header ref={headerRef}>
            <nav>
                {/* Mobile menu icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    fill={"currentColor"}
                    viewBox="0 0 24 24"
                    onClick={handleBurgerIconOnClick}
                    className={styles["show-mobile"]}
                >
                    {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
                    <path d="M4 5H20V7H4z"></path>
                    <path d="M4 11H20V13H4z"></path>
                    <path d="M4 17H20V19H4z"></path>
                </svg>

                <Link
                    to={"/"}
                    className={`${styles["logo-link"]} ${styles["hide-mobile"]}`}
                >
                    <img
                        src={logo}
                        alt="logo"
                        draggable={false}
                        className={styles.logo}
                    />
                </Link>
                <div className={styles["search-wrapper"]}>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder="Search"
                            name="search-box"
                            id="search-box"
                            onChange={handleSearchOnChange}
                        />
                    </form>
                    <div className={styles["search-box-border"]}></div>
                </div>

                {/* For mobile */}
                <Link
                    to={`/profile/${user?.uid}`}
                    className={`${styles["avatar-link"]} ${styles["show-mobile"]}`}
                >
                    <UserPhoto />
                </Link>

                {/* For laptop */}
                <UserDropdown />
                <button
                    onClick={handleAddItemOnClick}
                    className={styles["hide-mobile"]}
                >
                    Add item
                </button>

                {/* Render the mobile header */}
                <MobileNavbar showBurger={showBurger} />
            </nav>
        </header>
    );
}
