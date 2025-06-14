import Rating from "./Rating"
import "../../assets/css/itempage.css"

export default function Service(props) {
    return (
        <div className="service-wrapper">
            <img src={props.image ? props.image : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} className="preview-image" draggable={false} />
            <div className="item-info">
                <span className="title">{props.title ? props.title : "Title here"}</span>
                <span className="date">{props.date}</span>
            </div>
            <div className="person-info">
                <img className="profile" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
                <p>User</p>
                {props.noStars ? "" : <Rating />}
            </div>
            <span className="price">${props.price ? props.price : 0}</span>
        </div>
    )
}