import { useEffect, useRef } from "react";
import styles from "../../assets/css/footer.module.css";

export default function Footer({ scrollTargetRef }) {
    const footerRef = useRef(null);

    useEffect(() => {
        function handleScroll(e) {
            const isAtBottom =
                el.clientHeight + el.scrollTop >= el.scrollHeight - 1;

            if (isAtBottom) {
                footerRef.current.classList.add(styles.show);
            } else {
                footerRef.current.classList.remove(styles.show);
            }
        }

        const el = scrollTargetRef?.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <footer ref={footerRef} className={styles.footer}>
            &copy; 2025 | SAS Market App
        </footer>
    );
}
