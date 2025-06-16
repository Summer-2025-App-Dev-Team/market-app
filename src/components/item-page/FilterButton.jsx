import { useState } from "react"

export default function FilterButton(props) {
    const [clicked, setClicked] = useState(false);
    const handClick = () => {
        setClicked(!clicked);
    }
    return (
        <button className={clicked ? "active" : ""} onClick={handClick}>{props.name}</button>
    )
}