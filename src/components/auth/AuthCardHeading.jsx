export default function AuthHeading(props){
    return (
        <>
            <h1>{props.head}</h1>
            <h2><a href={props.link}>{props.sub}</a></h2>
        </>
    )
}