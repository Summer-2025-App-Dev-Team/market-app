import { Link } from "react-router-dom"

export default function () {
    return (
        <main>
            <h1>The page you are looking for does not exist!</h1>
            <Link to={"/"}>
                <button>Go back home</button>
            </Link>
        </main>
    )
}