import { Link } from "react-router-dom"

export default function AuthHeading(props) {
    return (
        <>
            <h1>{props.head}</h1>
            <h2><Link to={props.link}>{props.sub}</Link></h2>
        </>
    )
}