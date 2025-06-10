import Rating from "./Rating"

export default function Service(){
    return (
        <div className="service-wrapper">
            <img src="https://media-public.canva.com/MADmeSNULTw/1/thumbnail_large.jpg"/>
            <p>I will build a professional website with great ui/ux</p>
            <div className="person-info">
                <img className="profile" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                <p>Mike Tyson</p>
                <Rating/>
            </div>
        </div>
    )
}