import { useRef, useEffect, useState } from "react";
import imagePlaceholder from "/image-placeholder.jpg";
import styles from "../../assets/css/slideshow.module.css";

export default function Slideshow(props) {
    const imgSlideshowRef = useRef(null);
    const dotsRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(1);

    useEffect(() => {
        const slides = imgSlideshowRef.current;
        const dots = dotsRef.current;

        if (slideIndex > props.image.length) setSlideIndex(1);
        if (slideIndex < 1) setSlideIndex(props.image.length);

        slides.querySelectorAll("img").forEach((img, index) => {
            if (index + 1 === slideIndex) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });

        dots.querySelectorAll("span").forEach((span, index) => {
            if (index + 1 === slideIndex) {
                span.classList.add(styles.active);
            } else {
                span.classList.remove(styles.active);
            }
        });
    }, [slideIndex]);

    return (
        <div ref={imgSlideshowRef} className={styles["image-slideshow"]}>
            {
                props.image.length <= 0 ? <img src={imagePlaceholder} className={styles.default} draggable={false} /> : props.image.map((img) => {
                    return (
                        <img src={img.url ? img.url : imagePlaceholder} onClick={(e) => { props.setSelectedImg ? props.setSelectedImg(e.target) & e.stopPropagation() : "" }} draggable={false} />
                    )
                })
            }

            <div ref={dotsRef} className={styles.dots}>
                {
                    props.image.length <= 1 ? "" : props.image.map((img, index) => {
                        return (
                            <span onClick={(e) => { e.stopPropagation(); setSlideIndex(index + 1) }}></span>
                        )
                    })
                }
            </div>

            {
                props.image.length > 1 ?
                    <>
                        {/* Prev & Next button */}
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.prev} fill={"currentColor"} viewBox="0 0 24 24" onClick={(e) => { e.stopPropagation(); setSlideIndex((prev) => prev - 1) }}>{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="m14.76 6.09-6.11 5.35c-.34.3-.34.83 0 1.13l6.11 5.35c.48.42 1.24.08 1.24-.56V6.65c0-.64-.76-.99-1.24-.56"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.next} fill={"currentColor"} viewBox="0 0 24 24" onClick={(e) => { e.stopPropagation(); setSlideIndex((prev) => prev + 1) }}>{/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M8 6.65v10.69c0 .64.76.99 1.24.56l6.11-5.35c.34-.3.34-.83 0-1.13L9.24 6.07C8.76 5.65 8 5.99 8 6.63Z"></path></svg>
                    </> : ""
            }
        </div>
    )
}