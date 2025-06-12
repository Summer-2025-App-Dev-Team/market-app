import Rating from "./Rating"
import "../../assets/css/itempage.css"

export default function Service(props){
    return (
        <div className="service-wrapper">
            <img src={props.image ? props.image : "https://media-public.canva.com/MADmeSNULTw/1/thumbnail_large.jpg"}/>
            <p>{props.title ? props.title : "I make website with professional UI/UX with React and Svelte."}</p>
            <span className="price">$1.95</span>
            <div className="person-info">
                <img className="profile" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                <p>Mike Tyson</p>
                <Rating/>
            </div>
        </div>
    )
}